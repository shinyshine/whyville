'use strict';
angular.module('homeApp.home')
	.controller('applications', function($scope, $location, fetchOptions, fetchApps, pagination) {
		fetchOptions('', function(result) {
			$scope.$apply(function() {
				$scope.options = {
					"schools": result.schools,
					"app_status": [{
						"id": '0',
						"name": '全部申请表'
					},{
						"id": '1',
						"name": '已审核申请表'
					},{
						"id": '2',
						"name": '待审核申请表'
					}]
				}
			})
		})
		
		$scope.filter = {
			"selectSchool": {
				"id": 1,
				"name": '全部校区'
			},
			"type": {
				"id": 0,
				"name": '全部申请表'
			},
			"page": 1,
			"num": 3
		}

		//about pagination
		$scope.paginationConf = {};

		fetchApps($scope.filter, function(result) {
			console.log(result);
			$scope.$apply(function() {
				$scope.applicate = result.result;			
				
				//pagination
				var total = result.sum;
				$scope.paginationConf = pagination(total);
				$scope.paginationConf.onChange = function() {
					$scope.filter.page = $scope.paginationConf.currentPage;
					$scope.sendFilter();
				}
			})
		});
		



		$scope.accept = function(id, status) {
			if($scope.user.authority != 0) {
				return false;
			}
			//发送请求同意审核
			$location.path('/acceptApp/' + id).search({status: status});
		}	

		$scope.modify = function(modify, id) {
			if(modify == 0) {
				return false;
			}
			$location.path('/modifyApp/' + id);

		}
		// $scope.deleteApp = function(del_status, app_id) {
		// 	if(del_status == 0) {
		// 		return false;
		// 	}
		// 	var data = {
		// 		"app_id": app_id
		// 	}
		// 	if(confirm('确认删除？')) {
		// 		deleteApp(data, function(result) {
		// 			id(result.status) {
		// 				window.reload();
		// 			}
		// 		})
		// 	}
		// }

		$scope.sendFilter = function() {
			fetchApps($scope.filter, function(result) {
				console.log(result);
				$scope.applicate = result.result;
				$scope.$apply();
			});
		}
	})
    .controller('applyfor', function($scope, $location, initAppForm, addApp) {
    	$scope.appForm = initAppForm;
    	var itemModel = {
			"app_content": '',
			"app_per": '',
			"app_num": ''
		}

    	$scope.addItem = function() {
    		$scope.count++;
    		$scope.appForm.app.push(itemModel);
    		console.log($scope.appForm);
    	}

    	$scope.total_price = 0;
    	$scope.countTotal = function() {
    		for(var i = 0, len = $scope.appForm.app.length; i < len; i ++) {
	    		$scope.total_price += $scope.appForm.app[i].app_per * $scope.appForm.app[i].app_num;
	    	}
    	}
    	

    	$scope.submitApp = function() {
    		console.log($scope.appForm);
			addApp($scope.appForm, function(result) {
    			if(result.status) {
    				window.location.href = ROOT + 'applications';
    			}
    		})
    	}
    })
    .controller('modifyApp', function($scope, $location, $routeParams, fetchApplyById, modifyApp) {
    	fetchApplyById($routeParams, function(result) {
    		$scope.appForm = result;
    		$scope.$apply();
    		console.log($scope.appForm);
    	});

    	$scope.submitApp = function() {
    		$scope.appForm.app.app_id = $routeParams.app_id;
    		modifyApp($scope.appForm.app, function(result) {
    			if(result.status) {
    				window.location.href = ROOT + $cookies.get('user_id');
    			}
    		})
    	}
    })
    .controller('acceptApp', function($scope, $location, $routeParams, fetchApplyById, acceptApp) {
    	fetchApplyById($routeParams, function(result) {
    		$scope.appForm = result;
    		$scope.$apply();
    		console.log($scope.appForm);
    	});

    	$scope.autoData = {
    		"date": moment().format('YYYY-MM-DD'),
    		"sign_name": $scope.user.user_name
    	}
    	$scope.postData = {
    		"app_id": $routeParams.app_id,
    		"status": $location.search().status,
    		"opinion": '',
    	}

    	$scope.acceptApp = function() {
    		acceptApp($scope.postData, function(result) {
    			if(result.status) {
    				window.location.href = ROOT + 'applications';
    			}else{
    				alert('操作失败，请尝试重新提交');
    			}
    		})
    	}

    	
    })