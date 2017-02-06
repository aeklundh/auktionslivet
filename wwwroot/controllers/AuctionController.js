angular.module("Auctions")
    .controller("AuctionController", function ($scope, AuctionService) {
        //set AllAuctions
        AuctionService.GetAllAuctions().then(function (auctions) {
            $scope.allAuctions = auctions.data;

            //get categories and assign names
            AuctionService.GetCategories().then(function (categories) {
                $scope.categories = categories.data;
                for (let i = 0; i < auctions.data.length; i++) {
                    for (let n = 0; n < categories.data.length; n++) {
                        if (categories.data[n].id === $scope.allAuctions[i].categoryId) {
                            $scope.allAuctions[i].categoryName = categories.data[n].name;
                            break;
                        }
                    }

                    if ($scope.allAuctions[i].categoryName == null) {
                        $scope.allAuctions[i].categoryName = "Okänd";
                    }
                }
            });
        });
    });