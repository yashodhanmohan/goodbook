'use strict';

(function() {

    class LoginController {
        constructor($http, $location) {
            this.$http = $http;
            this.$location = $location;
            this.username = '';
            this.password = '';
            this.error = false;
        }

        login = () => {
            console.log('Entering login function with values '+this.username+', '+this.password);
            this.$http.post('/api/v1/users/login', { username: this.username, password: this.password })
                .success((data, status) => {
                    if (status == 200) {
                        this.$location.path('/uprofile/'+data.username);
                        this.$scope.disabled = false;
                    } else {
                        this.error = true;
                    }
                })
                .error((status) => {
                    console.log(status);
                    this.error = true;
                });
        }
    }

    angular.module('goodbookApp')
        .controller('LoginController', LoginController);
})();