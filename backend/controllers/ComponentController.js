const Component = require("../model/component");

let calAvailability = (componentList) => {
    if(componentList.length > 0){
        componentList.forEach(component => {
            component['available_amount'] = component.quantity - component.borrowed;
        });
    }
    return componentList;
}

class ComponentController {
    // [GET] /component
    async getAll(req, res, next) {
        try {
            let components = await Component.find({});
            components = await calAvailability(components);
            // return all components
            res.status(201).json(components);
        } catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    }    
    
    // [GET] /component/:id
    async getOne(req, res, next) {
        try {
            let component = await Component.findOne({_id: req.params.id});
            component['available_amount'] = component.quantity - component.borrowed;

            // return component
            res.status(201).json(component);
        } catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    }
    
    // [GET] /component/search?name=
    async getByName(req, res, next) {
        try {
            let result;
            if(!req.query.name){
                result = [];
            } else{
                result = await Component.find({name: {$regex: req.query.name, $options: 'i'}});
                result = await this.calAvailability(result);

                // return component
                res.status(201).json(result);
            }
        } catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    }

    // [POST] /component
    async create(req, res, next) {
        try {
            // Get user input
            const { name, description, img_src, permission, quantity} = req.body;
            
            // Validate user input
            if (!(name && description && img_src && permission && quantity)) {
                return res.status(400).send("All input is required");
            }

            // Create component in our database
            const component = await Component.create({
                name,
                description,
                img_src,
                permission,
                quantity,
            });

            // return new component
            res.status(201).json(component);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    // [PUT] /component/:id
    async update(req, res, next) {
        /*
        req.body = {
            "updateBorrowed" : [2, add/minus]]
            "updateComponent" {
                "name" : ...,
                ...
            }
        }
        */
        if(req.body.hasOwnProperty("updateBorrowed")) {
            try {
                const component = await Component.findById(req.params.id);
                var borrowed;
                if(req.body.updateBorrowed[1] == "add"){
                    borrowed = component.borrowed + req.body.updateBorrowed[0];
                } else if(req.body.updateBorrowed[1] == "minus"){
                    borrowed = component.borrowed - req.body.updateBorrowed[0];
                }
                req.body.updateComponent["borrowed"] = borrowed;

                const result = await Component.updateOne({_id: req.params.id}, req.body.updateComponent)
            } catch (err) {
                console.log(err);
            }
            
        } else {
            try {
                const result = await Component.updateOne({_id: req.params.id}, req.body.updateComponent)

                // return code
                res.status(200).send(result.acknowledged);
            } catch (err) {
                console.log(err);
                res.status(500).send(err);
            }
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
            res.status(500).send(err);
        }
    }


// Support methods:
    async getComponent(id){
        return await Component.findOne({_id: id});
    }

    async checkPermission(component){
        try {
            return component.permission;
        } catch(err){
            console.log(err);
            return true;
        }
    }
    
    async checkAvailability(component, amount){
        try {
            var result = ((component.quantity - component.borrowed) >= amount);
            return result;
        } catch(err){
            console.log(err);
            return false;
        }
    }

}

module.exports = new ComponentController();