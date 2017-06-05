(function () {
  'use strict';

  angular
    .module('cartorio')
    .factory('User', User);

  User.$inject = ['$resource', 'App'];

  function User($resource, App) {

    return $resource(App.api + 'user/:id', {}, {
      passwd: {
        url: 'user',
        'method': 'POST',
        params: {}
      },
      ping: {
        url: App.api + 'ping',
        'method': 'POST',
        params: {}
      },
      login: {
        url: App.api + 'login',
        'method': 'POST',
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
      forgot: {
        url: App.api + 'forgot',
        'method': 'POST',
        params: {}
      },
      reset: {
        url: App.api + 'reset',
        'method': 'POST',
        params: {}
      },
      update: {
        url: App.api + 'user/:id',
        'method': 'PUT',
        params: {}
      }
    });

  }
})();
