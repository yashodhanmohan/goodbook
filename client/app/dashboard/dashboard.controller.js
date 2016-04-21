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
            if(this.cache.get('loggedIn')!='true') {
                this.$location.path('/login');
            }
            this.user = this.cache.getObject('user');
            this.ind = !(this.cache.get('org')=='true');
            this.grading = this.user.rating;
            this.karma = this.user.karma;
            this.donated = this.user.donated;
            this.events = [];
            this.filters = ['Environment', 'Animals', 'Health', 'Child Education', 'Poverty and hunger', 'Farming'];
            this.EventService.getEventByVolunteer(this.user._id, (data, status) => {
                if (status == 200) {
                    this.events = _.uniq(this.events.concat(data), '_id');
                    this.events.sort(function(a, b) {
                        a = new Date(a.startDate);
                        b = new Date(b.startDate);
                        return a > b ? -1 : a < b ? 1 : 0;
                    })
                }
            });
            for(var x in this.user.subscribedNGO){
                this.EventService.getEventByOrganization(this.user.subscribedNGO[x], (data, status) => {
                    if(status==200) {
                        this.events = _.uniq(this.events.concat(data), '_id');
                    }
                });
            }
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
