 'use strict';

 angular.module('goodbookApp')
     .config(function($routeProvider) {
         $routeProvider
             .when('/profile', {
                 templateUrl: 'app/profile/profile.html',
                 controller: 'ProfileController',
                 controllerAs: 'profile'
             });
     });
