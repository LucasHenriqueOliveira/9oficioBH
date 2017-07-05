(function () {
    'use strict';

    angular
        .module('cartorio')
        .directive('watchChange', watchChange);

    watchChange.$inject = ['$cordovaToast'];

    function watchChange($cordovaToast) {

        return {
            scope: {
                onchange: '&watchChange'
            },
            link: function(scope, element, attrs) {
                element.on('input', function() {
                    scope.$apply(function () {
                        scope.onchange();
                        if(element[0].value.length == 14) {
                            if(!verificaCPF(element[0].value)) {
                                $cordovaToast.showWithOptions({
                                    message: 'O CPF informado é inválido!',
                                    duration: 'short',
                                    position: 'center',
                                    styling: {
                                        opacity: 0.75,
                                        backgroundColor: '#FF0000',
                                        textColor: '#FFFFFF',
                                        textSize: 16,
                                        cornerRadius: 16,
                                        horizontalPadding: 20,
                                        verticalPadding: 16
                                    }
                                });
                            }
                        }
                    });
                });
            }
        };

    }
})();