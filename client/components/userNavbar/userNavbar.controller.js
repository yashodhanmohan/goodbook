'use strict';

class UserNavbarController {
    constructor($location, UserService, MyCache) {
        this.$location = $location;
        this.UserService = UserService;
        this.cache = MyCache;
        this.firstName = MyCache.user.firstName;
        this.lastName = MyCache.user.lastName;
        this.search_terms = "";
    }

    search = () => {
        this.cache.search_terms = this.search_terms;
        this.$location.path('/search');
    }

    logout = () => {
        this.UserService.logout(this.cache.user._id, (data, status) => {
            delete this.cache.user;
            this.$location.path('/login');
        })
    }
}

angular.module('goodbookApp')
    .controller('UserNavbarController', UserNavbarController);
