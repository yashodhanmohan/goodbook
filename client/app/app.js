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
	.run(function($cacheFactory){
		$cacheFactory('goodbookCache');
	})
	.constant('api', '/api/v1/')
	.constant('userRoute', 'users/');	