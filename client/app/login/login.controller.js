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
            if (this.$cacheFactory.get('goodbookCache')) {
                var cache = this.$cacheFactory.get('goodbookCache');
                if (cache.get('loggedIn')) {
                    var data = this.$cacheFactory.get('goodbookCache').get('userdata');
                    this.$location.path('/uprofile/' + data.username);
                }
            }
            else
                this.cache = this.$cacheFactory('goodbookCache');
        }

        login = () => {
            this.$http.post('/api/v1/users/login', { username: this.username, password: this.password })
                .success((data, status) => {
                    if (status == 200 && data) {
                        delete data.password;
                        this.cache.put('userdata', data);
                        this.cache.put('loggedIn', true);
                        this.$location.path('/uprofile/' + data.username);
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
