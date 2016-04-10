'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/register', {
                templateUrl: 'app/register/register/register.html',
                controller: 'RegisterController',
                controllerAs: 'register'
            });
    });
