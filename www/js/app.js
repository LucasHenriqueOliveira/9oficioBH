// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cartorio', ['ionic', 'ionic.cloud', 'ngResource', 'ksSwiper', 'ngCordova', 'ui.utils.masks', 'idf.br-filters'])

    .run(function($ionicPlatform, $rootScope, Auth, $state, $location) {

        $ionicPlatform.registerBackButtonAction(function (event) {
            if ($location.path() === "/home" || $location.path() === "/login") {
                navigator.app.exitApp();
            }
            else {
                navigator.app.goBack();
            }
        }, 100);

        $ionicPlatform.ready(function() {
            if (navigator && navigator.splashscreen) {
                setTimeout(function() {
                    navigator.splashscreen.hide();
                }, 100);
            }
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            $rootScope.$on('$locationChangeStart', function (event, nextRoute, currentRoute) {
                if(Auth.isLoginDefault() && Auth.isUserApp()) {
                    $state.go("reset-password");
                }
            });
        });
    })

    .config(function($ionicCloudProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

        $ionicCloudProvider.init({
            "core": {
                "app_id": "6c934356"
            }
        });

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
                auth: false,
                cache: false
            })

            .state('forgot-password', {
                url: '/forgot-password',
                abstract: false,
                templateUrl: 'templates/forgot-password.html',
                controller: 'ForgotPasswordCtrl',
                auth: false,
                cache: false
            })

            .state('reset-password', {
                url: '/reset-password',
                abstract: false,
                templateUrl: 'templates/reset-password.html',
                controller: 'ResetPasswordCtrl',
                auth: false,
                cache: false
            })

            .state('termos', {
                url: '/termos',
                abstract: false,
                templateUrl: 'templates/termos.html',
                controller: 'TermosCtrl',
                auth: false
            })

            .state('pre-signup', {
                url: '/pre-signup',
                abstract: false,
                templateUrl: 'templates/pre-signup.html',
                controller: 'PreSignupCtrl',
                auth: false,
                cache: false
            })

            .state('signup', {
                url: '/signup',
                abstract: false,
                templateUrl: 'templates/signup.html',
                controller: 'CadastrarCtrl',
                auth: false,
                cache: false
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
                },
                cache: false
            })

            .state('app.certidao', {
                url: '/cartorio/certidao',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/certidao.html',
                        controller: 'CertidaoCtrl'
                    }
                },
                cache: false
            })
            .state('app.firma', {
                url: '/cartorio/firma',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/firma.html',
                        controller: 'FirmaCtrl'
                    }
                },
                cache: false
            })

            .state('app.procuracao', {
                url: '/cartorio/procuracao',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/procuracao.html',
                        controller: 'ProcuracaoCtrl'
                    }
                },
                cache: false
            })

            .state('app.contato', {
                url: '/cartorio/contato',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contato.html',
                        controller: 'ContatoCtrl'
                    }
                },
                cache: false
            })

            .state('app.testamento', {
                url: '/cartorio/testamento',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/testamento.html',
                        controller: 'TestamentoCtrl'
                    }
                },
                cache: false
            })

            .state('app.termos', {
                url: '/cartorio/termos',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/termos.html',
                        controller: 'TermosCtrl'
                    }
                },
                cache: false
            })

            .state('app.conta', {
                url: '/cartorio/conta',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/conta.html',
                        controller: 'ContaCtrl'
                    }
                },
                cache: false
            })

            .state('app.itbi', {
                url: '/calculos/itbi',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/itbi.html',
                        controller: 'ItbiCtrl'
                    }
                },
                cache: false
            })

            .state('app.itcd', {
                url: '/calculos/itcd',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/itcd.html',
                        controller: 'ItcdCtrl'
                    }
                },
                cache: false
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
    });
