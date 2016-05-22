'use strict';
angular.module('homeApp.educate')
	.controller('eduCourseList', function($scope, fecthAllCourse) {
		//$scope.courseList = fecthAllCourse();
		fecthAllCourse('', function(result) {
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
			console.log(result)
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