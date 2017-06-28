(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('TestamentoCtrl', TestamentoCtrl);

    TestamentoCtrl.$inject = ['$scope', 'App', 'DataService', 'myConfig', 'Testamento', '$localStorage', '$ionicLoading'];

    function TestamentoCtrl($scope, App, DataService, myConfig, Testamento, $localStorage, $ionicLoading) {
        $scope.casamento = true;
        $scope.agendamentoConfirmado = false;
        $scope.cartorio = {
            nome: myConfig.nome,
            cidade: myConfig.cidade,
            telefone: myConfig.telefone
        };
        $scope.datas = [];
        $scope.horas = [];
        $scope.opcoesAgendamento = {};

        var getDatas = function() {
            $ionicLoading.show({
                template: 'Aguarde...'
            });
            DataService.getDataTestamento().then(function(res) {
                $scope.opcoesAgendamento = res;

                for(var key in $scope.opcoesAgendamento) {
                    var date = convertDateBr(key);
                    $scope.datas.push(date);
                }
                $ionicLoading.hide();

            }, function (error) {
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'Erro ao buscar as datas disponíveis para agendamento!',
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

        getDatas();

        $scope.getTime = function(date) {
            $scope.horas = $scope.opcoesAgendamento[formatDate(date)];
        };

        $scope.submit = function(data, hora) {
            $ionicLoading.show({
                template: 'Aguarde...'
            });
            var user = App.user || $localStorage.getObject('user');

            $scope.testamento = {
                data: formatDate(data),
                hora: hora,
                user_id: user.id
            };

            Testamento.save($scope.testamento, function (res) {
                if(res.error) {
                    $cordovaToast.showWithOptions({
                        message: res.message,
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
                } else {
                    $scope.agendamentoConfirmado = true;
                }
                $ionicLoading.hide();

            }, function (error) {
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'Erro ao agendar o testamento!',
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
            $scope.agendamentoConfirmado = false;
            $scope.datas = [];
            $scope.horas = [];
            $scope.opcoesAgendamento = {};
            $scope.testamento = {};
            getDatas();
        };
    }
})();
