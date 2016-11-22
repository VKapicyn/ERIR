var mongoose = require('mongoose');

//Схема данных компании. 
var SectorSchema = new mongoose.Schema({
    //уникальный идентификатор
    id : Schema.Types.ObjectId, 
    name : String, 
})

var SectorModel = mongoose.model('sector', SectorSchema);
exports = SectorModel;