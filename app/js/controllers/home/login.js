'use strict';
angular.module('homeApp.home')
	.controller('login', function($scope, $location, $cookies, login) {
		$scope.user = {
			"user_id": '20160001',
			"user_pwd": '123'
		}

		$scope.login = function() {
			login($scope.user, callBack);	
		}

		var callBack = function(result) {
			var status = result.status;
			if(status) {
				$cookies.put('authority', result.authority);
				$cookies.put('user_name', result.user_name);
				$cookies.put('sch_name', result.sch_name);
				$cookies.put('user_id', result.user_id);
				$cookies.put('sch_id', result.sch_id);
				// $location.path('/' + $cookies.get('user_id'));
				$scope.$apply(function() { 
					$location.path("/" + $cookies.get('user_id')); 
				});	
			}else{
				alert('用户名或密码错误');
			}
		}
	})
	.controller('modifyPwd', function($scope, $location, $cookies, modifyPwd) {
		$scope.postData = {
			"new_pwd":'',
			"confirm": '' 
		}
		$scope.modifyPwd = function() {
			var post = $scope.postData;
			if(!post.new_pwd) {
				alert('密码不能为空');
				return false;
			}
			if(post.new_pwd !== post.confirm) {
				alert('两次密码不一致');
				return false;
			}
			modifyPwd($scope.postData, function(result) {
				if(result.status) {
					alert('成功修改密码');
					$scope.$apply(function() {
						$location('/');
					})
				}
			})
		}

		
	})