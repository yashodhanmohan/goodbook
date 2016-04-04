'use strict';

(function() {

    class RegisterController {
        constructor($http, $location) {
            this.$http = $http;
            this.$location = $location;
            this.error = false;
            this.errorMessage = "ERROR!!";
            this.disabled1 = false;
            this.disabled2 = true;
        change =() => {
        	this.disabled2 = false;
        }
        register =() => {
        	var data ={
        		firstName: this.firstname
	            lastName: this.lastname
                dob: this.birthday
                email: this.email
                username: this.username
                password: this.password
                contactNo: this.mobile
        	}
            this.$http.post('/api/v1/users/register',data)
                .success((data, status) => {
          			this.$location.path('/');
                    this.disabled1 = false;
                })
                .error((status) => {
                    this.error = true;
                    this.disabled1 = true;
                });
        }
    }
    
    angular.module('goodbookApp')
        .controller('RegisterController', RegisterController);
})();

// 'use strict';
// angular.module('goodbookApp', [])
//     .controller('registerController', ['$scope', '$http', '$location', function($scope, $http, $location) {
//         $scope.register = function() {
//             $scope.error = false;
//             var data = $.param({
//                 json: JSON.stringify({
//                     firstName: $scope.firstname
//                     lastName: $scope.lastname
//                     dob: $scope.birthday
//                     email: $scope.email
//                     username: $scope.username
//                     password: $scope.password
//                     contactNo: $scope.mobile
//                 })
//             });
//             $http.post("/user/register/", data).success(function(data, status) {
//                     $location.path('/');
//                     $scope.disabled = false;
//                 })
//                 .error(function(status) {
//                     $scope.error = true;
//                     $scope.errorMessage = "Username or email already exists";
//                     $scope.disabled = true;
//                 });
//         }
//     }])

