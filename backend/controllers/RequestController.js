const Request = require("../model/request");
const componentController = require('../controllers/componentController');
const ComponentController = require("../controllers/componentController");
const component = require("../model/component");
const request = require("../model/request");


class RequestController {
    async geByBorrower(req, res, next){
        let requests = [];
        if (!req.query.id){
            res.json(requests);
        } else {
            try {
                let conditions = '/' + req.query.id + '/';
                let result = await Request.find({borrower_id: conditions});
                requests = result;
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }


        }
    }

    //get current user's requests
    async getMyRequest(req, res, next) {
        try {
            let user = req.user;
            const requests = await Request.find({borrower_id: user.id});
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
            const { component_list, request_date, return_date, 
                pickup_date, borrower_id, lecturer_id } = req.body;

            // Validate user input
            if (!(component_list && request_date && return_date && pickup_date && borrower_id && lecturer_id)) {
                return res.status(400).send("All input is required");
            }

            // Check component permission
            var permission = false;
            for (const component of component_list){
                let componentObject = await componentController.getComponent(component.id);
                let componentPermission = await componentController.checkPermission(componentObject);
                if(!permission){
                    if(componentPermission){
                        permission = true;
                    } else {
                        permission = false;
                    }
                }
                // Check component availability
                if(!(await componentController.checkAvailability(componentObject, component.amount))){
                    throw "Component in list is not available";
                }
            };  
            
            const lecturer_status = (permission ? "pending" : "approved");
            if(lecturer_status == "approved"){
                var technician_status = "pending";
            } else if(lecturer_status == "pending"){
                technician_status = "waiting";
            }
            const student_status = "waiting";

            // Create request in our database
            const request = await Request.create({
                component_list,
                request_date,
                return_date,
                pickup_date,
                borrower_id,
                lecturer_id,
                lecturer_status,
                student_status,
                technician_status,
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
                componentController.update(updateReq);
            }; 

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

            switch(req.body.type){
                case "approve": {
                    if(req.user.user_type == "lecturer"){
                        updateRequest["lecturer_status"] = "approved";
                        updateRequest["technician_status"] = "pending";
                    } else if(req.user.user_type == "technician"){
                        updateRequest["technician_status"] = "approved";
                        updateRequest["student_status"] = "ready";
                    }
                    break;
                };

                case "cancel": {
                    if(req.user.user_type == "lecturer"){
                        updateRequest["lecturer_status"] = "canceled";
                    } else if(req.user["user_type"] == "technician"){
                        updateRequest["technician_status"] = "canceled";
                    } else if(req.user["user_type"] == "student"){
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
                    componentController.update(updateReq);
                }; 
            }

            res.status(200).send(result.acknowledged);

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}

module.exports = new RequestController();