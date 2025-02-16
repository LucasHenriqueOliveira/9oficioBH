(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('Auth', Auth);

    Auth.$inject = ['$localStorage', 'App', '$state', 'User', '$log', 'Facebook', 'Google', '$ionicLoading', '$cordovaToast'];

    function Auth($localStorage, App, $state, User, $log, Facebook, Google, $ionicLoading, $cordovaToast) {

        return {

            signup: function (signupData) {
                $ionicLoading.show({
                    template: 'Aguarde...'
                });

                User.signup(signupData, function (res) {
                    if (res.error) {
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
                        return;
                    }
                    App.token = res.data.token;
                    $localStorage.set('token', res.data.token);

                    User.getUser(function (res) {
                        App.user = res.data;
                        $localStorage.setObject('user', App.user);
                        $ionicLoading.hide();
                        $state.go('app.cartorio');

                    }, function (error) {
                        // error
                        $ionicLoading.hide();
                        $cordovaToast.showWithOptions({
                            message: 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente!',
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

                }, function (error) {
                    $log.error(error);
                    $ionicLoading.hide();
                    $cordovaToast.showWithOptions({
                        message: 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente!',
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
            },

            signupSocial: function(signupData) {
                $ionicLoading.show({
                    template: 'Aguarde...'
                });

                User.signupSocial(signupData, function (res) {
                    if (res.error) {
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
                        return;
                    }
                    App.token = res.data.token;
                    $localStorage.set('token', res.data.token);

                    User.getUser(function (res) {
                        App.user = res.data;
                        $localStorage.setObject('user', App.user);
                        $ionicLoading.hide();
                        $state.go('app.cartorio');

                    }, function (error) {
                        // error
                        $ionicLoading.hide();
                        $cordovaToast.showWithOptions({
                            message: 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente!',
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

                }, function (error) {
                    $log.error(error);
                    $ionicLoading.hide();
                    $cordovaToast.showWithOptions({
                        message: 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente!',
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
            },

            login: function (email, password) {
                $ionicLoading.show({
                    template: 'Aguarde...'
                });

                User.login({email: email, password: password}, function (res) {
                    App.clearData();
                    App.token = res.data.token;
                    $localStorage.set('token', res.data.token);

                    User.getUser(function (res) {
                        App.user = res.data;
                        $localStorage.setObject('user', App.user);
                        $ionicLoading.hide();
                        $state.go('app.cartorio');

                    }, function (error) {
                        // error
                        $ionicLoading.hide();
                        $cordovaToast.showWithOptions({
                            message: 'Usuário não encontrado!',
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
                }, function (error) {
                    $log.error(error);
                    $ionicLoading.hide();
                    $cordovaToast.showWithOptions({
                        message: 'Usuário não encontrado!',
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
            },
            signupFacebook: function () {Facebook.auth();},
            loginFacebook: function () {Facebook.auth();},
            signupGoogle: function () {Google.auth();},
            loginGoogle: function () {Google.auth();},
            isAuthenticated: function(){
                if (!App.user && isEmpty($localStorage.getObject('user'))) {
                    User.getUser(function (res) {
                        App.user = res.data;
                        $localStorage.setObject('user', App.user);
                    });
                }
                return App.user;
            },
            isAuthorized: function(){
                if (!App.token) {
                    App.token = $localStorage.get('token');
                }
                return App.token;
            },
            isLoginDefault : function() {
                var user = App.user || $localStorage.getObject('user');
                return user.login_default ? true : false;
            },
            isUserApp : function() {
                var user = App.user || $localStorage.getObject('user');
                return user.app ? true : false;
            }
        };
    }
})();
