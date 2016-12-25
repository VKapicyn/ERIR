var mongoose = require('mongoose');


var newsSchema = new mongoose.Schema({
    date: mongoose.Schema.Types.Date,
    header: String,
    link: String
})


var newsModel = mongoose.model('news', newsSchema);
module.exports.newsModel = newsModel;

exports.addNews = function (req, res){
    if (req.session.user){
        let news = new newsModel;

        news.date = new Date();
        news.header = req.body.header;
        console.log(req.body.header);
        news.link = req.body.link;

        news.save();
        res.redirect('/admin')
    }
    else
    {
        res.send('У Вас нет прав для данной операции');
    }
}