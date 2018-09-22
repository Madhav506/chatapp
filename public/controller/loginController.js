chatApp.controller('loginController', function($scope) {
    
    $scope.message = 'login Successfull';
    $scope.display = function () {
        alert( $scope.message);
        };
    
});