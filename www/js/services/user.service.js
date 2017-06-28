(function () {
  'use strict';

  angular
      .module('cartorio')
      .factory('User', User);

  User.$inject = ['$resource', 'App'];

  function User($resource, App) {

    return $resource(App.api + 'user/:id', {}, {
      login: {
        url: App.api + 'auth/login',
        'method': 'POST',
        params: {}
      },
      getUser: {
        url: App.api + 'auth/user',
        params: {}
      },
      logout: {
        url: App.api + 'logout',
        params: {}
      },
      signup: {
        url: App.api + 'signup',
        'method': 'POST',
        params: {}
      },
      signupSocial: {
        url: App.api + 'signup-social',
        'method': 'POST',
        params: {}
      },
      checkSocial: {
        url: App.api + 'check-social',
        'method': 'POST',
        params: {}
      },
      forgot: {
        url: App.api + 'forgot',
        'method': 'POST',
        params: {}
      },
      reset: {
        url: App.api + 'reset',
        'method': 'POST',
        params: {}
      }
    });

  }
})();
