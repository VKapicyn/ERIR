var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


var Report = require('../models/reportModel').reportModel;
var newsModel = require('../models/newsModel').newsModel;
var recaptcha = require('../models/recaptchaModel').recaptcha;


exports.mainPage = function (req, res){
  Report.find({accept: 1}).sort({date : 'desc'}).limit(25).exec(function (err, reports){
    newsModel.find({}).sort({date: 'desc'}).limit(3).exec(function(err, news){
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