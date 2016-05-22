'use strict';
angular.module('homeApp.educateService', [])
	.factory('eduAPI', function(server) {
		return {
			"fecthAllCourse": server + 'get_course',
			"fetchCourseStu": server + 'get_student',
			"fetchStuInfoById": server + 'get_student_information',
			"fetchTodayClass": server + 'get_course_information',
			"fetchHomeworks": server + 'get_course_information',
			"fetchStuAttend": server + 'get_student_attendance',
			"modifyStuAttend": server + 'change_student_attendance',
			"allAttend": server + 'change_student_attendance',
		}
	})
	.factory('fecthAllCourse', function(eduAPI) {
		return function(data, callBack) {
			getData(eduAPI.fecthAllCourse, callBack, data);
		}
	})
	.factory('fetchCourseStu', function(eduAPI) {
		return function(data, callBack) {
			getData(eduAPI.fetchCourseStu, callBack, data);
		}
	})
	.factory('fetchTodayClass', function(eduAPI) {
		//var fetchData = function(course_id) {
			// return {
			// 	"courseInfo": {
			// 		"course_id": '1', //该课程的id，与下面的course_id不一样的
			// 		"course_name": 'EEL课程',
			// 		"course_year": '2016',
			// 		"course_session": '冬季班',
			// 		"course_weekday": '星期三',
			// 		"start_time": '14:00',
			// 		"end_time": '16:00'
			// 	},
			// 	"classes": [{
			// 		"id": '2', //课程记录id，应该就是教师的考勤id
			// 		"date": '2016-06-06',
			// 		"start_time": '12:00',
			// 		"end_time": '16:00',
			// 		"attend_state": 1, //只要有一个学生的考勤是还没有填的，就返回0
			// 		"comment_state": 1, //只要有一个学生的作业评价是还没有填的，就返回0
			// 		"note": '很安静', //课程记录
			// 		"idEditing": 0 
			// 	},{
			// 		"id": '3', 
			// 		"date": '2016-06-06',
			// 		"start_time": '12:00',
			// 		"end_time": '16:00',
			// 		"attend_state": 0, 
			// 		"comment_state": 0, 
			// 		"note": '很吵闹',
			// 		"idEditing": 0  
			// 	}]
			// }

		return function(data, callBack) {
			getData(eduAPI.fetchTodayClass, callBack, data);
		}

	})

	.factory('fetchStuInfoById', function(eduAPI) {
		return function(data, callBack) {
			getData(eduAPI.fetchStuInfoById, callBack, data);
		}
	})

	.factory('fetchHomeworks', function(eduAPI) {
		return function(data, callBack) {
			getData(eduAPI.fetchHomeworks, callBack, data);
		}
	})

	.factory('fetchStuAttend', function(eduAPI) {
		return function(data, callBack) {
			getData(eduAPI.fetchStuAttend, callBack, data);
		}
	})
	.factory('modifyStuAttend', function(eduAPI) {
		return function(data, callBack) {
			getData(eduAPI.modifyStuAttend, callBack, data);
		}
		
	})
	.factory('allAttend', function(eduAPI) {
		return function(data, callBack) {
			getData(eduAPI.allAttend, callBack, data);
		}
	})
	