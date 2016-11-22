var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/ERIO")//конектимсся к БД


//схемы данных
var Report = require('./models/reportModel').ReportModel; // модель отчета
var Company = require('./models/companyModel').CompanyModel; // модель компании
var User = require('./models/userModel').UserModel; // модель пользователя

exports.addReport = function(req,res){
    
}

exports.addCompany = function(req,res){
    var testcompany = new CompanyModel;
    testcompany.name="test"+req.params.id;
}

exports.getReportById = function(req, res){
    /*
        здесь будет работа со схемой данных
    */
    var _id = req.params.id;
    res.render('report',{ report: 'Отчет №' + _id, id: _id});
};

exports.getCompanyById = function(req, res){
    /*
        здесь будет работа со схемой данных
    */
    res.render('company');
};
