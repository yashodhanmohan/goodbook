'use strict';
angular.module('myApp')
.controller('loginController',[$scope,$location,AuthService,function($scope,$location,AuthService){
	$scope.login=function(){
		//Initial values
		$scope.error=false;
		$scope.disabled=true;

		//call login from service
		AuthService.login($scope.loginform.username,$scope.loginform.password)
		//handle success
		.then(function(){
		  $location.path('/');
          $scope.disabled = false;
          })
		//handle error
		.catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = true;
          $scope.loginForm = {};
        });

	};
}]);