(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('TestamentoCtrl', TestamentoCtrl);

  TestamentoCtrl.$inject = ['$scope', '$state'];

  function TestamentoCtrl($scope, $state) {
    $scope.title = 'Testamento';
    $scope.casamento = true;
    $scope.agendamentoConfirmado = false;

    $scope.submit = function() {
      $scope.agendamentoConfirmado = true;
    };

    $scope.goBack = function() {
      $state.go('app.cartorio');
    };
  }
})();
