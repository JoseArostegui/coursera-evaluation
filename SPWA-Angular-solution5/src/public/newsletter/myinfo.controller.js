(function() {
    "use strict";

    angular.module('restaurant')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['NewsletterDataService', 'ApiPath'];

    function MyInfoController(NewsletterDataService, ApiPath) {
        var $ctrl = this;
        $ctrl.user = NewsletterDataService.getUser();

        if ($ctrl.user != undefined && $ctrl.user.fav != undefined && $ctrl.user.fav != "") {
            NewsletterDataService.getMenuItem($ctrl.user.fav).then(function(menuItem) {
                $ctrl.menuItem = menuItem;
                $ctrl.basePath = ApiPath;

            }).catch(function() {
                console.log("Dish not found!");
            });
        }

        function getFavourite(shortName) {
            $ctrl.menuItem = NewsletterDataService.getFavourite(shortName);
        }


    };


})();
