let mongoose = require('mongoose');


let Company = require('../models/companyModel').companyModel;
let Report = require('../models/reportModel').reportModel;
let getStatic = require('../models/staticModel').getStatic;


let company;
let reports;

exports.searchReportPage = function (req, res){
        getStatic(function(result, parse){
            let stat = parse(result);
            console.log(stat);
            res.render('search', {
                year: stat.year,
                opf: stat.opf,
                type_of_ownership: stat.type_of_ownership,
                sector: stat.sector, 
                standarts: stat.standarts,
                size_of_company: stat.size_of_company,
                best: stat.best,
                city: stat.city, 
                reports: reports,
                parametr: req.params.best
            });
        });
};

exports.searchReportPageREST = function(req, res){
    let sort = req.params.sort;
    let sector = req.params.sector;
    let size_of_company = req.params.size_of_company;
    let city = req.params.city;
    let year = req.params.year;
    let opf = req.params.opf;
    let type_of_ownership = req.params.type_of_ownership;
    let standarts = req.params.standarts;
    let best = req.params.best;

    let search = req.params.search;
    let page = req.params.page;
    let amount = req.params.amount;
    let query = query = Report.find({accept:'1'});

    if(search!='null')
        query.where({name:{$regex: search, $options:'i'}});
        

    switch (sort){
        case 'name' :
            query.sort({company: 'asc'});
            break;
        case 'sector' :
            query.sort({sector: 'asc'});
            break;
        case 'size_of_company' :
            query.sort({size_of_company: 'asc'});
            break;
        case 'year' :
            query.sort({year: 'asc'});
            break;
        default : 
            query.sort({date: 'asc'});
            break;
    };

    if (standarts != 'standarts'){
        let m_standarts = standarts.split(';');
        for(let i=0; i< m_standarts.length-1; i++){
            query.where('standarts', m_standarts[i]);
        }
    }
    
    if (best != 'best'){
        let m_best = best.split(';');
        for(let i=0; i< m_best.length-1; i++){
            query.where('Best', m_best[i]);
        }
    }


    if (size_of_company != 'Размер компании')
        query.where('size_of_company', size_of_company);
    if (sector != 'Отрасль экономики')
        query.where('sector', sector);
    if (city != 'Местонахождение штаб-квартиры')
        query.where('city', city);
    if (year != 'Отчетный год')
        query.where('year', year);
    if (opf != 'Организационно-правовая форма')
        query.where('opf', opf);
    if (type_of_ownership != 'Форма собственности')
        query.where('type_of_ownership', type_of_ownership);


    let result = [];
    console.log(query);
    query.exec(function (err, _report){
        if (_report!=undefined){
            let start = amount * page - amount;
            let finish = amount * page - 1;
            for(let i=start; ((i<_report.length) && (i<=finish)); i++){
                result.push(_report[i]);
            }
            let size = {'key':'size', 'size':_report.length};
            result.push(size);
            console.log(result);
            res.json(result);
        }
    });
}

exports.searchCompanyPage = function (req, res){
    getStatic(function(result, parse){
        let stat = parse(result);
        res.render('search-company', {
            sector: stat.sector, 
            size_of_company: stat.size_of_company, 
            city: stat.city
        });
    });
};

exports.searchCompanyPageREST = function (req, res){
    let sort = req.params.sort;
    let sector = req.params.sector;
    let city = req.params.city;
    let size_of_company = req.params.size_of_company;
    let search = req.params.search;
    let page = req.params.page;
    let amount = req.params.amount;
    let query = Company.find({accept:'1'});

    if(search!='null')
        query.where({$or: [
            {name: {$regex: search, $options:'i'}},
            {short_name: {$regex: search, $options:'i'}}
        ]});



    switch (sort){
        case 'name' :
            query.sort({name: 'asc'});
            break;
        case 'sector' :
            query.sort({sector: 'asc'});
            break;
        case 'size_of_company' :
            query.sort({size_of_company: 'asc'});
            break;
        default : 
            query.sort({date: 'asc'});
            break;
    };

    if(size_of_company!='Размер компании')
        query.where('size_of_company',size_of_company);
    if (sector!='Отрасль экономики')
        query.where('sector',sector);
    if (city != 'Местонахождение штаб-квартиры')
        query.where('city', city);
    
    let result = [];
    query.exec(function (err, _company){
        if (_company!=undefined){
            let start = amount * page - amount;
            let finish = amount * page - 1;
            for(let i=start; ((i<_company.length) && (i<=finish)); i++){
                result.push(_company[i]);
            }
            let size = {'key':'size', 'size':_company.length};
            result.push(size);
            res.json(result);
        }
    }); 
};