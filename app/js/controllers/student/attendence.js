'use strict';
angular.module('homeApp.student')
	.controller('teachAttend', function($scope, $routeParams, fetchPlanCouOp, fetchOptions, fetchCourseRecord, modifyClassInfo) {
		//console.log($routeParams);  排课id
		fetchOptions('', function(result1) {
			
			fetchPlanCouOp('', function(result2) {
				// $scope.options.teachers = result2.teachers;
				// $scope.$apply();
				$scope.options = {
					"schools": result1.schools,
					"teachers": result2.teachers
				}
			})
			$scope.$apply();
		})

		$scope.attendType = [{
			"id": 0,
			"name": '缺勤'
		},{
			"id": 1,
			"name": '已到'
		}]

		fetchCourseRecord($routeParams, function(result) {
			console.log(result)
			$scope.courseInfo = result;
			$scope.$apply();
		})
		
		/*修改上课时间，老师，老师的出勤状态*/
		$scope.modify = function(index) {
			var status = $scope.courseInfo.courseList[index].isEditing;
			if(status) {
				var course = $scope.courseInfo.courseList[index];
				var data = {
					"course_id": course.course_id,
					"course_date_time": course.course_date_time,
					"tea_id": course.course_teacher,
					"teacher_state": course.teacher_state
				}
				modifyClassInfo(data, function(result) {
					if(result.status) {
						//window.location.reload();
						alert('修改成功');
					}
				})
				//$http 
				console.log(data);
			}
			$scope.courseInfo.courseList[index].isEditing = !status;
		}
	})
	.controller('stuAttend', function($scope, $routeParams, fetchStuAttList, modifyStuAttend, allParticipated) {
		$scope.attendType = [{
			"id": 0,
			"name": '缺勤'
		},{
			"id": 1,
			"name": '已到'
		}]
		fetchStuAttList($routeParams, function(result) {
			$scope.$apply(function() {
				$scope.courseStuInfo = result;
			})
		})

		// $scope.courseStuInfo = {
		// 	"courseInfo": {
		// 		"course_id": '1', //该课程的id，与下面的course_id不一样的
		// 		"course_name": 'EEL课程',
		// 		"course_teacher": 'Dorry老师',
		// 		"course_year": '2016',
		// 		"course_session": '冬季班',
		// 		"course_weekday": '星期三',
		// 		"start_time": '14:00',
		// 		"end_time": '16:00'
		// 	},
		// 	"course_date": '2016-06-06',
		// 	"stuInfo": [{
		// 		"stu_id": '2',
		// 		"stu_name": '罗半仙',
		// 		"finish_num": '3',
		// 		"sum_count": '40',
		// 		"stu_state": {
		// 			"id": '1',
		// 			"name": '已到'
		// 		},
		// 		"isEditing": 0
		// 	},{
		// 		"stu_id": '3',
		// 		"stu_name": '罗仙',
		// 		"finish_num": '3',
		// 		"sum_count": '40',
		// 		"stu_state": {
		// 			"id": '0',
		// 			"name": '缺勤'
		// 		},
		// 		"isEditing": 0
		// 	},{
		// 		"stu_id": '4',
		// 		"stu_name": '罗半',
		// 		"finish_num": '3',
		// 		"sum_count": '40',
		// 		"stu_state": {
		// 			"id": '',
		// 			"name": ''
		// 		},
		// 		"isEditing": 0
		// 	}]
		// }

		$scope.modify = function(index) {
			var item = $scope.courseStuInfo.stuInfo[index];
			if(item.isEditing) {
				//$http 
				console.log('发送请求给后台，修改出勤状况');
				var postData = {
					"att_id": $routeParams.course_id,
					"stu_id": item.stu_id,
					"stu_state": item.stu_state
				}
				//console.log(postData);
				// modifyStuAttend(postData, function(result) {
				// 	if(result.status) {
				// 		alert('修改成功');
				// 	}
				// })

			}
			$scope.courseStuInfo.stuInfo[index].isEditing = !item.isEditing;
		}

		$scope.allParticipated = function() {
			allParticipated($routeParams, function(result) {
				if(result.status) {
					window.location.reload();
				}
			})
		}
	})
	.controller('attendList', function($scope, $routeParams, fetchStuAttTable) {
		fetchStuAttTable($routeParams, function(result) {
			console.log(result)
			$scope.courseAttend = result;
			$scope.$apply();
		})
	})