let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId; 
let dbModel = require('../models/db-model');
let db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


let Report = require('../models/reportModel').reportModel;
let newsModel = require('../models/newsModel').newsModel;
let recaptcha = require('../models/recaptchaModel').recaptcha;


exports.mainPage = function (req, res){
  Report.find({accept: 1}).sort({date : 'desc'}).limit(25).exec(function (err, reports){
    newsModel.find({}).sort({date: 'desc'}).limit(3).exec(function(err, news){
      console.log(reports);
      console.log(news);
      res.render('main', {
        new_reports: reports,
        news: news
      });
    });
  });
};

exports.feedbackPage = function (req, res){
      res.render('feedback');
};