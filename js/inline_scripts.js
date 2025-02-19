
    	$(document).ready(function() {
	    	try {
	    		if (/MSIE|Trident/i.test(navigator.userAgent)) {
	    			$("#popBlockIEBrowser").addClass("open");
	    		}
	    	} catch(error) {}
    	});
    


            var contextPath = '';
            var hpgIflwRutDvcd = '';
            var isViewConsole = '0';

            var mIdbinsDoMain = "https://m.idbins.com";
            var wIdbinsDoMain = "https://www.idbins.com";
            //var isAuth = "";
            var n_Chn = "cm_pc";
        	var n_CustNo = "";
        	(function(){
        		if(isViewConsole != '1') {
        			for(type in console) {
        			    if (typeof console[type] == "function") {
        			        console[type] = $.noop;
        			    }
        			}
        		}
        	})();
        


        <!--// __ CCMEDIA SERVICE BT 1.0 Run __
        var     _BTCC   = '';
        //var   _BT_DEBUG_  = 'on';
        if (typeof(_bt_run_track) != 'undefined') {
            _bt_run_track ( _BTCC, hpgIflwRutDvcd );
        }
        //-->
        var errSendCnt = 0;
        //모든 클라이언트 에러를 서버로 전송해보자.
        window.onerror = function(message, url, line, col, error) {
            try {

                //너무 많은 호출은 불필요하다.
                if(errSendCnt > 10) {
                    return;
                }

                if(message == null || message == undefined || message == '' || message == 'Script error.') {
                    return;
                }

                //tealeaf 오류는 무시한다.
                if(url.indexOf('tealeaf.js')>=0 || url.indexOf('TealeafTarget.jsp')>=0) {
                    return;
                }

                //cm 스크립트 에러가 아니면 무시한다.
                if(url.indexOf('.directdb.co.kr')<0) {
                    return;
                }

                //jquery는 제외
                if(url.indexOf('/js/libs/jquery/')>=0) {
                    return;
                }

                var errParams = {};
                errParams['message'] = message;
                errParams['url']     = url;
                errParams['line']    = line;
                errParams['col']     = col;
                errParams['error']   = error;

                errSendCnt++;

                /* $.ajax({
                    url         : contextPath + '/comm/security/ajaxSendErrorLog.do',
                    async       : false,
                    data        : errParams,
                    method      : 'post',
                    success     : function (data, textStatus, jqXHR) {

                    },
                    error       : function (jqXHR, textStatus, errorThrown) {

                    }
                }); */
            } catch (e) {
                console.log(e.message);
            }
        };
        


		//토큰세팅
		sessionStorage.setItem("cmToken", '');

		//csrf 설정
		sessionStorage.setItem("csrfName", '_csrf');
		sessionStorage.setItem("csrfValue", '41869f8e-146a-4ccc-8c06-16bbc5311d44');

		$(document).ajaxSend(function(event, jqxhr, settings ) {
		    try {
		        var urlStr = settings.url;
		        //이때만 세션 초기화 처리 한다.
		        if(urlStr != null && urlStr.indexOf('.do') > 0 && (urlStr.indexOf('http')<0 || urlStr.indexOf('www.directdb.co.kr')>= 0)) {
		        	if(sessionStorage.getItem("cmToken") != null && sessionStorage.getItem("cmToken") != undefined && sessionStorage.getItem("cmToken") != '' ) {
		        		  jqxhr.setRequestHeader("cmToken", sessionStorage.getItem("cmToken"));
		        		  //jqxhr.setRequestBody("_csrf", "41869f8e-146a-4ccc-8c06-16bbc5311d44");
		        	}
		        }
		    } catch (e) {
		        LOG(e.message);
		    }
		});

		$(document).on("submit", function(e){
		    if(sessionStorage.getItem("cmToken") != null && sessionStorage.getItem("cmToken") != '' && sessionStorage.getItem("cmToken") != 'null') {
		        var sendForm = $(e.target);
		        sendForm.append('<input type="hidden" name="__cmToken__" value="'+ sessionStorage.getItem("cmToken") +'"/>');
		    }
		    var csrf    = $('#____csrf___');
		    if(csrf.length == 0){
		    	var sendForm = $(e.target);
		    	var ex = $(sendForm).find('#is_exclude_csrf');
		    	if(ex.length == 0 || $(ex).val() != 'Y'){
		        	sendForm.append('<input type="hidden" id="____csrf___" name="_csrf" value="41869f8e-146a-4ccc-8c06-16bbc5311d44">');
		    	}
		    }
		    var loadingDiv = $("#cmBlockSreen");
		    if(loadingDiv.length > 0){
		    	var _formTarget  = $(e.target).attr("target");
		    	var _isNoLoading  = $(e.target).attr("isNoLoading") || $(e.target).attr("isnoloading") || "n";
		    	_isNoLoading = _isNoLoading.toLowerCase();

				if (_isNoLoading != "y" && typeof _formTarget == "undefined" || ("_self,_top,_parent".includes(_formTarget) && $("[name=" + _formTarget + "]").prop("tagName") != "IFRAME")) {
			    	//보장분석 제외
			    	var sendAction  = $(e.target).attr("action") || '';
 					if(sendAction.indexOf('analResultMyInsView.do') < 0) {
 						commUtil.onBlockSreen();
			    	}
					
				}
		    }
		});

		window.onbeforeunload = function () {
		    try {
		        if(sessionStorage.getItem("cmToken") != null && sessionStorage.getItem("cmToken") != '' && sessionStorage.getItem("cmToken") != 'null') {
			        var sendOk = false;
			        $.ajax({
			            url         : contextPath + '/common/security/cmToken.do',
			            async       : true,
			            method      : 'get',
			            success     : function (data, textStatus, jqXHR) {
			                sendOk = true;
			            }
			        });

			        //cmToken.do가 먼저 호출되게..
			        var start = new Date().getTime();
			        while ( (new Date().getTime() < start + 1000) && sendOk == false );
		        }
		    } catch (ex) {
		        LOG(ex.message);
		    }
		};
    



function calcOffset() {
    try {
        var serverTime = commUtil.getCookie('serverTime');
        serverTime = serverTime==null ? null : Math.abs(serverTime);
        var clientTimeOffset = (new Date()).getTime() - serverTime;
        commUtil.setCookie('clientTimeOffset',"CM"+clientTimeOffset,'session');
    }catch(e) {
        console.log(e);
    }
}

/**
 * select , input title set
 *
 * @param 
 * @returns 
 */
function setMKTitle(){
	
	//input에 title이 없는 경우
	$('.inp').each(function(){
		
		if($(this).find('label').length > 0){
			
			if ($(this).find('label').attr('for') == undefined || $(this).find('label').attr('for') == '') {
				var inpTxtLen = $(this).find('.inp-text').length;
				var inpSelLen = $(this).find('.inp-select').length;

				if (inpTxtLen + inpSelLen == 1) {	// 둘중 한 개일때만
					if (inpTxtLen == 1) {
						if ($.trim($(this).find('.inp-text').attr('title')) == undefined || $.trim($(this).find('.inp-text').attr('title')) == '') {		// 타이틀이 없으면 inp-text 일때에는 lable text +' ' + 입력
							var readonlyYn = ($(this).find('.inp-text').attr('readonly') == 'readonly') ? '' : '입력';
							$(this).find('.inp-text').attr('title', $(this).find('label').text() + readonlyYn);
						}
					}
					else if (inpSelLen == 1) {
						if ($.trim($(this).find('.inp-select').attr('title')) == undefined || $.trim($(this).find('.inp-select').attr('title')) == '') {		//타이틀이 없으면 inp-select 일때에는 lable text +' ' + 선택
							$(this).find('.inp-select').attr('title', $(this).find('label').text() + ' ' + '선택');
						}
					}
				}
			}
		}
	});
	
	//[달력] 버튼에 title이 없는 경우 	
	$('.btn-cal').each(function(){
		if($(this).attr('title') == undefined | $(this).attr('title') == ''){
			$(this).attr('title', '달력보기');
		}
	});
	
	//[툴팁] 버튼에 title이 없는 경우
	$('.btn-tooltip').each(function(){
		if($('.btn-tooltip').length > 0){
			if($(this).attr('title') == undefined | $(this).attr('title') == ''){
				$(this).attr('title', $(this).attr('aria-label'));
			}	
		}
	});
	
	//toggle에 title이 없는 경우
	$('.inp-toggle').each(function(){
		
	    var title = '';
	    
	    if($(this).parents('tr').length > 0){
	    	var tableHeader = $(this).parents('tr').find('th');
			title = tableHeader.find('.plan-detail .tit:visible').text().trim();
		}else{
			title = $(this).parents('.grid-cont').find('.tit').text().trim();
		}
	       
	    var toggleLabel = $(this).find('label');
	    if(toggleLabel.find('.blind').length == 0){
	    	if($('#'+toggleLabel.attr('for')).is(':checked')){
	        		$(this).find('label').append('<span class="blind">'+title +' 가입</span>');
	    	}else{
	    		$(this).find('label').append('<span class="blind">'+title +' 미가입</span>');
	    	}
	    }
	    
	    $(this).on('click', function(e){
	    	
	        if($(this).find('input[type="checkbox"]').attr('disabled') == '' || $(this).find('[type="checkbox"]').attr('disabled') == undefined ){
	        	
	        	$(e.target).closest('tbody').find('input[type="checkbox"]').each(function(idx, item){
	        		
	        		var tit = $(item).parent().find('.blind').text().replace('가입', '').replace('미', '');
	        		
	        		if($(item).is(":checked")){
	        			$(item).parent().find('.blind').text(tit + '가입');
	        		}else{
	        			$(item).parent().find('.blind').text(tit + '미가입');
	        		}
	        		
	        	});
	        	
	        }  
	    });
	 
	});
}

$(document).ready(function() {
    calcOffset();
    setMKTitle();
});



    	function sLinkUrlSubmit(irs){
    			$('#irs').val(irs);
    			commUtil.callAjaxForm("/comm/sso/ajaxSend.do",$('#sLinkForm'),"",sCallAjaxSendCb,"y","");
    	}

    	function sLinkUrl(irs){
    		
    		
	    	    
	    	    
		    	    
		            
		            
		                var openWindow = window.open("https://www.idbins.com"+irs, "_blank");
		            
		            
	    	    
	    	
    	}

    	function sCallAjaxSendCb(rData){
    		if (rData.item?.authType) {
	    		$('#authType').val(rData.item.authType);
	    		$('#RelayState').val(rData.item.RelayState);
	    		$('#ssoSendForm').submit();
    		}
    		else {
    			var openWindow = window.open("https://www.idbins.com"+$('#irs').val(), "_blank");
    		}
    	}

    


var mobileAlert = new MobileAlert();

function MobileAlert() {
	$(document).ready(function() {
		// 메인 모바일 상품 alert
		$(".main-product-box.mobile a").on("click", function(e) {
			e.preventDefault();

			$("#txtMobilePrdNm").text($(this).find(".inner .tit").text());
			$("#mobileAlert .product").removeClass("hidden");
			$("#mobileAlert .menu").addClass("hidden");

			commUtil.openPopup("mobileAlert");
		});

		// gnb 모바일 상품/메뉴 alert
		$("nav.gnb .lnb-list a").on("click", function(e){
		    if ($(this).find("span").length > 0) {
		        e.preventDefault();
		        
		        //모바일 QR 제공 상품 확인
		        var qrGidId = $(this).attr("id");
		        
		        //모바일 상품경로 QR 제공 상품인 경우 해당 QR 이미지를 보여줌 
		        // QR 제공 팝업 이미지 CMS 관리
		        if(qrGidId != '' && qrGidId != undefined){
		        	if(qrGidId == "gnbUbiQrGid"){
			        	commUtil.openPopup("ubiQrGidPop");
			        } else if(qrGidId == "gnbYouthQrGid"){
			        	commUtil.openPopup("youthQrGidPop");
			        } else if(qrGidId == "gnbSplchealQrGid"){
			        	commUtil.openPopup("splchealQrGidPop");
			        } else if(qrGidId == "gnbChdFtQrGid"){
			        	commUtil.openPopup("chdFtQrGidPop");
			        }
		        } else{
		        	if ($(this).closest(".gnb-item").children("a").text() == "보험가입") {
						$("#txtMobilePrdNm").text($(this).text().replace("모바일", ""));
						$("#mobileAlert .product").removeClass("hidden");
						$("#mobileAlert .menu").addClass("hidden");
				    } else {
						$("#txtMobileMenuNm").text($(this).text().replace("모바일", ""));
						$("#mobileAlert .product").addClass("hidden");
						$("#mobileAlert .menu").removeClass("hidden");
				    }

					commUtil.openPopup("mobileAlert");
		        }
		    }
		});
		
		// sitemapPopup 모바일 상품/메뉴 alert
		$("#sitemapPopup .lnb-list a").on("click", function(e){
		    if ($(this).find("span").length > 0) {
		        e.preventDefault();
		        
		        //모바일 QR 제공 상품 확인
		        var qrGidId = $(this).attr("id");
		        
		     	//모바일 상품경로 QR 제공 상품인 경우 해당 QR 이미지를 보여줌 
		     	// QR 제공 팝업 이미지 CMS 관리
		        if(qrGidId != '' && qrGidId != undefined){
		        	if(qrGidId == "sitemapUbiQrGid"){
			        	commUtil.openPopup("ubiQrGidPop");
			        } else if(qrGidId == "sitemapYouthQrGid"){
			        	commUtil.openPopup("youthQrGidPop");
			        } else if(qrGidId == "sitemapSplchealQrGid"){
			        	commUtil.openPopup("splchealQrGidPop");
			        } else if(qrGidId == "sitemapChdFtQrGid"){
			        	commUtil.openPopup("chdFtQrGidPop");
			        }
		        } else{
		        	if ($(this).closest(".gnb-item").children(".gnb-item-tit").text() == "보험가입") {
						$("#txtMobilePrdNm").text($(this).text().replace("모바일", ""));
						$("#mobileAlert .product").removeClass("hidden");
						$("#mobileAlert .menu").addClass("hidden");
				    } else {
						$("#txtMobileMenuNm").text($(this).text().replace("모바일", ""));
						$("#mobileAlert .product").addClass("hidden");
						$("#mobileAlert .menu").removeClass("hidden");
				    }

					commUtil.openPopup("mobileAlert");
		        }
		    }
		});

		$("#btnMobileAlertConfirm").on("click", function() {
			commUtil.closePopup("mobileAlert");
		});
		$("#btnUbiQrGidConfirm").on("click", function() {
			commUtil.closePopup("ubiQrGidPop");
		});
		$("#btnYouthQrGidConfirm").on("click", function() {
			commUtil.closePopup("youthQrGidPop");
		});
		$("#btnSplchealQrGidConfirm").on("click", function() {
			commUtil.closePopup("splchealQrGidPop");
		});
		$("#btnchdFtQrGidConfirm").on("click", function() {
			commUtil.closePopup("chdFtQrGidPop");
		});
	});
}



                $(function() {
                    // go to top 
                    // ui.common.js
                    const $wrapper = $('.popup-main','#atarcDstTtyPop');
                    const $btnTop = $('.popup-wrap .btn-gotop','#atarcDstTtyPop');

                    $wrapper.on('scroll', function() {
                        if ($(this).scrollTop() > 0) {
                            $btnTop.fadeIn(200);
                        } else {
                            $btnTop.fadeOut(200);
                        }
                    });

                    $btnTop.click(function() {
                        $wrapper._ani({
                            duration: 0.2,
                            scrollTo: 0
                        });
                        return false;
                    });
                    
                 	// 주행거리 자동차보험료 계산/가입
                    $("#pc_01_02_01").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                    
                    // 안전운전 자종차보험료 계산/가입
                    $("#pc_01_02_02").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                    
                    // Baby in Car 자종차보험료 계산/가입
                    $("#pc_01_02_03").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                    
                    // Baby in Car 출생전 자녀(태아) 서류예시
                    $("#pc_01_02_04").on('click', function() {
                    	commUtil.openPopup('atarcDstTtyPop2');
                    });
                    
                 	// Baby in Car 만 11세이하의 자녀 서류예시
                    $("#pc_01_02_05").on('click', function() {
                    	commUtil.openPopup('atarcDstTtyPop1');
                    });
                 	
                 	// 블랙박스 자동차보험료 계산/가입
                    $("#pc_01_02_06").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                 	
                 	// 첨단안전장치 자동차보험료 계산/가입
                    $("#pc_01_02_07").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                 	
                 	// 커넥티드카 자동차보험료 계산/가입
                    $("#pc_01_02_08").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                 	
                 	// 커넥티드 안전운전 자동차보험료 계산/가입
                    $("#pc_01_02_09").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                 	
                 	// 프로미하트나눔 자동차보험료 계산/가입
                    $("#pc_01_02_10").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                 	
                 	// 어라운드뷰 자동차보험료 계산/가입
                    $("#pc_01_02_11").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                 
                 	// 걸음 수 할인특약
                    $("#pc_01_02_12").on('click', function() {
                    	commUtil.goCmUrl(contextPath + '/at/prd/atarc/step1/formStepPreView.do');
                    });
                })
            


                $(function() {
                    // go to top 
                    // ui.common.js
                    const $wrapper2 = $('.popup-main','#atarcDstTtyPop');
                    const $btnTop2 = $('.popup-wrap .btn-gotop','#atarcDstTtyPop');

                    $wrapper2.on('scroll', function() {
                        if ($(this).scrollTop() > 0) {
                            $btnTop2.fadeIn(200);
                        } else {
                            $btnTop2.fadeOut(200);
                        }
                    });

                    $btnTop2.click(function() {
                        $wrapper2._ani({
                            duration: 0.2,
                            scrollTo: 0
                        });
                        return false;
                    });
                    
                    
                 	
                 	
                })
            


	 
	function ___commonNoticePopup() {
	    try {
	        var commonNoticePopPopUrl = $("#___commonNoticePopPopUrl__").val();
	        var popOnceKey = $("#___popOnceKey__", $("#_commonNoticePopForm_")).val();
	
	        if(commonNoticePopPopUrl != null && commonNoticePopPopUrl != undefined && commonNoticePopPopUrl != '' ) {
	
               	var noticePopupId = 'noticePopup'+ Math.round( Math.random(100000) * 100000 );
	            if(popOnceKey != null && popOnceKey != undefined && popOnceKey != '' ) {
	                if(gfnGetCookie(popOnceKey) != gfnYyyymmdd()) {
	                    gfnSetCookie(popOnceKey, gfnYyyymmdd(), 1);
	                    commUtil.callAjaxLayer('/contents/contents.do?rtnUrl=/'+commonNoticePopPopUrl, null, function(data) {
	                    	$(data).attr('id', noticePopupId).appendTo(document.body);
	    					commUtil.openPopup(noticePopupId);
	                    }, null, null, 'N');
	                }
	            }
	            else {
	            	commUtil.callAjaxLayer('/contents/contents.do?rtnUrl=/'+commonNoticePopPopUrl, null, function(data) {
                    	$(data).attr('id', noticePopupId).appendTo(document.body);
    					commUtil.openPopup(noticePopupId);
                    }, null, null, 'N');
	            }
	        }
	    }catch(e) {
	        commUtil.LOG(e);
	    }
	}
	$(document).ready(function() {
	    ___commonNoticePopup();
	});



AdKVnYqHOiZjw();
