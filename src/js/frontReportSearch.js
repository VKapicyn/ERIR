var sort = 'default';
var amount = 10;
var page = 1;
var size = 0;

(function defaultStart(){
    sortDefault();
})();

function getSearchCompany(){
    let url = getURL();

    console.log(url);
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
    return 'standarts';
}

function getBest(){
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