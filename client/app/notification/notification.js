'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/notification', {
                templateUrl: 'app/notification/notification.html',
                controller: 'NotificationController',
                controllerAs: 'notification'
            });
    });
