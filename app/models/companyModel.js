var mongoose = require('mongoose');

//Схема данных компании. 
var CompanySchema = new mongoose.Schema({
    //уникальный идентификатор
    id : { 
        type: Number
    }

    /*
        дописать код здесь

    */
})

var CompanyModel = mongoose.model('company', CompanySchema);
exports = CompanyModel;