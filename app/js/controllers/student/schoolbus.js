'use strict';
angular.module('homeApp.student')
	.controller('stuBusList', function($scope, fetchOptions, getYearSessions, fetchStuBus) {
		
		$scope.filter = {
			"selectSchool": {
				"id": '1',
				"name": '全部校区'
			},
			"selectBus": {
				"id": '0',
				"name": '全部车牌'
			},
			"type": {
				"id": '1',
				"name": '接'
			},
			"selectSession": '春季班',
			"selectYear": '2016',
		}
		fetchOptions('', function(result) {
			console.log(result)
			$scope.options = {
				"schools": result.schools,
				"bus_number": result.bus_number,
				"type": [{
					"id": '0',
					"name": '送'
				}, {
					"id": '1',
					"name": '接'
				}],
				"years": getYearSessions.year,
				"sessions": getYearSessions.session
			}
		})
		fetchStuBus($scope.filter, function(result) {
			$scope.$apply(function() {
				$scope.stuBus = result;
			})
		})

		//$scope.stuBus = fetchStuBus($scope.filter);

		$scope.sendFilter = function() {
			fetchStuBus($scope.filter, function(result) {
				console.log(result)
				$scope.$apply(function() {
					$scope.stuBus = result;
				})
			})
		}
	})
	.controller('addStuToBus', function($scope, addStuToBus, getYearSessions, fetchOptions, getWeekDays, initAddToBusForm) {
		fetchOptions('', function(result) {
			$scope.options = {
				"type": [{
					"id": '0',
					"name": '送'
				}, {
					"id": '1',
					"name": '接'
				}],
				"years": getYearSessions.year,
				"sessions": getYearSessions.session,
				"bus_number": result.bus_number,
				"discount": [{
					"id": 0,
					"name": '打折'
				},{
					"id": 1,
					"name": '减价'
				}],
				"pay_method": result.pay_method,
				"weekdays": getWeekDays
			}
		})
		$scope.formData = initAddToBusForm;
		$scope.submitData = function() {
			addStuToBus($scope.formData, function(result) {
				if(result.status) {
					alert('操作成功');
					window.location.href = ROOT + 'stuBusList';
				}
			})
		}
	})
	.controller('modStuBus', function($scope) {
		//修改约车记录
	})
	.controller('busStuAttendList', function($scope, fetchOptions, getYears, fetchBusRecord) {
		$scope.filter = {
			"selectBus": {
				"id": '0',
				"name": '全部车牌'
			},
			"selectYear": new Date().getFullYear()
		}
		fetchOptions('', function(result) {
			$scope.options = {
				"bus_number": result.bus_number,
				"years": getYears
			}
		})

		fetchBusRecord($scope.filter, function(result) {
			console.log(result);
			$scope.data = result;
			$scope.$apply();
		})

		$scope.sendFilter = function() {
			console.log($scope.filter);
			fetchBusRecord($scope.filter, function(result) {
				console.log(result);
			})
		}
	})
	.controller('busStuAttend', function($scope, $routeParams, fetchBusRecordById) {
		$scope.attendType = [{
			"id": '0',
			"name": '是'
		},{
			"id": '1',
			"name": '否'
		}]
		$scope.filter = {
			"ser_id": $routeParams.ser_id,
			"type": {
				"id": '1',
				"name": '接'
			}
		}
		$scope.options = {
			"type": [{
				"id": '0',
				"name": '送'
			},{
				"id": '1',
				"name": '接'
			}]
		}

		$scope.data = fetchBusRecordById($routeParams);

		$scope.modify = function(index) {
			var status = $scope.data.stuList[index].isEditing;
			if(status) {
				//$http 
				console.log('发送请求给后台，修改出勤状况');
				console.log($scope.data.stuList[index]);
			}
			$scope.data.stuList[index].isEditing = !status;
		}
	})