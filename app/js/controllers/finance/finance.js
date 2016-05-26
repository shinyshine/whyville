'use strict';
angular.module('homeApp.finance', ['ngRoute', 'homeApp.financeService'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/payList', {
				templateUrl: 'views/finance/payList.html',
				controller: 'payList'
			})
			.when('/appList', {
				templateUrl: 'views/finance/appList.html',
				controller: 'appList'
			})
			.when('/incomeList', {
				templateUrl: 'views/finance/income.html',
				controller: 'incomeList'
			})
			.when('/addPay', {
				templateUrl: 'views/finance/payForm.html',
				controller: 'addPay'
			})
			.when('/modPay/:pay_id', {
				templateUrl: 'views/finance/payForm.html',
				controller: 'modPay'
			})
			.when('/modIncome/:income_id', {
				templateUrl: 'views/finance/incomeForm.html',
				controller: 'modIncome'
			})
			.when('/addIncome', {
				templateUrl: 'views/finance/incomeForm.html',
				controller: 'addIncome'
			})
			.when('/payForApp/:app_id', {
				templateUrl: 'views/finance/applicate.html',
				controller: 'payForApp'
			})
			.when('/daily', {
				templateUrl: 'views/finance/daily.html',
				controller: 'daily'
			})
			.when('/account', {
				templateUrl: 'views/finance/account.html',
				controller: 'account'
			})
	})

	//财务日报
	.controller('daily', function($scope) {
		
	})
	//账户余额
	.controller('account', function($scope, fetchAccounts, modifyAccount) {
		$scope.options = {
			"method": [{
				"id": 0,
				"name": '现金'
			},{
				"id": 1,
				"name": '刷卡'
			}]
		}

		$scope.filter = {
			"method": {
				"id": 0,
				"name": '现金'
			}
		}
		$scope.account = {
			"total": '25555000',
			"list": [{
				"sec_type": {
					"id": 1,
					"name": '珠江新城校区'
				},
				"remain": '44444444',
				"isEditing": 0
			},{
				"sec_type": {
					"id": 2,
					"name":'龙口西校区'
				},
				"remain": '66666',
				"isEditing": 0
			}]
		}

		fetchAccounts($scope.filter, function(result) {
			console.log(result);
		})

		$scope.modify = function(index) {
			var status = $scope.account[index].isEditing;
			if(status) {	
				modifyAccount($scope.account[index], function(result) {
					if(result.status) {
						alert('修改成功');
					}
				})
				//$http 
				console.log(data);
			}
			$scope.account[index].isEditing = !status;
		}

		$scope.sendFilter = function() {
			fetchAccounts($scope.filter, function(result) {
				console.log(result);
			})
		}
	})