'use strict';
angular.module('homeApp.educate')
	.controller('stuAttendList', function($scope) {
		$scope.courseAttend = {
			"courseInfo": {
				"course_id": '1',
				"course_name": 'EEL课程',
				"course_teacher": 'Dorry老师',
				"course_year": '2016',
				"course_session": '冬季班',
				"course_weekday": '星期三',
				"start_time": '14:00',
				"end_time": '16:00',
				"sum_count": '15'
			},
			"attendence": [{
				"stu_name": '罗半仙',
				"attend_list": [{
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 0
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 0
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 0
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 0
				}]
			}, {
				"stu_name": '罗半仙',
				"attend_list": [{
					"state": 1
				}, {
					"state": 0
				}, {
					"state": 1
				}, {
					"state": 0
				}, {
					"state": 1
				}, {
					"state": 0
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 1
				}, {
					"state": 0
				}]
			}]
		}
		var num = [];
		for (var i = 0, len = $scope.courseAttend.courseInfo.sum_count; i < len; i++) {
			num.push(i + 1);
		}
		$scope.courseNum = num;
	})
	
	//教师修改学生的出勤状态
	.controller('teaStuAttend', function($scope, $routeParams, allAttend, fetchStuAttend, modifyStuAttend) {
		console.log($routeParams);
		$scope.attendType = [{
			"id": '0',
			"name": '缺勤'
		},{
			"id": '1',
			"name": '已到'
		}]

		// $scope.courseStuInfo = {
		// 	"courseInfo": {
		// 		"course_id": '1', //该课程的id
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

		fetchStuAttend($routeParams, function(result) {
			console.log(result);
			$scope.courseStuInfo = result;
			$scope.$apply();
		})

		$scope.modify = function(index) {
			var item = $scope.courseStuInfo.stuInfo[index];
			if(item.isEditing) {
				var postData = {
					"course_id": $routeParams.course_id,
					"stu_id": item.stu_id,
					"stu_state": item.stu_state
				}
				modifyStuAttend(postData, function(result) {
					if(result.status) {
						alert('修改成功');

					}
				})
				
			}
			$scope.courseStuInfo.stuInfo[index].isEditing = !item.isEditing;
		}

		$scope.allAttend = function() {
			allAttend($routeParams, function(result) {
				if(result.status) {
					alert('操作成功');
					window.location.reload();
				}
			})
		}
	})
	
	.controller('homework', function($scope, $routeParams, fetchHomeworks) {
		// $scope.courseStuInfo = {
		// 	"courseInfo": {
		// 		"course_id": '1', //该课程的id
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
		// 		"comment": '95%',
		// 		"isEditing": 0
		// 	}]
		// }

		fetchHomeworks($routeParams, function(result) {
			$scope.courseStuInfo = result;
			$scope.$apply();
		})

		$scope.modify = function(index) {
			var status = $scope.courseStuInfo.stuInfo[index].isEditing;
			if(status) {
				var postData = {
					"course_id": '1', //排课编号,
					"att_id": '课程记录id',
					"comment": '0.9'
				}
				//$http 
				console.log('发送请求给后台，修改出勤状况');
				console.log($scope.courseStuInfo.stuInfo[index].note);
			}
			$scope.courseStuInfo.stuInfo[index].isEditing = !status;	
		}
	})