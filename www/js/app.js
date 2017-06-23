// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cartorio', ['ionic', 'ngResource', 'ksSwiper', 'ngCordova', 'ui.utils.masks'])

    .run(function($ionicPlatform, $rootScope, Auth, $state, $location) {
        $ionicPlatform.registerBackButtonAction(function (event) {
            if($state.current.name == "home" || $state.current.name == "splash"){
                navigator.app.exitApp();
            }
            else {
                navigator.app.backHistory();
            }
        }, 100);

        $rootScope.$on('$locationChangeStart', function (event, nextRoute, currentRoute) {
            if (isEmpty(Auth.isAuthenticated()) && isEmpty(Auth.isAuthorized()) && $location.path() != '/signup') {
                $state.go('login');
            }
        });

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

        $httpProvider.interceptors.push('TokenInterceptor');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text('');

        $stateProvider

            .state('home', {
                url: '/home',
                abstract: false,
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })

            .state('login', {
                url: '/login',
                abstract: false,
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl',
                auth: false
            })

            .state('signup', {
                url: '/signup',
                abstract: false,
                templateUrl: 'templates/signup.html',
                controller: 'CadastrarCtrl',
                auth: false
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.cartorio', {
                url: '/cartorio',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/cartorio.html',
                        controller: 'CartorioCtrl'
                    }
                }
            })

            .state('app.certidao', {
                url: '/cartorio/certidao',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/certidao.html',
                        controller: 'CertidaoCtrl'
                    }
                }
            })
            .state('app.firma', {
                url: '/cartorio/firma',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/firma.html',
                        controller: 'FirmaCtrl'
                    }
                }
            })

            .state('app.procuracao', {
                url: '/cartorio/procuracao',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/procuracao.html',
                        controller: 'ProcuracaoCtrl'
                    }
                }
            })

            .state('app.testamento', {
                url: '/cartorio/testamento',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/agendamento.html',
                        controller: 'TestamentoCtrl'
                    }
                }
            })

            .state('app.calculos', {
                url: '/calculos',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/calculos.html',
                        controller: 'CalculosCtrl'
                    }
                }
            })

            .state('app.itbi', {
                url: '/calculos/itbi',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/itbi.html',
                        controller: 'ItbiCtrl'
                    }
                }
            })

            .state('app.termos', {
                url: '/cartorio/termos',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/termos.html',
                        controller: 'TermosCtrl'
                    }
                }
            })

            .state('app.historico', {
                url: '/historico',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/historico.html',
                        controller: 'HistoricoCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
    });
