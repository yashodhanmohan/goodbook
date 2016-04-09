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
            this.myFile = "";
            this.reader  = new FileReader();
            this.binaryData = "";
        }

        register = () => {
            if (this.check_username()) {
                console.log('Woot');
                console.log(this);
            }
        }

        checkFile = () => {
            var fileReader = new FileReader();
            fileReader.onload = function(event) {
                console.log(event.target.result);
            };
            this.binaryData = fileReader.readAsDataURL(this.myFile); 
            console.log(this.myFile.size);

            console.log("Herererere");
            //console.log(this.binaryData);
            //console.log(this.reader.readAsDataURL(this.myFile))
            // this.binaryData = new FileReader().readAsBinaryString(this.myFile);

            this.$http({
                headers: {'Authorization': 'Client-ID efd2a89d02947f6'},
                url : 'https://api.imgur.com/3/image', 
                method : "POST",
                data : {"key" : "2788b8044f53817c2c983496c87ecd47f0b9c9f9","image" : this.binaryData}
            })
            .then(function successCallback(response) {
                self.num = 2;
                console.log('called and successful', response);
            }, function errorCallback(err) {
                self.num = 3;
                console.log('called but error', err);
            });
            // this.$http.post({
            //                 url:'https://api.imgur.com/3/upload',
            //                 headers : {'Authorization': 'Client-ID efd2a89d02947f6'},
            //                 data : {image: this.myFile});
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
        .controller('RegisterController', RegisterController)
        .directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;
                    
                    element.bind('change', function(){
                        scope.$apply(function(){
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);
})();
