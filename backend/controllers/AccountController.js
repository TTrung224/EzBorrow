// importing user context
const User = require("../model/account");
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

// const Components = require('../model/component')
// const { json } = require('body-parser');
// const {fineReset, fineSet} = require('./generalFunction')


class AccountController {
    // [GET] account/getaccount
    async getUser(req, res, next) {
        let data = {};
        let user = req.user;
        console.log(typeof(user));
        console.log(user);
        try {
            //get user info
            let result = await User.findOne({ email: user.email });
            //only return allowed info
            data.first_name = result.first_name;
            data.last_name = result.last_name;
            data.email = result.email;
            data.type = result.type;
            //return data retrieved from database
            console.log("data====",data)
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: "server error"});
        }
    }
    
    // [GET] account/lecturers
    async getAllLecturer(req, res, next) {
        let data = {};
        let user = req.user;
        console.log(typeof(user));
        console.log(user);
        try {
            let result = await User.find({ type: "lecturer" }, 'first_name last_name email');
            return res.status(200).json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: "server error"});
        }
    }


    // [POST] account/login
    async login(req, res, next) {
        // Our login logic starts here
        try {
            // Get user input
            const { email, password } = req.body;

            // Validate user input
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            // Validate if user exist in our database
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email, user_type: user.type},
                    process.env.TOKEN_KEY,
                    {
                    expiresIn: "2h",
                    }
                );
                let data = {};
                data.first_name = user.first_name;
                data.last_name = user.last_name;
                data.email = user.email;
                data.type = user.type;
                data.token = token;

                // // save user token
                // user.token = token;

                // // save the token to cookie that send back in response
                // res.cookie('token', token, { httpOnly: true });

                // user
                return res.status(200).json(data);
                // return res.status(200).json({success: true, message: "login successfully"});
            }
            return res.status(400).send("Invalid Credentials");
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
        // Our register logic ends here
    }


    // [POST] account/register
    async register(req, res, next) {
        // Our register logic starts here
        try {
            // Get user input
            const { first_name, last_name, email, password, type } = req.body;
            // Validate user input
            if (!(email && password && first_name && last_name)) {
            return res.status(400).send("All input is required");
            }

            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await User.findOne({ email });

            if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
            }

            //Encrypt user password
            console.log("password: " + password)
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            const user = await User.create({
                first_name,
                last_name,
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
                type
            });

            // Create token
            const token = jwt.sign(
            { user_id: user._id, email, user_type: user.type },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
            );
            // save user token
            user.token = token;

            //save cookie token
            res.cookie('token', token, { httpOnly: true });

            // return new user
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
        // Our login logic ends here
        
    }


    // [POST] account/logout
    async logout(req, res){
        try {
            if (req.user != null){
                res.clearCookie('token');
                return res.status(200).json({success: true, message: "logout successfully"});
                
            }
        } catch (error) {
            console.log("catch")
            console.log(error);
            return res.status(500).json({success: false, message: "internal server error"})
        }
    }    

    // Support methods:
    async getUserNameByEmail(email){
        try {
            let result = await User.findOne({ email: email });
            const name = result.first_name + " " + result.last_name;
            return name
        } catch (error) {
            console.log(error);
        }
    }
    
    async getFineStatusByEmail(email){
        try {
            let result = await User.findOne({ email: email });
            const status = result.fine;
            console.log(status);
            return status;
        } catch (error) {
            console.log(error);
        }
    }

    async fineSet(fineMessage, fineDes, userEmail){
        try {
            let userFine = await User.findOne({email: userEmail}, 'fine fineDescription');
            if (!userFine) {
                throw new Error('userNotFindError');
                // res.status(400).json({success: false, message: 'cannot find this user'})
            }
            // console.log(userFine);

            userFine.fine = fineMessage;
            userFine.fineDescription = fineDes;
            userFine.save();
            // console.log(userFine);
            return 'success'
            // res.status(200).json({success: true, message: `fine of user ${userEmail} is set`})
        } catch (error) {
            if (error.message === 'userNotFindError') throw error
            else throw new Error('fineMessageError')
            // res.status(400).json({success: false, message: 'unallowed fine message'})
        }
    }

    async fineReset (userEmail){
        try {
            let userFine = await User.findOne({email: userEmail}, 'fine fineDescription');
            if (!userFine) {
                throw new Error('userNotFindError');
            }
            userFine.fine = 'NONE';
            userFine.fineDescription = 'NONE';
            userFine.save();
            return 'success'
        } catch (error) {
            if (error.message === 'userNotFindError') throw error
            throw error;
        }
    }


    // Future development
    async setFine(req, res){
        const {fine_message, fine_description, target_email} = req.body;
        if (!(fine_message)) res.status(400).json({success: false, message: "fine cannot be empty"})
        if (!target_email) res.status(400).json({success: false, message: "cannot set to nobody"})
        try {
            const set = await this.fineSet(fine_message, fine_description, target_email);
            if (set === 'success') {
                res.status(200).json({success: true, message: `fine of user ${target_email} is set`})

            }
        } catch (error) {
            if (error.message === 'userNotFindError'){
                res.status(400).json({success: false, message: 'cannot find this user'})

            }
            else if (error.message === 'fineMessageError'){
                res.status(400).json({success: false, message: 'unallowed fine message'})

            } else {
                console.log(error)
                res.status(500).json({success: false, message: 'internal server error'})
            }
        }
    }   

    async resetFine(req, res){
        const {target_email} = req.body;
        if (!(target_email)) res.status(400).json({success: false, message: "cannot set to nobody"});
        try {
            const reset = await this.fineReset(target_email);
            if (reset === 'success') {
                res.status(200).json({success: true, message: `fine of user ${target_email} is reset`})
            }
        } catch (error) {
            if (error.message === 'userNotFindError'){
                res.status(400).json({success: false, message: 'cannot find this user'})

            }else {
                console.log(error)
                res.status(500).json({success: false, message: 'internal server error'})
            }
        }
    }

}

module.exports = new AccountController();