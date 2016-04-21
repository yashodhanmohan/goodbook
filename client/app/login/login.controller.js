'use strict';

(function() {

    class LoginController {
        constructor($http, $location, $cookies, $routeParams, UserService, OrgService) {
            this.$http = $http;
            this.$location = $location;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.username = '';
            this.password = '';
            this.error = false;
            this.cache = $cookies;
            this.redirect = "/dashboard";
            if ($routeParams.route)
                this.redirect = "/" + $routeParams.route;
            if(this.cache.get('loggedIn')=='true') {
                this.$location.path(this.redirect);
            }
        }

        login = () => {
            this.UserService.login({ username: this.username, password: this.password }, (data, status) => {
                if (status == 200 && data) {
                    if (data.password)
                        delete data.password;
                    this.cache.putObject('user', data);
                    this.cache.put('loggedIn', 'true');
                    this.cache.put('org', 'false');
                    this.error = false;
                    this.$location.path(this.redirect);
                } else {
                    this.OrgService.login({ username: this.username, password: this.password }, (data, status) => {
                        if (status == 200 && data) {
                            if (data.password)
                                delete data.password;
                            this.cache.putObject('user', data);
                            this.cache.put('loggedIn', 'true');
                            this.cache.put('org', 'true');
                            this.error = false;
                            this.$location.path('/console');
                        }
                        else
                            this.error = true;
                    });
                }
            });
        }
    }
    angular.module('goodbookApp').controller('LoginController', LoginController);
})();
