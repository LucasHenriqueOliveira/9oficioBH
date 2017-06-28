(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('Facebook', Facebook);

    Facebook.$inject = ['$localStorage', 'App', '$state', 'User', '$ionicLoading', '$log', '$q', '$cordovaToast'];

    function Facebook($localStorage, App, $state, User, $ionicLoading, $log, $q, $cordovaToast) {

        return {

            auth: function () {

                // if login fails
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

                // get profile info
                var getFacebookProfileInfo = function (accessToken) {

                    var info = $q.defer();
                    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + accessToken, null,
                        function (response) {
                            info.resolve(response);
                        },
                        function (response) {
                            info.reject(response);
                        }
                    );
                    return info.promise;
                };

                // if login is ok
                var fbLoginSuccess = function(response) {
                    if (!response.authResponse){
                        fbLoginError("Cannot find the authResponse");
                        return;
                    }

                    var authResponse = response.authResponse;

                    getFacebookProfileInfo(authResponse.accessToken)
                        .then(function(profileInfo) {

                            User.checkSocial({id: profileInfo.id, email: profileInfo.email, tipo: 'facebook'}, function(res) {

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
                                        fbLoginError(error);
                                        $log.error(JSON.stringify(error));
                                    });

                                } else {
                                    $ionicLoading.hide();
                                    App.setCurrentUser({id: profileInfo.id, nome: profileInfo.name, email: profileInfo.email, tipo: 'facebook'});
                                    $state.go('pre-signup');
                                }

                            }, function(error) {
                                fbLoginError(error);
                                $log.error(JSON.stringify(error));
                            });

                        }, function(fail){
                            fbLoginError(fail);
                            $log.error(JSON.stringify(error));
                        });
                };

                // start the sign in
                facebookConnectPlugin.getLoginStatus(function(success){
                    $ionicLoading.show({
                        template: 'Aguarde...'
                    });

                    if(success.status === 'connected'){
                        // get profile info
                        getFacebookProfileInfo(success.authResponse.accessToken)
                            .then(function(profileInfo) {

                                User.checkSocial({id: profileInfo.id, email: profileInfo.email, tipo: 'facebook'}, function(res) {

                                    if (res.message == 'token_generated') {
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

                                    } else {
                                        $ionicLoading.hide();
                                        App.setCurrentUser({id: profileInfo.id, nome: profileInfo.name, email: profileInfo.email, tipo: 'facebook'});
                                        $state.go('pre-signup');
                                    }

                                }, function(error) {
                                    fbLoginError(error);
                                    $log.error(JSON.stringify(error));
                                });

                            }, function(fail){
                                facebookConnectPlugin.logout(function(){});
                                fbLoginError(fail);
                                $log.error(JSON.stringify(fail));
                            });
                    } else {
                        facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);
                    }
                });
            }
        };
    }
})();
