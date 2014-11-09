/**
 * Created by lander on 11/8/14.
 */
var app = angular.module('hamlet', ['ui.bootstrap', 'ngRoute', 'ngStorage']);

// Controller for the nav bar
app.controller('CategoriesCtrl', function ($scope) {
    $scope.items = [
        {
            route: '#',
            text: 'First'
        },
        {
            route: '#',
            text: 'Second'
        },
        {
            route: '#',
            text: 'Third'
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

app.controller('SearchCtrl', function ($scope, $http) {
    $http.get('/js/data.json').then(function(response) {
        $scope.users = response.data;
    });
});

app.controller('ProfileCtrl', function ($scope, $routeParams, $http) {
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
        $scope.user.listings.forEach(function(listing) {

        });
    });

    $scope.getUserAverageRating = function() {
        var ratingTotal = 0;

        $scope.user.listings.forEach(function(listing) {
            ratingTotal += listing.rating;
        });

        console.log(ratingTotal);

        return ratingTotal / $scope.user.listings.length;
    };
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
