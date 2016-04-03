angular.module('goodbookApp')
.config(function ($routeProvider) {
  $routeProvider
    .when('/register', {
      templateUrl: 'register.view.html',
      controller: 'registerController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
