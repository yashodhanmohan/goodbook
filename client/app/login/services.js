/*
Here, we simply defined the service name, AuthService, and then 
injected the dependencies that we will be using - $q, $timeout, $http - 
and then returned the functions, which we still need to write, for use 
outside the service.
*/
angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      //isLoggedIn: isLoggedIn,
      //getUserStatus: getUserStatus,
      login: login, 
      //logout: logout,
      //register: register
    });

}]);
//Now we need to create the login function
function login(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/user/login',
    {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status == 200 && data.status){
        user = true;
        deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (status) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}
