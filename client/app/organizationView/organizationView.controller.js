'use strict';

(function() {

    class OrganizationViewController {
        constructor($http, $location, $cookies, $routeParams, OrgService, UserService, EventService) {
            this.$http = $http;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.cache = $cookies;
            this.OrgService = OrgService;
            this.UserService = UserService;
            this.EventService = EventService;
            this.isUserVolunteer = [];

            this.user = this.cache.getObject('user');
            this.isOrg = this.cache.get('org') == 'true';
            $(document).ready(function() {
                $('.collapsible').collapsible({
                    accordion: false 
                });
            });
            OrgService.getOrgByName(this.$routeParams.username, (data, status) => {
                if (status == 200) {
                    this.org = data
                    this.isUserSubscribed = (this.org.subscribers.indexOf(this.cache.getObject('user')._id)!=-1)&&(this.cache.getObject('user').subscribedNGO.indexOf(this.org._id)!=-1);
                    EventService.getEventByOrganization(data._id, (data, status) => {
                        if (status == 200) {
                            this.events = data;
                            for (var x in this.events) {
                                this.events[x].startDate = (new Date(this.events[x].startDate)).toDateString();
                                if(this.events[x].volunteers.indexOf(this.cache.getObject('user')._id)==-1)
                                    this.isUserVolunteer.push(false);
                                else
                                    this.isUserVolunteer.push(true);
                            }
                        }
                    })
                }
            });
        }

        subscribe = () => {
            this.OrgService.subscribe(this.org._id, this.cache.getObject('user')._id, (data, status) => {
                if (status == 200) {
                    this.org = data;
                }
            });

            this.UserService.subscribe(this.cache.getObject('user')._id, this.org._id, (data, status) => {
                if (status == 200) {
                    this.cache.putObject('user', data);
                }
            })

            this.isUserSubscribed = true;
        }

        unsubscribe = () => {
            this.OrgService.unsubscribe(this.org._id, this.cache.getObject('user')._id, (data, status) => {
                if (status == 200) {
                    this.org = data;
                }
            });

            this.UserService.unsubscribe(this.cache.getObject('user')._id, this.org._id, (data, status) => {
                if (status == 200) {
                    this.cache.putObject('user', data);
                }
            })

            this.isUserSubscribed = false;
        }

        volunteer = (index) => {
            this.EventService.volunteer(this.events[index]._id, this.cache.getObject('user')._id, (data, status) => {
                if(status==200) {
                    this.events[index] = data;
                    this.events[index].startDate = (new Date(this.events[index].startDate)).toDateString();
                    this.isUserVolunteer[index] = true;
                }
            });
        }

        unvolunteer = (index) => {
            this.EventService.unvolunteer(this.events[index]._id, this.cache.getObject('user')._id, (data, status) => {
                if(status==200) {
                    this.events[index] = data;
                    this.events[index].startDate = (new Date(this.events[index].startDate)).toDateString();
                    this.isUserVolunteer[index] = false;
                }
            });
        }
    }

    angular.module('goodbookApp')
        .controller('OrganizationViewController', OrganizationViewController);
})();
