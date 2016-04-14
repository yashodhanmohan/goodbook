'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/noonereacheshere', {
                templateUrl: 'app/landing/landing.html',
                controller: 'LandingController',
                controllerAs: 'landing'
            })
    });
