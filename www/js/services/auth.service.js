(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('Auth', Auth);

    Auth.$inject = ['$localStorage', 'App', '$state', 'User', '$log', 'Facebook'];

    function Auth($localStorage, App, $state, User, $log, Facebook) {

        return {

            signup: function (signupData) {
                User.signup(signupData, function (res) {
                    if (res.error) {
                        $cordovaToast.showWithOptions({
                            message: res.message,
                            duration: 'short',
                            position: 'center',
                            styling: {
                                opacity: 0.75,
                                backgroundColor: '#FF0000',
                                textColor: '#FFFF00',
                                textSize: 20.5,
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
                        $state.go('app.cartorio');

                    }, function (error) {
                        // error
                        $cordovaToast.showWithOptions({
                            message: 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente!',
                            duration: 'short',
                            position: 'center',
                            styling: {
                                opacity: 0.75,
                                backgroundColor: '#FF0000',
                                textColor: '#FFFF00',
                                textSize: 20.5,
                                cornerRadius: 16,
                                horizontalPadding: 20,
                                verticalPadding: 16
                            }
                        });
                    });

                }, function (error) {
                    $log.error(error);
                    $cordovaToast.showWithOptions({
                        message: 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente!',
                        duration: 'short',
                        position: 'center',
                        styling: {
                            opacity: 0.75,
                            backgroundColor: '#FF0000',
                            textColor: '#FFFF00',
                            textSize: 20.5,
                            cornerRadius: 16,
                            horizontalPadding: 20,
                            verticalPadding: 16
                        }
                    });
                });
            },

            login: function (email, password) {
                User.login({email: email, password: password}, function (res) {
                    App.clearData();
                    App.token = res.data.token;
                    $localStorage.set('token', res.data.token);

                    User.getUser(function (res) {
                        App.user = res.data;
                        $localStorage.setObject('user', App.user);
                        $state.go('app.cartorio');

                    }, function (error) {
                        // error
                        $cordovaToast.showWithOptions({
                            message: 'Usuário não encontrado!',
                            duration: 'short',
                            position: 'center',
                            styling: {
                                opacity: 0.75,
                                backgroundColor: '#FF0000',
                                textColor: '#FFFF00',
                                textSize: 20.5,
                                cornerRadius: 16,
                                horizontalPadding: 20,
                                verticalPadding: 16
                            }
                        });
                    });
                }, function (error) {
                    $log.error(error);
                    $cordovaToast.showWithOptions({
                        message: 'Usuário não encontrado!',
                        duration: 'short',
                        position: 'center',
                        styling: {
                            opacity: 0.75,
                            backgroundColor: '#FF0000',
                            textColor: '#FFFF00',
                            textSize: 20.5,
                            cornerRadius: 16,
                            horizontalPadding: 20,
                            verticalPadding: 16
                        }
                    });
                });
            },
            signupFacebook: function () {Facebook.auth();},
            loginFacebook: function () {Facebook.auth();},
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
            }
        };
    }
})();
