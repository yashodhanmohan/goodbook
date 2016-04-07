'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/organization/:id', {
                templateUrl: 'app/organizationView/organizationView.html',
                controller: 'OrganizationViewController',
                controllerAs: 'organizationView'
            });
    });
