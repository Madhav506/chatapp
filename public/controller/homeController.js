
localStorage.getItem("token",token);

chatApp.controller('homeController',function($scope,$http){

    $scope.user={
        
    }
    console.log($scope.user);
    $scope.login = function(){
    $http({
        method: 'POST',
        url: '/home',
        data: $scope.user
    }).then(function(response){        
        if(response.status==200){
            
        }
        else if(response.status==404){
            
            
        }
    },function (response) {

        
       
    })
 
}

});