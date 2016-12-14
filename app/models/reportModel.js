var mongoose = require('mongoose');


var reportSchema = new mongoose.Schema({
    //уникальный идентификатор
    //0 - не проверен, 1 - одобрен, 2 - откланен
    accept: Number,
    //время добавления
    date: {
        type: mongoose.Schema.Types.Date,
        default: mongoose.Schema.Types.Date.now
    },
    name: String,
    type: String, //социальный, годовой, об устойчивом развитии и т.п.
    year: String,
    GRI: Boolean,
    IIRC: Boolean,
    A1000SES: Boolean,
    A1000APS: Boolean,
    sector: String,
    HQAdress: String,
    Size: String,
    OPF: String,
    TypeOfProperty: String,
    BestPractise: Boolean, //является лучшей практикой?
    BPDescription: String, //если предыдущее да, то описание
    preview: String,
    ratingPos: String, //пишем место, либо – "Не листингуется"
    company: {
        type: String
    },
    BusinessModel: Boolean,//
    Strategy: Boolean,     //Есть ли элемент в отчете
    RiskMap: Boolean,      //
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


var reportModel = mongoose.model('report', reportSchema);
module.exports.reportModel = reportModel;
