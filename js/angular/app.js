/**
 * Created by lander on 11/8/14.
 */
var app = angular.module('hamlet', ['ui.bootstrap', 'ngRoute', 'ngStorage']);

app.filter('nl2br', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text.replace(/\n/g, '<br>'));
    };
});

// Controller for the nav bar
app.controller('CategoriesCtrl', function ($scope) {
    $scope.items = [
        {
            route: '/#/search',
            text: 'Black Smithing'
        },
        {
            route: '/#/search',
            text: 'Furniture Building'
        },
        {
            route: '/#/search',
            text: 'Metals'
        },
        {
            route: '/#/search',
            text: 'Art'
        },
        {
            route: '/#/search',
            text: 'Cars'
        }
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
});

// Probably will not be used
app.controller('MainCtrl', function ($scope) {

});

app.controller('HowItWorksCtrl', function ($scope) {

});

app.controller('PostCtrl', function ($scope) {

});

app.controller('NavSearchFormCtrl', function ($scope, $location) {
    $scope.redirectToSearch = function() {
        $location.path('/search');
    }
});

app.controller('SearchCtrl', function ($scope, $http) {
    $http.get('/js/data.json').then(function(response) {
        $scope.users = response.data;
        $scope.listings = [];

        $scope.users.forEach(function(user) {
            user.listings.forEach(function(listing) {
                listing.user = user;
                $scope.listings.push(listing);
            })
        });
    });
});

app.controller('ProfileCtrl', function ($scope, $routeParams, $http) {
    $scope.getUserAverageRating = function () {
        return '';
    };

    $http.get('/js/data.json').then(function(response) {
        var profiles = response.data;
        $scope.user = profiles.filter(function(user) {
            return user.fname == $routeParams.id;
        })[0];

        for (var i = 0; i < $scope.user.listings.length; i++) {
            var stars = [],
                starCount = 0;

            for (starCount = 0; starCount < $scope.user.listings[i].rating; starCount++) {
                stars.push('glyphicon glyphicon-star');
            }

            for (var j = starCount; j < 5; j++) {
                stars.push('glyphicon glyphicon-star-empty');
            }

            $scope.user.listings[i].stars = stars;
        }

        $scope.getUserAverageRating = function() {
            var ratingTotal = 0;

            $scope.user.listings.forEach(function(listing) {
                ratingTotal += listing.rating;
            });

            return ratingTotal / $scope.user.listings.length;
        };
    });
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/main.html',
                controller: 'MainCtrl'
            }).
            when('/search', {
                templateUrl: 'partials/search.html',
                controller: 'SearchCtrl'
            }).
            when('/post', {
                templateUrl: 'partials/post.html',
                controller: 'PostCtrl'
            }).
            when('/profile/:id', {
                templateUrl: 'partials/profile.html',
                controller: 'ProfileCtrl'
            }).
            when('/how-it-works', {
                templateUrl: 'partials/how_it_works.html',
                controller: 'HowItWorksCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
