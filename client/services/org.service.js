'use strict';

(function() {
    class OrgService {

        constructor($http, $location, api, userRoute, orgRoute, googleMapApiUrl, googleMapKey, MyCache) {
            this.$http = $http;
            this.api = api;
            this.userRoute = userRoute;
            this.orgRoute = orgRoute;
            this.googleMapKey = googleMapKey;
            this.googleMapApiUrl = googleMapApiUrl;
            this.$location = $location;
            this.cache = MyCache;
        }

        getOrgByName = (username, callback) => {
            this.$http.get(this.api + this.orgRoute + '?username=' + username)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        getOrgById = (id, callback) => {
            this.$http.get(this.api + this.orgRoute + id)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        getOrgByEmail = (email, callback) => {
            this.$http.get(this.api + this.orgRoute + '?email=' + email)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        postOrg = (org, callback) => {
            this.$http.post(this.api + this.orgRoute, org)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                })
        }

        login = (credentials, callback) => {
            this.$http.post(this.api + this.userRoute + 'login/', credentials)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        checkLogin = (redirectUrl, callback) => {
            if (!this.cache.loggedIn) {
                this.$location.path('/login/redirect' + redirectUrl);
            } else {
                callback();
            }
        }
    };


    angular.module('goodbookApp').service('OrgService', OrgService);

})();
