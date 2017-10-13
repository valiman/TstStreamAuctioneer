app.service('Api', function ($rootScope, $http) {
    var result;
    var apiUrl = 'http://localhost:64645';

    this.TokenAuth = function (callback) {
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
       
        $http.post(apiUrl + '/token',
            "userName=" + encodeURIComponent($rootScope.grant.username) +
            "&password=" + encodeURIComponent($rootScope.grant.password) +
            "&grant_type=password",
            {
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(funcSuccess, funcError);

        function funcSuccess(data, status) {
            var event = {
                result: data,
                hasErrors: false
            };

            callback(event);
        };

        function funcError(data, error) {
            var event = {
                result: "",
                hasErrors: true,
                error: data
            };
            callback(event);
        };

        return result;
    }

    this.GetApiCall = function (controllerName, methodName, headers, callback) {

        $http.get(apiUrl + '/api/' + controllerName + '/' + methodName, { 'headers': headers }).then(funcSuccess, funcError);

        function funcSuccess(data, status) {
            var event = {
                result: data,
                hasErrors: false
            };
            callback(event);
        };

        function funcError(data, error) {
            var event = {
                result: "",
                hasErrors: true,
                error: data.data
            };
            callback(event);
        };

        return result;
    }

    this.PostApiCall = function (controllerName, methodName, obj, callback) {

        $http.post(apiUrl + '/api/' + controllerName + '/' + methodName, obj).then(funcSuccess, funcError);

        function funcSuccess(data, status) {
            var event = {
                result: data,
                hasErrors: false
            };
            callback(event);
        };

        function funcError(data, error) {
            var event = {
                result: "",
                hasErrors: true,
                error: data.data
            };
            callback(event);
        };

        return result;
    }
});