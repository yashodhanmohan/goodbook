'use strict';

(function() {

    class NotificationController {
        constructor($http, $location, $routeParams, MyCache) {

            this.cache = MyCache;
            if (this.cache.loggedIn==false) {
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
