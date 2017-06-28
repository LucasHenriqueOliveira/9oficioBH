(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('ProcuracaoCtrl', ProcuracaoCtrl);

    ProcuracaoCtrl.$inject = ['$scope', '$state', 'myConfig', 'DataService', '$cordovaToast', 'Procuracao', '$ionicPopup', '$cordovaCamera'];

    function ProcuracaoCtrl($scope, $state, myConfig, DataService, $cordovaToast, Procuracao, $ionicPopup, $cordovaCamera) {
        $scope.casamento = false;
        $scope.agendamentoConfirmado = false;
        $scope.cartorio = {
            nome: myConfig.nome,
            cidade: myConfig.cidade,
            telefone: myConfig.telefone
        };

        DataService.tiposProcuracao().then(function(res) {
            $scope.tipos_procuracao = res;
        }, function (error) {
            $cordovaToast.showWithOptions({
                message: 'Erro ao buscar os tipos de procuração!',
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
        });

        $scope.getDocumentos = function(tipo) {
            DataService.getDocumentos({id: tipo.tipo_procuracao_id}).then(function(res) {
                $scope.documentos = res;
            }, function (error) {
                $cordovaToast.showWithOptions({
                    message: 'Erro ao buscar os documentos do tipo de procuração!',
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
            });
        };

        $scope.submit = function() {
            Procuracao.save($scope.procuracao, function (res) {
                $scope.agendamentoConfirmado = true;
            }, function (error) {
                $cordovaToast.showWithOptions({
                    message: 'Erro ao solicitar a procuração!',
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
            });
        };

        $scope.goBack = function() {
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
