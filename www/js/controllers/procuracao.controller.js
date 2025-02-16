(function () {
    'use strict';

    angular
        .module('cartorio')
        .controller('ProcuracaoCtrl', ProcuracaoCtrl);

    ProcuracaoCtrl.$inject = ['$scope', '$state', 'myConfig', 'DataService', '$cordovaToast', 'Procuracao', '$ionicLoading', 'File', '$filter', '$localStorage', 'App', '$location', '$ionicScrollDelegate', '$timeout'];

    function ProcuracaoCtrl($scope, $state, myConfig, DataService, $cordovaToast, Procuracao, $ionicLoading, File, $filter, $localStorage, App, $location, $ionicScrollDelegate, $timeout) {
        $scope.casamento = false;
        $scope.agendamentoConfirmado = false;
        $scope.file = {};
        $scope.procuracao = {};
        $scope.documentos = {};
        $scope.pessoa = {};
        $scope.docs = {};
        $scope.procuracao.Outorgante = [];
        $scope.procuracao.Outorgado = [];
        $scope.procuracao.OutrosDocs = [];
        $scope.newOutorgante = false;
        $scope.newOutorgado = false;
        $scope.selectedOpcao = 'Outorgante';
        $scope.files = [];
        $scope.cartorio = {
            nome: myConfig.nome,
            cidade: myConfig.cidade,
            telefone: myConfig.telefone
        };

        $ionicLoading.show({
            template: 'Aguarde...'
        });
        DataService.tiposProcuracao().then(function(res) {
            $scope.tipos_procuracao = res;
            $ionicLoading.hide();
        }, function (error) {
            $ionicLoading.hide();
            $cordovaToast.showWithOptions({
                message: 'Erro ao buscar os tipos de procuração!',
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

        $scope.selectOpcao = function(key, documentos) {
            $scope.selectedOpcao = key;
            $scope.docs = documentos;
        };

        $scope.newPessoa = function(opcao) {
            if(opcao == 'Outorgante') {
                $scope.newOutorgante = true;
            } else {
                $scope.newOutorgado = true;
            }
        };

        $scope.showNewOpcao = function(opcao) {
            return eval('$scope.new'+opcao);
        };

        $scope.addPessoa = function(pessoa, opcao) {
            pessoa.documentos = arrayToObj($scope.files);
            $scope.procuracao[opcao].push(pessoa);

            $scope.pessoa[opcao] = {};
            $scope.files = {};
            $scope.newOutorgante = false;
            $scope.newOutorgado = false;

            $location.hash('procuracao');
            $ionicScrollDelegate.anchorScroll(true);

            var pessoa = opcao.toLowerCase();
            changeStyleDocumentoUpload('rg_' + pessoa + '_frente');
            changeStyleDocumentoUpload('rg_' + pessoa + '_verso');
            changeStyleDocumentoUpload('cpf_' + pessoa);

            $cordovaToast.showWithOptions({
                message: opcao + ' adicionado com sucesso!',
                duration: 'short',
                position: 'center',
                styling: {
                    opacity: 0.75,
                    backgroundColor: '#6AA482',
                    textColor: '#FFFFFF',
                    textSize: 16,
                    cornerRadius: 16,
                    horizontalPadding: 20,
                    verticalPadding: 16
                }
            });
        };

        $scope.removePessoa = function(pessoa, arrPessoas, opcao) {
            var found = $filter('filter')(arrPessoas, pessoa, true);

            if (found.length) {
                for(var i = 0; i < arrPessoas.length; i++) {
                    var obj = arrPessoas[i];

                    if(found.indexOf(obj) !== -1) {
                        arrPessoas.splice(i, 1);
                        i--;
                    }
                }
            }

            $cordovaToast.showWithOptions({
                message: opcao + ' removido com sucesso!',
                duration: 'short',
                position: 'center',
                styling: {
                    opacity: 0.75,
                    backgroundColor: '#6AA482',
                    textColor: '#FFFFFF',
                    textSize: 16,
                    cornerRadius: 16,
                    horizontalPadding: 20,
                    verticalPadding: 16
                }
            });
        };

        var changeStyleDocumentoUpload = function(campo) {
            var element = angular.element(document.querySelectorAll('.'+campo));
            element.removeClass("sended");
            element.addClass("empty");

            var element = angular.element(document.querySelectorAll('.'+campo+' i'));
            element.removeClass("ion-document");
            element.addClass("ion-social-buffer");

            var element = angular.element(document.querySelectorAll('.'+campo+' .description'));
            element.html('CLIQUE PARA ENVIAR');
        };

        $scope.getDocumentos = function(tipo) {
            $ionicLoading.show({
                template: 'Aguarde...'
            });

            DataService.getDocumentos({id: tipo.tipo_procuracao_id}).then(function(res) {
                $scope.documentos = res;
                $scope.selectedOpcao = 'Outorgante';
                $scope.docs = $scope.documentos['Outorgante'].documentos;
                $ionicLoading.hide();

            }, function (error) {
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'Erro ao buscar os documentos do tipo de procuração!',
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


        function imageToDataUri(img, width, height, type) {

            // create an off-screen canvas
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');

            // set its dimension to target size
            canvas.width = width;
            canvas.height = height;

            // draw source image into the off-screen canvas:
            ctx.drawImage(img, 0, 0, width, height);

            // encode image to data-uri with base64 version of compressed image
            return canvas.toDataURL(type, 0.3);
        }

        $scope.getFile = function (file, otherDoc) {
            if(file.nome_campo) {
                $scope.file.nome = file.nome_campo;
                var type = file.type;

                File.readAsDataUrl(file, $scope)
                    .then(function (result) {

                        var img = new Image;

                        img.onload = function () {
                            var newDataUri = imageToDataUri(this, 800, 600, type);

                            if(otherDoc) {
                                $scope.procuracao.OutrosDocs.push({name: $scope.file.nome, file: newDataUri});
                            } else {
                                $scope.files[$scope.file.nome] = newDataUri;
                            }
                            var element = angular.element(document.querySelectorAll('.'+$scope.file.nome));
                            element.removeClass("empty");
                            element.addClass("sended");

                            var element = angular.element(document.querySelectorAll('.'+$scope.file.nome+' i'));
                            element.removeClass("ion-social-buffer");
                            element.addClass("ion-document");

                            var element = angular.element(document.querySelectorAll('.'+$scope.file.nome+' .description'));
                            var data = new Date();
                            var dataFormatada = $filter('date')(data, 'dd/MM/yyyy HH:mm');
                            element.html('Última modificação: ' + dataFormatada);
                        };
                        img.src = result;

                    });
            }
        };

        $scope.canSend = function() {
            if($scope.documentos && Object.keys($scope.documentos).length == 3) {
                return $scope.procuracao.Outorgante.length && $scope.procuracao.Outorgado.length && $scope.procuracao.OutrosDocs.length;
            } else {
                return $scope.procuracao.Outorgante.length && $scope.procuracao.Outorgado.length;
            }
        };

        $scope.buscarCEP = function(cep, opcao) {
            $ionicLoading.show({
                template: 'Buscando o endereço...'
            });

            DataService.getCEP(cep).then(function(res) {
                $scope.pessoa[opcao].endereco = res;
                $ionicLoading.hide();
            }, function (error) {
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'Erro ao buscar os dados do endereço!',
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

        $scope.submit = function() {
            $ionicLoading.show({
                template: 'Aguarde...'
            });

            var user = App.user || $localStorage.getObject('user');
            $scope.procuracao.user_id = user.id;

            var t = $timeout(timeoutHandler, 10000);

            Procuracao.save($scope.procuracao, successHandler, errorHandler);

            function successHandler(res){
                $timeout.cancel(t);
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
                    $location.hash('procuracao');
                    $ionicScrollDelegate.anchorScroll(true);
                    $scope.agendamentoConfirmado = true;
                    $ionicLoading.hide();
                }
            }

            function errorHandler(res){
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'Erro ao solicitar a procuração!',
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

            function timeoutHandler(res){
                $ionicLoading.hide();
                $cordovaToast.showWithOptions({
                    message: 'A sua solicitação está sendo processada! Você receberá um email com informações do pedido.',
                    duration: 3500,
                    position: 'center',
                    styling: {
                        opacity: 0.75,
                        backgroundColor: '#6AA482',
                        textColor: '#FFFFFF',
                        textSize: 16,
                        cornerRadius: 16,
                        horizontalPadding: 20,
                        verticalPadding: 16
                    }
                });
                $state.go('app.cartorio');
            }
        };
    }
})();
