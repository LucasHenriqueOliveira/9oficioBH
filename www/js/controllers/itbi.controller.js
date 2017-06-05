(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('ItbiCtrl', ItbiCtrl);

  ItbiCtrl.$inject = ['$scope', '$state'];

  function ItbiCtrl($scope, $state) {
    $scope.pesquisaITBI = false;
    $scope.itbi = 0;
    $scope.valor_imovel = '';

    $scope.submit = function(valor) {
      $scope.pesquisaITBI = true;
      $scope.itbi = (valor * 3/100).toFixed(2);
    };

    $scope.goBack = function() {
      $state.go('app.cartorio');
    };
  }
})();
