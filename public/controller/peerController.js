
chatApp.controller('peerController', function ($scope, $http,$state,SocketService) {
    

    if (localStorage) {
        var token = localStorage.getItem("token");
        var cuserid=localStorage.getItem('userid');
        var cusername = localStorage.getItem('username');
        var receiverid=localStorage.getItem('receiverid');
        var receivername=localStorage.getItem('receivername');
    }

   uName=[];
   uName.push(cusername+":"+receivername);
   $scope.userName=uName;
   $scope.chatlist=[];

   $scope.send=function(){
 SocketService.emit('peerchatbackend',{'senderid':cuserid,'sendername':cusername,'receiverid':receiverid,'receivername':receivername})
 $scope.chatlist.push({'senderid': cuserid, 'sendername': cusername,'receiverid':receiverid,'receivername':receivername });
 $scope.message=null;

   }
   console.log('/peerchat/'+ receiverid + 'cuserid');

        $http({
            method: 'GET',
            url: '/peerchat/'+receiverid+ cuserid,
            headers: {
                'token': token
            }
        }).then(function (response) {

            console.log(response.data.message[0]);
            

            $scope.chatlist=response.data.message;
        
        })


    SocketService.on(cuserid, function(msg) {

        console.log(msg);
        if(cuserid=receiverid){
        $scope.chatlist.push(msg)
    }
    $scope.cuserid=cuserid;
    });

});











