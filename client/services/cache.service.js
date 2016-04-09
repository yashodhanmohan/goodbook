'use strict';

(function() {

    angular.module('goodbookApp')
        .factory('MyCache', function($cacheFactory){
            var data = {};
            return data;
        });

})();
