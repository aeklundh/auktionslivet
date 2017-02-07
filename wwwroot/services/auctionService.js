angular.module("Auctions", [])
    .factory("AuctionService", function ($http) {
        return {
            GetAllAuctions: function () {
                return $http.get("http://nackademiska.azurewebsites.net/api/auction").then(function(auctions) {
                    return auctions.data;
                });
            },

            GetAuction: function (id) {
                return $http.get("http://nackademiska.azurewebsites.net/api/auction/" + id).then(function(auction) {
                    return auction.data;
                });
            },

            GetBidsById: function (id) {
                return $http.get("http://nackademiska.azurewebsites.net/api/bid/" + id).then(function(bids) {
                    return bids.data;
                });
            },

            GetCategories: function() {
                return $http.get("http://nackademiska.azurewebsites.net/api/category").then(function(categories) {
                    return categories.data;
                });
            },

            GetSupplierInfo: function(id) {
                return $http.get("http://nackademiska.azurewebsites.net/api/supplier/" + id).then(function(supplierInfo) {
                    return supplierInfo.data;
                });
            },

            Bid: function(auctionId, customerId, bidPrice) {
                let bid = {
                    "auctionId": auctionId,
                    "customerId": customerId,
                    "bidPrice": bidPrice
                };

                $http.post("http://nackademiska.azurewebsites.net/api/bid", bid);
                    // .then(function(response) {
                    //     if (response.error != null) {
                            
                    //     }
                    // })
            }
        }
    });