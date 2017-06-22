(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('Testamento', Testamento);

    Testamento.$inject = ['$resource', 'App'];

    function Testamento($resource, App) {

        return $resource(App.api + 'testamento/:id', {}, {

        });

    }
})();
