(function () {
    'use strict';

    angular
        .module('cartorio')
        .directive('ngFileUpload', ngFileUpload);

    ngFileUpload.$inject = [];

    function ngFileUpload() {

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function () {
                    document.getElementById(scope.documento.nome_campo).click();
                });
            }
        };

    }
})();
