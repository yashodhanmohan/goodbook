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
            this.first_name = "";
            this.last_name = "";
            this.org_name = "";
            this.email = "";
            this.contactNo = "";
            this.yoe = "";
            this.regNo = "";
            this.address = "";
            this.aboutUs = "";
            this.aow = [false, false, false, false, false, false];
            this.scale = "";
            this.founder = "";
            this.profilepic = "";

            if (this.ind) {
                this.first_name = this.cache.user.first_name;
                this.last_name = this.cache.user.last_name;
                this.email = this.cache.user.email;
            } else {
                this.org_name = this.cache.org.name;
                this.email = this.cache.org.email;
            }


            this.imagefile = document.getElementById('imagefile');
            this.imagefile.onchange = () => {
                var reader = new FileReader();
                reader.onload = (e) => {
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
                })
            }
        }
    }

    angular.module('goodbookApp')
        .controller('Register2Controller', Register2Controller);
})();
