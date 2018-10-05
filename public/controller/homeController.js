
chatApp.controller('homeController', function ($scope, $http,$state,SocketService) {
    
    var cuserid=localStorage.getItem('userid');
    var cusername = localStorage.getItem('username');
    var receiverid=localStorage.getItem('receiverid');
    var receivername=localStorage.getItem('receivername');
    console.log("home");
    console.log(cuserid);
    console.log(cusername);
    console.log(receiverid);
    console.log(receivername);

    $scope.mem='chat1';
    $scope.chatlist1=[];



    
    $scope.temp=1;
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
    $scope.username=username;
    
    
    var friendsarrlist = [];
//console.log('/users/' + userid + '/userlist');

        $http({
            method: 'GET',
            url: '/users/' + userid + '/userlist',
            headers: {
                'token': token
            }
        }).then(function (response) {

            console.log(response.data.message[0]);

            for (var i = 0; i < (response.data.message).length; i++) {

                friendsarrlist.push(response.data.message[i]);

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

        
        $scope.person=function(userid,username){
            localStorage.setItem('receiverid',userid);
            localStorage.setItem('receivername',username);
            //
        }
    
    
            

$scope.chatlist = [];
   
   $scope.show= function(name,id) {
        $scope.temp=0;
             console.log(name);console.log(id);
         $scope.mess=name;
        // $state.go('/peer');
      localStorage.setItem("receivername",name);
      localStorage.setItem("receiverid",id);
      $scope.mem='chat';

      $http({
        method: 'GET',
        url: '/peerchat/'+ cuserid+'/'+ receiverid,
        headers: {
            'token': token
        }
    }).then(function (response) {

        console.log(response.data.message);
        

        $scope.chatlist1=response.data.message;
    
    })


    }

    $scope.add = function(){

        if($scope.message.length !== 0 && $scope.mem=='chat1'){
            SocketService.emit('chatRoomBackend', {'userid': userid, 'username': username, 'message': $scope.message, 'dateTime': new Date()});
        }

        else {
            SocketService.emit('chatRoomBackend',{'senderid':cuserid,'sendername':cusername,'receiverid':receiverid,'receivername':receivername,'message':$scope.message,'dateTime':new Date()})
    //    console.log('chatRoomBackend',{'senderid':cuserid,'sendername':cusername,'receiverid':receiverid,'receivername':receivername,'message':$scope.message,'dateTime':new Date()})
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
    uName=[];
    uName.push(username);
    $scope.userName=username;
    $scope.cuserid=userid;

   

    // $scope.send=function(){
    //     console.log("in send")
    //     SocketService.emit('peerchatbackend',{'senderid':cuserid,'sendername':cusername,'receiverid':receiverid,'receivername':receivername})
    //     $scope.chatlist.push({'senderid': cuserid, 'sendername': cusername,'receiverid':receiverid,'receivername':receivername });
    //     $scope.message=null;
       
    //       }
         
       
       
        //    SocketService.on(cuserid, function(msg) {
       
        //        console.log(msg);
        //        if(cuserid==receiverid){
        //        $scope.chatlist.push(msg)
        //    }
        //    $scope.cuserid=cuserid;
        //    });
      
       
        SocketService.on('chatroomClient', function(msg) {

            var tempo=0;
            for(key in msg){
                tempo++;
            }
            if(tempo==4)
            {
    
            console.log(msg);
            $scope.chatlist.push(msg)
            }
            else{
             $scope.chatlist1.push(msg)
            console.log(msg);
            $scope.cuserid=cuserid;
               
            }
        });
  
       


















  

});











