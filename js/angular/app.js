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

app.controller('PostCtrl', function ($scope) {

});

app.controller('SearchCtrl', function ($scope) {

});

app.controller('ProfileCtrl', function ($scope, $routeParams) {

});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/main.html',
                controller: 'MainCtrl'
            }).
            when('/search', {
                templateUrl: 'partials/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            }).
            when('/post', {
                templateUrl: 'partials/post.html',
                controller: 'PostCtrl'
            }).
            when('/profile/:id', {
                templateUrl: 'partials/profile.html',
                controller: 'ProfileCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
