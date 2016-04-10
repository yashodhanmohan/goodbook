'use strict';

(function() {

    class LoginController {
        constructor($http, $location, $routeParams, UserService, OrgService, MyCache) {
            this.$http = $http;
            this.$location = $location;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.username = '';
            this.password = '';
            this.error = false;
            this.cache = MyCache;
            this.redirect = "/dashboard";
            if($routeParams.route)
                this.redirect = "/"+$routeParams.route;
        }

        login = () => {
            this.UserService.login({ username: this.username, password: this.password }, (data, status) => {
                if (status == 200 && data) {
                    if (data.password)
                        delete data.password;
                    this.cache.user = data;
                    this.cache.loggedIn = true;
                    this.cache.org = false;
                    // this.$location.path('/user/' + data.username);
                    this.disabled = false;
                    this.$location.path(this.redirect);
                } else {
                    this.OrgService.login({username: this.username, password: this.password}, (data, status) => {
                        if(status==200 && data) {
                            if(data.password)
                                delete data.password;
                            this.cache.user = data;
                            this.cache.loggedIn = true;
                            this.cache.org = true;
                            this.disabled = false;
                            this.$location.path(this.redirect);
                        }
                    });
                }
            });
        }
    }
    angular.module('goodbookApp').controller('LoginController', LoginController);
})();
