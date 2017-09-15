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

app.factory('AuthService', function () {

    return {
        login: function (user) {
            console.log('User ' + user.userName + ' logged in!');
            return user;
        },
        logout: function () { return false; }
    };
});

app.controller('AuthController', function ($scope, AuthService) {
    $scope.isLoggedIn = false;
    $scope.user = null;

    $scope.Login = function () {
        var user = {
            userName: 'KniX',
            avgViewers: 1337
        }

        $scope.user = AuthService.login(user);
        if ($scope.user != null) {
            $scope.isLoggedIn = true;
        }
    };

    //Listener / Event
    $scope.$watch('isLoggedIn', function (newValue, oldValue) {
        if ($scope.isLoggedIn == true) {
            console.log('woot!');
        }
    });
});