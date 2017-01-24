var express = require('express');
var bodyParser = require('body-parser');
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
    url: require('./app/models/db-model').url
  })
}));
app.use(bodyParser());
app.use(express.static('./src/buffer'));                                                                
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src'));                                                                                                    
app.set('views', './app/views');
app.set('view engine', 'jade');


app.get('/', require('./app/controllers/main').mainPage);
app.get('/main', require('./app/controllers/main').mainPage);
app.get('/feedback', require('./app/controllers/main').feedbackPage)
app.get('/search', require('./app/controllers/search').searchReportPage);
app.get('/search-company', require('./app/controllers/search').searchCompanyPage);
app.get('/stats', require('./app/controllers/stats').statsPage);
app.get('/register-report', require('./app/controllers/report').registerReportPage);
app.get('/register-company', require('./app/controllers/company').registerCompanyPage);
app.get('/admin', require('./app/controllers/admin').adminPage);
app.get('/logout', require('./app/controllers/admin').adminLogout)
app.post('/user/login', require('./app/controllers/admin').adminLogin);


app.get('/company/:id', require('./app/controllers/company').getCompanyById);
app.get('/report/:id', require('./app/controllers/report').getReportById);
app.post('/report/create/', upload.fields([{name:'upload'},{name:'ru_PDF'},{name:'en_PDF'}]), require('./app/controllers/report').addReport);
app.post('/company/create/', upload.single('upload_logo'), require('./app/controllers/company').addCompany);
app.post('/company/accept/single/:company_id', require('./app/controllers/company').acceptCompany);
app.post('/report/accept/single/:report_id', require('./app/controllers/report').acceptReport);
app.post('/news/add', require('./app/models/newsModel').addNews)
app.get('/:filename', require('./app/controllers/db-files').getFile);
app.post('/send-email', require('./app/controllers/email').sendEmail);
app.get('/search/:best', require('./app/controllers/search').searchReportPage);


//маршрутизация API запросов
app.get('/v1/search/company/:amount/:page/:sort/:sector/:size_of_company/:city/:search',require('./app/controllers/search').searchCompanyPageREST);
app.get('/v1/stats/:sector/:standart/:size_of_company/:type_of_ownership', require('./app/controllers/stats').getStats);
app.get('/v1/search/report/:amount/:page/:sort/:sector/:size_of_company/:city/:year/:opf/:type_of_ownership/:standarts/:best/:search', 
require('./app/controllers/search').searchReportPageREST);
app.get('/v1/static/:name', require('./app/models/staticModel').staticREST);


app.listen(require('./app/config.js').port);
console.log('Server started!');                                                                                                                                                              