exports.mainPage = function (req, res){
  res.render('main', { title: 'Главная', message: 'Здесь главная!'});
};
