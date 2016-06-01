'use strict';
angular.module('homeApp.student')
	.controller('courseList', function($scope, deleteCourse, fetchOptions, getYearSessions, fetchCourseList) {
		$scope.filter = {
			"selectSchool": {
				"id": 1,
				"name": '全部校区'
			},
			"selectSession": {
				"id": 0,
				"name": '全部季度'
			},
			"selectYear": {
				"name": '2016'
			},
			"courseType": {
				"id": 1,
				"name": '所有课程类型'
			},
			"search": '',
		}
		fetchOptions('', function(result) {
			//console.log(result)
			$scope.options = {
				"schools": result.schools,
				"years": getYearSessions.year,
				"sessions": getYearSessions.sessions,
				"courseType": result.courseType
			}
			$scope.$apply();
		})
	
		//初始化课程列
		fetchCourseList($scope.filter, function(result) {
			console.log(result);
			$scope.courses = result;
			$scope.$apply();
		});

		$scope.sendFilter = function() {
			console.log($scope.filter)
			fetchCourseList($scope.filter, function(result) {
				console.log(result);
				$scope.courses = result;
				$scope.$apply();
			});
		}

		//delete course
		$scope.deleteCourse = function(course_id) {
			var data = {
				course_id: course_id
			}
			deleteCourse(data, function(result) {
				if(result.status == 1) {
					alert('成功删除一门课程');
				}
			})
		}
	})
	.controller('courseStuList', function($scope, $routeParams, deleteStuInCourse, fetchStuInfoOfTheCourse) {
		fetchStuInfoOfTheCourse($routeParams, function(result) {
			console.log(result);
			$scope.stuCourse = result;
			$scope.$apply();
			//console.log(result);
		})

		$scope.deleteStu = function(stu_id) {
			var data = {
				course_id: $routeParams.course_id,
				stu_id: stu_id
			}
			deleteStuInCourse(data, function(result) {
				if(result.status == 1) {
					alert('成功删除一位学生');
				}else{
					alert('该学生不可被删除');
				}
			})
		}
	})
	.controller('addCourse', function($scope, fetchSchCourseType, postCourse) {
		fetchSchCourseType('', function(result) {
			console.log(result);
			$scope.options = result;
			$scope.$apply();
		})

		//初始化表单
		$scope.course = {
			"school": {
				"id": '',
				"name": ''
			},
			"courseType": {
				"id": '',
				"name": ''
			},
			"courseName": ''
		}

		$scope.addCourse = function() {
			if($scope.course.school.id && $scope.course.courseType.id &&$scope.course.courseName) {
				postCourse($scope.course, function(result) {
					if(result.status) {
						alert('添加成功');
						window.location.href = ROOT + 'courseList';
					}
				})
			}
			
			
		}
	})
	.controller('planCourse', function($scope, fetchPlanCouOp, initPlanForm, getYearSessions, getWeekDays, planCourse) {
		fetchPlanCouOp('', function(result) {
			console.log(result);
			$scope.options = {
				"teachers": result.teachers,
				"courses": result.courses,
				"years": getYearSessions.year,
				"sessions": getYearSessions.session,
				"weekdays": getWeekDays
			}
			$scope.$apply();
			console.log($scope.options);
		})
		
		$scope.course = initPlanForm;

		$scope.submitCourseInfo = function() {
			var cou = $scope.course;
			if(cou.course_year && cou.course_session && cou.course_name.id && cou.course_teacher.id) {
				// if(isTime($scope.course.start_time) && isTime($scope.course.end_time)) {
					
				// }else{
				// 	alert('时间格式错误');
				// }
				planCourse($scope.course, function(result) {
					if(result.status == 1) {
						alert('成功排课');
						window.location.href = ROOT + 'courseList';
					}
				})
				console.log($scope.course);
			}else {
				alert('请完成必要信息的额填写');
			}
			
			
			console.log($scope.course);
		}
	})
	.controller('addStuToCourse', function($scope, $routeParams, initAddToCourseForm, fetchCourseInfo, addStuToCourse, fetchOptions) {
		fetchCourseInfo($routeParams, function(result) {
			console.log(result);
			$scope.courseInfo = result;
			$scope.$apply();
		})

		
		$scope.formData = initAddToCourseForm($routeParams.course_id);

		$scope.options = {
			"discount": [{
				"id": 0,
				"name": '打折'
			},{
				"id": 1,
				"name": '减价'
			}],
			//"pay_method": fetchPayOptions().pay_method
		}
		fetchOptions('', function(result) {
			$scope.options.pay_method = result.pay_method;
			$scope.$apply();
		})
		

		$scope.submitData = function() {
			addStuToCourse($scope.formData, function(result) {
				if(result.status == 1) {
					alert('添加成功');
					window.location.href = ROOT + 'courseStuList/' + $routeParams.course_id;
				}else {
					alert('出现错误');
				}
			})
			console.log($scope.formData);
		}
	})
	.controller('callback', function($scope, $routeParams, fetchCallBack, modifyCallback) {
		fetchCallBack($routeParams, function(result) {
			$scope.callback = result;
			$scope.$apply();
			console.log(result);
		})
		
		$scope.submitCallback = function(index) {
			var postData = $scope.callback.callbacks[index];
			postData.course_id = $routeParams.course_id;
			postData.stu_id = $routeParams.stu_id;
			console.log(postData);
			modifyCallback(postData, function(result) {
				if(result.status) {
					alert('操作成功');
				}
			})
		}
	})
	.controller('report', function($scope, $routeParams, getReport, postReport, createChart, submitReport) {

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
		// $scope.data = {
		// 	"info": {
		// 		"course_type": 'ESL', //最大的那个课程类别
		// 		"stu_name": '罗半仙',
		// 		"teacher": 'Mary',
		// 		"course_name": 'EEE#', //课程名称
		// 		"course_year": '2014',
		// 		"course_session": '暑假班'
		// 	},
		// 	"report_items": {
		// 		"basic": {
		// 			"comment": '这里是英文评价',
		// 			"comment_zh": '这里是中文评价',
		// 			"items": [{
		// 				"branches_num": '3', //有多少个分支
		// 				"item_name": 'speaking',
		// 				"score": ['50','80','85'], //返回格式可以商量
		// 				"sec_item": { //这里放第一个分支，剩下的放到下面的branches
		// 					"item_name": 'Volume',
		// 					"item_name_zh": '音量',
		// 					"score": ['60','65', '85']
		// 				},
		// 				"branches": [{
		// 					"item_name": 'Intonation',
		// 					"item_name_zh": '语音/语调',
		// 					"score": ['40','55', '83']
		// 				},{
		// 					"item_name": 'Pronunciation',
		// 					"item_name_zh": '发音',
		// 					"score": ['40','55', '83']
		// 				}]
		// 			},{
		// 				"branches_num": '2',
		// 				"item_name": 'Listening',
		// 				"score": ['50','80','85'], //返回格式可以商量
		// 				"sec_item": {
		// 					"item_name": 'firw',
		// 					"item_name_zh": 'shabi',
		// 					"score": ['60','65', '85']
		// 				},
		// 				"branches": [{
		// 					"item_name": 'Intonation',
		// 					"item_name_zh": '语音/语调',
		// 					"score": ['40','55', '83']
		// 				}]
		// 			}]
		// 		},
		// 		"study": {
		// 			"item_num": '5', //一共有5项
		// 			"items": [{
		// 				"item_name": 'Class Quality',
		// 				"item_name_zh": '课堂效率',
		// 				"score": ['70','85','90']
		// 			},{
		// 				"item_name": 'Class Quality',
		// 				"item_name_zh": '课堂效率',
		// 				"score": ['70','85','90']
		// 			},{
		// 				"item_name": 'Class Quality',
		// 				"item_name_zh": '课堂效率',
		// 				"score": ['70','85','90']
		// 			},{
		// 				"item_name": 'Review',
		// 				"item_name_zh": '效率',
		// 				"score": ['70','85','90']
		// 			},{
		// 				"item_name": 'Class Quality',
		// 				"item_name_zh": '课堂效率',
		// 				"score": ['70','85','90']
		// 			}],
		// 			"total_score": ['90','90','90'],
		// 			"comment": '这里是英文评价',
		// 			"comment_zh": '这里是中文评价'
		// 		},
		// 		"character": {
		// 			"item_num": 3,
		// 			"items": [{
		// 				"item_name": 'Concentration',
		// 				"item_name_zh": '集中力',
		// 				"score": [40,50,60]
		// 			},{
		// 				"item_name": 'Concentration',
		// 				"item_name_zh": '集中力',
		// 				"score": [40,50,60]
		// 			},{
		// 				"item_name": 'Concentration',
		// 				"item_name_zh": '集中力',
		// 				"score": [40,50,60]
		// 			}],
		// 			"total_score": [90,95,96],
		// 			"comment": '这里是英文评价',
		// 			"comment_zh": '这里是中文评价'
		// 		}
		// 	},
		// 	"attend": {
		// 		"attend": '',
		// 		"homework": ''
		// 	},
		// 	"chart_data": [{//做折线图用的
		// 		"name": 'speaking',
		// 		"data": [90, 91, 92]
		// 	},{
		// 		"name": 'listening',
		// 		"data": [90, 91, 92]
		// 	},{
		// 		"name": 'writing',
		// 		"data": [90, 91, 92]
		// 	}]
		// }
		// $scope.report = $scope.data.report_items;

		// $scope.submitReport = function() {
		// 	console.log($scope.data.report_items);
		// 	postReport($scope.data.report_items, function(result) {
		// 		console.log(result);
		// 	})
		// }
	})