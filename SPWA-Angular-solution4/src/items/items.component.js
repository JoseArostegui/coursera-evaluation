(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/items/items.html',
  bindings: {
    itemsList: '<'
  }
});


})();
