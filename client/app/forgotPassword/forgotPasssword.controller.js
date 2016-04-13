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
            this.error2 = false;
            this.selector = "";
            this.ind = true;        
        }

        forgotPassword = () => {
            if (this.username === ''){
                this.error1 = true;
            }
            else {
                console.log("Here");
                var data = {"username":this.username};
                console.log(this.ind);
                if (this.ind){
                    this.$http.post("/api/v1/users/forgotpassword/", data)
                    .success((data, status) => {
                        
                        console.log("New Password set");
                        Materialize.toast('New Password has been mailed to you!', 4000, 'rounded');
                        // this.error1 = false;
                        this.error1 = false;
                        // alert("New Password has been mailed to you");
                    })
                    .error((data, status) =>{
                        console.log("Invalid Username");
                        // this.error1 = true;
                        Materialize.toast('Invalid Username!', 4000, 'rounded')
                        // Materialize.toast('I am a toast!', 4000)
                        // alert("Invalid username");
                        
                    });
                }
                else {
                 this.$http.post("/api/v1/organization/forgotpassword/", data)
                    .success((data, status) => {
                        
                        console.log("New Password set");
                        Materialize.toast('New Password has been mailed to you!', 4000, 'rounded');
                        // this.error1 = false;
                        this.error1 = false;
                        // alert("New Password has been mailed to you");
                    })
                    .error((data, status) =>{
                        console.log("Invalid Username");
                        // this.error1 = true;
                        Materialize.toast('Invalid Username!', 4000, 'rounded')
                        // Materialize.toast('I am a toast!', 4000)
                        // alert("Invalid username");
                        
                    });   
                }
            }
        }
    }
    angular.module('goodbookApp').controller('ForgotPasswordController', ForgotPasswordController);
})();
