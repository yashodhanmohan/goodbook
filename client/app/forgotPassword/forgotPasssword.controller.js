'use strict';

(function() {

    class ForgotPasswordController {
        constructor($http, $location, $cookies, $routeParams, UserService, OrgService) {
            this.$http = $http;
            this.$location = $location;
            this.UserService = UserService;
            this.OrgService = OrgService;
            this.username = '';
            this.error1 = false;
            
        }

        forgotPassword = () => {
            if (this.username === ''){
                this.error = true;
            }
            else {
                console.log("Here");
                var data = {"username":this.username};
                this.$http.post("/api/v1/users/forgotpassword/", data)
                .success(function(data, status){
                    console.log("New Password set");
                    // this.error1 = false;
                    Materialize.toast('New Password has been mailed to you!', 4000, 'rounded');
                    // alert("New Password has been mailed to you");
                })
                .error(function(data, status){
                    console.log("Invalid Username");
                    // this.error1 = true;
                    Materialize.toast('Invalid Username!', 4000, 'rounded')
                    // Materialize.toast('I am a toast!', 4000)
                    // alert("Invalid username");
                });
            }

        }
    }
    angular.module('goodbookApp').controller('ForgotPasswordController', ForgotPasswordController);
})();
