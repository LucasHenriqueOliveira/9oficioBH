(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);

    ResetPasswordCtrl.$inject = ['$scope', 'User', '$state', '$ionicLoading', '$cordovaToast', 'myConfig', 'App', '$localStorage'];

    function ResetPasswordCtrl($scope, User, $state, $ionicLoading, $cordovaToast, myConfig, App, $localStorage) {

        $scope.resetData = {};
        $scope.cartorio = {
            nome: myConfig.nome
        };

        $scope.resetPassword = function() {
            if ($scope.resetData.new_password !== $scope.resetData.confirm_password) {
                $cordovaToast.showWithOptions({
                    message: 'Nova senha não corresponde a senha confirmada',
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
                $scope.resetData.confirm_password = '';
            } else {
                $ionicLoading.show({
                    template: 'Aguarde...'
                });

                User.changePassword($scope.resetData,function (data) {
                    if(data.error) {
                        $cordovaToast.showWithOptions({
                            message: data.message,
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
                    } else {
                        User.getUser(function (res) {
                            $cordovaToast.showWithOptions({
                                message: data.message,
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

                            $localStorage.destroy('user');
                            $ionicLoading.hide();
                            App.user = res.data;
                            $localStorage.setObject('user', App.user);
                            $state.go('app.cartorio');
                        });
                    }
                });
            }
        };
    }
})();
