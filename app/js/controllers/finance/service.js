'use strict';
angular.module('homeApp.financeService', [])
	.factory('financeAPI', function(server) {
		return {
			"fetchPayList": server + 'get_cost',
			"addPay": server + 'add_cost',
			"fetchIncomeList": server + 'get_income',
			"addIncome": server + 'add_income',
			"fetchAppList": server + 'get_application2',
			"payForApp": server + 'accept_application',
			"fetchAppById": server + 'get_application_information',
			"payForApp": server + 'accept_application',
			"modPay": server + 'change_cost',
		}
	})
	.factory('fetchPayList', function(financeAPI) {
		// var fetchData = function(filter) {
		// 	return {
		// 		"total": {
		// 			"number": '50',    //一共多少项记录
		// 			"cost": '50000000000000' //一共多少钱
		// 		},
		// 		"payList": [{
		// 			"pay_id": '1',
		// 			"school": '珠江新城校区',
		// 			"pay_date": '2016-06-06',
		// 			"pay_type": '管理费用',
		// 			"pay_sec_type": '水电费',
		// 			"pay_method": '现金',
		// 			"pay_to": '珠江新城',
		// 			"cost": '5000',
		// 			"app_state": 0, //是否申请
		// 			"abstraction": '摘要啊'
		// 		}]
		// 	}
		// }

		return function(data, callBack) {
			getData(financeAPI.fetchPayList, callBack, data);
		}
	})
	.factory('initAddPayForm', function() {
		return {
				"school": {
					"id": '',
					"name": ''
				},
				"pay_date": moment().format('YYYY-MM-DD'),
				"pay_type": {
					"id": '',
					"name": ''
				},
				"pay_sec_type": {
					"id": '',
					"name": ''
				},
				"pay_method": {
					"id": '',
					"name": ''
				},
				"pay_to": {
					"id": '',
					"name": ''
				},
				"cost": '',
				"app_state": 0, //是否申请
				"abstraction": ''
			}
	})

	.factory('addPay', function(financeAPI) {
		return function(data, callBack) {
			postData(financeAPI.addPay, data, callBack);
		}
	})
	.factory('fetchPayById', function(financeAPI) {
		// var fetchData = function(pay_id) {
		// 	return {
		// 		"pay_id": 1,
		// 		"school": {
		// 			"id": 1,
		// 			"name": '大学城校区'
		// 		},
		// 		"pay_date": '2016-06-03',
		// 		"pay_type": {
		// 			"id": '1',
		// 			"name": '管理费用'
		// 		},
		// 		"pay_sec_type": {
		// 			"id": '2',
		// 			"name": '水电费'
		// 		},
		// 		"pay_method": {
		// 			"id": '0',
		// 			"name": '现金'
		// 		},
		// 		"pay_to": {
		// 			"id": '2',
		// 			"name": '珠江新城'
		// 		},
		// 		"cost": '5000',
		// 		"app_state": 0, //是否申请
		// 		"abstraction": '摘要啊'
		// 	}
		// }
		return function(data, callBack) {
			getData(financeAPI.modPay, callBack, data);
		}
	})
	.factory('modPay', function(financeAPI) {
		return function(data, callBack) {
			postData(financeAPI.modPay, data, callBack);
		}
	})

	.factory('fetchIncomeList', function(financeAPI) {
		// var fetchData = function() {
		// 	return {
		// 		"total": {
		// 			"number": '50',    //一共多少项记录
		// 			"sum": '50000000000000' //一共多少钱
		// 		},
		// 		"incomeList": [{
		// 			"in_id": 1, 
		// 			"school": '大学城校区',
		// 			"date": '2016-06-06',
		// 			"in_type": '书费',
		// 			"sum": '5000',
		// 			"pay_method": '现金',
		// 			"pay_to": '珠江新城校区',
		// 			"abstraction": '摘要啊',
		// 			"charge_name": '经手人姓名'
		// 		}]
		// 	}
		// }
		return function(data, callBack) {
			getData(financeAPI.fetchIncomeList, callBack, data);
		}
	})
	.factory('initAddIncomeForm', function(financeAPI, $cookies) {
		return function(price, s_id, stu) {
			return {
				"in_id": '',
				"school": {
					"id": '',
					"name": ''
				},
				"other_data": {
					"select_id": s_id,
					"stu_id": stu
				},
				"date": moment().format('YYYY-MM-DD'),
				"type": '',
				"pay_method": {
					"id": '',
					"name": ''
				},
				"pay_to": {
					"id": '',
					"name": ''
				},
				"sum": price,
				"abstraction": '',
				"charge_name": $cookies.get('user_name')
			}
		}
	})

	.factory('addIncome', function(financeAPI) {
		return function(data, callBack) {
			postData(financeAPI.addIncome, data, callBack);
		}
	})

	.factory('fetchInForm', function($http) {
		var fetchData = function(in_id) {
			return {
				"in_id": 2,
				"school": {
					"id": 1,
					"name": '大学城校区'
				},
				"date": '2016-06-03',
				"type": '书费',
				"pay_method": {
					"id": '0',
					"name": '现金'
				},
				"pay_to": {
					"id": '2',
					"name": '珠江新城'
				},
				"sum": '5000',
				"abstraction": '摘要啊',
				"charge_name": '罗半仙'
			}
		}

		return function(in_id) {
			return fetchData(in_id);
		}
	})
	.factory('fetchAppList', function(financeAPI) {
		// var fetchData = function() {
		// 	return {
		// 		"total": {
		// 			"number": 30,
		// 			"cost": 60000000000000000
		// 		},
		// 		"appList": [{
		// 			"app_id": 1,
		// 			"school": '大学城校区',
		// 			"emp_name": '罗半仙',
		// 			"app_title": '购书',
		// 			"date": '2016-06-06',
		// 			"pay_method": '现金', //这一项和下面那一项，如果是还没有付款的，能不能返回空给我。。假设你能
		// 			"pay_to": '天河校区'
		// 		}]
		// 	}
		// }

		return function(data, callBack) {
			getData(financeAPI.fetchAppList, callBack, data);
		}
	})

	.factory('payForApp', function(financeAPI) {
		return function(data, callBack) {
			postData(financeAPI.payForApp, data, callBack);
		}
	})

	//获取某申请表的信息
	.factory('fetchAppById', function(financeAPI) {
		// var fetchData = function(app_id) {
		// 	return {
		// 		"app_id": 2222,
		// 		"app_date": '2016-06-03',
		// 		"school": '珠江新城校区',
		// 		"emp_name": '罗半仙',
		// 		"app_title": '购置办公用品',
		// 		"content": '办公桌三张',
		// 		"per_price": '500',
		// 		"number": '20',
		// 		"total_price": '10000',
		// 		"accept_date": '2016-06-06', //审批日期
		// 		"accept_name": '罗总经理', //审批人姓名
		// 		"opinion": '让你买一次哈哈哈' //审批人意见
		// 	}
		// }

		return function(data, callBack) {
			getData(financeAPI.fetchAppById, callBack, data);
		}
	})