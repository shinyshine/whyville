'use strict';
angular.module('homeApp', ['ngRoute', 'ngCookies', 'tm.pagination', 'publicService', 'homeApp.operating', 'homeApp.home', 'homeApp.student', 'homeApp.educate', 'homeApp.finance', 'homeApp.analysis'])
  .config(function($routeProvider) {
        
  	$routeProvider
  	  .when('/:user_id', {
        templateUrl: 'views/home/calendar.html',
        controller: 'calendar'
      })
      // .when('/modifyPwd', {
      //   templateUrl: 'views/public/modifyPwd.html',
      //   controller: 'modifyPwd'
      // })
  	  .otherwise({
  	  	redirectTo: '/'
  	  });
  })
  .controller('homeApp', function($scope, $cookies) {
    $scope.user = {
      "id": $cookies.get('user_id'),
      "user_name": $cookies.get('user_name'),
      "authority": $cookies.get('authority'),
      "sch_id": $cookies.get('sch_id'),
      "sch_name": $cookies.get('sch_name')
    }
    // $scope.state = {
    //   "operating": 0,
    //   "notice": 0
    // }
    // var authority = $scope.user.authority;

    // if(authority == 0 || authority == 1 || authority == 2) {
    //   $scope.state.operating = 1
    // }
    // if(authority == 0 || authority == 1) {
    //   $scope.state.notice = 1
    // }
   

    
  })
  .controller('homeApp.header', function($scope, $cookies) {
    $scope.underline = function(index) {
      $('#nav').children().removeClass('active-li');
      $('#nav').children().eq(index).addClass('active-li');
    }

    $scope.logOut = function() {
      $cookies.remove('authority');
      $cookies.remove('user_name');
      $cookies.remove('sch_name');
      $cookies.remove('user_id');
      window.location.href = ROOT + 'login';
    }

  })
  