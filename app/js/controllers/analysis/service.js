'use strict';
angular.module('homeApp.analysisService', [])
	.factory('analysisAPI', function(server) {
		return {
			"fetchTeaSalary": server + 'get_teacher_salary',
			"fetchStuFee": server + 'get_course_income',
			"fetchSchFee": server + 'get_course_income2',
			"fetchStuBookFee": server + 'get_book_income',
			"fetchSchBookFee": server + 'get_book_income2',
			"fetchStuBusFee": server + 'get_bus_income',
			"fetchSchBusFee": server + 'get_bus_income2'
		}
	})
	.factory('fetchTeaSalary', function(analysisAPI) {
		// return function() {
		// 	return [{
		// 		"school": '珠江新城校区',
		// 		"type": '全职教师',
		// 		"name": '教师姓名',
		// 		"course_num": '50',
		// 		"salary": '50000',
		// 		"scale": '100'  //时薪比例我也不知道是什么
		// 	}]
		// }
		return function(data, callBack) {
			getData(analysisAPI.fetchTeaSalary, callBack, data);
		}
	})

	//获取具体课程收入列表
	.factory('fetchStuFee', function(analysisAPI) {
		// return function() {
		// 	return {
		// 		"total": '500000000000',
		// 		"list": [{
		// 			"stu_id": '123456',
		// 			"stu_name": '罗半仙',
		// 			"signup_date": '2016-06-06',
		// 			"per_price": '60',
		// 			"number": '20',
		// 			"discount": 0.85,
		// 			"cut": '160',
		// 			"pay_method": '现金',
		// 			"pay_to": '珠江新城校区',
		// 			"pay_date": '2016-06-03',
		// 			"total_price": '1800'
		// 		}]
		// 	}
		// }
		return function(data, callBack) {
			getData(analysisAPI.fetchStuFee, callBack, data);
		} 
	})
	//获取课程类型和所有课程，用于link-selest
	.factory('fetchCourses', function($http) {
		return function() {
			 return [[{
					"id": '1',
					"name": 'EEEEEE'
				},{
					"id": '2',
					"name": 'DDDDDD'
				}],[{
					"id": '1',
					"name": 'E1'
				},{
					"id": '2',
					"name": 'E2'
				}],[{
					"id": '1',
					"name": 'D1'
				},{
					"id": '2',
					"name": 'D2'
				}]]
		}
	})
	//获取整体课程收入列表
	.factory('fetchSchFee', function(analysisAPI) {
		// return function() {
		// 	return {
		// 		"total": '600000000000',
		// 		"list": [{
		// 			"course_name": 'E3',
		// 			"school": '大学城校区',
		// 			"year": '2016',
		// 			"session": '春季班',
		// 			"course_type": 'EEEEE',
		// 			"sign_num": '3000', //报读人数
		// 			"total_times": '4000',
		// 			"total_price": '60000000'
		// 		}]
		// 	}
		// }
		return function(data, callBack) {
			getData(analysisAPI.fetchSchFee, callBack, data);
		}
	})
	
	//获取具体书费收入列表，以学生为主体
	.factory('fetchStuBookFee', function(analysisAPI) {
		// return function() {
		// 	return {
		// 		"total": '2300241',
		// 		"list": [{
		// 			"stu_id": '333',
		// 			"stu_name": '罗半仙',
		// 			"date": '2016-02-02',
		// 			"book_fee": '500',
		// 			"pay_method": '现金',
		// 			"pay_to": '天河校区', 
		// 			"total_price": '60000000'
		// 		}]
		// 	}
		// }
		return function(data, callBack) {
			getData(analysisAPI.fetchStuBookFee, callBack, data);
		}
	})
	.factory('fetchSchBookFee', function(analysisAPI) {
		
		return function(data, callBack) {
			getData(analysisAPI.fetchSchBookFee, callBack, data);
		}
	})
	.factory('fetchStuBusFee', function(analysisAPI) {
		
		return function(data, callBack) {
			getData(analysisAPI.fetchStuBusFee, callBack, data);
		} 
	})

	//获取校车收入列表，以校车为主体
	.factory('fetchSchBusFee', function(analysisAPI) {
		// return function() {
		// 	return {
		// 		"total": '2500000',
		// 		"list": [{
		// 			"school": '珠江新城校区',
		// 			"year": '2016',
		// 			"session": '春季班',
		// 			"bus_number": '泰坦尼克号213',
		// 			"order_num": '30',  //预订人数
		// 			"order_times": '200', //预订总次数
		// 			"total_price": '52000000'
		// 		}]
		// 	}
		// }
		return function(data, callBack) {
			getData(analysisAPI.fetchSchBusFee, callBack, data);
		}
	})

	//获取校区生源信息
	.factory('fetchSchInfo', function($http) {
		return function() {
			return {
				"list_1": [{
					"school": '珠江新城校区',
					"cur_study_num": '200',
					"course_sign_num": '800', //课程报读量，具体概念你去问啊K
					"keep_rate": 0.5,   //续报率
					"last_keep_rate": 0.3   //上学期续报率
				},{
					"school": '天河校区',
					"cur_study_num": '310',
					"course_sign_num": '2000', //课程报读量，具体概念你去问啊K
					"keep_rate": 0.52,   //续报率
					"last_keep_rate": 0.42   //上学期续报率
				}],
				"list_2": [{
					"school": '天河校区',
					"country": '韩国',
					"cur_study_num": '30',
					"percent": 0.35,  //所占比例
				}]
			}
		}
	})