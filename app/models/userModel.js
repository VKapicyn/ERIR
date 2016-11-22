var mongoose = require('mongoose');

//Схема данных пользователя (админ). 
var UserSchema = new mongoose.Schema({
    login: String,
    password: String
})

var UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;