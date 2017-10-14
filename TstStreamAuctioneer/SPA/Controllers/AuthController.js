app.controller('AuthController', function ($rootScope, $scope, AuthService) {
    $rootScope.loggedIn = false;
    $rootScope.user = null;

    $scope.Login = function () {
        $rootScope.grant = {
            grant_type: "password",
            username: $scope.userName,
            password: $scope.userPassword
        }

        //clear
        $scope.userName = null;
        $scope.userPassword = null;

        //Do login
        AuthService.login();
    };
});