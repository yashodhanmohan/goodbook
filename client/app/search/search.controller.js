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
            this.cache.remove('search_terms');
            
            // Result storage
            this.requestCount = 0;
            this.userResults = [];
            this.groupedUserResults = [];
            this.orgResults = [];
            this.groupedOrgResults = [];
            this.eventResults = [];
            this.groupedEventResults = [];

            // CSS variables
            this.showUsers = true;
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
            this.resultCount = 0;
            this.orgResults = [];
            this.eventResults = [];
            this.userResults = [];
            this.UserService.search(this.query, (data, status) => {
                this.userResults = data;
                for (var i in this.userResults) {
                    if (this.userResults[i].username == this.cache.getObject('user').username) {
                        this.userResults.splice(i, 1);
                        break;
                    }
                }
                this.groupedUserResults = this.group(this.userResults, 3);
                this.requestCount += 1;
                console.log(this.requestCount);
                if(this.requestCount==3){
                    this.requestCount = 0;
                    console.log('reaching here1');
                    this.selectTab();
                }
                this.resultCount += this.userResults.length;
            });

            this.OrgService.search(this.query, (data, status) => {
                this.orgResults = data;
                this.groupedOrgResults = this.group(this.orgResults, 3);
                this.resultCount += this.orgResults.length;
                this.requestCount += 1;
                console.log(this.requestCount);
                if(this.requestCount==3){
                    this.requestCount = 0;
                    console.log('reaching here2');
                    this.selectTab();
                }
            });

            this.EventService.search(this.query, (data, status) => {
                this.eventResults = data;
                this.groupedEventResults = this.group(this.eventResults, 3);
                this.resultCount += this.eventResults.length;
                this.requestCount += 1;
                console.log(this.requestCount);
                if(this.requestCount==3){
                    this.requestCount = 0;
                    console.log('reaching here3');
                    this.selectTab();
                }
            });
        }

        changeTab = (x) => {
            if (x == 0) {
                console.log('Clicking on user');
                this.showUsers = true;
                this.showOrgs = false;
                this.showEvents = false;
            } else if (x == 1) {
                console.log('Clicking on organisation');
                this.showUsers = false;
                this.showOrgs = true;
                this.showEvents = false;
            } else if (x == 2) {
                console.log('Clicking on events');
                this.showUsers = false;
                this.showOrgs = false;
                this.showEvents = true;
            }
        }

        selectTab = () => {
            if(this.userResults.length!=0)
                this.changeTab(0);
            else if(this.orgResults.length!=0)
                this.changeTab(1);
            else if (this.eventResults.length!=0)
                this.changeTab(2);
            else
                this.changeTab(0);
        }
    }

    angular.module('goodbookApp')
        .controller('SearchController', SearchController);
})();
