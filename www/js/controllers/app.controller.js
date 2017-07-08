(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', 'myConfig', '$state', 'App', '$cordovaSocialSharing'];

    function AppCtrl($scope, myConfig, $state, App, $cordovaSocialSharing) {
        $scope.nome = myConfig.nome;
        $scope.cidade = myConfig.cidade;
        $scope.site = myConfig.site;

        $scope.openEmail = function() {
            $state.go('app.contato');
        };

        $scope.openShare = function() {
            var message = "Conheça o " + $scope.nome + " - Cartório App. O aplicativo que facilita o acesso aos serviços no " + $scope.nome + " em " + $scope.cidade + ".";
            $cordovaSocialSharing
                .share(message, null, null, $scope.site)
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
        };

        $scope.logout = function() {
            App.clearData();
            App.user = false;
            App.token = null;
            $state.go('login');
        };

        $scope.openTermos = function() {
            $state.go('app.termos');
        };

        $scope.openConta = function() {
            $state.go('app.conta');
        };
    }
})();
