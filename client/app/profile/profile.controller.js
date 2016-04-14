'use strict';

(function() {

    class ProfileController {
        constructor($http, $location, $routeParams, $cookies, UserService, OrgService) {
            this.$http = $http;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.cache = $cookies;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.user = this.cache.getObject('user');
            this.interests = "";
            this.subscribedNGO = [];
            for (var x in this.user.subscribedNGO) {
                this.OrgService.getOrgById(this.user.subscribedNGO[x], (data, status) => {
                    this.subscribedNGO.push(data);
                });
            }

            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });
        }

        update = () => {
            if (this.interests != "")
                this.user.interests = _.uniq(this.user.interests.concat(this.interests.split(",")))
            this.UserService.putUser(this.user._id, this.user, (data, status) => {
                if (status == 200) {
                    this.cache.putObject('user', data);
                }
            })
        }

        orgDelete = (index) => {
            this.OrgService.unsubscribe(this.subscribedNGO[index]._id, this.user._id, (data, status) => {
                if (status == 200 || status == 304) {
                    this.UserService.unsubscribe(this.user._id, this.subscribedNGO[index]._id, (data, status) => {
                        if (status == 200 || status == 304) {
                            this.subscribedNGO.splice(index, 1);
                            this.user.subscribedNGO.splice(index, 1);
                            this.cache.putObject('user', this.user);
                        }
                    })
                }
            })
        }

    }



    angular.module('goodbookApp')
        .controller('ProfileController', ProfileController);
})();
