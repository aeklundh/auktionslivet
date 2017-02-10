angular.module("Admin", [])
    .factory("AdminService", function ($http, $rootScope, AuthService) {
        return {
            GetSoldAuctions: function () {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/auction/sold",
                    { headers: { Authorization: "Bearer " + AuthService.GetUserToken() } })
                    .then(function (soldAuctions) {
                        return soldAuctions.data;
                    });
            }
        }
    });