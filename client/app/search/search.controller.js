'use strict';

(function() {

    class SearchController {
        constructor($http, $location, $cacheFactory) {
            this.$http = $http;
            this.$location = $location;
            this.$cacheFactory = $cacheFactory;
            this.cache = this.$cacheFactory('goodbookCache');
            this.results = [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}], [{}, {}]]
            this.resultCount = 11;
        }
    }

    angular.module('goodbookApp')
        .controller('SearchController', SearchController);
})();