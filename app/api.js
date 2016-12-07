var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://80.93.177.208:27017/ERIO")//конектимсся к БД

var multer = require("multer");
var upload = multer({dest: './src/buffer'});
var conn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
gfs=Grid(conn.db);
var ObjectId = require('mongoose').Types.ObjectId; 

//схемы данных
var Report = require('./models/reportModel').ReportModel; // модель отчета
var Company = require('./models/companyModel').CompanyModel; // модель компании
var User = require('./models/userModel').UserModel; // модель пользователя
var Sector = require('./models/sectorModel').SectorModel;//модель сектора

exports.addReport = function(req,res){
    
}

exports.addCompany = function(req,res){
    var new_comp = new Company;
    new_comp.name = req.body.name;

    //cохраняем лого в БД
    req.files.logo.mv('src/buffer/'+new_comp._id+req.files.logo.name, function(err){});

    var writestream = gfs.createWriteStream({
      filename: new_comp._id+req.files.logo.name
    });

    fs.createReadStream('src/buffer/'+new_comp._id+req.files.logo.name)
      .on('end', function(){fs.unlink('src/buffer/'+new_comp._id+req.files.logo.name, function(err){console.log("success")})})
        .on('err', function(){ console.log('Error uploading image')})
          .pipe(writestream);
 
    writestream.on('close', function (file) {
        console.log(file.filename + ' Written To DB');
    });

    //переделать в связи со схемой
    new_comp.logo = '/'+new_comp._id+req.files.logo.name;
    new_comp.info = req.body.info;
    new_comp.adress = req.body.adress; 
    new_comp.telephone = req.body.telephone;
    new_comp.CEO = req.body.CEO;
    new_comp.fax = req.body.fax; 
    new_comp.link = req.body.link;
    new_comp.consult = req.body.consult;
    new_comp.save();
    res.send('ok '+new_comp._id+' ');
}

exports.getFile = function(req, res){
       var readstream = gfs.createReadStream({filename: req.params.filename});
       readstream.on('error', function(err){
        res.send('No image found with that title');
       });
       readstream.pipe(res);
  };

exports.getCompanyById = function(req, res){
    var xx = Company.find({});

    Company.findOne({_id:new ObjectId(req.params.id)}).then(function(company){
        //заменить на поиск по отчетам
        Report.find({
            //по имени компании company:company.name
        }).then(function(reports){
        //проверка на 'accept'
        if (company.accept==true)
		    res.render('company', {company:company, reports:reports});
        else
            res.send('Компания не прошла проверку у администрации ресурса');
        });
	})
};

exports.getReportById = function(req, res){
    Report.findOne({_id:req.params.id}).then(function(document){
		res.json(document);
	})
};

exports.searchReports = function (req, res){
    /* 
        обработка параметров
    */
    Report.find({
        //параметры поиска
    }).then(function(document){
		res.json(document);
    })
};

exports.searchCompnaies = function (req, res){
    /*
        обработка параметров
    */ 
   Company.find({
        //параметры поиска
    }).then(function(document){
        res.json(document);
    });
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
