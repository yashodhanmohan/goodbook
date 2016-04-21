'use strict';

class UserNavbarController {
    constructor($location, $cookies, UserService) {
        this.$location = $location;
        this.UserService = UserService;
        this.cache = $cookies;
        this.user = this.cache.getObject('user');
        console.log(this.user);
        this.org = this.cache.get('ind') == 'false';
        this.showNotifPanel = false;
        this.search_terms = ""; 
        this.notifications = [{type: 4, subscriberCount: 5, link: '/subscribers'}, {type: 2, content: 'What is the duration of the event ?'},{type: 4, subscriberCount: 5, link: '/subscribers'}, {type: 2, content: 'What is the duration of the event ?'},{type: 4, subscriberCount: 5, link: '/subscribers'}];
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
