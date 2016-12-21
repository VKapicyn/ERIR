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
                standarts: stat.standarts,
                size_of_company: stat.size_of_company,
                best: stat.best, 
                reports: reports
            });
        });
    };
};

exports.searchCompanyPage = function (req, res){
    getStatic(function(result, parse){
        var stat = parse(result);
        res.render('search-company', {
            sector: stat.sector, 
            size_of_company: stat.size_of_company, 
        });
    });
};

exports.searchCompanyPageREST = function (req, res){
    var sort = req.params.sort;
    var sector = req.params.sector;
    var size_of_company = req.params.size_of_company;
    var search = req.params.search;
    var page = req.params.page;
    var amount = req.params.amount;
    var query;

    if(search!='null')
        query = Company.find({name:{$regex: search, $options:'i'}})
    else
        query = Company.find({});

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

    if(size_of_company!='Размер предприятия')
        query.where('size_of_company',size_of_company);
    if (sector!='Отрасль экономики')
        query.where('sector',sector);
    
    var result = [];
    query.exec(function (err, _company){
        let start = amount * page - amount;
        let finish = amount * page - 1;
        for(let i=start; ((i<_company.length) && (i<=finish)); i++){
            result.push(_company[i]);
        }
        let size = {'key':'size', 'size':_company.length};
        result.push(size);
        res.json(result);
    }); 
};