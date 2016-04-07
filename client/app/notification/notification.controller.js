'use strict';

(function() {

    class NotificationController {
        constructor($http, $location, $cacheFactory) {
            this.$http = $http;
            this.$location = $location;
            this.$cacheFactory = $cacheFactory;
            this.cache = this.$cacheFactory('goodbookCache');
            this.notifications = [{}, {}, {}];
            this.queries = [{}, {}, {}];
            this.numberRecentQuery = 2;
        }

        getNumber = (number) => {
            return new Array(number);
        }
    }



    angular.module('goodbookApp')
        .controller('NotificationController', NotificationController);
})();
