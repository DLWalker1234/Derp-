const app = angular.module('chirpApp', []);

app.controller('mainController', function($scope){
  var $scope.posts = [];
  var $scope.newPost = {derp_by: '', derp: '', time_stamp: ''};

  $scope.post = function(){
    $scope.newPost.time_stamp = Date.now();
    $scope.posts.push($scope.newPost);
    $scope.newPost = {derp_by: '', derp: '', time_stamp: ''};
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