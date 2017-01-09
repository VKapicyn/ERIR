var mongoose = require('mongoose');


var reportSchema = new mongoose.Schema({
        accept: Number,
        date: mongoose.Schema.Types.Date,
        name: String,
        year: String,
        company: String,
        company_id: String,
        sector: String,
        standarts: [String],
//для упрощения сортировки и поиска (надо было использовать реляционку ¯\_(ツ)_/¯)
        size_of_company: String, 
        opf: String,
        city: String,
        type_of_ownership: String,


        BusinessModel: Boolean,
        Strategy: Boolean,
        RiskMap: Boolean,
        Assurance: Boolean, // Общественное заверение отчета
        Stakes: Boolean, // Участие в панели заинтересованных сторон
        ZS: Boolean,
        Best: [String], //админ
        RRS: String, //админ
        RRSlink: String, //админ
        interactive: String,

        fin_auditor: String,
        auditor: String,
        consultant: String,
        manager: String,
        designer: String,
        pages: String,
        wins: String,
        world_wins: String,

        doc_rus: String, 
        doc_en: String,
        preview: String,

        user_FIO: String,
        user_position: String,
        user_telphone: String,
        user_email: String,
})


var reportModel = mongoose.model('report', reportSchema);
module.exports.reportModel = reportModel;
