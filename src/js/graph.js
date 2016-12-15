function create(){
    // Статистика по годам
    var years = {'y2009':0,'y2010':0, 'y2011':0, 'y2012':0, 'y2013':0, 'y2014':0, 'y2015':0, 'y2016':0};

    var url='/v1/stats';

    $.getJSON(url, function(data){
        for (var key in data){
            switch(data[key].year){
                case '2009': years.y2009++;
                    break;
                case '2010': years.y2010++;
                    break;
                case '2011': years.y2011++;
                    break;
                case '2012': years.y2012++;
                    break;
                case '2013': years.y2013++;
                    break;
                case '2014': years.y2014++;
                    break;
                case '2015': years.y2015++;
                    break;
                case '2016': years.y2016++;
                    break;
            }
        }
    }).done(function(){
        // Реализация графика здесь
    });
}