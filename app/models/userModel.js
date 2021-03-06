let mongoose = require('mongoose');

let User = new mongoose.Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});
 
let UserModel = mongoose.model('User', User);
 
module.exports = UserModel;