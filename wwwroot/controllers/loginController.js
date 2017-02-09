angular.module("Authentication")
    .controller("LoginController", function ($scope, $location, AuthService) {
        if (AuthService.IsAuthenticated()) {
            AuthService.Logout();
        }

        $scope.login = function() {
            AuthService.Login($scope.email, $scope.password).then(function(success) {
                if (success) {
                    $location.path("/");
                }
                else {
                    $scope.invalidLogin = true;
                }
            })
        };
    });