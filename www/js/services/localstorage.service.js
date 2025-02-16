(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('$localStorage', $localStorage);

    $localStorage.$inject = ['$window'];

    function $localStorage($window) {

        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            destroy: function (key) {
                $window.localStorage.removeItem(key);
            }
        };

    }
})();
