//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

//aquire the connection
const db = mongoose.connection;

// if error while connection then print in console
db.on('error', console.error.bind(console, "error while connecting to db"));

//on succesfull connnection
db.once('open', function(){
     console.log("succesfully conneted to db");
});