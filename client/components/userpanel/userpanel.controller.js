'use strict';

class UserpanelController {

    constructor($location, $cookies, UserService, GeolocationService) {
        this.cache = $cookies;
        this.user = this.cache.getObject('user');
        UserService.checkLogin($location.path(), () => {
            this.$location = $location;
            this.name = this.user.firstName + " " + this.user.lastName;
            // this.studiedAt = this.user.studiedAt;
            // Get location using latitude and longitude
            // if (this.user.location) {
            //     GeolocationService.location(this.user.location[0], this.user.location[1], (data, status) => {
            //         if (status == 200) {
            //             this.location = data.results[0].formatted_address;
            //             this.user.location_text = this.location;

            //         } else
            //             this.location = ""
            //     });
            // }
            this.location = this.user.location;
            this.grading = '7/10';
            this.donated = this.user.donated;
            this.karma = this.user.karma;
            this.description_original = this.user.aboutMe;
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
