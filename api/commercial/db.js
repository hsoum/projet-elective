const mongoose = require('mongoose');
if (
  !mongoose.connection.readyState
)
  mongoose.connect('mongodb+srv://Diag:Diagacht7@cluster0.tnealtp.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;

module.exports = db;