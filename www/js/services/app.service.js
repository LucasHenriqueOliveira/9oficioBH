(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('App', App);

    App.$inject = ['$localStorage'];

    function App($localStorage) {

        function clearData() {
            $localStorage.destroy('token');
            $localStorage.destroy('user');
        }

        return {
            api: 'http://9oficiobh.cartorioapp.com/api/',
            //api: 'http://localhost:8000/api/', // lucas' computer
            user: false,
            token: null,
            clearData: clearData
        };

    }
})();
