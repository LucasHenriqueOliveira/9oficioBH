(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('ItcdCtrl', ItcdCtrl);

    ItcdCtrl.$inject = ['$scope', 'myConfig'];

    function ItcdCtrl($scope, myConfig) {
        $scope.pesquisaITCD = false;
        $scope.estado = myConfig.estado;
        $scope.itcd = 0;
        $scope.valor_imovel = '';

        $scope.submit = function(valor) {
            $scope.pesquisaITCD = true;
            $scope.itcd = (valor * 5/100).toFixed(2);
        };

        $scope.goBack = function() {
            $scope.pesquisaITCD = false;
        };
    }
})();
