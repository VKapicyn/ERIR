//http://angular-ui.github.io/ui-select/demo-basic.html
'use strict';
var app = angular.module('livesearch', ['ngSanitize', 'ui.select']);
app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

app.controller('LivesearchCtrl', function ($scope, $http, $timeout, $interval) {
  var vm = this;

  vm.disabled = undefined;
  vm.searchEnabled = undefined;

  vm.setInputFocus = function (){
    $scope.$broadcast('UiSelectLivesearch1');
  };

  vm.enable = function() {
    vm.disabled = false;
  };

  vm.disable = function() {
    vm.disabled = true;
  };

  vm.enableSearch = function() {
    vm.searchEnabled = true;
  };

  vm.disableSearch = function() {
    vm.searchEnabled = false;
  };

  vm.clear = function() {
    vm.company.selected = undefined;
  };

  vm.company = {};
  vm.companies = [ 
    {name: 'ACompany1'},
    {name: 'BCompany2'},
    {name: 'CCompany3'},
    {name: 'DCompany4'},
    {name: 'ECompany5'},
    {name: 'FCompany6'},
  ];  

  vm.year = {};
  vm.years = [ 
    {val: '2009'},
    {val: '2010'},
    {val: '2011'},
    {val: '2012'},
    {val: '2013'},
    {val: '2014'},
    {val: '2015'},
    {val: '2016'},
  ];
});
