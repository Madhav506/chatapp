/*chatApp.controller('loginController', function($scope) {
    
    $scope.message = 'login Successfull';
    $scope.display = function () {
        alert( $scope.message);
        };
    
});*/
// var chatApp = angular.module('loginController', []);
chatApp.controller('loginController',function($scope,$http,$state){
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
            $state.go('home');
            var token=response.data.token;
            localStorage.setItem("token",token);
            
        }
        else if(response.status==404){
            
            console.log("login unsuccessful");
            console.log(response);
            $scope.message="Login Unsuccessful,invalid credentials";
        }
    },function (response) {
        console.log(response);
        $scope.message = response.data.message;
      $scope.message="Login Unsuccessful,invalid credentials";
    })
 
}

});