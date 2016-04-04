'use strict';

class UserpanelController {

    constructor($location, $cacheFactory) {
        var cache = $cacheFactory.get('goodbookCache');
        var userdata = cache.get('userdata');
        this.$location = $location;
        this.name = userdata.firstName + " " + userdata.lastName;
        this.office = 'DAIICT';
        this.location = 'Gandhinagar';
        this.grading = '7/10';
        this.donation = userdata.contactNo;
        this.hours = 48;
        this.description_original = 'Yeoman Patel is awesome man !Yeoman Patel is awesome man !Yeoman Patel is awesome man !Yeoman Patel is awesome man !Yeoman Patel is awesome man !Yeoman Patel is awesome man !Yeoman Patel is awesome man !';
        if (this.description_original.length > 50) {
            this.description = this.description_original.substring(0, 47) + '...';
        } else {
            this.description = this.description_original;
        }
    }
}

angular.module('goodbookApp')
    .controller('UserpanelController', UserpanelController);
