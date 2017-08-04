(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'Auth', 'myConfig', '$state'];

    function LoginCtrl($scope, Auth, myConfig, $state) {
        $scope.loginData = {};
        $scope.cartorio = {
            nome: myConfig.nome,
            cidade: myConfig.cidade
        };

        $scope.loginCartorio = function () {
            Auth.login($scope.loginData.email, $scope.loginData.password);
        };

        $scope.loginFacebook = function () {
            Auth.loginFacebook();
        };

        $scope.loginGoogle = function () {
            Auth.loginGoogle();
        };

        $scope.esqueceuSenha = function() {
            $state.go('forgot-password');
        };
    }
})();
