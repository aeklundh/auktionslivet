angular.module("Authentication")
    .controller("RegisterController", function ($scope, $location, AuthService) {
        if (AuthService.IsAuthenticated()) {
            $location.path("/");
        }

        $scope.register = function() {
            AuthService.RegisterNew($scope.newUser).then(function(success) {
                if (success) {
                    AuthService.Login($scope.newUser.email, $scope.newUser.password).then(function(success) {
                        if (success) {
                            $location.path("/");
                        }
                        else {
                            $location.path("/login");
                        }
                    })
                }
                else {
                    $scope.invalidAttempt = true;
                }
            })
        };
    });