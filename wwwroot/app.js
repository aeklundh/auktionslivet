var app = angular.module("auktionslivet", ["ngRoute", "angular-jwt", "Auctions", "Authentication", "Admin"]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/home.html",
        controller: "HomeController"
    })
    .when("/auction/:id", {
        templateUrl: "views/view-auction.html",
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