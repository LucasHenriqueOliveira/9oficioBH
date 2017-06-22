(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('CadastrarCtrl', CadastrarCtrl);

  CadastrarCtrl.$inject = ['$scope', 'Auth', '$state', '$cordovaToast'];

  function CadastrarCtrl($scope, Auth, $state, $cordovaToast) {

    $scope.signupData = {};

    $scope.signupCartorio = function () {
      if($scope.signupData.password != $scope.signupData.confirma_senha) {
        $cordovaToast.showWithOptions({
          message: 'Senha e confirmação estão diferentes!',
          duration: 'short',
          position: 'center',
          styling: {
            opacity: 0.75,
            backgroundColor: '#FF0000',
            textColor: '#FFFF00',
            textSize: 20.5,
            cornerRadius: 16,
            horizontalPadding: 20,
            verticalPadding: 16
          }
        });
        return;
      }
      Auth.signup($scope.signupData);
    };

    $scope.signupFacebook = function () {
      Auth.signupFacebook();
    };

  }
})();
