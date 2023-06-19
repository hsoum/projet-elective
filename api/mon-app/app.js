var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/authtification');

var app = express();

 const db = require('./db');
const sequelize = require('./db1');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

module.exports = app;
const {Client} = require('./models/User');

// Test the database connection
// async function createe() {
//   try {
//     const client = await Client.create({
//       LastName: 'Doe',
//       email: 'john@example.com',
//       password: 'password123',
//       FirstName: 'John',
//       username: 'John Doe',
//       phoneNumber: '1234567',
//       birthDate:'04/04/1995',
//       Role: 'Client'
//     });
//     console.log('User created:', client.toJSON());
//   } catch (error) {
//     console.error('Error creating user:', error);
//   }
// }

// createe();


app.listen(8000, () =>
{
    console.log('test')
});
       
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
    
});

