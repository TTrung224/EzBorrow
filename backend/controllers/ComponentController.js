// importing user context
const Component = require("../model/component");

class AccountController {
    // [GET] /component
    async getAll(req, res, next) {
        try {
            const components = await Component.find({});

            // return all components
            res.status(201).json(components);
        } catch(err){
            console.log(err);
            res.status(500).send();
        }
    }    
    
    // [GET] /component/:id
    async getOne(req, res, next) {
        try {
            const component = await Component.find({_id: req.params.id});

            // return all components
            res.status(201).json(component);
        } catch(err){
            console.log(err);
            res.status(500).send();
        }
    }

    // [POST] /component
    async create(req, res, next) {
        try {
            // Get user input
            const { name, description, permission, quantity} = req.body;
            
            // Validate user input
            if (!(name && description && permission && quantity)) {
                return res.status(400).send("All input is required");
            }

            // Create component in our database
            const component = await Component.create({
                name,
                description,
                permission,
                quantity,
            });

            // return new component
            res.status(201).json(component);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }

    // [PUT] /component/:id
    async update(req, res, next) {
        try {
            const result = await Component.updateOne({_id: req.params.id}, req.body)

            // return code
            res.status(200).send(result.acknowledged);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }

    // [DELETE] /component/:id
    async delete(req, res, next) {
        try {
            const result = await Component.deleteOne({_id: req.params.id}, req.body)

            // return code
            res.status(200).send(result.acknowledged);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }
}

module.exports = new AccountController();