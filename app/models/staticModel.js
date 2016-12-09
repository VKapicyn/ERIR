var mongoose = require('mongoose');

//Схема данных компании. 
var StaticSchema = new mongoose.Schema({
    //уникальный идентификатор
    id : mongoose.Schema.Types.ObjectId, 
    name : String,
    mass: [String]
});
var StaticModel = mongoose.model('static', StaticSchema);
module.exports.StaticModel = StaticModel;