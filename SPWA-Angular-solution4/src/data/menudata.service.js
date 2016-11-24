(function () {
"use strict";

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiPath'];
function MenuDataService($http, ApiPath) {
  var service = this;

  service.getAllCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getItemsForCategory = function (categoryShortName) {
    var config = {};
    if (categoryShortName) {
      config.params = {'category': categoryShortName};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

}



})();
