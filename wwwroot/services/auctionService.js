angular.module("Auctions", [])
    .factory("AuctionService", function ($http) {
        return {
            GetAllAuctions: function () {
                return $http.get("http://nackademiska.azurewebsites.net/api/auction");
            },

            GetAuction: function (id) {
                return $http.get("http://nackademiska.azurewebsites.net/api/auction/" + id);
            },

            GetBidsById: function (id) {
                return $http.get("http://nackademiska.azurewebsites.net/api/bid/" + id);
            },

            GetCategories: function() {
                return $http.get("http://nackademiska.azurewebsites.net/api/category");
            },

            GetSupplierInfo: function(id) {
                return $http.get("http://nackademiska.azurewebsites.net/api/supplier/" + id);
            }
        }
    });