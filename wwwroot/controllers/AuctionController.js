angular.module("Auctions")
    .controller("AuctionController", function ($scope, AuctionService) {
        //set datetime
        $scope.currentTimestamp = new Date();

        //set AllAuctions
        AuctionService.GetAllAuctions().then(function (auctions) {
            $scope.allAuctions = auctions;

            //get categories and assign names
            AuctionService.GetCategories().then(function (categories) {
                $scope.categories = categories;
                for (let i = 0; i < auctions.length; i++) {
                    for (let n = 0; n < categories.length; n++) {
                        if (categories[n].id === $scope.allAuctions[i].categoryId) {
                            $scope.allAuctions[i].categoryName = categories[n].name;
                            break;
                        }
                    }

                    if ($scope.allAuctions[i].categoryName == null) {
                        $scope.allAuctions[i].categoryName = "Okänd";
                    }

                    $scope.allAuctions[i].endTime = new Date($scope.allAuctions[i].endTime);
                }
            });
        });
    });