chatApp.controller('registerController', function($scope) {
    
    $scope.message = 'Registration Successfull';
    $scope.display1 = function () {
        alert( $scope.message);
        };
    
});