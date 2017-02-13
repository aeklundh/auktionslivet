angular.module("Admin")
    .controller("AdminController", function ($scope, $location, AuthService, AuctionService, AdminService) {

        if (AuthService.IsAdminAuthorized()) {
            //set details for main view
            AdminService.GetSoldAuctions().then(function (soldAuctions) {
                soldAuctions = AuctionService.AssignCategoryNamesAndDates(soldAuctions);
                AuctionService.AssignSupplierNamesAndCommissions(soldAuctions).then(function (auctions) {
                    $scope.auctions = auctions;
                    $scope.showReport = false;
                    $scope.noAuctions = auctions.length == 0;
                })
            });

            $scope.SalesReport = function (auctions) {
                $scope.salesSum = 0;

                let GetMonthName = function (monthId) {
                    let monthName;
                    switch (monthId) {
                        case 0: monthName = "Januari"; break;
                        case 1: monthName = "Februari"; break;
                        case 2: monthName = "Mars"; break;
                        case 3: monthName = "April"; break;
                        case 4: monthName = "Maj"; break;
                        case 5: monthName = "Juni"; break;
                        case 6: monthName = "Juli"; break;
                        case 7: monthName = "Augusti"; break;
                        case 8: monthName = "September"; break;
                        case 9: monthName = "Oktober"; break;
                        case 10: monthName = "November"; break;
                        case 11: monthName = "December"; break;
                    }
                    return monthName;
                }



                //set commission per month in salesMonths
                $scope.salesSum += auctions[0].commission;
                let salesYears = [auctions[0].endTime.getFullYear()];
                salesMonths = [{
                    "year": auctions[0].endTime.getFullYear(),
                    "month": { "value": auctions[0].endTime.getUTCMonth(), "name": GetMonthName(auctions[0].endTime.getUTCMonth()) },
                    "earned": auctions[0].commission,
                    "auctions": 1
                }];
                for (let i = 1; i < auctions.length; i++) {
                    let foundMonth = false;
                    let foundYear = false;
                    for (let n = 0; n < salesYears.length; n++) {
                        if (salesYears[n] == auctions[i].endTime.getFullYear()) {
                            foundYear = true;
                        }
                    }

                    for (let n = 0; n < salesMonths.length; n++) {
                        if (salesMonths[n].month.value == auctions[i].endTime.getUTCMonth()
                            && salesMonths[n].year == auctions[i].endTime.getFullYear()) {

                            salesMonths[n].earned += auctions[i].commission;
                            $scope.salesSum += auctions[i].commission;
                            salesMonths[n].auctions += 1;
                            foundMonth = true;
                            break;
                        }
                    }

                    if (!foundYear) {
                        salesYears.push(auctions[i].endTime.getFullYear());
                    }

                    if (!foundMonth) {
                        $scope.salesSum += auctions[i].commission;
                        salesMonths.push({
                            "year": auctions[i].endTime.getFullYear(),
                            "month": { "value": auctions[i].endTime.getUTCMonth(), "name": GetMonthName(auctions[i].endTime.getUTCMonth()) },
                            "earned": auctions[i].commission,
                            "auctions": 1
                        });
                    }
                }
                $scope.salesYears = salesYears;
                return salesMonths;
            };
        }
        else {
            $location.path("/");
        }
    });