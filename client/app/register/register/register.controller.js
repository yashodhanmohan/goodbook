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
            this.myFile = "";
            this.reader = new FileReader();
            this.binaryData = "";
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
                        this.cache.loggedIn = true;
                        this.cache.ind = this.ind;
                        this.$location.path('/register/step2');
                    });
                } else {
                    this.OrgService.postOrg({
                        name: this.org_name,
                        email: this.email,
                        username: this.username,
                        password: this.password
                    }, (data, status) => {
                        this.cache.org = data;
                        this.cache.loggedIn = true;
                        this.cache.ind = this.ind;
                        this.$location.path('/register/step2');
                    })
                }
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
                    headers: { 'Authorization': 'Client-ID efd2a89d02947f6' },
                    url: 'https://api.imgur.com/3/image',
                    method: "POST",
                    data: { "key": "2788b8044f53817c2c983496c87ecd47f0b9c9f9", "image": this.binaryData }
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
                            console.log(data);
                            if (status == 200 && data.length != 0) {
                                this.valid_email = false;
                            }
                            else {
                                this.valid_email = true;
                            }
                        });

                    }
                });
            }
        }
    }

    angular.module('goodbookApp')
        .controller('RegisterController', RegisterController)
        .directive('fileModel', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function() {
                        scope.$apply(function() {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);
})();
