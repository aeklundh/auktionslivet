var app = angular.module("auktionslivet", ["ngRoute", "Auctions", "Authentication", "Admin"]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/main.html",
        controller: "AuctionController"
    })
    .when("/auction/:id", {
        templateUrl: "views/viewAuction.html",
        controller: "ViewAuctionController"
    })
    .when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginController"
    })
    .when("/register", {
        templateUrl: "views/register.html",
        controller: "RegisterController"
    })
    .when("/logout", {
        templateUrl: "views/login.html",
        controller: "LoginController"
    })
    .when("/admin", {
        templateUrl: "views/admin.html",
        controller: "AdminController"
    })
    .otherwise( {
        templateUrl: "views/error.html"
    });

    $locationProvider.html5Mode(true);
});

// app.directive("woop", function() {
//     return {
//         templateUrl: "directives/woop.html"
//     };
// });