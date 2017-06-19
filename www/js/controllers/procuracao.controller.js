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
      $scope.agendamentoConfirmado = false;
      $state.go('app.cartorio');
    };

    $scope.sendFile = function() {
      var options = {
         quality : 75
      };

      navigator.camera.getPicture(options).then(function(imageData) {
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
