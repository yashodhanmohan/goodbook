'use strict';

angular.module('goodbookApp')
    .directive('usernavbar', () => ({
        templateUrl: 'components/userNavbar/userNavbar.html',
        restrict: 'E',
        controller: 'UserNavbarController',
        controllerAs: 'userNav'
    }));
