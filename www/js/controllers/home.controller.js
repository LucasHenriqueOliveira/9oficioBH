(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$state', '$scope', 'myConfig', '$log', 'App'];

  function HomeCtrl($state, $scope, myConfig, $log, App) {
    $scope.nome = myConfig.nome;
    $scope.cidade = myConfig.cidade;

    $scope.message = 'Verificando atualização';

    if (!!window.cordova && window.Ionic && (ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
      var deploy = new Ionic.Deploy();
      deploy.setChannel('production');
      $log.debug('Ionic Deploy: starting init');

      deploy.check().then(function (hasUpdate) {
        $log.debug('Ionic Deploy: Update available: ' + hasUpdate);

        if (hasUpdate) {
          $timeout(function() {
            deploy.update().then(function (res) {
              $log.debug('Ionic Deploy: Update Success! ', res);

            }, function (err) {
              $log.debug('Ionic Deploy: Update error! ', err);

            }, function (prog) {
              $log.debug('Ionic Deploy: Progress... ', prog);

            });
          }, 4000);
        } else {
          setTimeout(function(){
            if (!App.user) {
              $state.go('login');
            } else {
              $state.go('app.cartorio');
            }
          }, 500);
        }
      });
    } else {
      setTimeout(function(){
        if (!App.user) {
          $state.go('login');
        } else {
          $state.go('app.cartorio');
        }
      }, 500);
    }
  }
})();
