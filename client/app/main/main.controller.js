// 'use strict';

// (function() {

// class MainController {

//   constructor($http) {
//     this.$http = $http;
//     this.awesomeThings = [];

//     $http.get('/api/v1/things').then(response => {
//       this.awesomeThings = response.data;
//     });
//   }

//   addThing() {
//     if (this.newThing) {
//       this.$http.post('/api/v1/things', { name: this.newThing });
//       this.newThing = '';
//     }
//   }

//   deleteThing(thing) {
//     this.$http.delete('/api/v1/things/' + thing._id);
//   }
// }

// angular.module('goodbookApp')
//   .controller('MainController', MainController);

// })();
