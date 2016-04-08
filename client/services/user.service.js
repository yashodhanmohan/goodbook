'use strict';

(function() {
    class UserService {

        constructor($http, api, userRoute) {
            this.$http = $http;
            this.api = api;
            this.userRoute = userRoute;
        }

        getUserByName = (username, callback) => {
            this.$http.get(this.api + this.userRoute + 'u/' + username)
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

        login = (credentials, callback) => {
            this.$http.post(this.api + this.userRoute + '/login', credentials)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }
    };


    angular.module('goodbookApp').service('UserService', UserService);

})();
