(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$state', '$scope', 'myConfig', '$log', 'App', '$ionicDeploy', '$timeout', '$localStorage'];

    function HomeCtrl($state, $scope, myConfig, $log, App, $ionicDeploy, $timeout, $localStorage) {
        $scope.nome = myConfig.nome;
        $scope.cidade = myConfig.cidade;

        $scope.message = 'Verificando atualização';

        if (!!window.cordova && window.Ionic && (ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
            $ionicDeploy.channel = 'production';
            $log.debug('Ionic Deploy: starting init');

            $ionicDeploy.check().then(function (hasUpdate) {
                $log.debug('Ionic Deploy: Update available: ' + hasUpdate);

                if (hasUpdate) {
                    $timeout(function() {
                        $ionicDeploy.download().then(function() {
                            $ionicDeploy.extract().then(function() {
                                // Load the updated version
                                $ionicDeploy.load();
                            }, function(error) {
                                console.log('Ionic Deploy Extract Error.');
                                console.log(error);
                                // Error extracting
                            }, function(progress) {
                                // Do something with the zip extraction progress
                                console.log(progress);
                            });
                        });
                    }, 4000);
                } else {
                    setTimeout(function(){
                        if (!App.user && isEmpty($localStorage.getObject('user'))) {
                            $state.go('login');
                        } else {
                            $state.go('app.cartorio');
                        }
                    }, 500);
                }
            });
        } else {
            setTimeout(function(){
                if (!App.user && isEmpty($localStorage.getObject('user'))) {
                    $state.go('login');
                } else {
                    $state.go('app.cartorio');
                }
            }, 500);
        }
    }
})();
