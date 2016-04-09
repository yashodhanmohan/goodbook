'use strict';

(function() {

    class LoginController {
        constructor($http, $location, $cacheFactory, UserService) {
            this.$http = $http;
            this.$location = $location;
            this.$cacheFactory = $cacheFactory;
            this.UserService = UserService;
            this.username = '';
            this.password = '';
            this.error = false;
            this.cache = $cacheFactory.get('goodbookCache');
        }

        login = () => {
            this.UserService.login({ username: this.username, password: this.password }, (data, status) => {
                if (status == 200 && data) {
                    if (data.password)
                        delete data.password;
                    this.cache.put('user', data);
                    this.cache.put('loggedIn', true);
                    // this.$location.path('/user/' + data.username);
                    this.$location.path('/notification');
                    this.disabled = false;
                } else {
                    this.error = true;
                }
            });
        }
    }
    angular.module('goodbookApp').controller('LoginController', LoginController);
})();
