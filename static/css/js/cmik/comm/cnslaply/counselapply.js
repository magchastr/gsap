/** 
 * FILE NAME       : counselApply.js
 * SYSTEM          : CM 플랫폼 통합 구축
 * DESCRIPTION     : 상담신청
 * AUTHOR          : 82300831
 * HISTORY         :
 */

var counselApply = new counselApply();

function counselApply(){
	
	var vm  = this;
	
	 /* ================ constant definitions ================ */
    vm.ID   = 'counselApply';

	/* ================ variable definitions ================ */
	var custNmRegExp  = /^[\sa-zA-Zㄱ-ㅎㅏ-ㅣ가-힣ㆍ\u1100-\u1112\u11A2\u3163\u3161\u318D\u119E\u2022\u2025\u00B7\uFE55\u4E10\uFF1A]*$/;
	var clpNoRegExp = /^(01[016789]{1})([0-9]{3,4})([0-9]{4})$/;
	var birthRegExp = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
	
	/* ================ assign functions ================ */
	vm.validationCheck = validationCheck; // validationcheck
	vm.open = open; // 팝업오픈
	vm.insertCnsl = insertCnsl; // 상담신청
	vm.cancle = cancle; // 취소

	
    /* ================ function definitions ================ */

	// 상담신청버튼을 클릭시 counselApply.open()으로 지정, 이 부분 ajax로 open할때 수정
    $(document).ready(function() {
	
		event(); // 이벤트
	    validationCheck(); // 오류체크

		//휴대폰번호 010넣고 빼기
		$('#cnsl_phoneNum').on('focus', function() {
			const dstNo = $(this).val();
			if(dstNo == ''){
				$(this).val('010');
			}
		}).on('blur focusout', function() {
			
			const cpNoVal = $(this).val();
			
			if (cpNoVal == "010") {
				$(this).val("");
			};
		});
	});
	
	// 이벤트
	function event() {
		
		// 달력 불러오기
		$('#selCnslRsvtDtBtn').click(function(){
			$('#selCnslRsvtDt').datetimepicker('show');
		});
		
		// 성별 선택 시 에러메세지 숨김
		$('input[name=formSxCd]').on('click', function() {
			if ($('input[name=formSxCd]').is(":checked") && !$("#birthErrorMsg").hasClass('hidden')) {
				$("#birthErrorMsg").addClass('hidden');
			}
		});
		
		// 휴대전화번호 자리수 제한
		$('#clpNoB > #cnsl_phoneNum').on('keyup blur', function() {
			var thisVal = $(this).val();
			var len = $(this).val().length
			if (len > 11) {
				$(this).val(thisVal.substring(0, 11));
			}
		});
		
		// 생년월일 자리수 제한
		$('#birthError > #cnsl_birthDay').on('keyup blur', function() {
			var thisVal = $(this).val();
			var len = $(this).val().length
			if (len > 8) {
				$(this).val(thisVal.substring(0, 8));
			}
		});
	}
	
	/**
	 *  validationCheck
	 */
	function validationCheck() {
		
		// 이름, 휴대전화, 생년월일 오류체크
		$.validator.setDefaults({
			focusCleanup : true,
			onkeyup: function(element, e) {
				vm.validationEventType = e.type;
				$(element)._old_valid(e);
			},
			onfocusout:function(element){
				$(element)._old_valid();
				canActiveBtn();
			},
			/*showErrors : function(errorMap, errorList, e){
				$.each(this.validElements(), function(index, element){
					commUtil.fnErrorRemove($(element).attr('id'));
				});
				for(key in errorMap){
					if(vm.validationEventType != 'keyup'){
							commUtil.fnErrorMsg($(`#${key}`), errorMap[key]);
					}
				}
				vm.validationEventType = '';
			}*/
		});
		
		// 이름, 생년월일, 휴대전화번호
		$('#cnslaplyFrm').validate({
			rules : {
				cnsl_custName : {
					required : true,
					minlength : 2,
					maxlength : 40,
					regex : gValidator.NAME_FORMAT
				},
				cnsl_birthDay : {
					required : true,
					minlength : 8,
					maxlength : 8,
					number : true,
					regex : birthRegExp
				},
				cnsl_phoneNum : {
					required : true,
					minlength : 11,
					maxlength : 11,
					number : true,
					digits : true
				},
			},
			messages : {
				cnsl_custName : {
					required : '이름을 2자 이상 입력해주세요.',
					minlength : '이름을 2자 이상 입력해주세요.',
					maxlength : '이름은 최대 40글자까지 입력가능합니다.',
					regex : '한글/영문만 입력가능합니다.'
				},
				cnsl_birthDay : {
					required : '정확한 생년월일을 입력해 주세요.',
					minlength : '정확한 생년월일을 입력해 주세요.',
					maxlength : '정확한 생년월일을 입력해 주세요.',
					number : '정확한 생년월일을 입력해 주세요.',
					regex : '정확한 생년월일을 입력해 주세요.'
				},
				cnsl_phoneNum : {
					required : '휴대전화번호를 정확히 입력해 주세요.',
					minlength : '휴대전화번호를 정확히 입력해 주세요.',
					maxlength : '휴대전화번호를 정확히 입력해 주세요.',
					number : '휴대전화번호를 정확히 입력해 주세요.',
					digits : '휴대전화번호를 정확히 입력해 주세요.'
				},
			}
		});
		
		// 이름 오류 체크
		$("#cnslaplyFrm #cnsl_custName").on('focusout', function() {
			var custNm = $(this).val().trim();

			 if (!custNmRegExp.test(custNm)) {
				$("#cnslaplyFrm #custNmB").addClass('error');
				$("#cnslaplyFrm #custNmErrorMsg").removeClass('hidden');
	        } else if (custNm.length == 0) {
				$("#cnslaplyFrm #custNmB").addClass('error');
				$("#cnslaplyFrm #custNmErrorMsg").removeClass('hidden');
	    	} else if (custNm.length < 2) {
				$("#cnslaplyFrm #custNmB").addClass('error');
				$("#cnslaplyFrm #custNmErrorMsg").removeClass('hidden');
	        } else {
				$("#cnslaplyFrm #custNmB").removeClass('error');
				$("#cnslaplyFrm #custNmErrorMsg").addClass('hidden');
			}
			
			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
		
		// 휴대전화번호 오류 체크
		$("#cnslaplyFrm #cnsl_phoneNum").on('focusout', function() {
			var clpNo = $(this).val();
			
			// 휴대전화번호 숫자만 가능
			$(this).val($(this).val().replace(/[^0-9]/g,''));
			
			if(clpNo == null || clpNo == '') {
				$("#cnslaplyFrm #clpNoB").addClass('error');
				$("#cnslaplyFrm #clpNoErrorMsg").removeClass('hidden');
			} else if (clpNo.length == 11) {
				if(!clpNoRegExp.test(clpNo)) {
					$("#cnslaplyFrm #clpNoB").addClass('error');
					$("#cnslaplyFrm #clpNoErrorMsg").removeClass('hidden');
				} else {
					$("#cnslaplyFrm #clpNoB").removeClass('error');
					$("#cnslaplyFrm #clpNoErrorMsg").addClass('hidden');
				}
			} else if (clpNo.length < 11) { 
				$("#cnslaplyFrm #clpNoB").addClass('error');
				$("#cnslaplyFrm #clpNoErrorMsg").removeClass('hidden');
			} else {
				$("#cnslaplyFrm #clpNoB").removeClass('error');
				$("#cnslaplyFrm #clpNoErrorMsg").addClass('hidden');
			}
			
			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
		
		// 생년월일(8자리) 오류 체크
		$("#cnslaplyFrm #cnsl_birthDay").on('focusout', function() {
			var birthDay = $(this).val();
			var toDay = commUtil.getTodayDateStr(8);
			
			// 생년월일 숫자만 가능
			$(this).val($(this).val().replace(/[^0-9]/g,''));
			
			if (birthDay.length < 8) { 
				$("#cnslaplyFrm #birthErrorMsg").text('생년월일 8자리를 입력해 주세요.');
				$("#cnslaplyFrm #birthError").addClass('error');
				$("#cnslaplyFrm #birthErrorMsg").removeClass('hidden');
			} else if(!commUtil.isDate(birthDay) || ((commUtil.dateDiff(toDay, birthDay)) > 0)) {
				$("#cnslaplyFrm #birthErrorMsg").text('정확한 생년월일을 입력해 주세요.');
				$("#cnslaplyFrm #birthError").addClass('error');
				$("#cnslaplyFrm #birthErrorMsg").removeClass('hidden');
			} else {
				$("#cnslaplyFrm #birthError").removeClass('error');
				$("#cnslaplyFrm #birthErrorMsg").addClass('hidden');
			}
			
			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
		
		// 성별 선택 시
		$('#cnslaplyFrm #mans').on('click', function(e) {
			$('#cnslaplyFrm #cnsl_sxCd').val($('#mans').val());
			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
		$('#cnslaplyFrm #womens').on('click', function(e) {
			$('#cnslaplyFrm #cnsl_sxCd').val($('#womens').val());
			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
		
		// 예약일시
		$("#selCnslRsvtDt, #selCnslRsvtDtBtn").on("click", function() {
			
			/*var selCnslRsvtDt = $(this).val();
			
			if(selCnslRsvtDt == null || selCnslRsvtDt == '') {
				$("#rsvtDtTime").addClass('error');
			} else {
				$("#rsvtDtTime").removeClass('error');
			}*/
			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
		
		// 예약시간
		$('#cnslRsvtTimeCdCopy > ul > li > button').click(function() {
			//vm.cnslRsvtTimeCdCopy = $(this).val();
			var cnslRsvtTimeCd = $(this).val();
			
			var selectselRsvtTime = $(this).text();
			$('#cnslaplyFrm #cnsl_cnslRsvtTimeCd').val($(this).val());
			$("#cnslaplyFrm #selRsvtTiemText").text(selectselRsvtTime);
			$("#cnslaplyFrm #cnslRsvtTimeB").addClass('value');
			
			// 시간 목록 닫기
			if($("#cnslaplyFrm #cnslRsvtTimeB").hasClass('value')) {
				$("#cnslaplyFrm #cnslRsvtTimeB").removeClass('active');
			}
			
			// 예약시간 오류 메세지
			if(cnslRsvtTimeCd == null || cnslRsvtTimeCd == '' ) {
				$("#cnslaplyFrm #cnslRsvtTimeB").addClass('error');
				$("#cnslaplyFrm #cnslRsvtTimeErrorMsg").removeClass('hidden');
			} else {
				$("#cnslaplyFrm #cnslRsvtTimeB").removeClass('error');
				$("#cnslaplyFrm #cnslRsvtTimeErrorMsg").addClass('hidden');
			}

			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
		
		// 상담유형 선택한 항목 값을 추출
		$('#cnslType > ul > li > button').on("click", function() {
			//vm.cnslType = $(this).val();
			var selectCnslType = $(this).text();
			var cmCnslTypDvcd = $(this).val();
			
			$('#cnslaplyFrm #cnsl_cmCnslTypDvcd').val($(this).val());
			$("#cnslaplyFrm #selectCnslTypeText").text(selectCnslType);
			$('#cnslaplyFrm #cnslTypeB').addClass('value');

			// 상담유형 오류 메세지
			if(cmCnslTypDvcd == null || cmCnslTypDvcd == '') {
				$("#cnslaplyFrm #cnslTypeB").addClass('error');
				$("#cnslaplyFrm #cnslTypErrorMsg").removeClass('hidden');
				$('#cnslaplyFrm #cmCnslType').focus();
			} else {
				$("#cnslaplyFrm #cnslTypeB").removeClass('error');
				$("#cnslaplyFrm #cnslTypErrorMsg").addClass('hidden');
			}

			// 상담유형 목록 닫기
			if ($("#cnslaplyFrm #cnslTypeB").hasClass('value')) {
				$("#cnslaplyFrm #cnslTypeB").removeClass('active');
			}
			
			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
		
		// 상담내용 오류 체크
		$("#cnslaplyFrm #cnsl_cnslCn").keyup(function(e) {
			let cnslCn = $(this).val();
			$("#cnslaplyFrm #cnsl_cnslCn").val($(this).val());
			
			if(cnslCn.length == 0 || cnslCn.length == '') {
				$('#textCount').text('0');
			} else {
				$('#textCount').text(cnslCn.length);
			}
			
			// 오류체크
			if (cnslCn == null || cnslCn == '') {
				$("#cnslaplyFrm #cnslCnErrorMsg").text('10자 이상 입력해 주세요.');
				$("#cnslaplyFrm #cnsl_cnslCn").addClass('error');
				$("#cnslaplyFrm #cnslCnErrorMsg").removeClass('hidden');
			} else if(cnslCn.length < 10) {
				$("#cnslaplyFrm #cnslCnErrorMsg").text('10자 이상 입력해 주세요.');
				$("#cnslaplyFrm #cnsl_cnslCn").addClass('error');
				$("#cnslaplyFrm #cnslCnErrorMsg").removeClass('hidden');
			} else if(cnslCn.length > 500) {
				$("#cnslaplyFrm #cnslCnErrorMsg").text('500자 이내로 입력해 주세요.');
				$("#cnslaplyFrm #cnsl_cnslCn").addClass('error');
				$("#cnslaplyFrm #cnslCnErrorMsg").removeClass('hidden');
			} else {
				$("#cnslaplyFrm #cnsl_cnslCn").removeClass('error');
				$("#cnslaplyFrm #cnslCnErrorMsg").addClass('hidden');
			}
			
			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
		
		$("input[name='cnslAplyCsnYn']").change(function() {

			if(!$("#cnslaplyFrm #cnslAplyCsnY").is(":checked")) {
				//commUtil.alert("알림", "개인정보 수집·이용약관에 모두 동의해 주세요.");
			} 
			canActiveBtn(); // 상담신청 버튼 활성, 비활성 체크
		});
	}
	
	/**
	 * 상담신청 버튼 활성, 비활성 체크
	 */
	function canActiveBtn() {
		
		var cnslAplyCsnYn = $("#cnslAplyCsnY").is(":checked"); // 개인정보 동의
		var custNm = $("#cnsl_custName").val().trim();
		var phoneNum = $("#cnsl_phoneNum").val();
		var birthDay = $("#cnsl_birthDay").val().trim();
		var sxCd = $('#cnsl_sxCd').val();
		var selCnslRsvtDt = $("#selCnslRsvtDt").val();
		var cnslRsvtTimeCd = $('#cnsl_cnslRsvtTimeCd').val();
		var cmCnslTypDvcd = $('#cnsl_cmCnslTypDvcd').val();
		var cnslCn = $("#cnsl_cnslCn").val();
		
		var flag = true;
		
		// input값 체크하여 값이 다 채워지지 않으면 상담신청 버튼 비활성, 채워지면 활성
		if(!cnslAplyCsnYn) {
			flag = false;
		} else if(custNm == null || custNm == "" || custNm.length < 2) {
			flag = false;
		} else if(phoneNum == null || phoneNum == "" || phoneNum.length < 11 || !clpNoRegExp.test(phoneNum)) {
			flag = false;
		} else if(birthDay == null || birthDay == "" || birthDay.length < 8 || !commUtil.isDate(birthDay)) {
			flag = false;
		} else if(sxCd == null || sxCd == "") {
			flag = false;
		} else if(selCnslRsvtDt == null || selCnslRsvtDt == "") {
			flag = false;
		} else if(cnslRsvtTimeCd == null || cnslRsvtTimeCd == "") {
			flag = false;
		} else if(cmCnslTypDvcd == null || cmCnslTypDvcd == "") {
			flag = false;
		} else if(cnslCn == null || cnslCn == "" || cnslCn.length < 10 || cnslCn.length > 500) {
			flag = false;
		}
		
		// 상담신청 버튼 활성, 비활성
		if(flag){
			$("#cnslaplyFrm #counselingBtn").removeClass("disabled");
			//$("#counselBtn").attr("disabled", false);
		}else{
			$("#cnslaplyFrm #counselingBtn").addClass("disabled");
			//$("#counselBtn").attr("disabled", true);
		}
	}
	
	/**
	 * 상담신청 폼
	 */
	function open(cmBzDvcd) {  // 이부분 ajax로 open할때 수정
		
		init();
		
		// 값 세팅
		$("#cnsl_cmBzDvcd").val(cmBzDvcd);
		
		var cnslUrl = '/comm/cnslaply/ajaxCnslAplyPop.do';

		let params = {cmBzDvcd : cmBzDvcd};
		commUtil.callAjaxData(cnslUrl, params, '', counselForm);
	}
	
	/**
	 * 상담신청 폼 오픈
	 */
	function counselForm(data) {
		// 오늘 날짜
		vm.today = data.item.today;
		
		$('#custNo').val(data.item.userVO);
		
		// 팝업창 오픈
		commUtil.openPopup('counselApplyPop');

		// 달력
		const toDate = new Date();
		const limitYear = toDate.getFullYear()+1;
		
		commUtil.datetimepicker("#selCnslRsvtDt", "Y.m.d", vm.today, limitYear+"-12-31", "", function(){setCnslRsvtTimeCd();});
	}
	
	/**
	 * 초기화
	 */
	function init() {
		
		$("#cnslaplyFrm").each(function() {
			this.reset();
		});
		
		$("#custNmB").removeClass('error');
		$("#custNmErrorMsg").addClass('hidden');
		$("#clpNoB").removeClass('error');
		$("#clpNoErrorMsg").addClass('hidden');
		$("#birthError").removeClass('error');
		$("#birthErrorMsg").addClass('hidden');
		$("#selCnslRsvtDtError").removeClass('error');
		$("#cnslRsvtTimeB").removeClass('value');
		$("#cnslRsvtDtErrorMsg").addClass('hidden');
		$("#cnslRsvtTimeB").removeClass('error');
		$("#cnslRsvtTimeErrorMsg").addClass('hidden');
		$("#cnslTypeB").removeClass('error');
		$("#cnslTypeB").removeClass('value');
		//$("#selectCnslTypeText").text("");
		$("#cnslTypErrorMsg").addClass('hidden');
		$("#cnsl_cnslCn").removeClass('error');
		$("#cnslCnErrorMsg").addClass('hidden');
		
		$("#textCount").text("0");
	}
	
	/**
	 * 상담시간 체크
	 */
    function setCnslRsvtTimeCd() {

        var selCnslRsvtDt = $('#cnslaplyFrm #selCnslRsvtDt').val();
		var arryRsvtDate = selCnslRsvtDt.split('.');
        var crdYear = arryRsvtDate[0];
        var crdMonth = arryRsvtDate[1];
        var crdDate = arryRsvtDate[2];

		var searchUrl = '/comm/cnslaply/ajaxCnslTimeCheck.do';
		
		var data = {toDay : crdYear+crdMonth+crdDate};

		commUtil.callAjaxData(searchUrl, data, '', dateCheck);

    }

	/**
	 * 상담시간 체크 알람
	 */
	function dateCheck(data) {
		$("#cnslRsvtTimeCdCopy1").show();
		$("#cnslRsvtTimeCdCopy2").show();
		$("#cnslRsvtTimeCdCopy3").show();
		var selCnslRsvtDt = $('#selCnslRsvtDt').val();
		var arryRsvtDate = selCnslRsvtDt.split('.');
        var crdYear = arryRsvtDate[0];
        var crdMonth = arryRsvtDate[1];
        var crdDate = arryRsvtDate[2];

        var selDate = new Date(crdYear,(Number(crdMonth)-1),Number(crdDate));
		
        var dayCheck = data.item.dayCheck;
		var timeInService = data.item.timeInService;
		var alertMsg = data.item.alertMsg;

        //영업일
        if (dayCheck=='true') {
	
			$("#cnslRsvtTimeB > button").removeAttr("disabled")
			
            //토요일
            if (selDate.getDay() == 6) {
	
				if(alertMsg != undefined && alertMsg != ""){
					commUtil.alert("알림", alertMsg);
				}else {
					commUtil.alert("알림", "상담신청 접수는 평일 09:00 ~ 17:00까지 입니다.");
				}
				
				$('#selCnslRsvtDt').val('');
				$("#cnslRsvtTimeB > button").attr("disabled", "disabled")
				//$("#selRsvtTime").empty();
				//$("#selRsvtTime").text("선택");
				//vm.cnslRsvtTimeCdCopy = "";
				//$('#cnslRsvtTimeCd').val("");
				$('#cnslaplyFrm #rsvtDtTime').focus();
				//return;
			} else {
				// 예약일시 오류 메세지
				if (selCnslRsvtDt == null || selCnslRsvtDt == '') {
					$('#rsvtDtTime').focus();
					$('#cnslaplyFrm #selCnslRsvtDtError').addClass('error');
					$('#cnslaplyFrm #cnslRsvtDtErrorMsg').removeClass('hidden');
				} else {
					$('#cnslaplyFrm #selCnslRsvtDtError').removeClass('error');
					$('#cnslaplyFrm #cnslRsvtDtErrorMsg').addClass('hidden');
				}
				if(Number(timeInService) == 2) {
					$("#cnslaplyFrm #cnslRsvtTimeCdCopy1").hide();
				} else if(Number(timeInService) == 3) {
					$("#cnslaplyFrm #cnslRsvtTimeCdCopy1").hide();
					$("#cnslaplyFrm #cnslRsvtTimeCdCopy2").hide();
				}
            }

			$("#cnslaplyFrm #cnslRsvtTimeB").removeClass('value');

        //공휴일
        } else {
	
			if(alertMsg != undefined && alertMsg != ""){
				commUtil.alert("알림", alertMsg);
			}else {
				commUtil.alert("알림", "상담신청 접수는 평일 09:00 ~ 17:00까지 입니다.");
			}
			
			$('#cnslaplyFrm #selCnslRsvtDt').val('');
			$('#cnslaplyFrm #rsvtDtTime').focus();
        	//return;
		}
	}

	/**
	 * 상담신청 등록
	 */
    function insertCnsl() {
	
		if(!validate()) { // validation check
			return false;
        }
		
		// 휴대전화번호 자르기			
		var phoneNum = $('#cnsl_phoneNum').val();
		var clpTlcno = phoneNum.substring(0, 3);
		var clpOfno = phoneNum.substring(3, 7);
		var clpIdvno = phoneNum.substring(7, 11);

        $('#cnslaplyFrm').find('#cnsl_clpTlcno').val(clpTlcno);
        $('#cnslaplyFrm').find('#cnsl_clpOfno').val(clpOfno);
        $('#cnslaplyFrm').find('#cnsl_clpIdvno').val(clpIdvno);
		
		// 날짜 '.'빼고 넣기
		var cnslRsvtDt = $('#selCnslRsvtDt').val();
		var arryCnslRsvtDt = cnslRsvtDt.split('.');
        var crdYear = arryCnslRsvtDt[0];
        var crdMonth = arryCnslRsvtDt[1];
        var crdDate = arryCnslRsvtDt[2];
		$('#cnsl_cnslRsvtDt').val(crdYear+crdMonth+crdDate);

		var searchUrl = '/comm/cnslaply/ajaxCnslaplySave.do';
		
		commUtil.callAjaxForm(searchUrl, $("#cnslaplyFrm"), '', insertSuccess);
    }

	/**
	 * 상담등록시 오류체크
	 */
	function validate() {
		
		var custNm = $("#cnsl_custName").val().trim(); // 이름
		var phoneNum = $("#cnsl_phoneNum").val(); // 휴대전화번호
		var birthDay = $("#cnsl_birthDay").val(); // 생년월일
		var selCnslRsvtDt = $("#selCnslRsvtDt").val(); // 예약일
		var cnslRsvtTimeCd = $('#cnsl_cnslRsvtTimeCd').val(); // 예약시간
		var cmCnslTypDvcd = $('#cnsl_cmCnslTypDvcd').val(); // 상담유형
		let cnslCn = $("#cnsl_cnslCn").val(); // 상담내용
		var toDay = commUtil.getTodayDateStr(8);
		
		var flag = true;
		
		// 이름 오류체크
		if (!custNmRegExp.test(custNm)) {
			$("#cnslaplyFrm #custNmB").addClass('error');
			$("#cnslaplyFrm #custNmErrorMsg").removeClass('hidden');
			flag = false;
        } else if (custNm.length == 0) {
			$("#cnslaplyFrm #custNmB").addClass('error');
			$("#cnslaplyFrm #custNmErrorMsg").removeClass('hidden');
			flag = false;
    	} else if (custNm.length < 2) {
			$("#cnslaplyFrm #custNmB").addClass('error');
			$("#cnslaplyFrm #custNmErrorMsg").removeClass('hidden');
			flag = false;
        } else if(custNm == null || custNm == ''){
			$("#cnslaplyFrm #custNmB").addClass('error');
			$("#cnslaplyFrm #custNmErrorMsg").removeClass('hidden');
		} else  {
			$("#cnslaplyFrm #custNmB").removeClass('error');
			$("#cnslaplyFrm #custNmErrorMsg").addClass('hidden');
		} 

		// 휴대전화 오류체크
		if(phoneNum == null || phoneNum == '') {
			$("#cnslaplyFrm #clpNoB").addClass('error');
			$("#cnslaplyFrm #clpNoErrorMsg").removeClass('hidden');
			flag = false;
		} else if (phoneNum.length == 11) {
			if(!clpNoRegExp.test(phoneNum)) {
				$("#cnslaplyFrm #clpNoB").addClass('error');
				$("#cnslaplyFrm #clpNoErrorMsg").removeClass('hidden');
				flag = false;
			} else {
				$("#cnslaplyFrm #clpNoB").removeClass('error');
				$("#cnslaplyFrm #clpNoErrorMsg").addClass('hidden');
			}
		} else if (phoneNum.length < 11) { 
			$("#cnslaplyFrm #clpNoB").addClass('error');
			$("#cnslaplyFrm #clpNoErrorMsg").removeClass('hidden');
			flag = false;
		} else {
			$("#cnslaplyFrm #clpNoB").removeClass('error');
			$("#cnslaplyFrm #clpNoErrorMsg").addClass('hidden');
		}
		
		// 생년월일 오류 메세지
		if (birthDay.length < 8) { 
			//$("#birthErrorMsg").text('생년월일 8자리를 입력해 주세요.');
			$("#cnslaplyFrm #birthError").addClass('error');
			$("#cnslaplyFrm #birthErrorMsg").removeClass('hidden');
			flag = false;
		} else if(!commUtil.isDate(birthDay) || ((commUtil.dateDiff(toDay, birthDay)) > 0)) {
			//$("#birthErrorMsg").text('정확한 생년월일을 입력해 주세요.');
			$("#cnslaplyFrm #birthError").addClass('error');
			$("#cnslaplyFrm #birthErrorMsg").removeClass('hidden');
			flag = false;
		} else if (!$('input[name=formSxCd]').is(":checked")) {
			$("#cnslaplyFrm #birthErrorMsg").text('성별을 선택해 주세요.');
			$("#cnslaplyFrm #birthErrorMsg").removeClass('hidden');
			flag = false;
		} else {
			$("#cnslaplyFrm #birthError").removeClass('error');
			$("#cnslaplyFrm #birthErrorMsg").addClass('hidden');
		}

		// 성별 오류 메세지
/*		if (!$('input[name=formSxCd]').is(":checked")) {
			//commUtil.alert("알림", "성별을 선택해 주세요.");
			$("#birthErrorMsg").text('성별을 선택해 주세요.');
			$("#birthErrorMsg").removeClass('hidden');
			flag = false;
		} else {
			$("#birthErrorMsg").addClass('hidden');
		}*/

		// 예약일 오류 메세지
		if(selCnslRsvtDt == null || selCnslRsvtDt == '') {
			$('#cnslaplyFrm #selCnslRsvtDtError').addClass('error');
			$('#cnslaplyFrm #cnslRsvtDtErrorMsg').removeClass('hidden');
			flag = false;
		} else {
			$('#cnslaplyFrm #selCnslRsvtDtError').removeClass('error');
			$('#cnslaplyFrm #cnslRsvtDtErrorMsg').addClass('hidden');
		}
		
		// 공휴일 체크
		//setCnslRsvtTimeCd();

		// 예약시간 오류 메세지
		if(cnslRsvtTimeCd == null || cnslRsvtTimeCd == '' ) {
			$("#cnslaplyFrm #cnslRsvtTimeB").addClass('error');
			$("#cnslaplyFrm #cnslRsvtTimeErrorMsg").removeClass('hidden');
			flag = false;
		} else {
			$("#cnslaplyFrm #cnslRsvtTimeB").removeClass('error');
			$("#cnslaplyFrm #cnslRsvtTimeErrorMsg").addClass('hidden');
		}
		
		// 상담유형 오류 메세지
		if(cmCnslTypDvcd == null || cmCnslTypDvcd == '') {
			$("#cnslaplyFrm #cnslTypeB").addClass('error');
			$("#cnslaplyFrm #cnslTypErrorMsg").removeClass('hidden');
			//commUtil.alert("알림", "상담유형을 선택하세요.");
			$('#cnslaplyFrm #cmCnslType').focus();
	        flag = false;
		} else {
			$("#cnslaplyFrm #cnslTypeB").removeClass('error');
			$("#cnslaplyFrm #cnslTypErrorMsg").addClass('hidden');
		}

		// 상담내용 오류 메세지
		if (cnslCn == null || cnslCn == '') {
			$("#cnslaplyFrm #cnslCnErrorMsg").text('10자 이상 입력해 주세요.');
			$("#cnslaplyFrm #cnsl_cnslCn").addClass('error');
			$("#cnslaplyFrm #cnslCnErrorMsg").removeClass('hidden');
			flag = false;
		} else if(cnslCn.length < 10) {
			$("#cnslaplyFrm #cnslCnErrorMsg").text('10자 이상 입력해 주세요.');
			$("#cnslaplyFrm #cnsl_cnslCn").addClass('error');
			$("#cnslaplyFrm #cnslCnErrorMsg").removeClass('hidden');
			flag = false;
		} else if(cnslCn.length > 500) {
			$("#cnslaplyFrm #cnslCnErrorMsg").text('500자 이내로 입력해 주세요.');
			$("#cnslaplyFrm #cnsl_cnslCn").addClass('error');
			$("#cnslaplyFrm #cnslCnErrorMsg").removeClass('hidden');
			flag = false;
		} else {
			$("#cnslaplyFrm #cnsl_cnslCn").removeClass('error');
			$("#cnslaplyFrm #cnslCnErrorMsg").addClass('hidden');
		}
		
		// 오류사항 중 제일 상단에 있는 요소에 focus
		var errorArea = $('#cnslaplyFrm div.error:first');
		if (flag == false) {
			if (errorArea.find('input').length > 0) {
				errorArea.find('input').focus();
			} else if (errorArea.find('button').length > 0) {
				errorArea.find('button').focus();
			} else {
				$('#cnslaplyFrm #cnsl_cnslCn').focus();
			}
		}

		// 개인정보 수집동의 오류 체크
		if(flag == true && !$("#cnslAplyCsnY").is(":checked")) {
			$('#cnslAplyCsnY').focus();
			commUtil.alert("알림", "개인정보 수집·이용약관에 모두 동의해 주세요.");
			flag = false;
		}

		return flag;
	}

	/**
	 * 등록성공시 완료화면
	 */
	function insertSuccess(data) {

		var result = data.item.result;
		console.log(`resultDaa : ${JSON.stringify(data)}`)
		
		//$('#cnslaplyFrm').validate().cancelSubmit = true;
		//$('#cnslaplyFrm').attr('action','/comm/cnslaply/cnslaplyCplt.do');
        //$('#cnslaplyFrm').submit();
		//popupClose();
		
		if(result == '1') {
			commUtil.alert("알림", "상담신청이 완료되었습니다.");
			commUtil.closePopup('counselApplyPop');

		} else {
			commUtil.alert("알림", "처리 중 오류가 발생하였습니다.");
		}
	}
	
	/**
	 * 취소
	 */
    function cancle() {
		// 취소시 어디로 가야하는지 정해지면 추가
		commUtil.closePopup('counselApplyPop');
    }
}
