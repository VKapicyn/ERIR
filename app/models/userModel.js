var mongoose = require('mongoose');


var гserSchema = new mongoose.Schema({
    login: String,
    password: String
});


var userModel = mongoose.model('user', userSchema);
module.exports.userModel = userModel;