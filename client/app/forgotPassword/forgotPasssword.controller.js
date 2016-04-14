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
                var data = {"username":this.username};
                if (this.ind){
                    this.$http.post("/api/v1/users/forgotpassword/", data)
                    .success((data, status) => {
                        Materialize.toast('New Password has been mailed to you!', 4000, 'rounded');
                        this.error1 = false;
                    })
                    .error((data, status) =>{
                        Materialize.toast('Invalid Username!', 4000, 'rounded')
                    });
                }
                else {
                 this.$http.post("/api/v1/organization/forgotpassword/", data)
                    .success((data, status) => {
                        Materialize.toast('New Password has been mailed to you!', 4000, 'rounded');
                        this.error1 = false;
                    })
                    .error((data, status) =>{
                        Materialize.toast('Invalid Username!', 4000, 'rounded')
                    });   
                }
            }
        }
    }
    angular.module('goodbookApp').controller('ForgotPasswordController', ForgotPasswordController);
})();
