var mongoose = require('mongoose');


var companySchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
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

var mongoose = require('mongoose');


var pageSchema = new mongoose.Schema({
    date: {
        type: mongoose.Schema.Types.Date,
        default: mongoose.Schema.Types.Date.now
    },
    author: {
        type: String,
        default: 'Someone'
    },
    header: {
        type: String,
        default: '<h2>Header-def</h2>'
    },
    alias: {
        type: String,
        default: 'alias-def'
    },
    title: {
        type: String,
        default: 'Title-def'
    },
    footer: {
        type: String,
        default: '<h2>Footer-def</h2>'
    },
    sidebar: {
        type: String,
        default: '<h2>Sidebar-def</h2>'
    },
    main_top: {
        type: String,
        default: '<h2>Main_top-def</h2>'
    },
    main_center: {
        type: String,
        default: '<h2>Main_center-def</h2>'
    },
    main_bottom: {
        type: String,
        default: '<h2>Main_bottom-def</h2>'
    }
})

var pageModel = mongoose.model('page', pageModel);
module.exports.pageModel = pageModel;

