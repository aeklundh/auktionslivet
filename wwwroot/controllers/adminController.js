angular.module("Admin")
    .controller("AdminController", function ($scope, $location, AuthService, AuctionService, AdminService) {

        if (AuthService.IsAdminAuthorized()) {
            //set details for main view
            AdminService.GetSoldAuctions().then(function (soldAuctions) {
                soldAuctions = AuctionService.AssignCategoryNamesAndDates(soldAuctions);
                AuctionService.AssignSupplierNamesAndCommissions(soldAuctions).then(function (auctions) {
                    $scope.auctions = auctions;
                    console.log(auctions);

                    return auctions;
                }).then(function (auctions) {

                    //set commission per month in salesMonths
                    salesMonths = [{
                        "year": auctions[0].endTime.getFullYear(),
                        "month": auctions[0].endTime.getUTCMonth(),
                        "earned": auctions[0].commission,
                        "auctions": 1
                    }];
                    for (let i = 1; i < auctions.length; i++) {
                        let foundMonth = false;
                        for (let n = 0; n < salesMonths.length; n++) {
                            if (salesMonths[n].month == auctions[i].endTime.getUTCMonth()
                                && salesMonths[n].year == auctions[i].endTime.getFullYear()) {

                                console.log("adding in n-loop", auctions[i].commission);
                                salesMonths[n].earned += auctions[i].commission;
                                salesMonths[n].auctions += 1;
                                foundMonth = true;
                                break;
                            }
                        }

                        if (!foundMonth) {
                            console.log(auctions[i].commission, typeof auctions[i].commission);
                            salesMonths.push({
                                "year": auctions[i].endTime.getFullYear(),
                                "month": auctions[i].endTime.getUTCMonth(),
                                "earned": auctions[i].commission,
                                "auctions": 1
                            });
                        }

                    }
                    console.log(salesMonths);
                });
            });
        }
        else {
            $location.path("/");
        }
    });