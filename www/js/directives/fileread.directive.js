(function () {
    'use strict';

    angular
        .module('cartorio')
        .directive('fileread', fileread);

    fileread.$inject = [];

    function fileread() {

        return {
            link: function($scope,el){

                el.bind("change", function(e){
                    $scope.file = (e.srcElement || e.target).files[0];
                    $scope.file.nome_campo = $scope.documento.nome_campo;
                    $scope.getFile($scope.file);
                });

            }

        };

    }
})();
