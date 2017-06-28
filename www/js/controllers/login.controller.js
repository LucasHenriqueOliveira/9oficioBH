(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'Auth'];

    function LoginCtrl($scope, Auth) {

        $scope.loginData = {};
        $scope.forgot = {};

        $scope.loginCartorio = function () {
            Auth.login($scope.loginData.email, $scope.loginData.password);
        };

        $scope.loginFacebook = function () {
            Auth.loginFacebook();
        };

        $scope.loginGoogle = function () {
            Auth.loginGoogle();
        };
    }
})();
