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
var sort = req.params.sort;

//переделать индусский код через query
    if (sort == undefined)
    //сделать по дате добавления
    Company.find({}).sort({}).exec(function (err, _company){
        company = _company;
        rend();
    });

    if (sort == 'name')
    Company.find({}).sort({name : 'asc'}).exec(function (err, _company){
        company = _company;
        rend();
    });

    if (sort == 'sector')
    Company.find({}).sort({sector : 'asc'}).exec(function (err, _company){
        company = _company;
        rend();
    });

    if (sort == 'size_of_company')
    Company.find({}).sort({size_of_company : 'asc'}).exec(function (err, _company){
        company = _company;
        rend();
    });

    function rend(){
        Static.find({}, function (err, docs){
            var i;

            for(i=0; i<docs.length-1; i++){
                switch(docs[i].name){
                    case 'sector': sector = docs[i].mass;
                        break;
                    case 'size_of_company': size_of_company = docs[i].mass;
                        break;
                    default : continue;
                }
            }

            res.render('search-company', {sector:sector, size_of_company:size_of_company, company:company});
        });
    }; 
};
