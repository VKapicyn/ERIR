var sort = 'default';
var amount = 10;
var page = 1;
var size = 0;

(function defaultStart(){
    sortDefault();
})();

function getSearchCompany(){
    //удаление предыдущего вывода
    $('.output').remove();

    let url = getURL();

    console.log(url);

        let i = 0;
    $.getJSON(url, function(data){
        //добавляем найденные элементы
        for (let key in data){
            if(data[key].key == 'size'){
                size = data[key].size;
                continue;
            }
            let tableContent = '';         
            tableContent += '<div class="element output">';
            tableContent += '<a href="/report/'+data[key]._id+'" title="Перейти на страницу отчета">';
            tableContent += '<img src="'+data[key].preview+'" alt="logo">'+'&nbsp;'+data[key].name +' - '+data[key].year+'</a>';
            tableContent += '</div>';
            $('#view1').append(tableContent);

            tableContent = '';
            tableContent += '<tr class="output">';
            tableContent += '<td><a href="/company/'+data[key].company_id+'" title="Перейти на страницу компании">'+data[key].company+'</a></td>';
            tableContent += '<td><a href="/report/'+data[key]._id+'" title="Перейти на страницу отчета">'+data[key].name+'</a></td>';
            tableContent += '<td>'+data[key].year+'</td>';
            tableContent += '<td>'+data[key].standarts+'</td>';
            tableContent += '</tr>';
            $('#r-view2').append(tableContent); 

            tableContent = '';
            tableContent += '<div class="element output">';
            tableContent += '<a href="/report/'+data[key]._id+'" title="Перейти на страницу отчета">';
            tableContent += '<img src="'+data[key].preview+'" alt="icon"></a>';
            tableContent += '</div>';
            $('#view3').append(tableContent);
            
            $('#view4').append(tableContent);
            i++;
        }
    }).done(function(){
        console.log(i);
        let tableContent = '<span class="output">';
        if (page>1){
            tableContent +=  '<a href="#" onclick="startPage()">'+'<<&nbsp;&nbsp;'+'</a>';   
            tableContent +=  '<a href="#" onclick="prevPage()">'+'Назад'+'</a>';
        }
        tableContent +=  '<span style="color:brown">&nbsp;'+page+'&nbsp;</span>';
        if (amount<=i){   
            tableContent +=  '<a href="#" onclick="nextPage()">'+'Вперед'+'</a>';
            tableContent +=  '<a href="#" onclick="endPage()">'+'&nbsp;&nbsp;>>'+'</a>';
        } 
        tableContent += '</span>';
        $('#pagination').append(tableContent);
    });
}

function getURL(){  
    let sector = document.getElementsByName('economy');
        sector = sector[0].options[sector[0].selectedIndex].value;
    let size_of_company = document.getElementsByName('company_size');
        size_of_company = size_of_company[0].options[size_of_company[0].selectedIndex].value;
    let city = document.getElementsByName('city');
        city = city[0].options[city[0].selectedIndex].value;
    let year = document.getElementsByName('report_year');
        year = year[0].options[year[0].selectedIndex].value;
    let opf = document.getElementsByName('organization_form');
        opf = opf[0].options[opf[0].selectedIndex].value;
    let type_of_ownership = document.getElementsByName('ownership');
        type_of_ownership = type_of_ownership[0].options[type_of_ownership[0].selectedIndex].value;
    let standarts = getStandarts();
    let best = getBest();
    let search = document.getElementById('search-input').value==''?'null':document.getElementById('search-input').value;
    let url = '/v1/search/report/'+amount+'/'+page+'/'+sort+'/'+sector+'/'+size_of_company+'/'+city+'/'+year+'/'+opf+'/'+type_of_ownership+'/'+standarts+'/'+best+'/'+search;  

    return url;
}

function sortDefault(){
    sort = 'default';
    page = 1;
    getSearchCompany();
}

function getStandarts(){
    let mass = '';
    $.ajax({url:'/v1/static/standarts', async:false, type: 'GET', 
        success: function(result){
            for(let i in result){
                if (document.getElementById(result[i]).value==result[i] &&
                document.getElementById(result[i]).checked == true)
                    mass += result[i] + ';';
            }
        }
    });

    if (mass != '')
        return mass;
    else
        return 'standarts';
}

function getBest(){
    let mass = '';
    $.ajax({url:'/v1/static/best', async:false, type: 'GET', 
        success: function(result){
            for(let i in result){
                if (document.getElementById(result[i]).value==result[i] &&
                document.getElementById(result[i]).checked == true)
                    mass += result[i] + ';';
            }
        }
    });
    
    if (mass != '')
        return mass;
    else
        return 'best';
}

function sortName(){
    sort = 'name';
    getSearchCompany();
}

function sortSector(){
    sort = 'sector';
    getSearchCompany();
}

function sortSize(){
    sort = 'size_of_company';
    getSearchCompany();
}

function sortYear(){
    sort = 'year';
    getSearchCompany();
}

function setPage(_page){
    page = _page;
    getSearchCompany();
}

function setAmount(_amount){
    amount = _amount;
    page = 1
    getSearchCompany();
}

function nextPage(){
    page++;
    getSearchCompany();
}

function prevPage(){
    page--;
    getSearchCompany();
}

function startPage(){
    page = 1;
    getSearchCompany();
}

function endPage(){
    page = Math.ceil(size/amount);
    getSearchCompany();
}

function clear_params(){
    $("#economy option:contains('Отрасль экономики')").prop('selected', true);
    $("#company_size option:contains('Размер предприятия')").prop('selected', true);
    $("#report_year option:contains('Отчетный год')").prop('selected', true);
    $("#city option:contains('Местонахождение штаб-квартиры')").prop('selected', true);
    $("#organization_form option:contains('Организационно-правовая форма')").prop('selected', true);
    $("#ownership option:contains('Форма собственности')").prop('selected', true);
    document.getElementById('search-input').value = '';
    $.ajax({url:'/v1/static/best', async:false, type: 'GET', 
        success: function(result){
            for(let i in result)
                document.getElementById(result[i]).checked = false
        }
    });
        $.ajax({url:'/v1/static/standarts', async:false, type: 'GET', 
        success: function(result){
            for(let i in result)
                document.getElementById(result[i]).checked = false
        }
    });
    sortDefault();
}