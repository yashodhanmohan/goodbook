'use strict';

angular.module('goodbookApp')
  .directive('userpanel', () => ({
    templateUrl: 'components/userpanel/userpanel.html',
    restrict: 'E',
    controller: 'UserpanelController',
    controllerAs: 'userpanel'
  }));
