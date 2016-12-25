var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


var Report = require('../models/reportModel').reportModel;
var newsModel = require('../models/newsModel').newsModel;


exports.mainPage = function (req, res){
  //заменить сортировку по accept .where('accept','1')
  Report.find({accept: 1}).sort({date : 'desc'}).limit(14).exec(function (err, reports){ 
    newsModel.find({}).sort({date: 'desc'}).limit(3).exec(function(err, news){
      res.render('main', {
        new_reports: reports,
        news: news
      });
    });
  });
};
