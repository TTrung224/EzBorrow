const Request = require("../model/request");
const EmailService = require("../service/EmailService")
const ComponentController = require("./ComponentController");
// const component = require("../model/component");
// const request = require("../model/request");
// const User = require("../model/account");
const Account = require("../model/account");
const AccountController = require("./AccountController");

let checkFine = (userEmail) =>  {
    try {
        let userFine = Account.findOne({email: userEmail}, 'fine fineDescription');
        return userFine;
    } catch (error) {
        console.log(error)
        return "NO USER"
    }
}

class RequestController {

    // [GET] /search?email=
    async getByBorrower(req, res, next){
        let requests = [];
        if (!req.query.email){
            
            res.json(requests);
        } else {
            try {
                let conditions = req.query.email;
                console.log(conditions)
                let result = await Request.find({ borrower_email: {$regex: conditions, $options: 'i'} });
                requests = result;
                res.status(200).json(requests);
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        }
    }

    //get current user's requests
    // [GET] /myRequest
    async getMyRequest(req, res, next) {
        try {
            let requests = [];
            let user = req.user;

            console.log(user.email);
            requests = await Request.find({borrower_email: user.email});
            res.status(201).json(requests);
        } catch (error) {
            console.log(err);
            res.status(500).json({success: false, message: "internal server error"});
        }
    }

    // [GET] /request
    async getAll(req, res, next) {
        try {
            const requests = await Request.find({});

            // return all requests
            res.status(201).json(requests);
        } catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    }    
    
    // [GET] /request/:id
    async getOne(req, res, next) {
        try {
            const request = await Request.findOne({_id: req.params.id});

            // return request
            res.status(201).json(request);
        } catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    }

    // [POST] /request
    async create(req, res, next) {
        try {
            // Get user input
            const { component_list, expected_return_date, 
                pickup_date, lecturer_email, course } = req.body;

            // Validate user input
            if (!(component_list && expected_return_date && pickup_date && lecturer_email && course)) {
                return res.status(400).send("All input is required");
            }

            // Check component permission
            var permission = false;
            for (const component of component_list){
                let componentObject = await ComponentController.getComponent(component.id);
                let componentPermission = await ComponentController.checkPermission(componentObject);
                if(!permission){
                    if(componentPermission){
                        permission = true;
                    } else {
                        permission = false;
                    }
                }
                // Check component availability
                if(!(await ComponentController.checkAvailability(componentObject, component.amount))){
                    throw "Component in list is not available";
                }
            };  
            
            var lecturer_status = (permission ? "pending" : "approved");
            if(req.user.user_type == "lecturer"){
                lecturer_status = "approved";
            }

            if(lecturer_status == "approved"){
                var technician_status = "pending";
            } else if(lecturer_status == "pending"){
                technician_status = "waiting";
            }
            const student_status = "waiting";

            const borrower_email = req.user.email;
            try {
                let currentFine = await checkFine(borrower_email);
                if (currentFine == "NO USER") res.status(204).json({success: false, message: "cannot find user"});
                else if (currentFine.fine != "NONE") res.status(403).json({success: false, message: `${currentFine.fineDescription}`})
            } catch (error) {
                res.status(500).json({success: false, message: 'server cannot connect to database'})
            }
            // Create request in our database
            const request = await Request.create({
                component_list,
                expected_return_date,
                pickup_date,
                borrower_email,
                lecturer_email,
                lecturer_status,
                student_status,
                technician_status,
                course,
            });

            // Update component borrowed number
            for (const component of component_list){
                const updateReq = {
                    "body": {
                        "updateBorrowed" : [component.amount, "add"],
                        "updateComponent" : {},
                    },
                    "params": {
                        "id" : component.id
                    }
                };
                ComponentController.update(updateReq);
            }; 

            // Send email to lecturer/technician
            if(permission){
                EmailService.emailForLecturerApprove(request);
            } else {
                EmailService.emailForTechnicianApprove(request);
            }

            // return new request
            res.status(201).json(request);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    // [PUT] /request/:id
    async update(req, res, next) {
        try{
            var updateRequest = {}
            const requestForEmail = await Request.findById(req.params.id);
            if(!requestForEmail){throw "no record matched";}
            switch(req.body.type){
                case "approve": {
                    if(req.user.user_type == "lecturer"){
                        updateRequest["lecturer_status"] = "approved";
                        updateRequest["technician_status"] = "pending";
                        EmailService.emailForTechnicianApprove();

                    } else if(req.user.user_type == "technician"){
                        updateRequest["technician_status"] = "approved";
                        updateRequest["student_status"] = "ready";
                        EmailService.emailForStudentApprovedStatus(requestForEmail);
                    }
                    break;
                };

                case "cancel": {
                    if(req.user.user_type == "lecturer"){
                        updateRequest["lecturer_status"] = "canceled";
                        updateRequest["technician_status"] = "canceled";
                        updateRequest["student_status"] = "canceled";
                        EmailService.emailForStudentCancelStatus(requestForEmail, "by your lecturer, please contact with your lecturer for further information or review your course's/school's policy of equipment borrowing");

                    } else if(req.user.user_type == "technician"){
                        updateRequest["technician_status"] = "canceled";
                        updateRequest["student_status"] = "canceled";
                        EmailService.emailForStudentCancelStatus(requestForEmail, `by technician, please contact with technician staff [${EmailService.technician_email}] for further information or review your course's/school's policy of equipment borrowing`);

                    } else if(req.user.user_type == "student"){
                        updateRequest["student_status"] = "canceled";
                    }
                    break;
                };

                case "pickUp": {
                    updateRequest["student_status"] = "picked up";
                    break;
                }

                case "return": {
                    updateRequest["student_status"] = "returned";
                    updateRequest["actual_return_date"] = Date.now();
                    AccountController.fineReset(requestForEmail.borrower_email);
                    break;
                }
            }

            const result = await Request.updateOne({_id: req.params.id}, updateRequest);

            // minus the borrowed number of component
            if(req.body.type == "cancel" || req.body.type == "return"){
                var request = await Request.findOne({_id: req.params.id});
                for (const component of request.component_list){
                    const updateReq = {
                        "body": {
                            "updateBorrowed" : [component.amount, "minus"],
                            "updateComponent" : {},
                        },
                        "params": {
                            "id" : component.id
                        }
                    };
                    ComponentController.update(updateReq);
                }; 
            }

            res.status(200).send(result.acknowledged);

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    // Support methods:
    async getRequestById(id){
        try {
            var result = await Request.findById(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getPickedUp(){
        try {
            var result = await Request.find({student_status: "picked up"});
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getWaiting(){
        try {
            var result = await Request.find({student_status: "waiting"});
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async setReminded(requestId){
        try{
            const result = await Request.updateOne({_id: requestId}, {"reminded": true});
            console.log(result.acknowledged);
        }catch(err){
            console.log(err);
        }
    }

    async autoCancel(requestId){
        try{
            var updateRequest = {}
            updateRequest["lecturer_status"] = "canceled";
            updateRequest["technician_status"] = "canceled";
            updateRequest["student_status"] = "canceled";
            const result = await Request.updateOne({_id: requestId}, updateRequest);
        
            // minus the borrowed number of component
            var request = await Request.findOne({_id: requestId});
            EmailService.emailForStudentCancelStatus(request, "by the system because it was waiting for approval for more than 3 days, please make a new request");

            for (const component of request.component_list){
                const updateReq = {
                    "body": {
                        "updateBorrowed" : [component.amount, "minus"],
                        "updateComponent" : {},
                    },
                    "params": {
                        "id" : component.id
                    }
                };
                ComponentController.update(updateReq);
            };

            // console.log(result.acknowledged);

        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new RequestController();