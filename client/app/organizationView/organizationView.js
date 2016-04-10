'use strict';

angular.module('goodbookApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/organization/:username', {
                templateUrl: 'app/organizationView/organizationView.html',
                controller: 'OrganizationViewController',
                controllerAs: 'organizationView'
            });
    });
