var chatApp = angular.module('chatApp', [ 'ui.router']);
chatApp.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /login
    $urlRouterProvider.otherwise('/login');


    $stateProvider

        .state('login', {
            url:'/login',
            templateUrl: 'templates/login.html',
            controller:'loginController'
        })
        .state('/register', {
            url:'/register',
            templateUrl: 'templates/register.html',
            controller:'registerController'

        })
        

    
});
