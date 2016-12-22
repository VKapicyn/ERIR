var mongoose = require('mongoose');


var reportSchema = new mongoose.Schema({
        accept: Number,
        date: mongoose.Schema.Types.Date,
        name: String,
        year: String,
        company: String,
        company_id: String,
        standarts: [String],

        BusinessModel: Boolean,
        Strategy: Boolean,
        RiskMap: Boolean,
        ZaverReport: Boolean, // Общественное заверение отчета
        PanelZS: Boolean, // Участие в панели заинтересованных сторон
        Best: [String], //админ
        RRS: String, //админ
        interactive: String, //добавить поле 

        auditor: String,
        consultant: String,
        manager: String,
        designer: String,
        pages: String,
        wins: String,

        doc_rus: String, 
        doc_en: String,
        preview: String
})


var reportModel = mongoose.model('report', reportSchema);
module.exports.reportModel = reportModel;
