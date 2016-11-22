var mongoose = require('mongoose');

//Схема данных компании. 
var CompanySchema = new mongoose.Schema({
    //уникальный идентификатор
    id : mongoose.Schema.Types.ObjectId, 
    name : String, 
    logo : String,//Binary base64 format 
    sector : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sector'
    }, 
    info : String, 
    adress : String, 
    telephone : String, 
    CEO : String, 
    fax : String, 
    link : String, 
    consult : String
})

var CompanyModel = mongoose.model('company', CompanySchema);
exports = CompanyModel;