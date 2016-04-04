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
        }

        register = () => {
            var data = {
                firstName: this.firstname,
                lastName: this.lastname,
                dob: this.birthday,
                email: this.email,
                username: this.username,
                password: this.password,
                contactNo: this.mobile
            }
            this.$http.post('/api/v1/users/register', data)
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