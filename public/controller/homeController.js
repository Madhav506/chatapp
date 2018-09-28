
chatApp.controller('homeController', function ($scope, $http) {
    console.log(localStorage.getItem("userid"))

    if (localStorage) {

        var userid = localStorage.getItem("userid", userid);
        var token = localStorage.getItem("token", token);
    }

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

            


        

});








