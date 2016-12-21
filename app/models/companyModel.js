var mongoose = require('mongoose');


var companySchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    accept: Number,
    date: String,
    logo: String,

    //учесть возможность поиска по обоим
    name: String, //добавить в профиль
    short_name: String, 

    info: String,
    opf: String,
    sector: String,
    adress: String,
    city: String,
    size_of_company: String,
    type_of_ownership: String,
    listing: String,
    CEO: String,
    link: String,

    employees: String,//количество сотруд
    revenue: String,//годовой доход

    comp_phone: String,
    comp_fax: String,
    comp_email: String,

    user_FIO: String,
    user_position: String,
    user_telphone: String,
    user_email: String,

    reports: [{
        accept: Number,
        date: {
            type: mongoose.Schema.Types.Date,
            default: mongoose.Schema.Types.Date.now
        },
        name: String,
        year: String,
        company: String,
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
    }]
})


var companyModel = mongoose.model('company', companySchema);
module.exports.companyModel = companyModel;
