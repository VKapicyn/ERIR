var mongoose = require('mongoose');


var companySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    accept: {
        type: Number,
        default: 0
    },
    date: {
        type: mongoose.Schema.Types.Date,
        default: mongoose.Schema.Types.Date.now
    },
    logo: String,
    name: String,
    info: String,
    short_name: String,
    opf: String,
    telephone: String,
    sector: {
        type: String,
    },
    adress: String,
    city: String,
    size_of_company: {
        type: String,
    },
    type_of_ownership: {
        type: String,
    },
    employees: Number,
    revenue: Number,
    listing: {
        type: String,
    },
    fax: String,
    CEO: String,
    link: String,
    email: String
})


var companyModel = mongoose.model('company', companySchema);
module.exports.companyModel = companyModel;
