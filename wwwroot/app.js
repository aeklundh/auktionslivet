var app = angular.module("auktionslivet", ["ngRoute", "Auctions"]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/main.html",
        controller: "AuctionController"
    })
    .when("/auction/:id", {
        templateUrl: "views/viewAuction.html",
        controller: "ViewAuctionController"
    })
    .otherwise( {
        templateUrl: "views/error.html"
    });

    $locationProvider.html5Mode(true);
});