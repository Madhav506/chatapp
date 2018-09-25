/*chatApp.controller('loginController', function($scope) {
    
    $scope.message = 'login Successfull';
    $scope.display = function () {
        alert( $scope.message);
        };
    
});*/
// var chatApp = angular.module('loginController', []);
chatApp.controller('loginController',function($scope,$http){
    console.log('login');
    $scope.user={
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.login = function(){
        console.log("login processing", $scope.user);
    $http({
        method: 'POST',
        url: '/login',
        data: $scope.user
    }).then(function(response){        
        if(response.status==200){
            console.log("successfully logged in ");
            $scope.message="Login Successful";
        }
        else if(response.status==404){
            
            console.log("login unsuccessful");
            console.log(response);
            $scope.message="Login Unsuccessful,invalid credentials";
        }
    })
 
},function (response) {
    console.log('login invalid');
    $scope.message = response.data.message;
}

});