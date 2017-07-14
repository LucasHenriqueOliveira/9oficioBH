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
                    $scope.file.nome_campo = $scope.doc.nome_campo;
                    var occur = ($scope.file.nome_campo).indexOf('outorgante');
                    if(occur == -1) {
                        occur = ($scope.file.nome_campo).indexOf('outorgado');
                    }
                    var otherDoc = (occur == -1) ? true : false;
                    $scope.getFile($scope.file, otherDoc);
                });

            }

        };

    }
})();
