(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('ContatoCtrl', ContatoCtrl);

    ContatoCtrl.$inject = ['$scope', '$cordovaEmailComposer', '$cordovaToast', 'myConfig'];

    function ContatoCtrl($scope, $cordovaEmailComposer, $cordovaToast, myConfig) {
        $scope.nome = myConfig.nome;
        $scope.cidade = myConfig.cidade;
        $scope.telefone = myConfig.telefone;
        $scope.endereco = myConfig.endereco;

        $scope.openEmail = function() {
            cordova.plugins.email.isAvailable(
                function (isAvailable) {

                    if(isAvailable){
                        cordova.plugins.email.open({
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
                                textColor: '#FFFFFF',
                                textSize: 16,
                                cornerRadius: 16,
                                horizontalPadding: 20,
                                verticalPadding: 16
                            }
                        });
                    }
                }
            );
        };
    }
})();
