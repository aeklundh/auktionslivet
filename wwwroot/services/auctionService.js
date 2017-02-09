angular.module("Auctions", [])
    .factory("AuctionService", function ($http) {
        return {
            GetAllAuctions: function () {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/auction").then(function(auctions) {
                    return auctions.data;
                });
            },

            GetAuction: function (id) {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/auction/" + id).then(function(auction) {
                    return auction.data;
                });
            },

            GetBidsById: function (id) {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/bid/" + id).then(function(bids) {
                    return bids.data;
                });
            },

            GetCategories: function() {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/category").then(function(categories) {
                    return categories.data;
                });
            },

            GetSupplierInfo: function(id) {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/supplier/" + id).then(function(supplierInfo) {
                    return supplierInfo.data;
                });
            },

            Bid: function(auctionId, customerId, bidPrice) {
                let bid = {
                    "auctionId": auctionId,
                    "customerId": customerId,
                    "bidPrice": bidPrice
                };
                return $http.post("http://nackademiskasecure.azurewebsites.net/api/bid", bid, { withCredentials: true }).then(function(response) {
                        return response;
                    });
            },

            Buyout: function(auctionId, customerId) {
                let buyout = {
                    "auctionId": auctionId,
                    "customerId": customerId
                };
                return $http.post("http://nackademiskasecure.azurewebsites.net/api/auction/buynow", buyout, { withCredentials: true }).then(function(response) {
                    return response;
                })
            }
        }
    });