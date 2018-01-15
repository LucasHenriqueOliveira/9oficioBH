(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$state', '$scope', 'myConfig', 'App', '$localStorage'];

    function HomeCtrl($state, $scope, myConfig, App, $localStorage) {
        $scope.nome = myConfig.nome;
        $scope.cidade = myConfig.cidade;

        $scope.message = 'Verificando atualização';

        setTimeout(function(){
            if (!App.user && isEmpty($localStorage.getObject('user'))) {
                $state.go('login');
            } else {
                $state.go('app.cartorio');
            }
        }, 4000);
    }
})();
