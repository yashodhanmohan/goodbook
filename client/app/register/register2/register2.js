'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/register/step2', {
                templateUrl: 'app/register/register2/register2.html',
                controller: 'Register2Controller',
                controllerAs: 'register2'
            });
    });
