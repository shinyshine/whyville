'use strict';
angular.module('homeApp.finance')
	.controller('payList', function($scope, getYearMonth, fetchOptions, fetchPayList, pagination) {
		$scope.filter = {
			"selectSchool": {
				"id": '1',
				"name": '全部校区'
			},
			"startTime": moment().format('YYYY-MM'),
			"endTime": moment().format('YYYY-MM'),
			"payFisrt": {
				"id": '', 
				"name": '费用类型'
			},
			"paySec": {
				"id": '',
				"name": ''
			},
			"payMethod": {
				"id": '',
				"name": '支付方式'
			},
			"payTo": {
				"id": '',
				"name": ''
			},
			"page": 1,
			"num": 3
		}
		//about pagination
		$scope.paginationConf = {};

		fetchPayList($scope.filter, function(result) {
			console.log(result);
			$scope.$apply(function() {
				$scope.payList = result;

				//about pagination
				var total = result.sum;
				$scope.paginationConf = pagination(total);
				$scope.paginationConf.onChange = function() {
					$scope.filter.page = $scope.paginationConf.currentPage;
					$scope.pageChange();
				}
			})
		})

		fetchOptions('', function(result) {
			$scope.options = {
				"yearMonth": getYearMonth,
				"schools": result.schools,
				"pay_method": result.pay_method,
				"pay_type": result.pay_type
			}
			$scope.$apply();
		})

		$scope.pageChange = function() {
			fetchPayList($scope.filter, function(result) {
				$scope.payList = result;
				$scope.$apply();
			})	 
		}

		$scope.sendFilter = function() {
			$scope.filter.page = 1;
			fetchPayList($scope.filter, function(result) {
				$scope.$apply(function() {
					$scope.payList = result;
					$scope.paginationConf.totalItems = result.sum;
				})
			})

			console.log($scope.paginationConf)
		}
	})
	.controller('modPay', function($scope, $routeParams, fetchOptions, fetchPayById, modPay) {
		fetchOptions('', function(result) {
			$scope.$apply(function() {
				$scope.options = {
					"schools": result.schools,
					"pay_type": result.pay_type,
					"pay_method": result.pay_method
				}
			})
		})

		fetchPayById($routeParams, function(result) {
			$scope.$apply(function() {
				$scope.formData = result;
			})
		})

		$scope.addPay = function() {
			modPay($scope.formData, function(result) {
				if(result.status) {
					alert('修改成功');
					window.location.href = ROOT + 'payList';
				}
			})
		}
	})
	.controller('addPay', function($scope, fetchOptions, initAddPayForm, addPay) {
		$scope.formData = initAddPayForm;
		fetchOptions('', function(result) {
			$scope.options = {
				"schools": result.schools,
				"pay_method": result.pay_method,
				"pay_type": result.pay_type
			}
			$scope.$apply()
		})

		$scope.addPay = function() {
			console.log($scope.formData);
			addPay($scope.formData, function(result) {
				if(result.status) {
					alert('成功添加支出');
				}
			})
		}
	})