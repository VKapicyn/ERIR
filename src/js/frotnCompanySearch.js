var sort = 'default';
var amount = 10;
var page = 1;
var size;

//при загрузке страницы вызываем поиск по умолчанию
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
            tableContent += '<a href="/company/'+data[key].name+'" title="Перейти на страницу компании">';
            tableContent += '<img src="'+data[key].logo+'" alt="logo">'+'&nbsp;'+data[key].name+'</a>';
            tableContent += '</div>';
            $('#o-view1').append(tableContent);

            tableContent = '';
            tableContent += '<tr class="output">';
            tableContent += '<td><a href="/company/'+data[key].name+'" title="Перейти на страницу компании">'+data[key].name+'</a></td>';
            tableContent += '<td>'+data[key].sector+'</td>';
            tableContent += '<td>'+data[key].size_of_company+'</td>';
            tableContent += '</tr>';
            $('#oo-view2').append(tableContent); 

            tableContent = '';
            tableContent += '<div class="element output">';
            tableContent += '<a href="/company/'+data[key].name+'" title="Перейти на страницу компании">';
            tableContent += '<img src="'+data[key].logo+'" alt="icon"></a>';
            tableContent += '</div>';
            $('#o-view3').append(tableContent);
            
            $('#o-view4').append(tableContent);
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
    let search = document.getElementById('search-input').value==''?'null':document.getElementById('search-input').value;
    let url = '/v1/search/company/'+amount+'/'+page+'/'+sort+'/'+sector+'/'+size_of_company+'/'+search;  

    return url;
}

function sortDefault(){
    sort = 'default';
    getSearchCompany();
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

function setPage(_page){
    page = _page;
    getSearchCompany();
}

function setAmount(_amount){
    amount = _amount;
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
    //придумать
}

function clear_params(){
    $("#economy option:contains('Отрасль экономики')").prop('selected', true);
    $("#company_size option:contains('Размер предприятия')").prop('selected', true);
    document.getElementById('search-input').value = '';
    sortDefault();
}