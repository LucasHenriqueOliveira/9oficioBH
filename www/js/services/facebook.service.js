(function () {
  'use strict';

  angular
    .module('cartorio')
    .factory('Facebook', Facebook);

  Facebook.$inject = ['$localStorage', 'App', '$state', 'User', '$ionicPopup', '$ionicLoading', '$log', '$q'];

  function Facebook($localStorage, App, $state, User, $ionicPopup, $ionicLoading, $log, $q) {

    return {

      auth: function () {
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

          $localStorage.set('fbAccessToken', authResponse.accessToken);
          getFacebookProfileInfo(authResponse.accessToken)
            .then(function(profileInfo) {

              User.signup({
                email: profileInfo.email,
                name: profileInfo.name,
                id: profileInfo.id,
                gender: profileInfo.gender,
                type: 'facebook'
              }, function(res) {
                if (res.error) {
                  $ionicPopup.alert({
                    title: '',
                    template: res.error
                  });
                  return;
                }

                if (res.check_password) {

                  $ionicPopup.prompt({
                    title: 'Password Check',
                    template: 'Enter your password',
                    inputType: 'password',
                    inputPlaceholder: 'Your password'
                  }).then(function(password) {
                    User.signup({
                      email: profileInfo.email,
                      password: password,
                      id: profileInfo.id,
                      type: 'facebook'
                    }, function(res) {
                      if (res.error) {
                        $ionicPopup.alert({
                          title: '',
                          template: res.error
                        });
                        $ionicLoading.hide();
                        return;
                      }

                      App.token = res.token;
                      $localStorage.set('token', res.token);
                      App.user = res;
                      App.clearData();
                      $state.go('tab.send');

                    }, function(error) {
                      $log.error(error);
                    });
                  });

                } else {

                  App.token = res.token;
                  $localStorage.set('token', res.token);
                  App.user = res;
                  $state.go('tab.send');

                }

              }, function(error) {
                $log.error(error);
              });
            }, function(fail){
              $ionicPopup.alert({
                title: '',
                template: "There was a problem getting your profile."
              });
              $ionicLoading.hide();
              $log.error(JSON.stringify(error));
            });
        };

        // if login fails
        var fbLoginError = function(error){
          $ionicLoading.hide();
        };

        // start the sign in
        facebookConnectPlugin.getLoginStatus(function(success){
          if(success.status === 'connected'){
            // get profile info
            getFacebookProfileInfo(success.authResponse.accessToken)
              .then(function(profileInfo) {
                User.login({
                  id: profileInfo.id,
                  name: profileInfo.name,
                  email: profileInfo.email,
                  gender: profileInfo.gender,
                  type: 'facebook'
                }, function (res) {
                  if (res.error) {
                    $ionicPopup.alert({
                      title: '',
                      template: res.error
                    });
                    return;
                  }
                  App.user = res;
                  App.token = res.token;
                  App.clearData();
                  $localStorage.set('token', res.token);
                  $state.go('tab.send');

                }, function (error) {
                  $log.error(error);
                });
              }, function(fail){
                $localStorage.set('fbAccessToken', null);
                facebookConnectPlugin.logout(function(){});
                $ionicPopup.alert({
                  title: '',
                  template: "There was a problem getting your profile, please try again."
                });
              });
          } else {
            $ionicLoading.show({
              template: 'Logging in...'
            });
            facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);
          }
        });
      }
    };
  }
})();
