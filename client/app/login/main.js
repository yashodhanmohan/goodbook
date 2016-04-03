angular.module('goodbookApp')
.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'login.view.html',
      controller: 'loginController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
