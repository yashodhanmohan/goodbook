'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .when('/login/redirect/:route', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            });
    });
