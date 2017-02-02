angular.module("Auctions")
    .controller("ViewAuctionController", function ($scope, $routeParams, AuctionService) {
        $scope.ToggleVisibility = function () {
            if ($scope.bidHistoryVisible === true) {
                $scope.bidHistoryVisible = false;
            }
            else {
                $scope.bidHistoryVisible = true;
            }
        };


        //get auction info
        AuctionService.GetAuction($routeParams.id).then(function (auction) {
            $scope.auctionInfo = auction.data;
            if (auction.data.sold == false) {
                $scope.sold = "Ej såld"
            }
            else {
                $scope.sold = "Produkten är såld och kan ej budas på."
            }
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
                console.log(" time: " + $scope.bidHistory[i].dateTime, typeof $scope.bidHistory[i].dateTime)
            }

            $scope.highestBid = highest;
        });
    });