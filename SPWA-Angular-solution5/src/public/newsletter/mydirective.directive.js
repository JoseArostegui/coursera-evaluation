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
                    console.log("promise");
                    console.log(promise);
                    promise.then(function (r) {
                     console.log("OKKKK");
                      console.log(r);
                      mCtrl.$setValidity('charE', true);
                    }).catch (function (e) {
                      console.log("EEERRORRR");
                      console.log(e);
                      mCtrl.$setValidity('charE', false);
                    });

                    // if (value.indexOf("e") > -1) {
                    //     mCtrl.$setValidity('charE', true);
                    // } else {
                    //     mCtrl.$setValidity('charE', false);
                    // }
                    return value;
                }
                mCtrl.$parsers.push(myValidation);
            }
        };
    };
})();
