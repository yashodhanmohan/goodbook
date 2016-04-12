'use strict';

(function() {

    class DashboardController {
        constructor($http, $location, $cookies, UserService, OrgService, EventService) {
            this.$http = $http;
            this.$location = $location;
            this.cache = $cookies;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.EventService = EventService;
            this.user = this.cache.getObject('user');
            this.grading = '7/10';
            this.karma = this.user.karma;
            this.donated = this.user.donated;
            this.events = [];
            this.filters = ['Environment', 'Animals', 'Health', 'Child Education', 'Poverty and hunger', 'Farming'];
            this.EventService.getEventByVolunteer(this.user._id, (data, status) => {
                if (status == 200) {
                    this.events = data;
                    this.events.sort(function(a, b) {
                        a = new Date(a.startDate);
                        b = new Date(b.startDate);
                        return a > b ? -1 : a < b ? 1 : 0;
                    })
                }
            })
        }

        search = () => {
            this.cache.put('search_terms', this.search_terms);
            this.$location.path('/search');
        }

        eventClick = (x) => {
            this.OrgService.getOrgById(this.events[x].organizations[0], (data, status) => {
                this.$location.path('/organization/'+data.username)
            })
        }

    }
    angular.module('goodbookApp').controller('DashboardController', DashboardController);
})();
