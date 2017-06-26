(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', 'myConfig', '$state', '$cordovaEmailComposer', '$cordovaToast', 'App', '$cordovaSocialSharing'];

    function AppCtrl($scope, myConfig, $state, $cordovaEmailComposer, $cordovaToast, App, $cordovaSocialSharing) {
        $scope.nome = myConfig.nome;
        $scope.cidade = myConfig.cidade;

        $scope.openEmail = function() {
            $cordovaEmailComposer.isAvailable(
                function (isAvailable) {

                    if(isAvailable){
                        $cordovaEmailComposer.open({
                            to: 'contato@cartorioapp.com',
                            subject: 'Cartório App',
                            body: '',
                            isHtml:  true
                        });
                    } else {
                        $cordovaToast.showWithOptions({
                            message: 'Não foi detectado nenhum gerenciador de email configurado no dispositivo!',
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
                    }
                }
            );
        };

        $scope.openShare = function() {
            var message = "Conheça o " + $scope.nome + " - Cartório App. O aplicativo que facilita o acesso aos serviços no cartório.";
            $cordovaSocialSharing
                .share(message, null, null, 'www.cartorioapp.com')
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
        };

        $scope.logout = function() {
            App.clearData();
            $state.go('login');
        };

        $scope.openTermos = function() {
            $state.go('app.termos');
        };
    }
})();
