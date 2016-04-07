'use strict';

(function() {

    class RegisterController {
        constructor($scope, $http, $location) {
            this.$http = $http;
            this.$location = $location;
            this.error = false;
            this.ind = true;
            this.first_name = "";
            this.last_name = "";
            this.org_name = "";
            this.username = "";
            this.email = "";
            this.password = "";
            this.accept_conditions = false;
        }

        register = () => {
            if (this.check_username()) {
                console.log('Woot');
                console.log(this);
            }
        }

        check_username = () => {
            if (this.username.length != 0) {
                console.log('perform check here');
                this.$http.get('/api/v1/users/u/' + this.username)
                    .success((data, status) => {
                        console.log('hjerasd');
                        console.log(data);
                        console.log(status);
                        return false;
                    })
                    .error((status) => {
                   		return true;
                    });
            }
        }
    }

    angular.module('goodbookApp')
        .controller('RegisterController', RegisterController);
})();
