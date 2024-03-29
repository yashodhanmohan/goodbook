'use strict';

(function() {
    class OrgService {

        constructor($http, $location, api, orgRoute, searchRoute, googleMapApiUrl, googleMapKey) {
            this.$http = $http;
            this.api = api;
            this.orgRoute = orgRoute;
            this.searchRoute = searchRoute;
            this.googleMapKey = googleMapKey;
            this.googleMapApiUrl = googleMapApiUrl;
            this.$location = $location;
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
            this.$http.get(this.api + this.orgRoute + '/' + id)
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

        putOrg = (id, org, callback) => {
            this.$http.put(this.api + this.orgRoute + '/' + id, org)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                })
        }

        login = (credentials, callback) => {
            this.$http.post(this.api + this.orgRoute + '/login', credentials)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        checkLogin = (redirectUrl, callback) => {
            if (!this.cache.get('loggedIn') == 'true') {
                this.$location.path('/login/redirect' + redirectUrl);
            } else {
                callback();
            }
        }

        search = (searchString, callback) => {
            this.$http.post(this.api + this.orgRoute + this.searchRoute, { query: searchString })
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                })
        }

        subscribe = (orgId, userId, callback) => {
            this.$http.put(this.api + this.orgRoute + '/' + orgId + '/subscription?subscribe=' + userId)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        unsubscribe = (orgId, userId, callback) => {
            this.$http.put(this.api + this.orgRoute + '/' + orgId + '/subscription?unsubscribe=' + userId)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

    };


    angular.module('goodbookApp').service('OrgService', OrgService);

})();
