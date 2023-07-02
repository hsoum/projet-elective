const mongoose = require('mongoose');
if (
  !mongoose.connection.readyState
)
  mongoose.connect('mongodb+srv://Slim:Slim1234@cluster0.vfrjf6b.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;

module.exports = db;