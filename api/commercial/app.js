const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const path = require('path');
const db = require('./db');
const sequelize = require('./db1');

const RouteUsers = require('./routes/users');
var authRouter = require('./routes/authtification');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRouter);
app.use('/users/', RouteUsers);




app.listen(8000, () => console.log('Server is up and running'));
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});