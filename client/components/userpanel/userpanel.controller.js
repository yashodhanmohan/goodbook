'use strict';

class UserpanelController {

    constructor($location, UserService, MyCache) {
        var cache = MyCache;
        var user = cache.user;
        UserService.checkLogin($location.path(), () => {
            this.$location = $location;
            this.name = user.firstName + " " + user.lastName;
            this.studiedAt = user.studiedAt;
            // Get location using latitude and longitude
            UserService.location(user.location[0], user.location[1], (data, status) => {
                if (status == 200) {
                    this.location = data.results[0].formatted_address;
                    user.location_text = this.location;

                } else
                    this.location = ""
            });
            this.grading = '7/10';
            this.donated = user.donated;
            this.karma = user.karma;
            this.description_original = user.aboutMe;
            if (this.description_original.length > 50) {
                this.description = this.description_original.substring(0, 47) + '...';
            } else {
                this.description = this.description_original;
            }
        });
        

    }
}

angular.module('goodbookApp')
    .controller('UserpanelController', UserpanelController);
