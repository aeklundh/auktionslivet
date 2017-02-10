angular.module("Admin")
    .controller("AdminController", function ($scope, $location, AuthService, AuctionService, AdminService) {
        if (AuthService.IsAdminAuthorized()) {
            //set details for main view
            AdminService.GetSoldAuctions().then(function (soldAuctions) {
                soldAuctions = AuctionService.AssignCategoryNamesAndDates(soldAuctions);
                soldAuctions = AuctionService.AssignSupplierNamesAndCommissions(soldAuctions);
                $scope.auctions = soldAuctions;
            });
        }
        else {
            $location.path("/");
        }
    });