'use strict';

(function() {

    class OrgconsoleController {
        constructor($http, $location, $cookies, $routeParams, UserService, OrgService, EventService) {
            // Services initialization
            this.$http = $http;
            this.$location = $location;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.EventService = EventService;
            this.cache = $cookies;
            console.log('reaching here');
            // Organization variables
            this.org = this.cache.getObject('user');

            $(document).ready(function() {
                $('.collapsible').collapsible({
                    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
            });
            EventService.getEventByOrganization(this.org._id, (data, status) => {
                if (status == 200) {
                    this.events = data;
                    for (var x in this.events) {
                        this.events[x].startDate = (new Date(this.events[x].startDate)).toDateString();
                    }
                }
            })
        }
    }
    angular.module('goodbookApp').controller('OrgconsoleController', OrgconsoleController);
})();
