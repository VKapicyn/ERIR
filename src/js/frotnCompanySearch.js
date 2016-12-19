var sort = 'default';

//при загрузке страницы вызываем поиск по умолчанию
(function defaultStart(){
    sortDefault();
})();

function getSearchCompany(){
    //удаление предыдущего вывода
    $('.output').remove();

    let url = getURL();

    console.log(url);

    $.getJSON(url, function(data){
        //добавляем найденные элементы
        for (let key in data){
            let tableContent='';         
            tableContent += '<div class="element output">';
            tableContent += '<a href="/company/'+data[key].name+'" title="Перейти на страницу компании">';
            tableContent += '<img src="'+data[key].logo+'" alt="logo">'+'&nbsp;'+data[key].name+'</a>';
            tableContent += '</div>';
            $('#o-view1').append(tableContent);

            tableContent='';
            tableContent += '<tr class="output">';
            tableContent += '<td><a href="/company/'+data[key].name+'" title="Перейти на страницу компании">'+data[key].name+'</a></td>';
            tableContent += '<td>'+data[key].sector+'</td>';
            tableContent += '<td>'+data[key].size_of_company+'</td>';
            tableContent += '</tr>';
            $('#oo-view2').append(tableContent); 

            tableContent='';
            tableContent += '<div class="element output">';
            tableContent += '<a href="/company/'+data[key].name+'" title="Перейти на страницу компании">';
            tableContent += '<img src="'+data[key].logo+'" alt="icon"></a>';
            tableContent += '</div>';
            $('#o-view3').append(tableContent);
            
            $('#o-view4').append(tableContent);
        }
    });
}

function getURL(){
    let sector = document.getElementsByName('economy');
        sector = sector[0].options[sector[0].selectedIndex].value;
    let size_of_company = document.getElementsByName('company_size');
        size_of_company = size_of_company[0].options[size_of_company[0].selectedIndex].value;
    let page = getPage();
    let amount = getAmount();
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

function getPage(){
    //узнаем какая страница запрошена
    return 1;
}

function getAmount(){
    //узнаем сколько компаний выводить
    return 15;
}

function clear_params(){
    $("#economy option:contains('Отрасль экономики')").prop('selected', true);
    $("#company_size option:contains('Размер предприятия')").prop('selected', true);
    document.getElementById('search-input').value = '';
    sortDefault();
}