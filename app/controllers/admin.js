var mongoose = require('mongoose');
var dbModel = require('../models/db-model');
var db = dbModel.db;


var auth = require('../models/authModel');
var Company = require('../models/companyModel').companyModel;
var Report = require('../models/reportModel').reportModel;


exports.adminPage = function (req, res) {
  if(req.session.user){
    Company.find({}).then(function(companies){
      Report.find({}).then(function(reports){
        res.render('admin',{
          user : req.session.user,
          companies: companies,
          reports: reports
        });
      });
    });
	} else {
		res.render('login');
	}
};

exports.adminLogin = function(req, res, next) {
	if (req.session.user) return res.redirect('/admin')
 
	auth.checkUser(req.body)
		.then(function(user){
			if(user){
				req.session.user = {id: user._id, name: user.username}
				res.redirect('/admin')
			} else {
				return res.send('Не удалось');
			}
		})
		.catch(function(error){
			return res.send('Не удалось авторизоваться '+eror);
		})
 
};

exports.adminLogout = function (req, res){
	if (req.session.user) {
		delete req.session.user;
		res.redirect('/admin')
	}
};

exports.adminCreate = function (req, res){
  let user = {};
  user.name = req.body.name;
  user.password = req.body.password;
  user = auth.createUser(user);
  res.send('new user '+user);
};