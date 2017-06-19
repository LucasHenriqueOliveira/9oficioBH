(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('CadastrarCtrl', CadastrarCtrl);

  CadastrarCtrl.$inject = ['$scope', 'Auth', '$state'];

  function CadastrarCtrl($scope, Auth, $state) {

    $scope.signupData = {};

    $scope.signupMailPrincess = function () {
      $state.go('app.cartorio');
    };

    $scope.signupFacebook = function () {
      Auth.signupFacebook();
    };

  }
})();
