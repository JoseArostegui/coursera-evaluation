(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItems);

        function FoundItems() {
          var ddo = {
            restrict: "E",
            templateUrl: 'shoppingList.html',
            scope: {
              foundItems: '<',
              onRemove: '&'
            }
          };

          return ddo;
        }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrow = this;
        narrow.searchTerm = "";

        narrow.doSearch = function() {
            var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

            promise.then(function(response) {
                narrow.items = response;
            }).catch(function(error) {
                console.log(error);
            })
        }

        narrow.removeItem = function (index) {
          MenuSearchService.removeItem(index);
        };
    }


    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var foundItems = [];
        console.clear();

        service.removeItem = function (index) {
          foundItems.splice(index, 1);
        }

        service.getMatchedMenuItems = function(searchTerm) {

            return $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json"),
                }).then(function(result) {
                   foundItems = [];

                    for (var i = 0; i < result.data.menu_items.length; i++) {
                        var description = result.data.menu_items[i].description;
                        if (description.toLowerCase().indexOf(searchTerm) !== -1) {
                            foundItems.push({
                                name: result.data.menu_items[i].name,
                                description: result.data.menu_items[i].description
                            });
                        }
                    }
                    return foundItems;
                })
                .catch(function(error) {
                    console.log(error);
                })
        };

    }

})();
