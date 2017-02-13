angular.module("Auctions")
    .controller("HomeController", function ($scope, AuctionService) {
        //set datetime
        $scope.currentTimestamp = new Date();

        //set AllAuctions
        AuctionService.GetAllAuctions().then(function (auctions) {
            $scope.allAuctions = AuctionService.AssignCategoryNamesAndDates(auctions);
        });
        AuctionService.GetCategories().then(function (categories) {
            $scope.categories = categories;
        })
    });