var mongoose = require('mongoose');

var Company = require('../models/companyModel').companyModel;
var Report = require('../models/reportModel').reportModel;

exports.searchCompanyPage = function (req, res){
    Company.find({}).then(function (company){
        Report.find({}).then(function (reports){
            res.render('search-company', {company:company, reports:reports});
        });
    });
};

exports.searchCompnaies = function (req, res){
    /*
        обработка параметров
    */ 
   Company.find({
        //параметры поиска
    }).then(function (document){
        res.json(document);
    });
};

exports.searchReports = function (req, res){
    /* 
        обработка параметров
    */
    Report.find({
        //параметры поиска
    }).then(function (document){
		res.json(document);
    })
};