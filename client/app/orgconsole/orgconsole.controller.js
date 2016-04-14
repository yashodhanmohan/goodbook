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
            // Organization variables
            this.org = this.cache.getObject('user');

            $(document).ready(function() {
                $('.collapsible').collapsible({
                    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
                $('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false, // Does not change width of dropdown to that of the activator
                    hover: false, // Activate on hover
                    gutter: 0, // Spacing from edge
                    belowOrigin: true, // Displays dropdown below the button
                    alignment: 'right' // Displays dropdown with edge aligned to the left of button
                });
                $('.modal-trigger').leanModal();
            });

            EventService.getEventByOrganization(this.org._id, (data, status) => {
                if (status == 200) {
                    this.events = data;
                    for (var x in this.events) {
                        this.events[x].startDate = (new Date(this.events[x].startDate)).toDateString();
                        this.events[x].edit = false;
                    }
                }
            })
        }
    }
    angular.module('goodbookApp').controller('OrgconsoleController', OrgconsoleController);
})();
