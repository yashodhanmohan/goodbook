myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.view.html',
      controller: 'loginController'
    })
    .when('/register', {
      templateUrl: 'partials/register.view.html',
      controller: 'registerController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
