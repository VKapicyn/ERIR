var mongoose = require('mongoose');


var staticSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId, 
    name : String,
    mass: [String]
});

var getStatic = function (callback){
    staticModel.find({}, function (err, docs){}).then(function(result){
        function parse (result){
        var i;
        var stat = {};
        for(i=0; i<result.length; i++){
            switch(result[i].name){
                case 'sector': stat.sector = result[i].mass;
                    break;
                case 'opf': stat.opf = result[i].mass;
                    break;
                case 'size_of_company': stat.size_of_company = result[i].mass;
                    break;
                case 'type_of_ownership': stat.type_of_ownership = result[i].mass;
                    break;
                case 'year': stat.year = result[i].mass;
                    break;
                }
            }
        return stat;
        }
        callback(result, parse);
    });
};


var staticModel = mongoose.model('static', staticSchema);
module.exports.staticModel = staticModel;
module.exports.getStatic = getStatic;