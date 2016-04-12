'use strict';

(function() {

    class NotificationController {
        constructor($http, $location, $cookies, $routeParams) {

            this.cache = $cookies;
            if (this.cache.get('loggedIn')=='false') {
                $location.path('/login/redirect/notification');
            } else {
                this.$http = $http;
                this.$location = $location;
                this.notifications = [{}, {}, {}];
                this.queries = [{}, {}, {}];
                this.numberRecentQuery = 2;
            }

        }

        getNumber = (number) => {
            return new Array(number);
        }
    }



    angular.module('goodbookApp')
        .controller('NotificationController', NotificationController);
})();
