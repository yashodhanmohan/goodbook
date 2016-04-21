'use strict';

(function() {

    class Register2Controller {
        constructor($scope, $http, $location, $cookies, UserService, OrgService) {
            // Services
            this.$http = $http;
            this.$location = $location;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.cache = $cookies;
            this.ind = (this.cache.get('ind')=='true');
            // NG Models
            // Common
            this.email = "";
            this.contactNo = "";
            this.profilepic = "";
            // Individual
            this.first_name = "";
            this.last_name = "";
            this.dob = "";
            this.aboutMe = "";
            this.gender = "";
            // Organization
            this.org_name = "";
            this.yoe = "";
            this.regNo = "";
            this.address = "";
            this.aboutUs = "";
            this.aow = [false, false, false, false, false, false];
            this.scale = "";
            this.founder = "";
            if (this.ind) {
                this.first_name = this.cache.getObject('user').firstName;
                this.last_name = this.cache.getObject('user').lastName;
                this.email = this.cache.getObject('user').email;
                this.username = this.cache.getObject('user').username;
            } else {
                this.org_name = this.cache.getObject('user').name;
                this.email = this.cache.getObject('user').email;
                this.username = this.cache.getObject('user').username;
            }

            if (this.ind)
                this.imagefile = document.getElementById('imagefile2');
            else
                this.imagefile = document.getElementById('imagefile');

            this.imagefile.onchange = () => {
                var reader = new FileReader();
                reader.onload = (e) => {
                    if (this.ind)
                        document.getElementById("profilepic2").src = e.target.result;
                    else
                        document.getElementById("profilepic").src = e.target.result;
                    this.profilepic = e.target.result;
                };
                reader.readAsDataURL(this.imagefile.files[0]);
            };

            $('.datepicker').pickadate({
                selectMonths: true,
                selectYears: 15
            });
        }

        save = () => {
            if (!this.ind) {
                var aow = [];
                if (this.aow[0])
                    aow.push('education');
                if (this.aow[1])
                    aow.push('farming');
                if (this.aow[2])
                    aow.push('animals');
                if (this.aow[3])
                    aow.push('save girl child');
                if (this.aow[4])
                    aow.push('environment');
                if (this.aow[5])
                    aow.push('women empowerment');
                this.OrgService.putOrg(this.cache.getObject('user')._id, {
                    name: this.org_name,
                    contactNo: this.contactNo,
                    address: this.address,
                    aboutUs: this.aboutUs,
                    profilePic: this.profilepic,
                    aow: aow
                }, (data, status) => {
                    if (status == 200) {
                        this.cache.putObject('user', data);
                        this.cache.put('loggedIn', 'true');
                        this.$location.path('/console');
                    }
                });
            } else {
                this.UserService.putUser(this.cache.getObject('user')._id, {
                    firstName: this.first_name,
                    lastName: this.last_name,
                    contactNo: this.contactNo,
                    aboutMe: this.aboutMe,
                    profilePic: this.profilepic
                }, (data, status) => {
                    if (status == 200) {
                        this.cache.putObject('user', data);
                        this.cache.put('loggedIn', 'true');
                        this.$location.path('/dashboard');
                    }
                });
            }
        }
    }

    angular.module('goodbookApp')
        .controller('Register2Controller', Register2Controller);
})();
