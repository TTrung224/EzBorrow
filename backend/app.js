require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json());

// Logic goes here

module.exports = app;
//api for courses
app.listen(9000)
