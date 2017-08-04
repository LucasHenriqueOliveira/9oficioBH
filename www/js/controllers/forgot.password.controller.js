(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = ['$scope', 'User', '$state', '$ionicLoading', '$cordovaToast'];

    function ForgotPasswordCtrl($scope, User, $state, $ionicLoading, $cordovaToast) {

        $scope.forgotPassword = function(email) {
            $ionicLoading.show({
                template: 'Aguarde...'
            });

            User.reset({email: email},function (res) {
                if(res.error) {
                    $cordovaToast.showWithOptions({
                        message: res.message,
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
                    $ionicLoading.hide();
                    return false;
                }
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'Enviamos um email com informações da nova senha!',
                    duration: 'short',
                    position: 'center',
                    styling: {
                        opacity: 0.75,
                        backgroundColor: '#6AA482',
                        textColor: '#FFFFFF',
                        textSize: 16,
                        cornerRadius: 16,
                        horizontalPadding: 20,
                        verticalPadding: 16
                    }
                });
                $state.go('login');
            }, function(error) {
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'Erro ao recuperar a senha do usuário!',
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
            });
        };
    }
})();
