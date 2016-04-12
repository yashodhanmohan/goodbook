'use strict';

class UserNavbarController {
    constructor($location, $cookies, UserService) {
        this.$location = $location;
        this.UserService = UserService;
        this.cache = $cookies;
        this.firstName = this.cache.getObject('user').firstName;
        this.lastName = this.cache.getObject('user').lastName;
        this.search_terms = "";
    }

    search = () => {
        this.cache.put('search_terms', this.search_terms);
        this.$location.path('/search');
    }

    logout = () => {
        this.UserService.logout(this.cache.getObject('user')._id, (data, status) => {
            var all_cookies = this.cache.getAll();
            for (var key in all_cookies) {
                if (all_cookies.hasOwnProperty(key)) {
                    this.cache.remove(key);
                }
            }
            delete this.cache.remove('user');
            this.$location.path('/login');
        })
    }
}

angular.module('goodbookApp')
    .controller('UserNavbarController', UserNavbarController);
