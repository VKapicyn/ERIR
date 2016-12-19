function getURL(callback){
    var standart = document.getElementsByName('standart');
        standart = standart[0].options[standart[0].selectedIndex].value;
    var sector = document.getElementsByName('economy');
        sector = sector[0].options[sector[0].selectedIndex].value;
    var size_of_company = document.getElementsByName('company_size');
        size_of_company = size_of_company[0].options[size_of_company[0].selectedIndex].value;
    var type_of_ownership = document.getElementsByName('ownership');
        type_of_ownership = type_of_ownership[0].options[type_of_ownership[0].selectedIndex].value;

    var url = '/v1/stats/'+sector+'/'+standart+'/'+size_of_company+'/'+type_of_ownership;
    console.log(url);
    return url;
}

function create(){
    // Статистика по годам
    var years = {'y2009':0,'y2010':0, 'y2011':0, 'y2012':0, 'y2013':0, 'y2014':0, 'y2015':0, 'y2016':0};
    var url = getURL();

    $.getJSON(url, function(data){
        for (var key in data){
            console.log(data[key].name);
            var tableContent = '';

            //переделать оба пункат с учетом синхронности
            $.each(data, function(){
                tableContent += '<br>';
                tableContent += '<td>' + data[key].name + '</td>';
                tableContent += '</br>';
            });
            $('#test_rest').html(tableContent);
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
        /*пример переобра значений по годам
        for( var y in years)
        console.log(years[y]);*/

        var select = document.getElementsByName('diagram_type');
        select = select[0].options[select[0].selectedIndex].value;

        if(select=='0'){
            // Реализация круговой диаграммы
            console.log('0');
        } 
        if(select=='1'){
                // Реализация гистаграммы
                console.log('1');
        }
    });
}

$(function () {

    $(document).ready(function () {

        // Build the chart
        Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares January, 2015 to May, 2015'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Microsoft Internet Explorer',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2
                }]
            }]
        });
    });
});