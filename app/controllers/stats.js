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
              size_of_company: stat.size_of_company, 
        });
    });
};

exports.getStats = function (req, res){
  var query = Report.find({});

  query.exec(function (err, reports){
    res.json(reports)
  });
}

