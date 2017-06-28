(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('Google', Google);

    Google.$inject = ['$cordovaToast', '$state', 'App', 'User', '$localStorage', '$ionicLoading', '$log'];

    function Google($cordovaToast, $state, App, User, $localStorage, $ionicLoading, $log) {

        return {

            auth: function () {

                // if login fails
                var GoogleLoginError = function(error){
                    App.clearData();
                    $ionicLoading.hide();
                    $cordovaToast.showWithOptions({
                        message: 'Ocorreu um erro com o acesso do Google!',
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


                $ionicLoading.show({
                    template: 'Aguarde...'
                });

                window.plugins.googleplus.login(
                    {},
                    function (user_data) {

                        User.checkSocial({id: user_data.userId, email: user_data.email, tipo: 'google'}, function(res) {

                            if (res.message == 'token_generated') {
                                App.clearData();
                                App.token = res.data.token;
                                $localStorage.set('token', res.data.token);


                                User.getUser(function (res) {
                                    App.user = res.data;
                                    $ionicLoading.hide();
                                    $localStorage.setObject('user', App.user);
                                    $state.go('app.cartorio');

                                }, function (error) {
                                    GoogleLoginError(error);
                                    $log.error(JSON.stringify(error));
                                });

                            } else {
                                $ionicLoading.hide();
                                App.setCurrentUser({id: user_data.userId, nome: user_data.displayName, email: user_data.email, tipo: 'google'});
                                $state.go('pre-signup');
                            }

                        }, function(error) {
                            GoogleLoginError(error);
                            $log.error(JSON.stringify(error));
                        });
                    },
                    function (error) {
                        GoogleLoginError(error);
                        $ionicLoading.hide();
                    }
                );
            }
        };
    }
})();
