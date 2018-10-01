
chatApp.controller('homeController', function ($scope, $http,$state,SocketService) {
    
    console.log(localStorage.getItem("userid"))
    console.log(localStorage.getItem("username"))


   SocketService.emit('tobackend',"client is connected");
   console.log("client is connected");


   SocketService.on('toclient',function(msg){
    console.log(msg);
    

   })


    if (localStorage) {

        var userid = localStorage.getItem("userid", userid);
        var token = localStorage.getItem("token", token);
        var username = localStorage.getItem('username',username);
    }

    $scope.userid1=userid;
    
    var friendsarrlist = [];
console.log('/users/' + userid + '/userlist');

        $http({
            method: 'GET',
            url: '/users/' + userid + '/userlist',
            headers: {
                'token': token
            }
        }).then(function (response) {

            console.log(response.data.message[0]);

            for (var i = 0; i < (response.data.message).length; i++) {

                friendsarrlist.push(response.data.message[i].username);

            }
            console.log(friendsarrlist);
            
            $scope.friendsarrlist = friendsarrlist;
            
        
        
        
        })
        $scope.logout = function(){

            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            localStorage.clear();
            $state.go("login");
        }
    
    
            

$scope.chatlist = [];
    $scope.chatlistnew = [];


    $scope.add = function(){

        if($scope.message.length !== 0){
            SocketService.emit('chatRoomBackend', {'userid': userid, 'username': username, 'message': $scope.message, 'dateTime': new Date()});
           // $scope.chatlist.push({'userid': userid, 'username': username, 'message': $scope.message, 'dateTime': new Date()})
        }
        $scope.message=null;
    }

    $http({

        method: 'GET',
        url: '/chatlist',
        headers: {
            'token': token
          }
          })  .then(function(response){

            
            console.log(response.data.message);

            $scope.chatlist = response.data.message;
            

    })
    

    SocketService.on('chatroomClient', function(msg) {

        console.log(msg);
        $scope.chatlist.push(msg)
    });




});











