var app = angular.module('derpApp', ['ngRoute', 'ngResource']).run(function($rootScope) {

  //user should not be authenticated at start
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		});
});

app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('mainController', function(postService, $scope, $rootScope){
	$scope.posts = postService.query();
	$scope.newPost = {derp_by: '', derp: '', time_stamp: ''};
	
	$scope.post = function() {
	  $scope.newPost.derp_by = $rootScope.current_user;
	  $scope.newPost.time_stamp = Date.now();
	  postService.save($scope.newPost, function(){
	    $scope.posts = postService.query();
	    $scope.newPost = {derp_by: '', derp: '', time_stamp: ''};
	  });
	};
});

app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});

// app.controller('chatController', ['$rootScope', '$scope', function($rootScope, $scope){
//   var vm = this;
//   var socket = window.io('localhost:3000/')
// }])

