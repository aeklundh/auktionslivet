angular.module("Authentication", [])
    .factory("AuthService", function ($http, $rootScope, jwtHelper) {
        var user = null;
        var userToken = null;

        return {
            Login: function (email, password) {
                if (email == "admin@admin.se") {
                    return $http.post("http://nackademiskasecure.azurewebsites.net/api/account/admin/login",
                        { "email": email, "password": password },
                        { withCredentials: true })
                        .then(function (response) {
                            user = -1;
                            $rootScope.rs_authenticatedUser = "-1";
                            userToken = response.data.token;
                            return true;
                        }, function (error) {
                            return false;
                        })
                }
                else {
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
                }
            },

            Logout: function () {
                $http.get("http://nackademiskasecure.azurewebsites.net/api/account/logout", { withCredentials: true }).then(function () {
                    user = null;
                    userToken = null;
                    $rootScope.rs_authenticatedUser = null;
                });
            },

            IsAuthenticated: function () {
                return user != null;
            },

            IsAdminAuthorized: function () {
                if (jwtHelper.isTokenExpired(userToken)) {
                    $rootScope.rs_authenticatedUser = null;
                    user = null;
                    userToken = null;
                }
                return (user == -1 && userToken != null);
            },

            GetCurrentUserId: function () {
                return user;
            },

            GetUserToken: function () {
                return userToken;
            },

            RegisterNew: function (newUser) {
                return $http.post("http://nackademiskasecure.azurewebsites.net/api/customer", newUser).then(function (response) {
                    return response.status == 200;
                });
            }
        }
    });