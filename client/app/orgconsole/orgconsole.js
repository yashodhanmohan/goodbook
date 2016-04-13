'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/console', {
                templateUrl: 'app/orgconsole/orgconsole.html',
                controller: 'OrgconsoleController',
                controllerAs: 'console'
            });
    });
