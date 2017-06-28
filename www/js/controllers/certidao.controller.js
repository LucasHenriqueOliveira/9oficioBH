(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('CertidaoCtrl', CertidaoCtrl);

    CertidaoCtrl.$inject = ['$scope', '$state', 'Certidao', 'App', '$cordovaToast', '$localStorage', 'myConfig', '$ionicLoading'];

    function CertidaoCtrl($scope, $state, Certidao, App, $cordovaToast, $localStorage, myConfig, $ionicLoading) {
        $scope.certidao = {};
        $scope.certidaoEnviada = false;
        $scope.cartorio = {
            nome: myConfig.nome,
            cidade: myConfig.cidade,
            telefone: myConfig.telefone
        };

        $scope.submit = function() {
            $ionicLoading.show({
                template: 'Aguarde...'
            });

            var user = App.user || $localStorage.getObject('user');
            $scope.certidao.user_id = user.id;
            Certidao.save($scope.certidao, function (res) {
                $scope.certidaoEnviada = true;
                $ionicLoading.hide();
            }, function (error) {
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'Erro ao solicitar a certidão!',
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
            });
        };

        $scope.goBack = function() {
            $state.go('app.cartorio');
        };
    }
})();
