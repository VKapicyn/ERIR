var mongoose = require('mongoose');


var Company = require('../models/companyModel').companyModel;
var Report = require('../models/reportModel').reportModel;
var getStatic = require('../models/staticModel').getStatic;


var company;
var reports;

//ВАЖНО!!! добавить проверку на accept

exports.searchReportPage = function (req, res){
    var query = Report.find({});

    query.exec(function (err, _reports){
        reports = _reports
        reports_rend();
    });

    function reports_rend(){
        getStatic(function(result, parse){
            var stat = parse(result);
            res.render('search', {
                year: stat.year,
                opf: stat.opf,
                type_of_ownership: stat.type_of_ownership,
                sector: stat.sector, 
                size_of_company: stat.size_of_company, 
                reports: reports
            });
        });
    };
};

exports.searchCompanyPage = function (req, res){
    var sort = req.params.sort;
    var sector = req.query.economy;
    var size_of_company = req.query.company_size;
    var query = Company.find({});

    //сортировку вынести на фронтенд и сделать на angular
    switch (sort){
        case 'name' :
            query.sort({name: 'asc'});
            break;
        case 'sector' :
            query.sort({sector: 'asc'});
            break;
        case 'size_of_company' : {}
            query.sort({size_of_company: 'asc'});
            break;
        default : 
            query.sort({date: 'asc'});
            break;
    };

    if(size_of_company!='Размер предприятия' && size_of_company!=undefined)
        query.where('size_of_company',size_of_company);
    if (sector!='Отрасль экономики' && sector!=undefined)
        query.where('sector',sector);

    query.exec(function (err, _company){
        company = _company;
        company_rend();
    });

    function company_rend(){
        getStatic(function(result, parse){
            var stat = parse(result);
            res.render('search-company', {
                sector: stat.sector, 
                size_of_company: stat.size_of_company, 
                company: company
            });
        });
    }; 
};
