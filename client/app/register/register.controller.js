'use strict';

(function() {

    class RegisterController {
        constructor($scope, $http, $location, UserService, OrgService, MyCache) {
            this.$http = $http;
            this.$location = $location;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.cache = MyCache;
            this.error = false;
            this.ind = true;
            this.first_name = "";
            this.last_name = "";
            this.org_name = "";
            this.username = "";
            this.email = "";
            this.password = "";
            this.accept_conditions = false;
            this.valid_username = true;
            this.valid_email = true;
        }

        register = () => {
            if (this.valid_username && this.valid_email && this.accept_conditions) {
                if (this.ind) {
                    this.UserService.postUser({
                        firstName: this.first_name,
                        lastName: this.last_name,
                        email: this.email,
                        username: this.username,
                        password: this.password
                    }, (data, status) => {
                        this.cache.user = data;
                    });
                } else {
                    this.OrgService.postOrg({
                        name: this.org_name,
                        email: this.email,
                        username: this.username,
                        password: this.password
                    }, (data, status) => {
                        this.cache.user = data;
                    })
                }
            }
        }

        check_username = () => {
            if (this.username.length != 0) {
                this.UserService.getUserByName(this.username, (data, status) => {
                    if (status == 200 && data.length != 0) {
                        this.valid_username = false;
                    } else {
                        this.OrgService.getOrgByName(this.username, (data, status) => {
                            if (status == 200 && data.length != 0) {
                                this.valid_username = false;
                            } else {
                                if (this.username.indexOf(' ') < 0)
                                    this.valid_username = true;
                                else
                                    this.valid_username = false;
                            }
                        });

                    }
                });
            }
        }

        check_email = () => {
            if (this.email.length != 0) {
                this.UserService.getUserByEmail(this.email, (data, status) => {
                    if (status == 200 && data.length != 0) {
                        this.valid_email = false;
                    } else {
                        this.OrgService.getOrgByEmail(this.email, (data, status) => {
                            if (status == 200 && data.length != 0) {
                                this.valid_email = false;
                            }
                        });

                    }
                });
            }
        }
    }

    angular.module('goodbookApp')
        .controller('RegisterController', RegisterController);
})();
