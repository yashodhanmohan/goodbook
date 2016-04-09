'use strict';

(function() {

    class ProfileController {
        constructor($http, $location, $routeParams) {
            this.$http = $http;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.fname = '';
            this.lname = '';
            this.email = '';
            this.contactNo = '';
            this.dob = '';
            this.lastLogin = '';
            this.karma = '';
            this.aboutMe = '';
            this.interests = [];
            this.subscribedNGO = [];
            this.error = '';
            this.password = '';
            this.fname1 = '';
            this.lname1 = '';
            this.dob1 = '';
            this.email1 = '';
            this._id = '';
            this.updateb = false;
            var u1 = $routeParams.id;
            console.log('/api/v1/users/u/' + u1)
            this.$http.get('/api/v1/users/u/' + u1)
                .success((data, status) => {
                    if (status == 200) {
                        console.log(data);
                        console.log(data['firstName']);
                        this._id = data['_id'];
                        this.fname = data['firstName'];
                        this.lname = data.lastName;
                        this.email = data.email;
                        this.contactNo = data.contactNo;
                        this.dob = data.dob;
                        this.username = data.username;
                        this.interests = data.interests;
                        this.subscribedNGO = data.subscribedNGO;
                        this.lastLogin = data.lastLogin;
                        this.karma = data.karma;
                        this.aboutMe = data.aboutMe;
                        this.password = data.password;
                        this.fname1 = data['firstName'];
                        this.lname1 = data.lastName;
                        this.email1 = data.email;
                        this.contactNo1 = data.contactNo;
                        this.dob1 = data.dob;
                    }
                })
                .error((status) => {
                    this.error = "Error Occured";
                    this.$location.path('/login');
                });
        }

        update = () => {
            this.updateb = true;
            var data = {
                firstName: this.fname1,
                lastName: this.lname1,
                dob: this.dob1,
                email: this.email1,
                username: this.username,
                password: this.password,
                contactNo: this.contactNo1
            };
            this.$http.put('/api/v1/users/' + this._id, data)
                .success((data2, status) => {
                    if (status == 200) {
                        console.log(data2['firstName']);
                        this.fname = data2['firstName'];
                        this.lname = data2.lastName;
                        this.email = data2.email;
                        this.contactNo = data2.contactNo;
                        this.dob = data2.dob;
                        this.username = data2.username;
                        this.updateb = false;
                    }
                })
                .error((status) => {
                    this.error = "Error Occured";
                    this.updateb = false;
                });

        }

    }



    angular.module('goodbookApp')
        .controller('ProfileController', ProfileController);
})();
