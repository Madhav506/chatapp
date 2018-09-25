/*chatApp.controller('registerController', function($scope) {
    
    $scope.message = 'Registration Successfull';
    $scope.display1 = function () {
        alert( $scope.message);
        };
    
});*/
// var chatApp = angular.module('loginController', []);

chatApp.controller('registerController', function ($scope, $http) {
    //console.log('register');
    $scope.user = {
        'firstname': '',
        'lastname': '',
        'email': '',
        'mobilenumber': '',
        'password': '',

    }
    console.log($scope.user);
    $scope.register = function () {
        console.log("register processing", $scope.user);
        $http({
            method: 'post',
            url: '/register',
            data: $scope.user
        }).then(function(response) {
            if (response.status == 200) {
                console.log("successfully registered in ");
                $scope.message = "Registration sucessfull"
            }
            else if (response.status == 404) {
                console.log('registration invalid,because you have registered already')
                $scope.message = "Registration unsucessfull"
            }
        })
    },function (response) {
        console.log('registration invalid,because you have registered already');
        $scope.message = response.data.message;
    }
    

});
