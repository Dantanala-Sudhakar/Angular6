const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
	userName:{type:String, unique:true},
	password:String,
	email:String
});

var User = mongoose.model('myuser', userSchema, 'users');
module.exports = User;
