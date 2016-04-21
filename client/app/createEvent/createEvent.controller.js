'use strict';

(function() {

    class CreateEventController {
        constructor($window, $http, $location, $cookies, $routeParams, EventService) {
            this.$http = $http;
            this.$location = $location;
            this.cache = $cookies;
            this.$routeParams = $routeParams;
            this.$window = $window;
            this.EventService = EventService;

            this.user = this.cache.getObject('user');
            this.event = {};
            this.editMode = this.cache.get('editMode') == 'true';
            if (this.editMode) {
                this.event = this.cache.getObject('editEvent');
                this.event.startDate = new Date(this.event.startDate);
                this.event.endDate = new Date(this.event.endDate);
            }
            this.events = {};
            this.loggedIn = this.cache.get('loggedIn') == 'true';
            this.EventService.getEventByOrganization(this.user._id, (data, status) => {
                if (status == 200) {
                    this.events = data;
                    for (var x in this.events) {
                        this.events[x].startDate = (new Date(this.events[x].startDate)).toDateString();
                    }
                }
            })
            this.$window.document.title = 'Edit event';
        }

        save = () => {
            if (!this.editMode) {
                this.event.organizations = [this.user._id];
                this.EventService.postEvent(this.event, (data, status) => {})
            } else {
                this.EventService.putEvent(this.event._id, this.event, (data, status) => {
                    console.log(data);
                    console.log(status);
                })
            }
            this.cache.remove('editMode');
            this.cache.remove('editEvent');
            this.$location.path('/console');
        }
    }



    angular.module('goodbookApp')
        .controller('CreateEventController', CreateEventController);
})();
