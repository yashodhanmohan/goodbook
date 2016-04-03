'use strict';
angular.module('myApp', [])
.controller('registerController', function ($scope, $http, $location) {
    $scope.register = function() {
        $scope.error = false;
        var data = $.param({
            json: JSON.stringify({
                firstName: $scope.firstname
                lastName: $scope.lastname
                dob: $scope.birthday
                email: $scope.email
                username: $scope.username
                password: $scope.password
                contactNo: $scope.mobile
            })
        });
        $http.post("/user/register/", data).success(function(data, status) {
            $location.path('/');
            $scope.disabled = false;
        })
        .error(function(status){
            $scope.error = true;
            $scope.errorMessage = "Username or email already exists";
            $scope.disabled = true;
        });
    }                   
})
