(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('SplashCtrl', SplashCtrl);

  SplashCtrl.$inject = ['$scope', 'myConfig'];

  function SplashCtrl($scope, myConfig) {
    $scope.nome = myConfig.nome;
    $scope.cidade = myConfig.cidade;

    //var checkUser = function(){
    //  if (App.user) {
    //    $state.go('tab.send');
    //  }
    //};
    //checkUser();
    //// auth delay problem
    //setTimeout(function(){checkUser();}, 1000);
    //$scope.$on('user:loggedin', function(e, data) {
    //  checkUser();
    //});
  }
})();
