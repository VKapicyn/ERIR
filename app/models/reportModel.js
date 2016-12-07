var mongoose = require('mongoose');

//Схема данных отчета.
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
    type: String, //социальный, годовой, об устойчивом развитии и т.п.
    year: Number,
    standarts: [{
        G4:{
        type: Boolean
        },
        G3:{
        type: Boolean
        },
        IIRC:{
            type: Boolean
        } //и прочие страндарты сюда
    }],
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

var ReportModel = mongoose.model('report', ReportSchema);
module.exports.ReportModel = ReportModel;
