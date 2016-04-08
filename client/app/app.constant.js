(function(angular, undefined) {
'use strict';

angular.module('goodbookApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']})
.constant('api', '/api/v1/')
.constant('userRoute', 'users/')
;
})(angular);