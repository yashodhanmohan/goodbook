'use strict';

(function() {

    class Register2Controller {
        constructor($scope, $http, $location, UserService, OrgService, MyCache) {
            // Services
            this.$http = $http;
            this.$location = $location;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.cache = MyCache;
            this.ind = this.cache.ind;
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
            console.log(this.ind);
            if (this.ind) {
                this.first_name = this.cache.user.firstName;
                this.last_name = this.cache.user.lastName;
                this.email = this.cache.user.email;
                this.username = this.cache.user.username;
            } else {
                this.org_name = this.cache.org.name;
                this.email = this.cache.org.email;
                this.username = this.cache.org.username;
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
            if (!this.cache.ind) {
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
                this.OrgService.putOrg(this.cache.org._id, {
                    name: this.org_name,
                    contactNo: this.contactNo,
                    address: this.address,
                    aboutUs: this.aboutUs,
                    profilePic: this.profilepic,
                    aow: aow
                }, (data, status) => {
                    if (status == 200) {
                        this.cache.org = data;
                        this.cache.loggedIn = true;
                    }
                });
            } else {
                this.UserService.putUser(this.cache.user._id, {
                    firstName: this.first_name,
                    lastName: this.last_name,
                    contactNo: this.contactNo,
                    aboutMe: this.aboutMe,
                    profilePic: this.profilepic
                }, (data, status) => {
                    if (status == 200) {
                        this.cache.user = data;
                        this.cache.loggedIn = true;
                    }
                });
            }
        }
    }

    angular.module('goodbookApp')
        .controller('Register2Controller', Register2Controller);
})();
