require("dotenv").config();
require("./config/database").connect();
const express = require("express");
// const bcrypt =  require('bcryptjs')
// const jwt = require('jsonwebtoken')
const route = require('./routes');
const cookies = require('cookie-parser')
const app = express();

app.use(express.json());
app.use(cookies());
route(app);

module.exports = app;
