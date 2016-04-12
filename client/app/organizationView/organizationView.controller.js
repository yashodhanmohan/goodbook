'use strict';

(function() {

    class OrganizationViewController {
        constructor($http, $location, $cookies, $routeParams, OrgService) {
            this.$http = $http;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.cache = $cookies;
            this.events = [{}, {}, {}, {}, {}, {}]
            this.OrgService = OrgService;
            OrgService.getOrgByName(this.$routeParams.username, (data, status) => {
                if(status==200) {
                    this.name = data.name;
                    this.aboutUs = data.aboutUs;
                    this.email = data.email;
                }
            });

        }
    }

    angular.module('goodbookApp')
        .controller('OrganizationViewController', OrganizationViewController);
})();