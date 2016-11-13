var mongoose = require('mongoose');

//Схема данных пользователя (админ). 
var UserSchema = new mongoose.Schema({
    login: {
        type: String
    },
    password: {
        type: String
    }
})

var UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;