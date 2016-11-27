(function() {
    "use strict";

    angular.module('restaurant')
        .controller('NewsletterController', NewsletterController);

    NewsletterController.$inject = ['NewsletterDataService'];

    function NewsletterController(NewsletterDataService) {
        var $ctrl = this;
        $ctrl.dishValid = "NO EVAL";

        $ctrl.submit = function() {
            console.log("USER SUBMITED:");
            console.log($ctrl.user);
            NewsletterDataService.saveUser($ctrl.user);
            NewsletterDataService.getUser();
        }

        $ctrl.getValidationStatus = function(form) {
            var result = 200;
            if (form != undefined) {
                result = NewsletterDataService.getValidationStatus();
                if (result == 200) {
                    form.fav.$setValidity('notexists', true);
                } else {
                    form.fav.$setValidity('notexists', false);
                }

            }
            return result;
        }

        $ctrl.validateDish = function(form) {
            // console.log("Logging email");
            // console.log(form.email);
            if ($ctrl.user != undefined && $ctrl.user.fav != undefined) {
                console.log('Validating Dish', $ctrl.user.fav);
                NewsletterDataService.validateShortName($ctrl.user.fav);
            }
            //console.log('Validating KK1=');
            //console.log(NewsletterDataService.validateShortName('KK1'));
        }
    }


})();
