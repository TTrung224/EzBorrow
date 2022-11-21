// importing user context
const User = require("../model/account");
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const { json } = require('body-parser');

class AccountController {
    // [GET] /
    index(req, res, next) {
        res.send("home page");
    }

    // [POST] /login
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
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
            }
            return res.status(400).send("Invalid Credentials");
        } catch (err) {
            console.log(err);
        }
        // Our register logic ends here
    }


    // [POST] /register
    async register(req, res, next) {
        // Our register logic starts here
        try {
            // Get user input
            const { first_name, last_name, email, password, type} = req.body;
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
            // console.log("password: " + password)
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
            { user_id: user._id, email },
            "My Token",
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
        }
        // Our login logic ends here
    }
}

module.exports = new AccountController();