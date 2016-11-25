var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/ERIO")//конектимсся к БД


//схемы данных
var Report = require('./models/reportModel').ReportModel; // модель отчета
var Company = require('./models/companyModel').CompanyModel; // модель компании
var User = require('./models/userModel').UserModel; // модель пользователя
var Sector = require('./models/sectorModel').SectorModel;//модель сектора

exports.addReport = function(req,res){
    
}

exports.addCompany = function(req,res){
    //var name="name "+req.params.id;
    var testcompany = new Company;//({name:"ttt"});
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

exports.getSectorByName = function(req, res){
    var name = req.params.name;
    Sector.find({name:name}, function(err, docs)
    {
        if (err) return handleError(err);
        var id_render = Array();
        var name_render= Array();
        console.log(docs);
        if(docs.length!=0){
        for(var i = 0; i<docs.length;i++){
        id_render[i] = docs[i]._id.toString();//такой метод позволяет из возврата функции find берем нужное
        name_render[i] = docs[i].name.toString();
        }
        }
        else{
            id_render = 0;
            name_render = 'Ничего не найдено';
        }
        res.render('report',{report:name_render,id:id_render});
    });
}
exports.getCompaniesBySectorName = function(req, res){
    var sector_name = req.params.name;
    var ids_render=Array();
    var names_render=Array();
    var id;
    var name;
    Sector.findOne({name:sector_name}, function(err, docs)
    {
        if (err) return handleError(err);
        if(docs){
        id = docs._id.toString();
        name = docs.name.toString();
        console.log(name);
        }
        else{
            ids_render = 0;
            names_render = 'Ничего не найдено';
        }
    });
    Company.find({sector:id},function(err, companies){//чот не работает
        if(err) return handleError(err);
        if(companies){
        for(var i = 0; i<companies.length; i++){
            names_render[i] = companies[i].name.toString();
            ids_render[i] = companies[i]._id.toString();
        }
        }
        else{
            ids_render = 0;
            names_render = 'Ничего не найдено';
        }
    })
    var title = 'Компании отрасли ' + sector_name;
    res.render('list_companies',{title:title, names: names_render, ids: ids_render});
}