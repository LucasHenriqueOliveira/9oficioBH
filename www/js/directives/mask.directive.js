(function () {
    'use strict';

    angular
        .module('cartorio')
        .directive('mask', mask);

    mask.$inject = ['$timeout'];

    function mask($timeout) {

        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $element.bind('keydown', function ($event) {
                    $timeout(function () {
                        $event.target.selectionStart = $event.target.value.length;
                        $event.target.selectionEnd = $event.target.value.length;
                    });
                });
            }
        };
    }
})();
