'use strict';
angular.module('homeApp.educate')
	.controller('eduCourseList', function($scope, fecthAllCourse) {
		//$scope.courseList = fecthAllCourse();
		fecthAllCourse('', function(result) {
			console.log(result)
			$scope.$apply(function() {
				$scope.courseList = result;
			})
		})
	})
	.controller('eduStuList', function($scope, $routeParams, fetchCourseStu) {
		fetchCourseStu($routeParams, function(result) {
			console.log(result)
			$scope.$apply(function() {
				$scope.data = result;
			})
		})
		// $scope.data = fetchCourseStu($routeParams);
		// console.log($scope.data);
	})
	.controller('todayClass', function($scope, $routeParams, fetchTodayClass) {
		//$scope.data = fetchTodayClass($routeParams);

		fetchTodayClass($routeParams, function(result) {
			console.log(result);
			$scope.$apply(function() {
				$scope.data = result;
			})
		})
		$scope.modify = function(index) {
			var status = $scope.data.classes[index].isEditing;
			if(status) {
				var postData = {
					"course_id": '1', //排课编号,
					"att_id": '课程记录id',
					"note": '修改后的课堂记录的内容'
				}
				//$http 
				console.log('发送请求给后台，修改出勤状况');
				console.log($scope.data.classes[index].note);
			}
			$scope.data.classes[index].isEditing = !status;
		}
	})

	.controller('teaCallback', function($scope, $routeParams, fetchTeaCallBack, postCallback, modifyCallback) {
		fetchTeaCallBack($routeParams, function(result) {
			$scope.callback = result;
			$scope.$apply();
			console.log(result);
		})

		$scope.postData = {
			"course_id": $routeParams.course_id,
			"stu_id": $routeParams.stu_id,
			"new_callback": ''
		}
		$scope.submitCallback = function() {
			postCallback($scope.postData, function(result) {
				if(result.status) {
					alert('submit successfully');
				}
			})
		}

		$scope.modify = function(index) {
			var data = $scope.callback.callbacks[index];
			data.course_id = $routeParams.course_id;
			data.stu_id = $routeParams.stu_id
			modifyCallback(data, function(result) {
				if(result.status) {
					alert('modify successfully');
				}
			})
		}
	})

	.controller('teaReport', function($scope, $routeParams, getReport, postReport, createChart, submitReport) {

		getReport($routeParams, function(result) {
			console.log(result);
			$scope.data = result;
			createChart(result.chart_data.items, result.chart_data.score);
			$scope.$apply();
		})

		
		
		$scope.submitReport = function() {
			console.log($scope.data);
			$scope.data.stu_id = $routeParams.stu_id;
			$scope.data.course_id = $routeParams.course_id;
			submitReport($scope.data, function(result) {
				if(result.status) {
					alert('操作成功');
				}else{
					alert('请完善信息');
				}
			})
		}
		
		// $scope.submitReport = function() {
		// 	console.log($scope.data);
		// 	$scope.data.stu_id = $routeParams.stu_id;
		// 	$scope.data.course_id = $routeParams.course_id;
		// 	submitReport($scope.data, function(result) {
		// 		console.log(result);
		// 	})
		// }
	})