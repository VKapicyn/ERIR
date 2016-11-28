var mongoose = require('mongoose');

//Схема данных компании. 
var CompanySchema = new mongoose.Schema({
    //уникальный идентификатор
    _id : mongoose.Schema.Types.ObjectId, 
    accept : Boolean,
    date: {
        type: mongoose.Schema.Types.Date,
        default:  mongoose.Schema.Types.Date.now
    },
    logo : String,
    name : String, 
    info : String, 
    short_name: String,
    opf: String,
    telephone : String,
    sector : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sector'
    }, 
    adress : String, //?
    size_of_company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size_of_company'
    },
    type_of_ownership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type_of_ownership'
    },
    employees: Number,
    revenue: Number,
    //listing????
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'listing'
    },
    fax : String, 
    CEO : String, 
    link : String, 
    email : String,
    reports: [{
        report : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'report'
        }
    }]
})

var CompanyModel = mongoose.model('company', CompanySchema);
module.exports.CompanyModel = CompanyModel;