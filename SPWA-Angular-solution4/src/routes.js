(function() {
    'use strict';

    angular.module('MenuApp')
        .config(routeConfig);

    /**
     * Configures the routes and views
     */
    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        //Redirect to home if no other URL matches
        $urlRouterProvider.otherwise('/');

        // Routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/categories/our_categories.html',
                controller: 'CategoriesController',
                controllerAs: 'catCrtl',
                resolve: {
                    menuCategories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{catSelected}',
                templateUrl: 'src/items/our_items.html',
                controller: 'ItemsController as itemCtrl',
                resolve: {
                    items: ['$stateParams', 'MenuDataService',
                        function($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.catSelected);
                        }
                    ]
                }
            });
    }
})();
