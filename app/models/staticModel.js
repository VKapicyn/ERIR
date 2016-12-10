var mongoose = require('mongoose');


var staticSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId, 
    name : String,
    mass: [String]
});


var staticModel = mongoose.model('static', staticSchema);
module.exports.staticModel = staticModel;