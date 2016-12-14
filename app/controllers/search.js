var mongoose = require('mongoose');

var Company = require('../models/companyModel').companyModel;
var Report = require('../models/reportModel').reportModel;
var Static = require('../models/staticModel').staticModel;

exports.searchReportPage = function (req, res){
    Report.find({}).then(function (reports){
        res.render('search', {reports:reports});
    });
};

exports.searchCompanyPage = function (req, res){
var sector;
var opf;
var size_of_company;
var type_of_ownership; 
var company;
var reports;

    Company.find({}).then(function (_company){
        company = _company;
            Static.find({}, function (err, docs){
            var i;

            for(i=0; i<docs.length-1; i++){
                switch(docs[i].name){
                    case 'sector': {sector = docs[i].mass; console.log(sector);}
                        break;
                    case 'size_of_company': size_of_company = docs[i].mass;
                        break;
                    default : continue;
                }
            }

            res.render('search-company', {sector:sector, size_of_company:size_of_company, company:company});
        });
    });
};
