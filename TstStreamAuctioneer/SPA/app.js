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

app.service('ApiCalls', function (Api, $rootScope) {

    this.GetAuctions = function (callback) {
        Api.GetApiCall('Auction', 'GetAuctions', null, callback);
    };

    this.GetTokenAuth = function (callback) {
        Api.TokenAuth(callback);
    };

    this.GetUserData = function (callback) {
        var token_session = JSON.parse(localStorage.getItem('bearer'));

        headers = {
            Authorization: 'Bearer ' + token_session.access_token
        }

        Api.GetApiCall('Account', 'GetUserData', headers, callback);
    };

    this.GetUsers = function (callback)
    {
        var token_session = JSON.parse(localStorage.getItem('bearer'));

        headers = {
            Authorization: 'Bearer ' + token_session.access_token
        }

        Api.GetApiCall('Auction', 'GetUsers', headers, function (event) {
            if (event.hasErrors) {
                console.log('TestApi Error: ');
                console.log(event);
            } else {
                console.log(event.result.data);
            }
        });
    };

    /* ^ ctrl+x this when u need it
    function GetUsers() {
        var token_session = JSON.parse(localStorage.getItem('bearer'));

        headers = {
            Authorization: 'Bearer ' + token_session.access_token
        }

        ApiCalls.GetUsers(function (event) {
            if (event.hasErrors) {
                console.log('TestApi Error: ');
                console.log(event);
            } else {
                console.log(event.result.data);
            }
        });
    }
    */
});

app.factory('AuthService', function (ApiCalls, $rootScope) {

    return {
        login: function () {
            //Check if token time-out, if so. renew.
            //var token_session = JSON.parse(localStorage.getItem('bearer'));
            //console.log(token_session.expires_in);

            ApiCalls.GetTokenAuth(function (event) {
                if (event.hasErrors) {
                    console.log(event.error);
                    
                } else {
                    console.log(event.result.data);

                    //Save bearer token
                    localStorage.setItem('bearer', JSON.stringify(event.result.data));
                    console.log('bearer saved to local storage.');

                    GetUserData();
                }
            });

        },
        logout: function () { return false; }
    };

    function GetUserData() {
        ApiCalls.GetUserData(function (event) {
            if (event.hasErrors) {
                console.log(event.error);
            } else {
                console.log(event.result.data);

                $rootScope.user = event.result.data;

                if ($rootScope.user != null) {
                    $rootScope.loggedIn = true;
                }
            }
        });
    }
});