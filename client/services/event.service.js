'use strict';

(function() {
    class EventService {

        constructor($http, $location, api, eventRoute, searchRoute) {
            this.$http = $http;
            this.$location = $location;
            this.api = api;
            this.eventRoute = eventRoute;
            this.searchRoute = searchRoute;
        }

        getEventById = (id, callback) => {
            this.$http.get(this.api + this.eventRoute + id)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                });
        }

        getEventByOrganization = (id, callback) => {
            this.$http.get(this.api+this.eventRoute+'?organization='+id)
                .then((response)=>{
                    callback(response.data, response.status);
                }, (response)=>{
                    callback(response.data, response.status);
                });
        }

        getEventByVolunteer = (id, callback) => {
            this.$http.get(this.api+this.eventRoute+'?volunteer='+id)
                .then((response)=>{
                    callback(response.data, response.status);
                }, (response)=>{
                    callback(response.data, response.status);
                });
        }

        postEvent = (event, callback) => {
            this.$http.post(this.api + this.eventRoute, event)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                })
        }

        putEvent = (id, event, callback) => {
            this.$http.put(this.api + this.eventRoute + '/' + id, event)
                .then((response) => {
                    callback(response.data, response.status);
                }, (response) => {
                    callback(response.data, response.status);
                })
        }

        search = (searchString, callback) => {
            this.$http.post(this.api+this.eventRoute+this.searchRoute,{query: searchString})
                .then((response)=>{
                    callback(response.data, response.status);
                }, (response)=>{
                    callback(response.data, response.status);
                })
        }

        volunteer = (eventId, userId, callback) => {
            this.$http.put(this.api + this.eventRoute + '/' + eventId + '/volunteer?volunteer='+ userId)
                .then((response)=>{
                    callback(response.data, response.status);
                }, (response)=>{
                    callback(response.data, response.status);
                });
        }

        unvolunteer = (eventId, userId, callback) => {
            this.$http.put(this.api + this.eventRoute + '/' + eventId + '/volunteer?unvolunteer='+ userId)
                .then((response)=>{
                    callback(response.data, response.status);
                }, (response)=>{
                    callback(response.data, response.status);
                });
        }

    };


    angular.module('goodbookApp').service('EventService', EventService);

})();
