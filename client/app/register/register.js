'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/register/register.html',
                controller: 'RegisterController',
                controllerAs: 'register'
            });
    });
