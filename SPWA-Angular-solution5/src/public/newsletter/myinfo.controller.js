(function() {
    "use strict";

    angular.module('restaurant')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['NewsletterDataService'];

    function MyInfoController(NewsletterDataService) {
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
