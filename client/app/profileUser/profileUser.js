 'use strict';

 angular.module('goodbookApp')
     .config(function($routeProvider) {
         $routeProvider
             .when('/user/:id', {
                 templateUrl: 'app/profileUser/profileUser.html',
                 controller: 'ProfileController',
                 controllerAs: 'profileController'
             });
     });
