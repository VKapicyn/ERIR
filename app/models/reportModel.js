var mongoose = require('mongoose');

//Схема данных отчета. 
//Доделать!!!
var ReportSchema = new mongoose.Schema({
    //уникальный идентификатор
    _id: mongoose.Schema.Types.ObjectId,
    //0 - не проверен, 1 - одобрен, 2 - откланен
    visible: Number,
    //время добавления
    date: {
        type: mongoose.Schema.Types.Date,
        default: mongoose.Schema.Types.Date.now
    },
    name: String,
    year: Number,
    preview: String,
    company: {
        type: String
    },
    interactive: String,
    doc_rus: String, 
    doc_en: String,
    about: String,
    consultant: {
        type: String
    },
    auditor: {
        type: String
    },
    designer: {
        type: String
    },
    manager: String

})

var ReportModel = mongoose.model('report', ReportSchema);
module.exports.ReportModel = ReportModel;
