angular.module("Auctions", [])
    .factory("AuctionService", function ($http) {
        return {
            GetAllAuctions: function () {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/auction").then(function (auctions) {
                    return auctions.data;
                });
            },

            GetAuction: function (id) {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/auction/" + id).then(function (auction) {
                    return auction.data;
                });
            },

            GetBidsById: function (id) {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/bid/" + id).then(function (bids) {
                    return bids.data;
                });
            },

            GetHighestBidById: function (id) {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/bid/" + id).then(function (bids) {
                    let highestBid = 0;
                    for (let i = 0; i < bids.length; i++) {
                        if (bids[i] > highestBid) {
                            highestBid = bids[i];
                        }
                    }
                    return highestBid;
                });
            },

            GetCategories: function () {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/category").then(function (categories) {
                    return categories.data;
                });
            },

            AssignCategoryNamesAndDates: function (auctions) {
                this.GetCategories().then(function (categories) {
                    for (let i = 0; i < auctions.length; i++) {
                        for (let n = 0; n < categories.length; n++) {
                            if (auctions[i].categoryId == categories[n].id) {
                                auctions[i].categoryName = categories[n].name;
                                break;
                            }
                        }
                        auctions[i].startTime = new Date(auctions[i].startTime);
                        auctions[i].endTime = new Date(auctions[i].endTime);
                    }
                });
                return auctions;
            },

            GetSupplierInfo: function (id) {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/supplier/" + id).then(function (supplierInfo) {
                    return supplierInfo.data;
                });
            },

            GetAllSuppliers: function () {
                return $http.get("http://nackademiskasecure.azurewebsites.net/api/supplier").then(function (suppliers) {
                    return suppliers.data;
                });
            },

            AssignSupplierNamesAndCommissions: function (auctions) {
                let self = this;
                return this.GetAllSuppliers().then(function (suppliers) {
                    for (let i = 0; i < auctions.length; i++) {
                        for (let n = 0; n < suppliers.length; n++) {
                            if (auctions[i].supplierId == suppliers[n].id) {
                                auctions[i].supplierName = suppliers[n].name;
                                auctions[i].commissionRate = suppliers[n].commission;
                                break;
                            }
                        }

                        if (auctions[i].sold) {
                            auctions[i].commission = (auctions[i].commissionRate * auctions[i].buyNowPrice);
                        }
                        else {
                            self.GetBidsById(auctions[i].id).then(function (bids) {
                                var highestBid = 0;
                                for (var n = 0; n < bids.length; n++) {
                                    if (bids[n].bidPrice > highestBid) {
                                        highestBid = bids[n].bidPrice;
                                    }
                                }
                                auctions[i].commission = (auctions[i].commissionRate * highestBid);
                                console.log("have assigned " + (auctions[i].commissionRate * highestBid) + " to " + auctions[i].name);
                                canReturn -= 1;
                            });
                        }
                    }

                    return auctions;
                });
            },

            Bid: function (auctionId, customerId, bidPrice) {
                let bid = {
                    "auctionId": auctionId,
                    "customerId": customerId,
                    "bidPrice": bidPrice
                };
                return $http.post("http://nackademiskasecure.azurewebsites.net/api/bid", bid, { withCredentials: true })
                    .then(function (response) {
                        console.log(response, typeof response);
                        return true;
                    }, function (error) {
                        return false;
                    });
            },

            Buyout: function (auctionId, customerId) {
                let buyout = {
                    "auctionId": auctionId,
                    "customerId": customerId
                };
                return $http.post("http://nackademiskasecure.azurewebsites.net/api/auction/buynow", buyout, { withCredentials: true }).then(function (response) {
                    return response;
                })
            }
        }
    });