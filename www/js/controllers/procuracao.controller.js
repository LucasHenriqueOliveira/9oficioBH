(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('ProcuracaoCtrl', ProcuracaoCtrl);

  ProcuracaoCtrl.$inject = ['$scope', '$state'];

  function ProcuracaoCtrl($scope, $state) {
    $scope.title = 'Procuração';
    $scope.casamento = false;
    $scope.agendamentoConfirmado = false;

    $scope.submit = function() {
      $scope.agendamentoConfirmado = true;
    };

    $scope.goBack = function() {
      $state.go('app.cartorio');
    };
  }
})();
