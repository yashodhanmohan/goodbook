 'use strict';

 angular.module('goodbookApp')
     .config(function($routeProvider) {
         $routeProvider
             .when('/', {
                 templateUrl: 'app/login/login.html',
                 controller: 'LoginController',
                 controllerAs: 'login'
             });
     });
