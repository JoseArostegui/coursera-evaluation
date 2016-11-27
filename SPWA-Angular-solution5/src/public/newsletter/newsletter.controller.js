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

        $ctrl.getDataSaved = function () {
          if (NewsletterDataService.getUser()==undefined) {
            return false;
          } else {
            return true;
          }
        }
    }


})();
