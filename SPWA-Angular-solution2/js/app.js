(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.list = ShoppingListCheckOffService.getToBuyList();

        toBuy.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var already = this;

        already.list = ShoppingListCheckOffService.getAlredyBoughtList();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        //Both list of items
        var toBuy = [{
            name: "Cookies",
            quantity: "2 bags"
        }, {
            name: "Screwdriver",
            quantity: "10 units"
        }, {
            name: "Car",
            quantity: "4 units"
        }];
        var already = [];

        service.getToBuyList = function() {
            return toBuy;
        };

        service.getAlredyBoughtList = function() {
            return already;
        };

        service.buyItem = function(itemIndex) {
            already.push(toBuy[itemIndex]);
            toBuy.splice(itemIndex, 1);
        };
    }
})();
