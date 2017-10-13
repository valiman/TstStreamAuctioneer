app.controller('AuthController', function ($rootScope, $scope, AuthService) {
    $rootScope.loggedIn = false;
    $rootScope.user = null;

    $scope.isLoggedIn = false;

    $scope.Login = function () {
        $rootScope.grant = {
            grant_type: "password",
            username: $scope.userName,
            password: $scope.userPassword
        }

        //Do login
        AuthService.login();
    };

    //Listener / Event
    $scope.$watch('loggedIn', function (newValue, oldValue) {

        if ($rootScope.loggedIn == true) {
            $scope.isLoggedIn = true;
            console.log('Event: Logged in!');
        }

    });
});