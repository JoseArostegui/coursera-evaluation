(function() {
    "use strict";

    angular.module('restaurant')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['NewsletterDataService', 'ApiPath'];

    function MyInfoController(NewsletterDataService, ApiPath) {
        var $ctrl = this;
        console.log("EN MyInfoController");
        $ctrl.user = NewsletterDataService.getUser();
        console.log($ctrl.user);
        if ($ctrl.user != undefined) {
            console.log("$ctrl.menuItem AA");
            //$ctrl.menuItem = NewsletterDataService.getFavourite($ctrl.user.fav);

            NewsletterDataService.getMenuItem($ctrl.user.fav).then(function(menuItem) {
                console.log(menuItem);
                $ctrl.menuItem = menuItem;
                $ctrl.basePath = ApiPath;

            }).catch(function() {
                console.log("Dish not found!");
            });


            console.log($ctrl.menuItem);
        }

        function getFavourite(shortName) {
            $ctrl.menuItem = NewsletterDataService.getFavourite(shortName);
        }


    };


})();
