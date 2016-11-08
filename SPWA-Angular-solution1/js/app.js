(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope', '$filter'];
    function LunchCheckController($scope, $filter) {


        $scope.buttonCheck = function() {
            console.log("Dishes=" + $scope.allDishes);

            if ($scope.allDishes==undefined || $scope.allDishes.length==0){
               $scope.message = "Please enter the dishes in your menu separated by comma (empty commas will be ignored!)";
               $scope.messageStyle = "messageRed";
            } else {
              var plates = $scope.allDishes.split(',');
              $scope.message = "You have entered "+plates.length;
              //Empty spaces between commas will be ignored
              plates = plates.filter(function(n){ return n != undefined && n.trim()!= ""});

              $scope.message = "You have entered "+plates.length;

              if (plates.length>3) {
                $scope.message = "Too much!";
              } else {
                $scope.message = "Enjoy!";
              }
              $scope.messageStyle = "messageGreen";

            }
        }
    }

})();
