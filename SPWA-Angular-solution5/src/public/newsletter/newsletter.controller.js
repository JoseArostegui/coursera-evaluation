(function() {
    "use strict";

    angular.module('restaurant')
        .controller('NewsletterController', NewsletterController);

    NewsletterController.$inject = ['NewsletterDataService'];

    function NewsletterController(NewsletterDataService) {
        var $ctrl = this;
        $ctrl.dishValid = "NO EVAL";

        $ctrl.validateDish = function(shortName, form) {
            if (shortName != undefined) {
                NewsletterDataService.getMenuItem(shortName).then(function(menuItem) {
                    form.fav.$setValidity('dishvalid', true);
                }).catch(function() {
                    form.fav.$setValidity('dishvalid', false);
                });
            };
        };

        $ctrl.submit = function() {
            NewsletterDataService.saveUser($ctrl.user);
        }

        $ctrl.getDataSaved = function() {
            if (NewsletterDataService.getUser() == undefined) {
                return false;
            } else {
                return true;
            }
        }
    }


})();
