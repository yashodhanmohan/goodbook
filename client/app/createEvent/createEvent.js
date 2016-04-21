'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/createEvent', {
                templateUrl: 'app/createEvent/createEvent.html',
                controller: 'CreateEventController',
                controllerAs: 'createEvent'
            });
    });
