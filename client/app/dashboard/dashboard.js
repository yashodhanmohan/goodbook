'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard'
            })
    });
