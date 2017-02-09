angular.module("Authentication", [])
    .factory("AuthService", function ($http, $rootScope) {
        var user = null;

        return {
            Login: function (email, password) {
                return $http.post("http://nackademiskasecure.azurewebsites.net/api/account/login",
                    { "email": email, "password": password },
                    { withCredentials: true })
                    .then(function (response) {
                        $rootScope.rs_authenticatedUser = response.data.id;
                        user = response.data.id;
                        return true;

                    }, function (error) {
                        return false;
                    });
            },

            Logout: function () {
                $http.get("http://nackademiskasecure.azurewebsites.net/api/account/logout").then(function () {
                    $rootScope.rs_authenticatedUser = null;
                    user = null;
                })
            },

            IsAuthenticated: function () {
                return user != null;
            },

            GetCurrentUserId: function() {
                return user;
            },

            RegisterNew: function (newUser) {
                return $http.post("http://nackademiskasecure.azurewebsites.net/api/customer", newUser).then(function (response) {
                    return response.status == 200;
                });
            }
        }
    });