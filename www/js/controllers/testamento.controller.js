(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('TestamentoCtrl', TestamentoCtrl);

  TestamentoCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$cordovaCamera'];

  function TestamentoCtrl($scope, $state, $ionicPopup, $cordovaCamera) {
    $scope.title = 'Testamento';
    $scope.casamento = true;
    $scope.agendamentoConfirmado = false;

    $scope.submit = function() {
      $scope.agendamentoConfirmado = true;
    };

    $scope.goBack = function() {
      $scope.agendamentoConfirmado = false;
      $state.go('app.cartorio');
    };

    $scope.sendFile = function() {
      var options = {
         quality : 75
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var imageEncode = "data:image/jpeg;base64," + imageData;
        var alertPopup = $ionicPopup.alert({
          title: 'Foto',
          template: 'Enviada com sucesso.'
        });
      }, function(err) {
        // error
      });
    };
  }
})();
