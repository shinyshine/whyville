'use strict';
angular.module('homeApp.finance')
	.controller('incomeList', function($scope, getYearMonth, fetchOptions, fetchIncomeList, pagination) {
		$scope.filter = {
			"selectSchool": {
				"id": '1',
				"name": '全部校区'
			},
			"startTime": {
				"name": moment().format('YYYY-MM')
			},
			"endTime": {
				"name": moment().format('YYYY-MM')
			},
			"payMethod": {
				"id": '',
				"name": '支付方式'
			},
			"payTo": {
				"id": '',
				"name": ''
			},
			"type": {
				"id": 0,
				"name": '全部类型' 
			},
			"page": 1,
			"num": 3
		}

		//about pagination
		$scope.paginationConf = {};

		fetchIncomeList($scope.filter, function(result) {
			console.log(result);
			$scope.$apply(function() {
				$scope.incomeList = result;
				//about pagination
				var total = result.total.number;

				$scope.paginationConf = pagination(total);
				$scope.paginationConf.onChange = function() {
					$scope.filter.page = $scope.paginationConf.currentPage;
					$scope.pageChange();
				}
			})
		})

		fetchOptions('', function(result) {
			$scope.options ={
				"yearMonth": getYearMonth,
				"schools": result.schools,
				"pay_method": result.pay_method,
				"type": [{
					"id": 0,
					"name": '全部类型'
				},{
					"id": 1,
					"name": '学费'
				},{
					"id": 2,
					"name": '书费'
				},{
					"id": 3,
					"name": '校车费'
				},{
					"id": 4,
					"name": '其他'
				}]
			}
			$scope.$apply();
		})
		$scope.pageChange = function() {
			fetchIncomeList($scope.filter, function(result) {
				$scope.$apply(function() {
					$scope.incomeList = result;
				})
			})
		}

		$scope.sendFilter = function() {
			$scope.filter.page = 1;
			fetchIncomeList($scope.filter, function(result) {
				$scope.$apply(function() {
					$scope.incomeList = result;
					$scope.paginationConf.totalItems = result.sum;
				})
			})
		}
	})
	.controller('modIncome', function($scope, $routeParams, fetchSchools, fetchOptions, fetchIncomeById, getDate) {
		fetchOptions('', function(result) {
			$scope.options = {
				"schools": result.schools,
				"pay_method": result.pay_method,
				"type": [{
					"id": 0,
					"name": '全部类型'
				},{
					"id": 1,
					"name": '学费'
				},{
					"id": 2,
					"name": '书费'
				},{
					"id": 3,
					"name": '校车费'
				},{
					"id": 4,
					"name": '其他'
				}],
				"date": getDate
			}
		})
		

		fetchIncomeById($routeParams, function(result) {
			console.log(result);
		})

		$scope.submitData = function() {
			console.log($scope.formData);
		}
	})
	.controller('addIncome', function($scope, $location, fetchOptions, initAddIncomeForm, addIncome, getDate) {
		var search = $location.search(),
			price = search.co,
			s_id = search.s_id,
			stu_id = search.stu;
		$scope.formData = initAddIncomeForm(price, s_id, stu_id);
		fetchOptions('', function(result) {
			$scope.$apply(function() {
				$scope.options = {
					"schools": result.schools,
					"pay_method": result.pay_method,
					"type": [{
						"id": 1,
						"name": '学费'
					},{
						"id": 2,
						"name": '书费'
					},{
						"id": 3,
						"name": '校车费'
					},{
						"id": 4,
						"name": '其他'
					}],
					"date": getDate
				}
			})
		})

		$scope.addIncome = function() {
			console.log($scope.formData)
			addIncome($scope.formData, function(result) {
				if(result.status) {
					alert('成功添加收入');
					window.location.href = ROOT + 'incomeList';
				}
 			})
		}
	})