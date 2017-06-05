(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('App', App);

    App.$inject = [];

    function App() {

        return {
            api: 'https://cartorioapp.com/api/',
            //api: 'http://api.cartorioapp.local:8080/api/', // lucas' computer
            user: false,
            token: null
        };

    }
})();
