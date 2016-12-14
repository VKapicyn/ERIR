var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


var Static = require('../models/staticModel').staticModel;
var Company = require('../models/companyModel').companyModel;
var Report = require('../models/reportModel').reportModel;


exports.registerCompanyPage = function (req, res){  
    var sector;
    var opf;
    var size_of_company;
    var type_of_ownership;

    Static.find({}, function (err, docs){
        var i;

        for(i=0; i<docs.length-1; i++){
            switch(docs[i].name){
                case 'sector': sector = docs[i].mass;
                    break;
                case 'opf': opf = docs[i].mass;
                    break;
                case 'size_of_company': size_of_company = docs[i].mass;
                    break;
                case 'type_of_ownership': type_of_ownership = docs[i].mass;
                    break;
                default : continue;
            }
        }

        res.render('register-company', {sector:sector, opf:opf, size_of_company:size_of_company, type_of_ownership:type_of_ownership});
    });
};

exports.addCompany = function (req,res){
    var new_comp = new Company;
    new_comp.name = req.body.company_name;
    console.log(new_comp.name);
    console.log(req.body);

    new_comp.name = req.body.company_name;
    new_comp.info = req.body.company_description;
    new_comp.opf = req.body.organization_form;
    new_comp.telephone = req.body.writer_phone;
    new_comp.sector = req.body.economy;
    new_comp.adress = req.body.company_law_address;
    new_comp.size_of_company = req.body.company_size;
    new_comp.type_of_ownership = req.body.ownership;
    new_comp.listing = req.body.listing;
    new_comp.CEO = req.body.CEO;
    new_comp.link = req.body.company_site;
    new_comp.email = req.body.writer_email;
    console.log(req.files);


     //cохраняем лого в БД
    req.files.upload_logo.mv('src/buffer/'+new_comp._id+req.files.upload_logo.name, function (err) {console.log('ttts')});

    var writestream = gfs.createWriteStream({
      filename: new_comp._id+req.files.upload_logo.name
    });

    fs.createReadStream('src/buffer/'+new_comp._id+req.files.upload_logo.name)
      .on('end', function(){fs.unlink('src/buffer/'+new_comp._id+req.files.upload_logo.name, function(err){console.log('success')})})
        .on('err', function(){ console.log('Error uploading image')})
          .pipe(writestream);
 
    writestream.on('close', function (file){
        console.log(file.filename + ' Written To DB');
    });

    new_comp.logo = '/'+new_comp._id+req.files.upload_logo.name;
    new_comp.save();
    res.send('ok '+new_comp._id+' ');

};

exports.getCompanyByName = function (req, res) {
    Company.findOne({name:req.params.name}).then(function (company){
        Report.find({company:company.name}).then(function (reports){
        if (company.accept==1)
		    res.render('company', {company:company, reports:reports});
        else
            res.send('Компания не прошла проверку у администрации ресурса');
        });
	});
};
