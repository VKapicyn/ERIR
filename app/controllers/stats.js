var mongoose = require('mongoose');


var getStatic = require('../models/staticModel').getStatic;
var Report = require('../models/reportModel').reportModel;


exports.statsPage = function (req, res){
  getStatic(function(result, parse){
        var stat = parse(result);
        res.render('stats', {
              year: stat.year,
              opf: stat.opf,
              type_of_ownership: stat.type_of_ownership,
              sector: stat.sector, 
              standarts: stat.standarts,
              size_of_company: stat.size_of_company, 
        });
    });
};

exports.getStats = function (req, res){
  var query = Report.find({});

  if(req.params.sector != 'Отрасль экономики')
    query.where('sector', req.params.sector);
  if(req.params.standart != 'Все стандарты')
    query.where('standarts', req.params.standart);
  if(req.params.size_of_company != 'Размер предприятия')
    query.where('size_of_company', req.params.size_of_company);
  if(req.params.type_of_ownership != 'Форма собственности')
    query.where('type_of_ownership', req.params.type_of_ownership);

  query.exec(function (err, reports){
    res.json(reports)
  });
}

