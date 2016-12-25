var express = require('express');

var bodyParser = require('body-parser');
//var fileUpload = require('express-fileupload');
var babel_es6 = require('babel-core/register');
var es6 = require('./server')
var dbModel = require('./app/models/db-model');
var app = express();
var mongoose = require("mongoose")
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/buffer')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({storage: storage});


app.use(session({
  secret: 'ERIO da-strateg',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ 
    url: 'mongodb://80.93.177.208:27017/ERIO',
  })
}));
//app.use(multer({dest: '../src/buffer'}).single('upload_logo'));
//app.use(require('skipper')());
app.use(bodyParser());
app.use(express.static('./src/buffer'));                                                                
app.use(bodyParser.json());
//app.use(fileUpload());
app.use(express.static(__dirname + '/src'));                                                                                                    
app.set('views', './app/views');
app.set('view engine', 'jade');


app.get('/', require('./app/controllers/main').mainPage);
app.get('/main', require('./app/controllers/main').mainPage);
app.get('/search', require('./app/controllers/search').searchReportPage);
app.get('/search-company', require('./app/controllers/search').searchCompanyPage);
app.get('/stats', require('./app/controllers/stats').statsPage);
app.get('/register-report', require('./app/controllers/report').registerReportPage);
app.get('/register-company', require('./app/controllers/company').registerCompanyPage);
app.get('/admin', require('./app/controllers/admin').adminPage);
app.get('/logout', require('./app/controllers/admin').adminLogout)
app.post('/user/login', require('./app/controllers/admin').adminLogin);


app.get('/search/:sort', require('./app/controllers/search').searchReportPage);
app.get('/company/:id', require('./app/controllers/company').getCompanyById);
app.get('/report/:id', require('./app/controllers/report').getReportById);
app.post('/report/create/', upload.fields([{name:'upload'},{name:'ru_PDF'},{name:'en_PDF'}]), require('./app/controllers/report').addReport);
app.post('/company/create/', upload.single('upload_logo'), require('./app/controllers/company').addCompany);
app.get('/:filename', require('./app/controllers/db-files').getFile);
// 4 маршрута для редактирования
//app.post('/create/user', require('./app/controllers/admin').adminCreate);


//маршрутизация API запросов
app.get('/v1/search/company/:amount/:page/:sort/:sector/:size_of_company/:city/:search',require('./app/controllers/search').searchCompanyPageREST);
app.get('/v1/stats/:sector/:standart/:size_of_company/:type_of_ownership', require('./app/controllers/stats').getStats);
app.get('/v1/search/report/:amount/:page/:sort/:sector/:size_of_company/:city/:year/:opf/:type_of_ownership/:standarts/:best/:search', 
require('./app/controllers/search').searchReportPageREST);
app.get('/v1/static/standarts', require('./app/models/staticModel').standartsREST);
app.get('/v1/static/best', require('./app/models/staticModel').bestREST);
//app.get('/v1/report/:id', rest.getReportById);
//app.get('/v1/company/:name', rest.getCompanyByName);
//app.get('/v1/search/companies/', rest.searchCompnaies);
//app.get('/v1/search/reports/', rest.searchReports);


app.listen(8080);
console.log('Server started!');                                                                                                                                                              