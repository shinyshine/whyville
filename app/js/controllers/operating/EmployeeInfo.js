/**
 * Created by luoxiaotong on 2016/4/19.
 */
'use strict';
angular.module('homeApp.operating')
  .controller('EmployeeInfo', function($scope, $routeParams, fetchInfoById, modifyComment, fetchAllJobs) {
    // fetchInfoById($routeParams, function(result) {
    //   console.log(result);
    // })
    
    var employee = {
      status: 1,
      data: {
        "info": {
          "emp_id": '89757',
          "emp_name": '罗晓彤',
          "emp_pic": 'aaa',
          "emp_birth": {
            "year": '1995',
            "month": '09',
            "day": '21'
          },
          "emp_sex": '0',
          "emp_card": '441423565875985412',
          "emp_tel": '18826103737',
          "emp_email": '393235901@qq.com',
          "emp_urgent": '123456789',
          "emp_job": {
            "id": '2',
            "name": '会长'
          },
          "start_date": {
            "year": '2012',
            "month": '09',
            "day": '23'
          },
          "end_date": {
            "year": '2016',
            "month": '03',
            "day": '07'
          },
          "emp_salary": '5000',
          "first_com": '老是迟到，找死',
        },
        "comment": {
          "emp_off": '7',
          "emp_late": '2',
          "emp_early_out": '3',
          "emp_ability": '很不错哦',
          
          "sec_com": '就是人抠了点'
        }
      },
      jobs: [{
        "id": '1',
        "name": '董事长'
      }, {
        "id": '2',
        "name": '部门经理'
      }, {
        "id": '3',
        "name": '司机'
      }]
    }

    $scope.employeeInfo = employee.data;
    fetchAllJobs('', function(result) {
      $scope.jobs = result;
    })

    $scope.submitInfo = function() {
      console.log($scope.employeeInfo);
    }
    

    //修改后的数据和ep_id 修改评价
    $scope.modifyComment = function() {
      var data = {
        "emp_id": $routeParams.emp_id,
        "comment": $scope.employeeInfo.comment
      }
      modifyComment(data, function(result) {
        if(result.status) {
          alert('添加成功');
        }
      })
    }
  })
  .controller('addEmp', function($scope, $location, $routeParams, fetchOptions, initEmpForm, submitEmpInfo, previewImage, uploadPhoto) {
    fetchOptions('', function(result) {
      $scope.$apply(function() {
        $scope.options = {
          "schools": result.schools,
          "jobs": result.jobs
        }
      })
    })

    var ext_name = '';
    
    previewImage(function(ext_name) {
      ext_name = ext_name;
    })
    $scope.submitInfo = function() {
      console.log(postData);
      var postData = $scope.employeeInfo.info;
      if(postData.emp_sch.id && postData.emp_job.id) {
        submitEmpInfo(postData, function(result) {
          if(result.status) {
            uploadPhoto($('#uploadPhoto'), $scope.postData, ext_name, function(result) {
              if(result.status ) {
                window.location.href = ROOT + 'employees';
              }
            });
            
          }
        })
      }
      
    }

    $scope.employeeInfo = initEmpForm($routeParams.emp_id);
  })
  .controller('modifyEmp', function($scope, $location, $routeParams, fetchOptions, fetchEmpById, modifyEmp) {
    $scope.sidebar = [{
      "name": '基本信息',
      "link": '#basic',
      "default": 1
    },{
      "name": '员工评价',
      "link": '#comment'
    }]

    fetchOptions('', function(result) {
      $scope.$apply(function() {
        $scope.options = {
          "schools": result.schools,
          "jobs": result.jobs
        }
      })
    })
    fetchEmpById($routeParams, function(result) {
      console.log(result)
      $scope.employeeInfo = result;
      $scope.$apply();
    })

    $scope.modifyEmp = function() {
      console.log($scope.employeeInfo.info);
      modifyEmp($scope.employeeInfo.info, function(result) {
        if(result.status) {
          alert('修改成功');
          $scope.$apply(function() {
            $location.path('/employees');
          })
        }
      })
    }
  })
  .controller('empInfo', function($scope, $routeParams, fetchEmpById) {
    $scope.sidebar = [{
      "name": '基本信息',
      "link": '#basic',
      "default": 1
    },{
      "name": '员工评价',
      "link": '#comment'
    }]
    fetchEmpById($routeParams, function(result) {
      $scope.employeeInfo = result;
      $scope.$apply();
    })
  })

