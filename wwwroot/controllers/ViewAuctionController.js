angular.module("Auctions")
    .controller("ViewAuctionController", function ($scope, $routeParams, AuctionService) {
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

        //get auction info
        AuctionService.GetAuction($routeParams.id).then(function (auction) {
            //set info to more presentable formats
            $scope.auctionInfo = auction.data;
            $scope.auctionInfo.startTime = new Date(auction.data.startTime);
            $scope.auctionInfo.endTime = new Date(auction.data.endTime);
            if (auction.data.sold == false) {
                $scope.sold = "Ej såld"
            }
            else {
                $scope.sold = "Produkten är såld och kan ej budas på."
            }

            AuctionService.GetCategories().then(function (categories) {
                for (let i = 0; i < categories.data.length; i++) {
                    if (categories.data[i].id === auction.data.categoryId) {
                        $scope.auctionInfo.categoryName = categories.data[i].name;
                        break;
                    }
                }
                if ($scope.auctionInfo.categoryName == null) {
                    $scope.auctionInfo.categoryName = "Okänd";
                }
            });

            AuctionService.GetSupplierInfo($scope.auctionInfo.supplierId).then(function (supplierInfo) {
                $scope.supplierInfo = supplierInfo.data;
            });
        });

        //get relevant bids
        AuctionService.GetBidsById($routeParams.id).then(function (allBids) {
            $scope.bidHistory = allBids.data;

            let highest = 0;
            for (let i = 0; i < allBids.data.length; i++) {
                if (allBids.data[i].bidPrice > highest) {
                    highest = allBids.data[i].bidPrice;
                }
                $scope.bidHistory[i].dateTime = new Date(allBids.data[i].dateTime);
            }

            $scope.highestBid = highest;
        });
    });