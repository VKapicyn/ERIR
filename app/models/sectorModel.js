var mongoose = require('mongoose');

//Схема данных компании. 
var SectorSchema = new mongoose.Schema({
    //уникальный идентификатор
    id : mongoose.Schema.Types.ObjectId, 
    name : String
},{
    collection: 'sector' //как выяснилось, это обязательно
});
var SectorModel = mongoose.model('sector', SectorSchema);
module.exports.SectorModel = SectorModel;