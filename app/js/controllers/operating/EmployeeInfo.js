/**
 * Created by luoxiaotong on 2016/4/19.
 */
'use strict';
angular.module('homeApp.operating')
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
  .controller('modifyEmp', function($scope, $location, $routeParams, fetchOptions, fetchEmpById, modifyEmp, modifyComment) {
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

    $scope.submitCom = function() {
      $scope.employeeInfo.comment.emp_id = $routeParams.emp_id
      modifyComment($scope.employeeInfo.comment, function(result) {
        if(result.status) {
          alert('修改成功');
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

