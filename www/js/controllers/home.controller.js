(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$state', '$scope', 'myConfig'];

  function HomeCtrl($state, $scope, myConfig) {
    $scope.nome = myConfig.nome;
    $scope.cidade = myConfig.cidade;

    setTimeout(function(){
      $state.go('login');
    }, 3000);

    //$scope.message = 'Verificando nova versão';
    //
    //if (!!window.cordova && window.Ionic && (ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
    //  var deploy = new Ionic.Deploy();
    //  deploy.setChannel('production');
    //  $log.debug('Ionic Deploy: starting init');
    //
    //  deploy.check().then(function (hasUpdate) {
    //    $log.debug('Ionic Deploy: Update available: ' + hasUpdate);
    //
    //    if (hasUpdate) {
    //      $timeout(function() {
    //        deploy.update().then(function (res) {
    //          $log.debug('Ionic Deploy: Update Success! ', res);
    //
    //        }, function (err) {
    //          $log.debug('Ionic Deploy: Update error! ', err);
    //
    //        }, function (prog) {
    //          $log.debug('Ionic Deploy: Progress... ', prog);
    //
    //        });
    //      }, 4000);
    //    } else {
    //      setTimeout(function(){
    //        if (!App.user) {
    //          $state.go('splash');
    //        } else {
    //          Payment.get({}, function (payment) {
    //            if(payment.status){
    //              $state.go('tab.send');
    //            } else {
    //              App.setCurrentBank(payment);
    //              $state.go('tab.banks-detail', {bank: payment.id});
    //            }
    //          });
    //        }
    //      }, 500);
    //    }
    //  });
    //} else {
    //  setTimeout(function(){
    //    if (!App.user) {
    //      $state.go('splash');
    //    } else {
    //      Payment.get({}, function (payment) {
    //        if(payment.status){
    //          $state.go('tab.send');
    //        } else {
    //          App.setCurrentBank(payment);
    //          $state.go('tab.banks-detail', {bank: payment.id});
    //        }
    //      });
    //    }
    //  }, 500);
    //}
  }
})();
