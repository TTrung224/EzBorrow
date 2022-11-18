require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json());

// Logic goes here


//Require student routes
const studentRoute = require('./routes/student.routes');
app.use('/student', studentRoute);


module.exports = app;
