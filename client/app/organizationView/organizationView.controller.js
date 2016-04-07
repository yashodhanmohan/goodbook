'use strict';

(function() {

    class OrganizationViewController {
        constructor($http, $location, $cacheFactory) {
            this.$http = $http;
            this.$location = $location;
            this.$cacheFactory = $cacheFactory;
            this.cache = this.$cacheFactory('goodbookCache');
            this.events = [{}, {}, {}, {}, {}, {}]
        }
    }

    angular.module('goodbookApp')
        .controller('OrganizationViewController', OrganizationViewController);
})();