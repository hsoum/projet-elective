const mongoose = require('mongoose');
if (
  !mongoose.connection.readyState
)
  mongoose.connect('mongodb+srv://Dexter366:aymirou36@cluster0.xzphj9y.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;

module.exports = db;