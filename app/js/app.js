'use strict';
angular.module('homeApp', ['ngRoute', 'ngCookies', 'tm.pagination', 'publicService', 'homeApp.operating', 'homeApp.home', 'homeApp.student', 'homeApp.educate', 'homeApp.finance', 'homeApp.analysis'])
  .config(function($routeProvider) {
        
  	$routeProvider
  	  .when('/:user_id', {
        templateUrl: 'views/home/calendar.html',
        controller: 'calendar'
      })
      
  	  // .otherwise({
  	  // 	redirectTo: ''
  	  // });
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
  

angular.module('homeMobile', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/dailyMobile', {
        templateUrl: 'views/public/daily.html',
        controller: 'daily'
      })
  })

  //财务日报
  .controller('daily', function($scope) {
    $scope.daily = {
      "schools": [{
        "school": '龙口西校区',
        "income": '12365412',
        "pay": '666666',
        "profit": '55555'
      },{
        "school": '珠江新城校区',
        "income": '12365412',
        "pay": '666666',
        "profit": '55555'
      }],
      "pay_method": [{
        "first": '现金',
        "second": '龙口西校区',
        "income": '20000',
        "pay": '552222',
        "remain": '700000'
      },{
        "first": '刷卡',
        "second": '4561351',
        "income": '20000',
        "pay": '552222',
        "remain": '700000'
      }]
    }
  })
