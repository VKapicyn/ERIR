import masterController from "./app/controllers/master";

let express = require('express'),
    app = express.Router(),
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/buffer')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }),
    upload = multer({storage: storage});

app.get('/', masterController.main);
app.get('/main', masterController.main);
app.get('/feedback', masterController.feedback);
app.get('/search', masterController.search.report);
app.get('/search-company', masterController.search.company);
app.get('/stats', masterController.stats);
app.get('/register-report', masterController.register.report);
app.get('/register-company', masterController.register.company);
app.get('/admin', masterController.admin.page);
app.get('/logout', masterController.admin.logout);
app.post('/user/login', masterController.admin.login);


app.get('/company/:id', masterController.company.getById);
app.get('/report/:id', masterController.report.getById);
app.post('/report/create/', upload.fields([{name: 'upload'}, {name: 'ru_PDF'}, {name: 'en_PDF'}]), masterController.report.create);
app.post('/company/create/', upload.single('upload_logo'), masterController.company.create);
app.post('/company/accept/single/:company_id', masterController.company.validate);
app.post('/report/accept/single/:report_id', masterController.report.validate);
app.post('/news/add', masterController.addNews);
app.get('/:filename', masterController.getFile);
app.post('/send-email', masterController.sendEmail);
app.get('/search/:best', masterController.search.report);


//маршрутизация API запросов
app.get('/v1/search/company/:amount/:page/:sort/:sector/:size_of_company/:city/:search', masterController.API.search.company);
app.get('/v1/stats/:sector/:standart/:size_of_company/:type_of_ownership', masterController.API.stats);
app.get('/v1/search/report/:amount/:page/:sort/:sector/:size_of_company/:city/:year/:opf/:type_of_ownership/:standarts/:best/:search',
    masterController.API.search.report);
app.get('/v1/static/:name', masterController.API.static);

module.exports = app;