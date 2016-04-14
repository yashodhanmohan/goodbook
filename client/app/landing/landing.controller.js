'use strict';

(function() {

    class LandingController {
        constructor($http, $location) {

            $(document).ready(function() {
                $('.slider').slider({ full_width: false });
            });

            this.slides = [{
                image: 'assets/images/img00.jpg',
                title: 'Earth5R',
                date: '23/05/2016',
                location: 'Singapore',
                description: 'Tree plantation & Awareness Program',
                details: 'Tree plantation and environmental awareness program by Earth5R at swami-vivekananda School, Gadhinagar.'
            }, {
                image: 'assets/images/img01.jpg',
                title: 'Earth5R',
                date: '23/05/2016',
                location: 'Malaysia',
                description: 'Tree Plantation & Awareness Program',
                details: 'Tree plantation and environmental awareness program by Earth5R at swami-vivekananda School, Gadhinagar.'
            }, {
                image: 'assets/images/img02.jpg',
                title: 'Earth5R',
                date: '23/05/2016',
                location: 'India',
                description: 'Tree Plantation & Awareness Program',
                details: 'Tree plantation and environmental awareness program by Earth5R at swami-vivekananda School, Gadhinagar.'
            }, {
                image: 'assets/images/img03.jpg',
                title: 'Earth5R',
                date: '23/05/2016',
                location: 'China',
                description: 'Tree Plantation & Awareness Program',
                details: 'Tree plantation and environmental awareness program by Earth5R at swami-vivekananda School, Gadhinagar.'
            }, {
                image: 'assets/images/img04.jpg',
                title: 'Earth5R',
                date: '23/05/2016',
                location: 'America',
                description: 'Tree Plantation & Awareness Program',
                details: 'Tree plantation and environmental awareness program by Earth5R at swami-vivekananda School, Gadhinagar.'
            }];

            this.direction = 'left';
            this.currentIndex = 0;
            this.stats = {
                NGO_COUNT: 56,
                VOLUNTEER_COUNT: 1200,
                DONATION_COUNT: '1,50,000',
                EVENTS_COUNT: 87
            }

            $(document).ready(function() {
                $(".button-collapse").sideNav();
            })
        }

        setCurrentSlideIndex = (index) => {
            this.direction = (index > this.currentIndex) ? 'left' : 'right';
            this.currentIndex = index;
        }

        isCurrentSlideIndex = function(index) {
            return this.currentIndex === index;
        }

        prevSlide = function() {
            this.direction = 'left';
            this.currentIndex = (this.currentIndex < this.slides.length - 1) ? ++this.currentIndex : 0;
        }

        nextSlide = function() {
            this.direction = 'right';
            this.currentIndex = (this.currentIndex > 0) ? --this.currentIndex : this.slides.length - 1;
        }


    }
    angular.module('goodbookApp')
        .controller('LandingController', LandingController)
        .animation('.slide-animation', function() {
            return {
                addClass: function(element, className, done) {
                    var scope = element.scope();

                    if (className == 'ng-hide') {
                        var finishPoint = element.parent().width();
                        if (scope.direction !== 'right') {
                            finishPoint = -finishPoint;
                        }
                        TweenMax.to(element, 0.5, { left: finishPoint, onComplete: done });
                    } else {
                        done();
                    }
                },
                removeClass: function(element, className, done) {
                    var scope = element.scope();

                    if (className == 'ng-hide') {
                        element.removeClass('ng-hide');

                        var startPoint = element.parent().width();
                        if (scope.direction === 'right') {
                            startPoint = -startPoint;
                        }

                        TweenMax.set(element, { left: startPoint });
                        TweenMax.to(element, 0.5, { left: 0, onComplete: done });
                    } else {
                        done();
                    }
                }
            };
        });

})();
