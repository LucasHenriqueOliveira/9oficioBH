(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('ItbiCtrl', ItbiCtrl);

    ItbiCtrl.$inject = ['$scope', 'myConfig'];

    function ItbiCtrl($scope, myConfig) {
        $scope.pesquisaITBI = false;
        $scope.cidade = myConfig.cidade;
        $scope.itbi = 0;
        $scope.valor_imovel = '';

        $scope.submit = function(valor) {
            $scope.pesquisaITBI = true;
            $scope.itbi = (valor * 3/100).toFixed(2);
        };

        $scope.goBack = function() {
            $scope.pesquisaITBI = false;
        };
    }
})();
