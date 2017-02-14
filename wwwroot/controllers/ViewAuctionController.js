angular.module("Auctions")
    .controller("ViewAuctionController", function ($scope, $routeParams, AuctionService, AuthService) {

        //get auction info
        AuctionService.GetAuction($routeParams.id).then(function (auction) {
            if (auction != null) {
                //set info to more presentable formats
                $scope.auctionInfo = AuctionService.AssignCategoryNamesAndDates([auction])[0];

                //check if auction is in date
                if (auction.sold == false && new Date(auction.endTime) > new Date()) {
                    $scope.sold = "Auktionen har inte avslutats än"
                }
                else {
                    $scope.sold = "Auktionen har avslutats och kan ej längre budas på"
                }

                //set supplier info
                AuctionService.GetSupplierInfo($scope.auctionInfo.supplierId).then(function (supplierInfo) {
                    $scope.supplierInfo = supplierInfo;
                });
            }
            else {
                $scope.noAuction = true;
            }
        });

        //get relevant bids
        $scope.updateBids = function () {
            AuctionService.GetBidsById($routeParams.id).then(function (allBids) {
                $scope.bidHistory = allBids;

                let highest = 0;
                for (let i = 0; i < allBids.length; i++) {
                    if (allBids[i].bidPrice > highest) {
                        highest = allBids[i].bidPrice;
                    }
                    $scope.bidHistory[i].dateTime = new Date(allBids[i].dateTime);
                }

                $scope.highestBid = highest;
            });
        }

        $scope.updateBids();
        //set functions for the view
        $scope.bid = function (bid) {
            //auctionId, customerId, bid
            if (bid > $scope.highestBid && bid < $scope.auctionInfo.buyNowPrice) {
                $scope.invalidBid = false;
                AuctionService.Bid($scope.auctionInfo.id, AuthService.GetCurrentUserId(), bid).then(function (success) {
                    $scope.updateBids();
                    if (!success) {
                        $scope.bidDeclined = true;
                    }
                });
            }
            else {
                $scope.invalidBid = true;
            }
        }

        $scope.buyout = function () {
            AuctionService.Buyout($scope.auctionInfo.id, AuthService.GetCurrentUserId()).then(function (response) {
                $scope.auctionInfo.sold = true;
                if (response.status != 200) {
                    $scope.buyoutDeclined = true;
                }
                else {
                    $scope.buyoutConfirmation = true;
                }
            });
        }

        $scope.ToggleVisibility = function (identifier, visibility) {
            if (visibility === false) {
                switch (identifier) {
                    case "bid":
                        $scope.buyoutVisible = false;
                        $scope.bidVisible = true;
                        break;
                    case "buyout":
                        $scope.bidVisible = false;
                        $scope.buyoutVisible = true;
                        break;
                    case "bidHistory":
                        $scope.supplierInfoVisible = false;
                        $scope.bidHistoryVisible = true;
                        break;
                    case "supplierInfo":
                        $scope.bidHistoryVisible = false;
                        $scope.supplierInfoVisible = true;
                        break;
                    default:
                        console.log("Could not identify: " + identifier);
                        break;
                }
            }
            else {
                switch (identifier) {
                    case "bid":
                        $scope.bidVisible = false;
                        break;
                    case "buyout":
                        $scope.buyoutVisible = false;
                        break;
                    case "bidHistory":
                        $scope.bidHistoryVisible = false;
                        break;
                    case "supplierInfo":
                        $scope.supplierInfoVisible = false;
                        break;
                    default:
                        console.log("Could not identify: " + identifier);
                        break;
                }
            };
        };
        $scope.bidVisible = false;
        $scope.buyoutVisible = false;
        $scope.bidHistoryVisible = false;
        $scope.supplierInfoVisible = false;
        $scope.invalidBid = false;
    });