var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/ERIO")//конектимсся к БД


//схемы данных
var Report = require('./models/reportModel').ReportModel; // модель отчета
var Company = require('./models/companyModel').CompanyModel; // модель компании
var User = require('./models/userModel').UserModel; // модель пользователя

exports.addReport = function(req,res){
    
}

exports.addCompany = function(req,res){
    //var name="name "+req.params.id;
    var testcompany = new CompanyModel;//({name:"ttt"});
    testcompany.name="777";
    testcompany.save();
    //testcompany.name="name "+req.params.id;
    //testcompany.create({name}, function (err) {
    //if (err) return handleError(err)});
    res.render('report',{ report: 'Отчет №' + 777, id: "Работает"});
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

    var _id = 1;//сделать поиск
    res.render('report',{ report: 'Отчет №' + _id, id: _id});
    //res.render('company');
};
