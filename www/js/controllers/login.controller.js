(function () {
  'use strict';

  angular
    .module('cartorio')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$ionicModal', 'User', '$ionicPopup', '$state'];

  function LoginCtrl($scope, Auth, $ionicModal, User, $ionicPopup, $state) {

    $scope.loginData = {};
    $scope.forgot = {};

    $scope.loginCartorio = function () {
      $state.go('app.cartorio');
      //Auth.login($scope.loginData.email, $scope.loginData.password);
    };

    $scope.loginFacebook = function () {
      Auth.loginFacebook();
    };

    // $ionicModal.fromTemplateUrl('forgot-password.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function(modal) {
    //   $scope.modal = modal;
    // });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

    var error = function (res) {
      if (res.error) {
        $ionicPopup.alert({
          title: '',
          template: res.error
        });
      }
    };

    $scope.forgotPassword = function(email) {
      User.forgot({email: email}, function (res) {
        if (!res.error) {
          $ionicPopup.alert({
            title: 'Check your email',
            template: res.message
          });
        }
        $scope.closeModal();
      }, error);
    };
  }
})();
