(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('ContaCtrl', ContaCtrl);

    ContaCtrl.$inject = ['$scope', '$localStorage', 'App', '$state', '$cordovaToast'];

    function ContaCtrl($scope, $localStorage, App, $state, $cordovaToast) {

        $scope.user = App.user || $localStorage.getObject('user');

        if(!$scope.user) {
            $cordovaToast.showWithOptions({
                message: 'Ocorreu um erro ao buscar as informações do usuário. Por favor, faça login novamente!',
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

            $state.go('login');
        }
    }
})();
