(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('PreSignupCtrl', PreSignupCtrl);

    PreSignupCtrl.$inject = ['$scope', 'User', 'App', '$localStorage', '$state', '$log', '$cordovaToast', '$ionicLoading'];

    function PreSignupCtrl($scope, User, App, $localStorage, $state, $log, $cordovaToast, $ionicLoading) {

        $scope.signupData = App.getCurrentUser();

        var fbLoginError = function(error){
            App.clearData();
            $ionicLoading.hide();
            $cordovaToast.showWithOptions({
                message: 'Ocorreu um erro com o acesso do Facebook!',
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
        };

        $scope.submit = function () {
            $ionicLoading.show({
                template: 'Aguarde...'
            });

            User.signupSocial($scope.signupData, function(res) {

                App.clearData();
                App.token = res.data.token;
                $localStorage.set('token', res.data.token);

                User.getUser(function (res) {
                    App.user = res.data;
                    $localStorage.setObject('user', App.user);
                    $ionicLoading.hide();
                    $state.go('app.cartorio');

                }, function (error) {
                    fbLoginError(error);
                    $log.error(JSON.stringify(error));
                });

            }, function(error) {
                fbLoginError(error);
            });
        };

    }
})();
