'use strict';
angular.module('homeApp.home')
	.controller('calendar', function($scope, $cookies, $location, fetchOptions, $routeParams, clickDate, fetchHomeInfo, fetchHomeByYearM, deleteNotice, deleteSche) {
		$scope.userId = $cookies.get('user_id');

		if($location.search().s_id) {
			$scope.filter = {
				"selectSchool": {
					"id": $location.search().s_id,
					"name": $location.search().s_na
				}
			}
		}else{
			$scope.filter = {
				"selectSchool": {
					"id": $cookies.get('sch_id'),
					"name": $cookies.get('sch_name')
				}
			}
		}
		
		fetchOptions('', function(result) {
			$scope.options = {
				"schools": result.schools
			}
		})

		fetchHomeInfo($scope.filter, function(result){
			console.log(result);
			$scope.home1 = result;
			//为了显示无日程和无公告
			$scope.home1.ntc_len = $scope.home1.notice.length;
			$scope.home1.sche_len = $scope.home1.schedule.length;
			var eventArray = $scope.home1.cur_mon_sche;
			$scope.eventArray = eventArray;
			$scope.calendar();
			$scope.$apply();
		});

		var curMonth = moment().format('YYYY-MM'),
		    num = 0;

		$scope.calendar = function() {
			console.log($scope.eventArray);
			//create日历
			var calendars = {};
			//var calendars = calendar.createCal();
			moment.locale('zh-cn');

			//events	
			calendars.clndr1 = $('.cal1').clndr({
				events: $scope.eventArray,
					clickEvents: {
						click: function(target) {
							console.log(target);
							$scope.filter.date = target.date._i;
							console.log($scope.filter);
							clickDate($scope.filter, function(result) {
								console.log(result);
								$scope.home1.notice = result;
								$scope.home1.ntc_len = result.length;
								$scope.$apply();
							});
							var schedules = target.events;
							$scope.home1.schedule = schedules;
							$scope.home1.sche_len = schedules.length;
							
						},
						nextMonth: function () {
							num ++;
							curMonth = moment().add(num, 'months').format('YYYY-MM');
							$scope.filter.date = curMonth;
							fetchByMonth(curMonth);
							
							//用curMonth调用函数获得对应的数据（整个月的日程和公告）
			            },
			            previousMonth: function () {
			            	num--;
			                curMonth = moment().add(num, 'months').format('YYYY-MM');
							fetchByMonth(curMonth);
			            },
					},
					multiDayEvents: {
						singleDay: 'date',
						endDate: 'endDate',
						startDate: 'startDate'
					},
					showAdjacentMonths: true,
        			adjacentDaysChangeMonth: false
				});
			}
			var fetchByMonth = function(curMonth) {
			var filter = {
				"selectSchool": $scope.filter.selectSchool,
				"month": curMonth
			}
			fetchHomeByYearM(filter, function(result) {
				console.log(result);
				var eventArray = result.cur_mon_sche;
				$scope.eventArray = eventArray;
				//$scope.calendar();
				$scope.home1.cur_mon_ntc = result.cur_mon_ntc;
				$scope.$apply();
			})
		}
		var authority = $cookies.get('authority');
		$scope.addSchedule = function() {
			if (authority != 0 && authority != 1) {
				alert('您没有权限执行该操作');
				return false;
			}
			$location.path('/addSchedule');
		}
		
		$scope.addNotice = function() {
			if (authority != 0 && authority != 1) {
				alert('您没有权限执行该操作');
				return false;
			}
			$location.path('/addNotice');
		}

		$scope.modifySche = function(status, ntc_id) {
			if (status == 0) {
				return false;
			}
			$location.path('/modifySche/' + ntc_id);
		}
		$scope.deleteSche = function(status, ntc_id) {
			if (status == 0) {
				return false;
			}
			//执行删除日程的操作
			alert('delete successfully');
		}

		$scope.modifyNtc = function(status, ntc_id) {
			if (status == 0) {
				return false;
			}
			$location.path('/modifyNotice/' + ntc_id);
		}
		$scope.deleteNtc = function(status, ntc_id) {
			if (status == 0) {
				return false;
			}
			
		}

		//查看公告详情跳转
		$scope.checkDetail = function(ntc_id) {
			$location.path('/notice/' + ntc_id);
		}

		$scope.sendFilter = function() {
			// fetchHomeInfo($scope.filter, function(result){
			// 	console.log(result);
			// 	$scope.home1 = result;
			// 	//为了显示无日程和无公告
			// 	$scope.home1.ntc_len = $scope.home1.notice.length;
			// 	$scope.home1.sche_len = $scope.home1.schedule.length;
			// 	var eventArray = $scope.home1.cur_mon_sche;
			// 	$scope.eventArray = eventArray;
			// 	$scope.calendar();
			// 	$scope.$apply();
			// });
			$location.search({s_id: $scope.filter.selectSchool.id, s_na: $scope.filter.selectSchool.name});
			
		}	
	})