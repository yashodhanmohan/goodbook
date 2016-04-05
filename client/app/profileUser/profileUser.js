 'use strict';

 angular.module('goodbookApp')
     .config(function($routeProvider) {
         $routeProvider
             .when('/uprofile/:id', {
                 templateUrl: 'app/profileUser/profileUser.html',
                 controller: 'ProfileController',
                 controllerAs: 'profileController'
             });
     });
