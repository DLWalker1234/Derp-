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
    })
    //chat display
    .when('/chat', {
      templateUrl: 'chat.html',
      controller: 'chatController'
    })
    //trump analytics display
    .when('/trump', {
      tempelateUrl: 'trump.html',
      controller: 'trumpController'
    })
});

app.directive('ngEnter', function () {
  return function (scope, element, attrs) {
      element.bind("keypress", function (event) {
          if(event.which === 13) {
              scope.$apply(function (){
                  scope.$eval(attrs.ngEnter);
              });
              event.preventDefault();
          }
      });
  };
});

app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});


// app.factory('postService', function($http){
//   deletePost = (postId) =>{
//     console.log(postId);
//     $http.delete(`/posts/${postId}`);

//   }
//   getAll = () => {
//     return new Promise( (resolve, reject) =>{
//       $http.get(`/posts`);
      
//       })
//       resolve(data)
//     }
    
  
//   return { deletePost, getAll };
// });


app.controller('mainController', function(postService, $scope, $rootScope, $http){
    $scope.posts = postService.query();
    $scope.newPost = {created_by: '', text: '', created_at: ''};
    
    $scope.post = function() {
      $scope.newPost.created_by = $rootScope.current_user;
      $scope.newPost.created_at = Date.now();
      postService.save($scope.newPost, function(){
        $scope.posts = postService.query();
        $scope.newPost = {created_by: '', text: '', created_at: ''};
      });
    };
  });
  



//   postService.getAll()
//   .then((data)=>{
//     $scope.posts = data
//   })
// 	$scope.newPost = {derp_by: '', derp: '', time_stamp: ''};
	
// 	$scope.post = function() {
// 	  $scope.newPost.derp_by = $rootScope.current_user;
// 	  $scope.newPost.time_stamp = Date.now();
// 	  postService.save($scope.newPost, function(){
//       postService.getAll()
//       .then((data)=>{
//         $scope.posts = data;
//       })
// 	    $scope.newPost = {derp_by: '', derp: '', time_stamp: ''};
// 	  });
//   };
//   $scope.delete = function(post) {
//     console.log("ANYTHONG!", post);
//     postService.deletePost(post._id)
//   };
// });

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
