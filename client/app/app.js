'use strict';

angular.module('goodbookApp', [
        'goodbookApp.constants',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);

    })
    .run(function() {
        $(document).ready(function() {
        });

    })
    .constant('api', '/api/v1')
    .constant('userRoute', '/users')
    .constant('orgRoute', '/organizations')
    .constant('eventRoute', '/events')
    .constant('searchRoute', '/search')
    .constant('googleMapKey', 'AIzaSyCrc5Fv1KT0Hyzs9rA6ehHyrTe5ic_p-qQ')
    .constant('googleMapApiUrl', 'https://maps.googleapis.com/maps/api/geocode/json?');
