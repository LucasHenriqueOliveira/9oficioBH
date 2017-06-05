(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$ionicModal', '$timeout', 'myConfig', '$state'];

    function AppCtrl($scope, $ionicModal, $timeout, myConfig, $state) {
        $scope.nome = myConfig.nome;
        $scope.cidade = myConfig.cidade;

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        $scope.logout = function() {
            $state.go('splash');
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    }
})();
