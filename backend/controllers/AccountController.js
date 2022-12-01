// importing user context
const User = require("../model/account");
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const Components = require('../model/component')
const { json } = require('body-parser');

class AccountController {
    // [GET] account/
    async getUser(req, res, next) {
        let data = {};
        let user = req.user;
        console.log(typeof(user));
        try {
            //get user info
            let result = await User.findOne({ email: user.email });
            //only return allowed info
            data.first_name = result.first_name;
            data.last_name = result.last_name;
            data.email = result.email;
            data.type = result.type;
            //return data retrieved from database
            return res.status(200).json(data);
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

                // save user token
                user.token = token;

                // save the token to cookie that send back in response
                res.cookie('token', token, { httpOnly: true });

                // user
                return res.status(200).json(user);
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

            // return new user
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
        // Our login logic ends here
    }
}

module.exports = new AccountController();