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
    var reports = {'y2009':0,'y2010':0, 'y2011':0, 'y2012':0, 'y2013':0, 'y2014':0, 'y2015':0, 'y2016':0};
    var url = getURL();

    $.getJSON(url, function(data){
        for (var key in data){
            console.log(data[key].year);
            switch(data[key].year){
                case '2009': reports.y2009++;
                    break;
                case '2010': reports.y2010++;
                    break;
                case '2011': reports.y2011++;
                    break;
                case '2012': reports.y2012++;
                    break;
                case '2013': reports.y2013++;
                    break;
                case '2014': reports.y2014++;
                    break;
                case '2015': reports.y2015++;
                    break;
                case '2016': reports.y2016++;
                    break;
            }
        }
    }).done(function(){
        var select = document.getElementsByName('diagram_type');
        select = select[0].options[select[0].selectedIndex].value;

        if(select=='0'){
            $( "#barchart" ).hide(); //скрыть гистограмму
            $( "#piechart" ).show(); //показать круговую диаграмму
            // Реализация круговой диаграммы
            $(document).ready(function () {
                // Build the chart
                Highcharts.chart('piechart', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Количество отчетов по годам'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y:1.f}</b>'
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
                        name: 'Количество',
                        colorByPoint: true,
                        data: [{
                            name: '2009',
                            y: reports.y2009
                        }, {
                            name: '2010',
                            y: reports.y2010,
                        }, {
                            name: '2011',
                            y: reports.y2011,
                        }, {
                            name: '2012',
                            y: reports.y2012,
                        }, {
                            name: '2013',
                            y: reports.y2013,
                        }, {
                            name: '2014',
                            y: reports.y2014,
                        },{
                            name: '2015',
                            y: reports.y2015,
                        },{
                            name: '2016',
                            y: reports.y2016,
                            sliced: true,
                            selected: true
                        }]
                    }]
                });
            });
        } 

        if(select=='1'){
            $( "#piechart" ).hide(); //скрыть круговую диаграмму
            $( "#barchart" ).show(); //показать гистограмму
            // Реализация гистаграммы
            $(document).ready(function () {
            // Create the chart
            Highcharts.chart('barchart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Количество отчетов по годам'
                },

                yAxis: {
                title: {
                    text: ' '
                }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                },

                series: [{
                    name: 'Количество',
                    colorByPoint: true,
                    data: [{
                        name: '2009',
                        y: reports.y2009
                    }, {
                        name: '2010',
                        y: reports.y2010
                    }, {
                        name: '2011',
                        y: reports.y2011
                    }, {
                        name: '2012',
                        y: reports.y2012
                    }, {
                        name: '2013',
                        y: reports.y2013
                    }, {
                        name: '2014',
                        y: reports.y2014
                    }, {
                        name: '2015',
                        y: reports.y2015
                    }, {
                        name: '2016',
                        y: reports.y2016
                    }]
                }],

            });
    });
                console.log('1');
        }
    });
}



$(function () {
    create();
});