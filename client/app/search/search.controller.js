'use strict';

(function() {

    class SearchController {
        constructor($http, $location, MyCache) {
            this.$http = $http;
            this.$location = $location;
            this.cache = MyCache;
            this.results = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
            this.resultCount = this.results.length;
            this.groupedResults = this.group(this.results)
        }

        group = (results, groupSize) => {
            var temp = [];
            var paddedResults = [];
            for(var i=0;i<results.length;i++){
                if(i%groupSize==0){
                    paddedResults.push(temp);
                    temp = [];
                }
                else{
                    temp.push(results[i])
                }
            }
            if(temp.length>0)
                paddedResults.push(temp);
            return paddedResults;
        }
    }

    angular.module('goodbookApp')
        .controller('SearchController', SearchController);
})();