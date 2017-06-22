(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('CartorioCtrl', CartorioCtrl);

    CartorioCtrl.$inject = ['$scope', 'App', '$localStorage', '$state', 'DataService'];

    function CartorioCtrl($scope, App, $localStorage, $state, DataService) {
        var user = App.user || $localStorage.getObject('user');
        var res = (user.nome).split(" ");
        $scope.user_nome = res[0];

        $scope.go = function(state) {
            $state.go(state);
        };

        $scope.getLabel = function(tipo, status) {
            switch (tipo) {
                case 'Certidão':
                case 'Procuração':
                    return (status == 'Aguardando') ? 'Solicitado' : status;
                    break;
                case 'Testamento':
                    return (status == 'Aguardando') ? 'Agendado' : status;
                    break;
            }
        };

        DataService.historico({user_id: user.id}).then(function(res) {
            $scope.recentes = res;
        }, function (error) {
            console.log(error);
        });
    }
})();
