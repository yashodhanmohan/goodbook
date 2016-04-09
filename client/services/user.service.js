'use strict';

(function() {
    class UserService {

        constructor($http, $location, api, userRoute, googleMapApiUrl, googleMapKey, MyCache) {
            this.$http = $http;
            this.api = api;
            this.userRoute = userRoute;
            this.googleMapKey = googleMapKey;
            this.googleMapApiUrl = googleMapApiUrl;
            this.$location = $location;
            this.cache = MyCache;
        }

        getUserByName = (username, callback) => {
            this.$http.get(this.api + this.userRoute + '?username=' + username)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        getUserById = (id, callback) => {
            this.$http.get(this.api + this.userRoute + id)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        getUserByEmail = (email, callback) => {
            this.$http.get(this.api + this.userRoute + '?email=' + email)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        postUser = (user, callback) => {
            this.$http.post(this.api + this.userRoute, user)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                })
        }

        login = (credentials, callback) => {
            this.$http.post(this.api + this.userRoute + '/login', credentials)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
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
                    console.log(response);
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                })
        }

        checkLogin = (redirectUrl, callback) => {
            if (!this.cache.loggedIn) {
                this.$location.path('/login/redirect' + redirectUrl);
            } else {
                callback();
            }
        }
    };


    angular.module('goodbookApp').service('UserService', UserService);

})();
