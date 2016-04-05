'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/search', {
                templateUrl: 'app/search/search.html',
                controller: 'SearchController',
                controllerAs: 'search'
            });
    });
