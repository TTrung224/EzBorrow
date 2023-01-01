require("dotenv").config();
require("./config/database").connect();
const cors = require('cors')
const express = require("express");
// const bcrypt =  require('bcryptjs')
// const jwt = require('jsonwebtoken')
const route = require('./routes');
const cookies = require('cookie-parser')
const schedule = require('node-schedule');
const DailyService = require('./service/DailyService');

schedule.scheduleJob("0 8 * * 1-6", function(){DailyService.dailyService()});
// schedule.scheduleJob("*/20 * * * * *", function(){DailyService.dailyService()});

const app = express();
app.use(express.json());
app.use(cookies());
app.use(cors({origin: 'https://ezborrow.netlify.app', credentials: true}))
// app.use(cors({origin: 'http://localhost:3000', credentials: true}))
route(app);

module.exports = app;
