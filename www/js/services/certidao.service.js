(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('Certidao', Certidao);

    Certidao.$inject = ['$resource', 'App'];

    function Certidao($resource, App) {

        return $resource(App.api + 'certidao/:id', {}, {

        });

    }
})();
