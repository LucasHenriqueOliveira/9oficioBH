(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('Procuracao', Procuracao);

    Procuracao.$inject = ['$resource', 'App'];

    function Procuracao($resource, App) {

        return $resource(App.api + 'procuracao/:id', {}, {

        });

    }
})();
