(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('ProcuracaoCtrl', ProcuracaoCtrl);

    ProcuracaoCtrl.$inject = ['$scope', '$state', 'myConfig', 'DataService', '$cordovaToast', 'Procuracao', '$ionicPopup', '$cordovaCamera', '$ionicLoading', 'File', '$filter', '$localStorage', 'App'];

    function ProcuracaoCtrl($scope, $state, myConfig, DataService, $cordovaToast, Procuracao, $ionicPopup, $cordovaCamera, $ionicLoading, File, $filter, $localStorage, App) {
        $scope.casamento = false;
        $scope.agendamentoConfirmado = false;
        $scope.file = {};
        $scope.procuracao = {};
        $scope.files = [];
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

                var element = angular.element(document.querySelectorAll('#button-send'));
                element.addClass("button-royal");
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

        $scope.goBack = function() {
            $state.go('app.cartorio');
        };

        $scope.getFile = function (file) {

            if(file.nome_campo) {
                $scope.file.nome = file.nome_campo;
                File.readAsDataUrl(file, $scope)
                    .then(function (result) {
                        $scope.file.source = result;
                        $scope.files[$scope.file.nome] = $scope.file.source;
                        var element = angular.element(document.querySelectorAll('.'+$scope.file.nome));
                        element.removeClass("empty");
                        element.addClass("sended");

                        var element = angular.element(document.querySelectorAll('.'+$scope.file.nome+' i'));
                        element.removeClass("ion-social-buffer");
                        element.addClass("ion-document");

                        var element = angular.element(document.querySelectorAll('.'+$scope.file.nome+' .description'));
                        var data = new Date();
                        var dataFormatada = $filter('date')(data, 'dd/MM/yyyy HH:mm');
                        element.html('Última modificação: ' + dataFormatada);
                    });
            }
        };

        $scope.submit = function() {
            $ionicLoading.show({
                template: 'Aguarde...'
            });

            var objectMap = arrayToObj($scope.files);
            $scope.procuracao.files = objectMap;

            var user = App.user || $localStorage.getObject('user');
            $scope.procuracao.user_id = user.id;

            Procuracao.save($scope.procuracao, function (res) {
                if(res.error) {
                    $cordovaToast.showWithOptions({
                        message: res.message,
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
                } else {
                    window.scrollTo(0, 0);
                    $scope.agendamentoConfirmado = true;
                    $ionicLoading.hide();
                }
            }, function (error) {
                $ionicLoading.hide();
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
