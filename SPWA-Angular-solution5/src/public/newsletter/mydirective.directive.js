(function() {
    "use strict";

    angular.module('restaurant')
        .directive('myDirective', myDirective);

    myDirective.$inject = ['NewsletterDataService'];

    function myDirective(NewsletterDataService) {
        return {
            require: 'ngModel',
            link: function(scope, element, attr, mCtrl) {
                function myValidation(value) {
                    var promise = NewsletterDataService.validateShortName(value);
                    promise.then(function(r) {
                        mCtrl.$setValidity('dishvalid', true);
                    }).catch(function(e) {
                        mCtrl.$setValidity('dishvalid', false);
                    });

                    return value;
                }
                mCtrl.$parsers.push(myValidation);
            }
        };
    };
})();
