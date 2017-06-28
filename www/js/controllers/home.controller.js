(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$state', '$scope', 'myConfig', '$log', 'App', '$ionicDeploy', '$timeout'];

    function HomeCtrl($state, $scope, myConfig, $log, App, $ionicDeploy, $timeout) {
        $scope.nome = myConfig.nome;
        $scope.cidade = myConfig.cidade;

        $scope.message = 'Verificando atualização';

        $state.go('login');
        return;

        if (!!window.cordova && window.Ionic && (ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
            $ionicDeploy.channel = 'production';
            $log.debug('Ionic Deploy: starting init');

            $ionicDeploy.check().then(function (hasUpdate) {
                $log.debug('Ionic Deploy: Update available: ' + hasUpdate);

                if (hasUpdate) {
                    $timeout(function() {
                        $ionicDeploy.download().then(function() {
                            return $ionicDeploy.extract();
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
