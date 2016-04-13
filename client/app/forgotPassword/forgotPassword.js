'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/forgotPassword', {
                templateUrl: 'app/forgotPassword/forgotPassword.html',
                controller: 'ForgotPasswordController',
                controllerAs: 'forgot'
            })
    });
