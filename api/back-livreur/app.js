const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const RouteArticles = require('./router/article');
const RouteMenus = require('./router/menu');
const RouteUsers = require('./router/users');
var authRouter = require('./router/authtification');
const RouteRestaurant = require('./router/restaurant');
const RouteOrder = require('./router/order');
// const { Client } = require('./models/User');
//const pool = require('./mysql');
var indexRouter = require('./router/index');
const path = require('path');
const sequelize = require('./db1');
require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // Test the database connection
// async function createe() {
//     try {
//         const client = await Client.create({
//             LastName: 'Doe',
//             email: 'john@example.com',
//             password: 'password123',
//             FirstName: 'John',
//             username: 'John Doe',
//             phoneNumber: '1234567',
//             birthDate: '04/04/1995',
//             Role: 'Client'
//         });
//         console.log('User created:', client.toJSON());
//     } catch (error) {
//         console.error('Error creating user:', error);
//     }
// }

// createe();

mongoose.connect('mongodb+srv://Diag:Diagacht7@cluster0.tnealtp.mongodb.net/').then(() => {
    console.log('Connexion Success !')
}).catch((error) => {
    console.log(error);
});

// Attempt to acquire a connection from the pool
// pool.getConnection()
//     .then((connection) => {
//         console.log('Connected to MariaDB database');
//         connection.release(); // Release the connection
//     })
//     .catch((error) => {
//         console.error('Error connecting to MariaDB database:', error);
//     });

app.use(bodyParser.json());

app.use('/api/articles/', RouteArticles);
app.use('/api/menus/', RouteMenus);
app.use('/users/', RouteUsers);
app.use('/index/', indexRouter);
app.use('/auth', authRouter);
app.use('/restaurant/', RouteRestaurant);
app.use('/order/', RouteOrder);

module.exports = app;
