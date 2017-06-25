(function () {
    'use strict';

    angular
        .module('cartorio')
        .factory('DataService', DataService);

    DataService.$inject = ['$http', '$q', 'App'];

    function DataService($http, $q, App) {

        return {
            getFirma: function(params) {

                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: App.api + 'firma',
                    params: params
                })
                    .then(function(response) {

                        deferred.resolve(response.data);

                    }, function(error) {
                        console.log(error);
                    });

                return deferred.promise;
            },
            historico: function(params) {

                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: App.api + 'historico',
                    params: params
                })
                    .then(function(response) {

                        deferred.resolve(response.data);

                    }, function(error) {
                        console.log(error);
                    });

                return deferred.promise;
            },
            tiposProcuracao: function() {

                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: App.api + 'procuracao/tipos'
                })
                    .then(function(response) {

                        deferred.resolve(response.data);

                    }, function(error) {
                        console.log(error);
                    });

                return deferred.promise;
            },
            getDocumentos: function(params) {

                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: App.api + 'procuracao/tipos/documentos',
                    params: params
                })
                    .then(function(response) {

                        deferred.resolve(response.data);

                    }, function(error) {
                        console.log(error);
                    });

                return deferred.promise;
            },
            getDataTestamento: function() {

                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: App.api + 'testamento/datas'
                })
                    .then(function(response) {

                        deferred.resolve(response.data);

                    }, function(error) {
                        console.log(error);
                    });

                return deferred.promise;
            }
        }
    }
})();