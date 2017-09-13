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
    _user = null;
    _isLoggedIn = false;

    return {
        login: function (user) {
            _user = user;
            _isLoggedIn = true;
            console.log('User ' + user.userName + ' logged in!');
            return true;
        },
        logout: function () { return false; },
        isLoggedIn: function () {
            console.log('ding');
            return _isLoggedIn;
        },
        currentUser: function () { return user; }
    };
});

app.controller('AuthController', function ($scope, AuthService) {
    $scope._isLoggedIn = false;

    $scope.Login = function () {
        console.log('login..');
        var user = {
            userName: 'KniX'
        }

        $scope._isLoggedIn = AuthService.login(user);
    };

    $scope.$watch('_isLoggedIn', function (newValue, oldValue) {
        if ($scope._isLoggedIn == true) {
            console.log('woot!');
        }
        console.log('test.');
    });
});