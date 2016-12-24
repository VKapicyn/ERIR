var mongoose = require('mongoose');


var companySchema = new mongoose.Schema({

    accept: Number,
    date: mongoose.Schema.Types.Date,
    logo: String,

    //учесть возможность поиска по обоим
    name: String, 
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

    reports: [String]
})


var companyModel = mongoose.model('company', companySchema);
module.exports.companyModel = companyModel;
