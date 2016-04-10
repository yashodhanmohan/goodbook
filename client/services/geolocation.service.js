'use strict';

(function() {
    class GeolocationService {

        constructor($http, $location, googleMapApiUrl, googleMapKey, MyCache) {
            this.$http = $http;
            this.$location = $location;
            this.googleMapKey = googleMapKey;
            this.googleMapApiUrl = googleMapApiUrl;
            this.cache = MyCache;
        }

        location = (latitude, longitude, callback) => {
            this.$http.get(this.googleMapApiUrl, {
                    params: {
                        key: this.googleMapKey,
                        latlng: latitude + "," + longitude,
                        result_type: 'locality'
                    }
                })
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                })
        }

    };


    angular.module('goodbookApp').service('GeolocationService', GeolocationService);

})();
