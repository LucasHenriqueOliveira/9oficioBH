(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('CartorioCtrl', CartorioCtrl);

  CartorioCtrl.$inject = ['$scope', 'myConfig'];

  function CartorioCtrl($scope, myConfig) {
    $scope.user = myConfig.user;
  }
})();
