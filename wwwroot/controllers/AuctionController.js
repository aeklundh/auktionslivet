angular.module("Auctions")
    .controller("AuctionController", function($scope, AuctionService) {
        //set AllAuctions
        AuctionService.GetAllAuctions().then(function(auctions) {
            $scope.allAuctions = auctions.data;
        });
    });