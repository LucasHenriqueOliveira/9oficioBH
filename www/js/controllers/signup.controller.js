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

      //$scope.errors = {};
      //if ($scope.signupData.password != $scope.signupData.confirm) {
      //  $scope.errors.confirm = true;
      //}
      //if (Object.keys($scope.errors).length) {
      //  return;
      //}
      //Auth.signupMailPrincess($scope.signupData.email, $scope.signupData.password);

    };

    $scope.signupFacebook = function () {
      Auth.signupFacebook();
    };

  }
})();
