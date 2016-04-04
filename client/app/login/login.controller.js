'use strict';

(function() {

    class LoginController {
        constructor($http, $location, $cacheFactory) {
            this.$http = $http;
            this.$location = $location;
            this.$cacheFactory = $cacheFactory;
            this.username = '';
            this.password = '';
            this.error = false;
            this.cache = this.$cacheFactory('goodbookCache');
        }

        login = () => {
            console.log('Entering login function with values '+this.username+', '+this.password);
            this.$http.post('/api/v1/users/login', { username: this.username, password: this.password })
                .success((data, status) => {
                    if (status == 200 && data) {
                        console.log(data);
                        delete data.password;
                        this.cache.put('userdata', data);
                        this.$location.path('/uprofile/'+data.username);
                        this.disabled = false;
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