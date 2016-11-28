(function() {
    "use strict";

    angular.module('restaurant')
        .service('NewsletterDataService', NewsletterDataService);

    NewsletterDataService.$inject = ['$http', 'ApiPath', '$q'];

    function NewsletterDataService($http, ApiPath, $q) {
        var service = this;
        var userLogged = {};
        service.menuItem = null;

        service.saveUser = function(user) {            
            service.userLogged = user;
        }

        service.getUser = function() {
            return service.userLogged;
        }

        service.validateShortName = function(shortName) {
            if (shortName == "") {
                //We return an empty true promise, because no parameter was specified
                return $q.resolve(true);
            }
            return $http.get(ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json');
        }
        service.getMenuItem = function(shortName) {
            if (shortName == "") {
                return null;
            }
            return $http.get(ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json').then(function (response) {
              return response.data;
            });
        }

        service.getAllCategories = function() {
            return $http.get(ApiPath + '/categories.json').then(function(response) {
                return response.data;
            });
        };


        service.getItemsForCategory = function(categoryShortName) {
            var config = {};
            if (categoryShortName) {
                config.params = {
                    'category': categoryShortName
                };
            }

            return $http.get(ApiPath + '/menu_items.json', config).then(function(response) {
                return response.data;
            });
        };

    }



})();
