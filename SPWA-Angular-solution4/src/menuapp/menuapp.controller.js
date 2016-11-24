
(function () {
'use strict';

/**
 * Main application module. Includes the data module and ui-router.
 */
angular.module('MenuApp')
.controller ('MenuAppController', MenuAppController);

MenuAppController.$inject = ['MenuDataService'];
function MenuAppController(MenuDataService) {
   var controller = this;   
}

})();
