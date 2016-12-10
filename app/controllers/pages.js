exports.GeneralPage = function (req, res) {
  res.render('main', { title: 'Главная', message: 'Здесь главная!'})
};

//exports.SearchPage = function (req, res) {
//  res.render('search')
//};

exports.StatsPage = function (req, res) {
  res.render('stats')
};

//exports.RegistrCompany = function (req, res) {
//  res.render('register-company')
//};

exports.RegistrReport = function (req, res) {
  res.render('register-report')
};

exports.AdminPage = function (req, res) {
  res.render('admin')
};


