(function() {
    "use strict";

    angular.module('restaurant')
        .service('NewsletterDataService', NewsletterDataService);

    NewsletterDataService.$inject = ['$http', 'ApiPath', '$q'];

    function NewsletterDataService($http, ApiPath, $q) {
        var service = this;
        var userLogged = {};
        service.dishValidation = "NO EVAL";

        service.saveUser = function(user) {
            console.log("Save User");
            service.userLogged = user;
        }

        service.getUser = function() {
            console.log("Get User");
            console.log(service.userLogged);
            return service.userLogged;
        }
        service.getValidationStatus = function () {
          return service.dishValidation;
        }
        service.validateShortName = function(shortName) {

            // return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function(response) {
            //     console.log("Success logging response");
            //     console.log(response);
            //     console.log(response.status);
            //     service.dishValidation = response.status
            // }).catch(function(error) {
            //      console.log("Error logging error");
            //      console.log(error)
            //      service.dishValidation = 500;
            //  })
     console.log("EN el servicio");
     console.log(shortName);
            if (shortName=="") {
              //We return an empty true promise, because no parameter was specified
              return $q.resolve( true );
            }
            return $http.get(ApiPath + '/menu_items/' + shortName + '.json');
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
