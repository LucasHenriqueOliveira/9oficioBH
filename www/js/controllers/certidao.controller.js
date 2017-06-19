(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('CertidaoCtrl', CertidaoCtrl);

  CertidaoCtrl.$inject = ['$scope', '$state'];

  function CertidaoCtrl($scope, $state) {
    $scope.certidaoEnviada = false;

    $scope.submit = function() {
      $scope.certidaoEnviada = true;
    };

    $scope.goBack = function() {
      $scope.certidaoEnviada = false;
      $state.go('app.cartorio');
    };
  }
})();
