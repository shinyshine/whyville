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
			"fetchCallBack": server + ''
		}
	})

	.factory('fetchCallBack', function(eduAPI) {
		return function(data, callBack) {
			getData(eduAPI.fetchCallBack, callBack, data);
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
	