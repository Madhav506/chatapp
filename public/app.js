var chatApp = angular.module('chatApp', [ 'ui.router', 'btford.socket-io']);
chatApp.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /login
    
     $urlRouterProvider.otherwise('/login');


    $stateProvider

        .state('login', {
            url:'/login',
            templateUrl: 'templates/login.html',
            controller:'loginController'
        })
        .state('register', {
            url:'/register',
            templateUrl: 'templates/register.html',
            controller:'registerController'

        })
        .state('home',{
           url:'/home',
            templateUrl: 'templates/home.html',
            controller:'homeController'

        })
        
    
});
// SocketFactory to connect on a different path, or need to hold a reference to the Socket.IO socket object for use elsewhere.

chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:8000')
    });
}]);
