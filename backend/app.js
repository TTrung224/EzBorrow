const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const students = require('./students')
 
app.use(bodyParser.json())
const url = "mongodb+srv://admin:admin@cluster0.mnwyjpj.mongodb.net/db1?retryWrites=true&w=majority"
mongoose.connect(url)
 
app.use('/students', students)
 
//api for courses
app.listen(9000)
