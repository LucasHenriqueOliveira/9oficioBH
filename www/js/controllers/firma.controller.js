(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('FirmaCtrl', FirmaCtrl);

  FirmaCtrl.$inject = ['$scope', '$state'];

  function FirmaCtrl($scope, $state) {
    $scope.pesquisaFirma = false;

    $scope.submit = function() {
      $scope.pesquisaFirma = true;
    };

    $scope.goBack = function() {
      $scope.pesquisaFirma = false;
      $state.go('app.cartorio');
    };
  }
})();
