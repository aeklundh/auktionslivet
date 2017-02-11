angular.module("Admin")
    .controller("AdminController", function ($scope, $location, AuthService, AuctionService, AdminService) {
        if (AuthService.IsAdminAuthorized()) {
            //set details for main view
            AdminService.GetSoldAuctions().then(function (soldAuctions) {
                soldAuctions = AuctionService.AssignCategoryNamesAndDates(soldAuctions);
                AuctionService.AssignSupplierNamesAndCommissions(soldAuctions).then(function (auctions) {
                    $scope.auctions = auctions;

                    //set commission per month in salesMonths
                    salesMonths = [];
                    for (let i = 0; i < auctions.length; i++) {
                        let foundMonth = false;
                        for (let n = 0; n < salesMonths.length; n++) {
                            if (salesMonths[n].month == auctions[i].endTime.getMonth()
                                && salesMonths[n].year == auctions[i].endTime.getYear()) {

                                salesMonths[n].earned += auctions[i].commission;
                                foundMonth = true;
                                break;
                            }
                        }

                        if (!foundMonth) {
                            salesMonths.push({
                                "year": auctions[i].endTime.getYear(),
                                "month": auctions[i].endTime.getMonth(),
                                "earned": auctions[i].commission
                            });
                        }
                    }
                });
            });
        }
        else {
            $location.path("/");
        }
    });