'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/register', {
                templateUrl: 'app/register/register.html',
                controller: 'RegisterController'
            });
    });
