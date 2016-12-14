var mongoose = require('mongoose');

var Company = require('../models/companyModel').companyModel;
var Report = require('../models/reportModel').reportModel;

exports.searchReportPage = function (req, res){
    Report.find({}).then(function (reports){
        res.render('search', {reports:reports});
    });
};

exports.searchCompanyPage = function (req, res){
    Company.find({}).then(function (company){
        Report.find({}).then(function (reports){
            res.render('search-company', {company:company, reports:reports});
        });
    });
};
