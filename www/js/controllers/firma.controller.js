(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('FirmaCtrl', FirmaCtrl);

    FirmaCtrl.$inject = ['$scope', 'DataService', '$ionicLoading', 'myConfig'];

    function FirmaCtrl($scope, DataService, $ionicLoading, myConfig) {
        $scope.pesquisaFirma = false;
        $scope.nome = myConfig.nome;
        $scope.cidade = myConfig.cidade;
        $scope.endereco = myConfig.endereco;
        $scope.message = '';
        $scope.firma = {};

        $scope.submit = function() {
            if($scope.firma.cpf && !verificaCPF($scope.firma.cpf)) {
                $scope.firma.cpf = '';
            }

            if(!$scope.firma.nome && !$scope.firma.cpf) {
                $cordovaToast.showWithOptions({
                    message: 'Informe o CPF ou Nome!',
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
                return;
            }

            $ionicLoading.show({
                template: 'Aguarde...'
            });

            DataService.getFirma($scope.firma).then(function(res) {
                $scope.pesquisaFirma = true;
                $scope.message = res.message;
                $scope.hasFirma = res.hasFirma;
                $ionicLoading.hide();
            }, function (error) {
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'Erro ao pesquisar a firma!',
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
            $scope.firma = {};
            $scope.pesquisaFirma = false;
        };
    }
})();
