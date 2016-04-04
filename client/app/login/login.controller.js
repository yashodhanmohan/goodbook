'use strict';

(function() {

    class LoginController {
        constructor($http, $location) {
            this.$http = $http;
            this.$location = $location;
            this.error = false;
            this.errorMessage = "Invalid username and/or password";
        }

        login = (username, password) => {
            this.$http.post('/api/v1/users/login', { username: username, password: password })
                .success((data, status) => {
                    if (status == 200 && data.status) {
                        this.$location.path('/');
                        this.$scope.disabled = false;
                    } else {
                        user = false;
                    }
                })
                .error((status) => {
                    this.error = true;
                    this.disabled = true;
                });
        }
    }
    
    angular.module('goodbookApp')
        .controller('LoginController', LoginController);
})();

// 'use strict';

// angular.module('goodbookApp')
//     .controller('LoginController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
//         $scope.login = function() {
//             //Initial values
//             $scope.error = false;
//             $scope.disabled = true;

//             //call login from service
//             AuthService.login($scope.loginform.username, $scope.loginform.password)
//                 //handle success
//                 .then(function() {
//                     $location.path('/');
//                     $scope.disabled = false;
//                 })
//                 //handle error
//                 .catch(function() {
//                     $scope.error = true;
//                     $scope.errorMessage = "Invalid username and/or password";
//                     $scope.disabled = true;
//                     $scope.loginForm = {};
//                 });

//         };
//     }]);
