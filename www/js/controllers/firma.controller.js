(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('FirmaCtrl', FirmaCtrl);

    FirmaCtrl.$inject = ['$scope', 'DataService'];

    function FirmaCtrl($scope, DataService) {
        $scope.pesquisaFirma = false;
        $scope.message = '';
        $scope.firma = {};

        $scope.submit = function() {

            if(!$scope.firma.nome && !$scope.firma.cpf) {
                $cordovaToast.showWithOptions({
                    message: 'Informe o Nome ou CPF!',
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
                return;
            }

            DataService.getFirma($scope.firma).then(function(res) {
                $scope.pesquisaFirma = true;
                $scope.message = res.message;
            }, function (error) {
                $cordovaToast.showWithOptions({
                    message: 'Erro ao pesquisar a firma!',
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
            });
        };

        $scope.goBack = function() {
            $scope.firma = {};
            $scope.pesquisaFirma = false;
        };
    }
})();
