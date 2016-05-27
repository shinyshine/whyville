'use strict';
angular.module('homeApp.studentService', [])
	.factory('stuAPI', function(server) {
		return {
			"fecthStudents": server + 'get_students',
			"createStuId": server + 'get_student_new_id',
			"submitStuInfo": server + 'add_student',
			"fetchStuInfoById": server + 'get_student_information',
			"modifyStuInfo": server + 'change_student_information',
			"fetchCourseList": server + 'get_courses',
			"postCourse": server + 'add_course',
			"fetchPlanCouOp": server + 'manager_course',  //新增接口
			"fetchStuOfTheCou": server + 'get_course_information2',
			"fetchCourseInfo": server + 'add_student_to_course',
			"addStuToCourse": server + 'add_student_to_course',
			"fetchStuAttList": server + 'get_course_attendance',
			"fetchCourseRecord": server + 'get_attendance',
			"modifyClassInfo": server + 'change_course_information',
			"modifyStuAttend": server + 'change_student_attendance',
			"allParticipated": server + 'change_student_attendance',
			"fetchStuAttTable": server + 'get_student_all_attendance',
			"fetchCallBack": server + 'get_callback',
			"modifyCallback": server + 'change_callback2',
			"fetchStuBus": server + 'get_bus',
			"addStuToBus": server + 'add_student_to_bus',
			"fetchBusRecord": server + 'get_bus_attendance',
			"fetchBusRecordById": server + 'get_bus_service_information',
			"postReport": server + 'get_report',
		}
	})

	.factory('postReport', function(stuAPI) {
		return function(data, callBack) {
			postData(stuAPI.postReport, data, callBack);
		}
	})

	.factory('getReport', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.postReport, callBack, data);
		}
	})

	.factory('createChart', function() {
		return function() {
		    $('#chart').highcharts({
		        title: {
		            text: 'Chart',
		            x: -20 //center
		        },
		        // subtitle: {
		        //     text: 'Source: WorldClimate.com',
		        //     x: -20
		        // },
		        xAxis: {
		            categories: ['Reading', 'Writing', 'Listening']
		        },
		        yAxis: {
		            title: {
		                text: 'Score'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: ''
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: 'Entrance Score',
		            data: [52, 62, 72]
		        }, {
		            name: 'Midterm Score',
		            data: [59, 42, 95]
		        }, {
		            name: 'End Term Score',
		            data: [45, 72, 79]
		        }]
		    });
		}
	})
	//获得所有学生列表
	.factory('fecthStudents', function(stuAPI) {
		return function(callBack, filter) {
			getData(stuAPI.fecthStudents, callBack, filter);
		}
	})
	//create 学生id
	.factory('createStuId', function(stuAPI) {
		return function(callBack) {
			getData(stuAPI.createStuId, callBack);
		}
	})
	//初始化学生 表单
	.factory('initStuForm', function() {
		var fetchData = function(stu_id) {
			return {
				"stu_basic": {
					"stu_zh_name": '',
					"stu_en_name": '',
					"stu_sex": '',
				    "stu_id": stu_id,
				    "stu_pic": {
				    	"ext_name": ''
				    },
					"stu_country": '',
					"stu_birth": {
						"year": moment().format('YYYY'),
						"month": moment().format('MM'),
						"day": moment().format('DD')
					},
					//"stu_age": '',
					"stu_ads": '',
					"stu_grade": '',
					"stu_study_sch": '', //就读学校
					"publics": {
						"id": '',
						"name": ''
					}, //宣传方式
					"study_exp": '', //学习经历
					"intersts": '', //兴趣爱好
					"character": '', //学生的性格
					"expectations": '', //学生学习期望
				},
				"stu_parent": {
					"par_name": '', //家长姓名
					//"par_relation": '未选择', //关系
					"par_tel": '', //联系方式
					"par_email": '',
					"par_character": '' //家长性格
				},
				"learn_info": {
					"stu_sch": {
						"id": '',
						"name": ''
					},
					"stu_learn_year": '',
					"stu_learn_season": '',
					"stu_learn_status": 1,
					// "courses": [{
					// 	"course_name": '',
					// 	"course_teacher": '',
					// 	"course_week_time": '', //星期
					// 	"course_time": '', //上课时间点
					// 	"course_remark": '' //备注
					// }]
				},
			// 	"school_bus": [{
			// 		"weekday": '',
			// 		"pick_time": '', //接时间
			// 		"pick_ads": '', //接送地点
			// 		"back_time": '', // 送时间
			// 		"times_per_week": '', //一周几次
			// 		"per_price": '', //金额
			// 		"sch_bus_remark": '' //备注
			// 	}],
			// 	"course_fee": [{
			// 		"course_name": '', //课程名称
			// 		"sum_count": '', //上课总次数
			// 		"per_price": '', //每次价格
			// 		"discount": '', //折扣
			// 		"cut": '', //减价
			// 		"fee_or_not": '', //是否付款学费
			// 		"book_fee": '',
			// 		"book_fee_or_not": '' //是否付款书费
			// 	}]
		    }

		}
		return {
			"fetchData": function(stu_id) {
				return fetchData(stu_id);
			}
		}
	})
	//根据stu_id获取学生相关信息
	.factory('fetchStuInfoById', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchStuInfoById, callBack, data);
		}
		
	})

	//修改学生信息
	.factory('modifyStuInfo', function(stuAPI) {
		return function(data, callBack) {
			postData(stuAPI.modifyStuInfo, data, callBack);
		}
	})
	//获得课程列表
	.factory('fetchCourseList', function(stuAPI) {
		
		return function(filter, callBack) {
			getData(stuAPI.fetchCourseList, callBack, filter);
		}
	})
	.factory('fetchPlanCouOp', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchPlanCouOp, callBack, data);
		}
	})

	.factory('planCourse', function(stuAPI) {
		return function(data, callBack) {
			postData(stuAPI.fetchPlanCouOp, data, callBack);
		}
	})
	.factory('fetchStuInfoOfTheCourse', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchStuOfTheCou, callBack, data);
		}
	})
	.factory('fetchStuBus', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchStuBus, callBack, data);
		}
	})

	.factory('initAddToBusForm', function() {
		return {
			//"stu_name": '',
			"stu_id": '',
			"type": {
				"id": '',
				"name": ''
			},
			"weekday": {
				"id": '',
				"name":''
			},
			"year": '',
			"session": '',
			"discount_type": {
				"id": '',
				"name": ''
			},
			"bus_number": {
				"id": '',
				"name": ''
			},
			"place": '',
			"time": '',
			"per_price": '',
			"sum_count": '',
			"discount": '',
			"pay_method": {
				"id": '',
				"name": ''
			},
			"pay_to": {
				"id": '',
				"name": ''
			}
		}
	})

	.factory('addStuToBus', function(stuAPI) {
		return function(data, callBack) {
			postData(stuAPI.addStuToBus, data, callBack);
		}
	})
	.factory('fetchBusRecord', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchBusRecord, callBack, data);
		}
	})
	.factory('initAddToCourseForm', function() {
		return function(course_id) {
			return {
				"course_id": course_id,
				"stu_id": '',
				"sum_count": '', //课程总次数
				"per_price": '',  //每次课程的费用
				"discount_type": {
					"id": '',
					"name": ''
				},   //打折还是减价
				"discount": '',   //打折货减价的额度
				"fee_method": {
					"id": '',
					"name": ''
				},  //学费收费方式
				"fee_to": {
					"id": '',
					"name": ''
				},  //学费去处
				"book_fee_method": {
					"id": '',
					"name": ''
				},
				"book_fee_to": {
					"id": '',
					"name": ''
				}
			}
		}
		
	})
	.factory('fetchCourseInfo', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchCourseInfo, callBack, data);
		}
	})
	.factory('addStuToCourse', function(stuAPI) {
		return function(data, callBack) {
			postData(stuAPI.addStuToCourse, data, callBack);
		}
	})
	.factory('fetchCourseRecord', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchCourseRecord, callBack, data);
		}
	})
	.factory('modifyClassInfo', function(stuAPI) {
		return function(data, callBack) {
			postData(stuAPI.modifyClassInfo, data, callBack);
		}
	})
	.factory('fetchStuAttList', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchStuAttList, callBack, data);
		}
	})

	//修改学生的出勤状态
	.factory('modifyStuAttend', function(stuAPI) {
		return function(data, callBack) {
			postData(stuAPI.modifyStuAttend, data, callBack);
		}
	})

	//全勤
	.factory('allParticipated', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.allParticipated, callBack, data);
		}
	})

	//获取所有学生在该门课程中的考勤；列表
	.factory('fetchStuAttTable', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchStuAttTable, callBack, data);
		}
	})
	.factory('fetchBusRecordById', function(stuAPI) {
		return function(data, callBack) {
			getData(stuAPI.fetchBusRecordById, callBack, data);
		}
	})

	.factory('submitStuInfo', function(stuAPI) {
		return function(data, callBack) {
			$('#stuForm').ajaxSubmit({
				type: "post",
				url: stuAPI.submitStuInfo,
				dataType: 'json',
				// data: {"id": id, "ext_name": ext_name},
				data: data,
				xhrFields: {
					withCredentials: true
				},
				beforeSend: function() {
					$('.mask').show()
				},
				success: function(result) {
					callBack(result);
				},
				complete: function() {
					$('.mask').hide();
				},
				error: function(msg) {
					alert("文件上传失败");
				}
			});

			//postData(stuAPI.submitStuInfo, data, callBack);
		}
	})


	.factory('postCourse', function(stuAPI) {
		return function(data, callBack) {
			postData(stuAPI.postCourse, data, callBack);
		}
	})
	//callback
	.factory('fetchCallBack', function(stuAPI) {

		return function(data, callBack) {
			getData(stuAPI.fetchCallBack, callBack, data);
		}
	})

	.factory('modifyCallback', function(stuAPI) {
		return function(data, callBack) {
			postData(stuAPI.modifyCallback, data, callBack);
		}
	})

