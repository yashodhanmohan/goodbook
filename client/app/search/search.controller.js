'use strict';

(function() {

    class SearchController {
        constructor($http, $location, $cookies, UserService, OrgService, EventService) {
            // Services
            this.$http = $http;
            this.$location = $location;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.EventService = EventService;
            this.cache = $cookies;

            // Query terms from another controller
            this.query = this.cache.get('search_terms');
            // this.cache.remove('search_terms');
            
            // Result storage
            this.requestCount = 0;
            this.orgResults = [];
            this.groupedOrgResults = [];
            this.isUserSubscribed = [];
            this.eventResults = [];
            this.groupedEventResults = [];
            this.isUserVolunteer = [];

            // CSS variables
            this.showOrgs = false;
            this.showEvents = false;

            // If query from another page, search
            if (this.query && this.query != ""){
                $('#searchlabel').addClass('active');
                this.search();
            }
        }

        group = (results, groupSize) => {
            var temp = [];
            var paddedResults = [];
            for (var i = 1; i <= results.length; i++) {
                if (i % groupSize == 0) {
                    paddedResults.push(temp);
                    temp = [];
                } else {
                    temp.push(results[i-1])
                }
            }
            if (temp.length > 0)
                paddedResults.push(temp);
            return paddedResults;
        }

        search = () => {
            this.cache.search_terms = this.search_terms;
            this.resultCount = 0;
            this.orgResults = [];
            this.eventResults = [];

            this.OrgService.search(this.query, (data, status) => {
                this.orgResults = data;
                this.groupedOrgResults = this.group(this.orgResults, 3);
                this.resultCount += this.orgResults.length;
                for(var i in this.groupedOrgResults){
                    var row = [];
                    for(var j in this.groupedOrgResults[i]){
                        row.push(this.groupedOrgResults[i][j].subscribers.indexOf(this.cache.getObject('user')._id)!=-1)
                    }
                    this.isUserSubscribed.push(row);
                }
                this.requestCount += 1;
                if(this.requestCount==2){
                    this.requestCount = 0;
                    this.selectTab();
                }
            });

            this.EventService.search(this.query, (data, status) => {
                this.eventResults = data;
                this.groupedEventResults = this.group(this.eventResults, 3);
                this.resultCount += this.eventResults.length;
                for(var i in this.groupedEventResults){
                    var row = [];
                    for(var j in this.groupedEventResults[i]){
                        row.push(this.groupedEventResults[i][j].volunteers.indexOf(this.cache.getObject('user')._id)!=-1)
                    }
                    this.isUserVolunteer.push(row);
                }
                this.requestCount += 1;
                if(this.requestCount==2){
                    this.requestCount = 0;
                    this.selectTab();
                }
            });
        }

        changeTab = (x) => {
            if (x == 1) {
                this.showOrgs = true;
                this.showEvents = false;
            } else if (x == 2) {
                this.showOrgs = false;
                this.showEvents = true;
            }
        }

        selectTab = () => {
            if(this.orgResults.length!=0)
                this.changeTab(1);
            else if (this.eventResults.length!=0)
                this.changeTab(2);
            else
                this.changeTab(1);
        }

        subscribe = (i, j) => {
            this.OrgService.subscribe(this.groupedOrgResults[i][j]._id, this.cache.getObject('user')._id, (data, status) => {
                if (status == 200) {
                    this.groupedOrgResults[i][j] = data;
                }
            });

            this.UserService.subscribe(this.cache.getObject('user')._id, this.groupedOrgResults[i][j]._id, (data, status) => {
                if (status == 200) {
                    this.cache.putObject('user', data);
                }
            })

            this.isUserSubscribed[i][j] = true;
        }

        unsubscribe = (i, j) => {
            this.OrgService.unsubscribe(this.groupedOrgResults[i][j]._id, this.cache.getObject('user')._id, (data, status) => {
                if (status == 200) {
                    this.groupedOrgResults[i][j] = data;
                }
            });

            this.UserService.unsubscribe(this.cache.getObject('user')._id, this.groupedOrgResults[i][j]._id, (data, status) => {
                if (status == 200) {
                    this.cache.putObject('user', data);
                }
            })

            this.isUserSubscribed[i][j] = false;
        }

        volunteer = (i, j) => {
            this.EventService.volunteer(this.groupedEventResults[i][j]._id, this.cache.getObject('user')._id, (data, status) => {
                if(status==200) {
                    this.groupedEventResults[i][j] = data;
                    this.isUserVolunteer[i][j] = true;
                }
            });
        }

        unvolunteer = (i, j) => {
            this.EventService.unvolunteer(this.groupedEventResults[i][j]._id, this.cache.getObject('user')._id, (data, status) => {
                if(status==200) {
                    this.groupedEventResults[i][j] = data;
                    this.isUserVolunteer[i][j] = false;
                }
            });
        }

        navigate = (i, j) => {
            this.OrgService.getOrgById(this.groupedEventResults[i][j].organizations[0], (data, status) => {
                this.$location.path('/organization'+'/'+data.username);
            })
        }

    }

    angular.module('goodbookApp')
        .controller('SearchController', SearchController);
})();
