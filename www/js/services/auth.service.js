(function () {
  'use strict';

  angular
    .module('cartorio')
    .factory('Auth', Auth);

  Auth.$inject = ['$localStorage', 'App', '$state', 'User', '$ionicPopup', '$ionicLoading', '$log', 'Facebook'];

  function Auth($localStorage, App, $state, User, $ionicPopup, $ionicLoading, $log, Facebook) {

    return {

      signup: function (email, password) {
        User.signup({email: email, password: password}, function (res) {
          if (res.error) {
            $ionicPopup.alert({
              title: 'Sign Up',
              template: res.error
            });
            return;
          }

          App.token = res.token;
          $localStorage.set('token', res.token);
          App.user = res;
          App.clearData();

          $state.go('app.cartorio');

        }, function (error) {
          $log.error(error);
        });
      },

      login: function (email, password) {
        User.login({email: email, password: password}, function (res) {
          App.user = res;
          App.token = res.token;
          App.clearData();
          $localStorage.set('token', res.token);
          $state.go('app.cartorio');
        }, function (error) {
          $ionicPopup.alert({
            title: '',
            template: "Email and password incorrect. Try again!"
          });
          $ionicLoading.hide();
        });
      },
      signupFacebook: function () {Facebook.auth();},
      loginFacebook: function () {Facebook.auth();}
    };
  }
})();
