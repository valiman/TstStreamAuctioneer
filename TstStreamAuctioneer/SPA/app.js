var app = angular.module('mainModule', ['ui.bootstrap']);

app.directive('leftView', function () {
    return {
        templateUrl: '/SPA/Views/Left.html'
    }
});

app.directive('rightView', function () {
    return {
        templateUrl: '/SPA/Views/Right.html'
    }
});