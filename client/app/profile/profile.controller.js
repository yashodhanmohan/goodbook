'use strict';

(function() {

    class ProfileController {
        constructor($window, $http, $location, $routeParams, $cookies, UserService, OrgService) {
            this.$window = $window;
            this.$http = $http;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.cache = $cookies;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.user = this.cache.getObject('user');
            this.user.dob = new Date(this.user.dob);
            this.$window.document.title = this.user.firstName + ' ' + this.user.lastName;
            this.interests = "";
            this.subscribedNGO = [];
            for (var x in this.user.subscribedNGO) {
                this.OrgService.getOrgById(this.user.subscribedNGO[x], (data, status) => {
                    this.subscribedNGO.push(data);
                });
            }

            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 150 // Creates a dropdown of 150 years to control year
            });
        }

        update = () => {
            if (this.interests != "") {
                // this.user.interests = _.filter(_.uniq(_.filter(_.map(this.user.interests.concat(this.interests.split(",")), _.trim), function(x) {return x!=''})))
                var uniq_interests = _.uniq(_.map(this.interests.split(','), _.trim));
                uniq_interests = _.filter(uniq_interests, function(x) {return x!='' && x!=' '});
                this.user.interests = this.user.interests.concat(uniq_interests);
                this.user.interests = _.uniq(_.map(this.user.interests, _.trim));
            }
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
