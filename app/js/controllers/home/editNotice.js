'use strict';
angular.module('homeApp.home')
	//查看公告详情
	.controller('notice',function($scope, $routeParams, fetchNoticeById) {
		fetchNoticeById($routeParams, function(result) {
			console.log(result)
			$scope.notice = result;
			$scope.$apply();
		})
	})
	.controller('addNotice', function($scope, $location, $cookies, addNoticeFormInit, fetchSchools, submitNotice) {
		$scope.formData = addNoticeFormInit;
		//初始化多选框的值
		$scope.schools = fetchSchools;
		$scope.submitData = function(valid) {
			if(valid) {
				submitNotice($scope.formData, function(result) {
					if (result.status) {
						alert('添加成功');
						// $scope.$apply(function() { 
						// 	$location.path("/" + $cookies.get('user_id')); 
						// });	
					window.location.href = ROOT + $cookies.get('user_id');
					};
				})
			}else{
				alert('fail valid')
			}
		}
	})
	.controller('modifyNotice', function($scope, $cookies, $routeParams, fetchSchools, fetchNoticeById, modifyNotice) {
		fetchNoticeById($routeParams, function(result) {
			console.log(result);
			$scope.formData = result;
			$scope.$apply();
		});
		//初始化多选框的值
		$scope.schools = fetchSchools;
		$scope.submitData = function() {
			$scope.formData.ntc_id = $routeParams.ntc_id;
			modifyNotice($scope.formData, function(result) {
				if(result.status) {
					alert('修改成功');
					window.location.href = ROOT + $cookies.get('user_id');
				}
			})
		}
	})
	.controller('addSchedule', function($scope, $cookies, addScheFormInit, fetchSchools, submitSche) {
		$scope.formData = addScheFormInit;
		//初始化多选框的值
		$scope.schools = fetchSchools;
		$scope.submitData = function() {
			console.log($scope.formData);
			if(checkInputInObj($scope.formData)) {
				console.log($scope.formData);
				//在这里启动提交数据的服务
				submitSche($scope.formData, function(result) {
					if (result.status) {
						alert('添加成功');
						window.location.href = ROOT + $cookies.get('user_id');
					};
				})
			}
		}
	})
	.controller('modifySchedule', function($scope, $cookies, $routeParams, fetchSchools, fetchScheById, modifySche) {
		fetchScheById($routeParams, function(result) {
			$scope.formData = result;
			$scope.$apply();
		});
		//初始化多选框的值
		$scope.schools = fetchSchools;
		$scope.submitData = function() {
			$scope.formData.ntc_id = $routeParams.ntc_id;
			modifySche($scope.formData, function(result) {
				if(result.status) {
					alert('修改成功');
					window.location.href = ROOT + $cookies.get('user_id');
				}
			})
		}
	})
