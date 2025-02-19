/*
 * FILE NAME    : mainView.js
 * SYSTEM       : CM 플랫폼 통합 구축
 * DESCRIPTION  : main
 * AUTHOR       :
 * HISTORY      :
 *
 */
var mainView = new MainView();


function MainView() {

	/* ================ constant definitions ================ */
	var vm = this;

	const timeString = function(date) {
		const $year = String(date.getFullYear());
		const $month = String(date.getMonth() + 1).padStart(2, "0");
		const $day = String(date.getDate()).padStart(2, "0");
		const $hour = String(date.getHours()).padStart(2, "0");
		const $min = String(date.getMinutes()).padStart(2, "0");

		return "".concat($year, $month, $day, $hour, $min);
	};

	const todayTimeString = function(addDay) {
		const $today = new Date();

		if (typeof addDay === "number") {
			$today.setDate($today.getDate() + addDay);
		}

		return timeString($today);
	};

	const $nowDateDay = parseInt(todayTimeString().substring(0, 8)); //년+월+일
	
	$(function() {
		// 이벤트 배너 슬라이드
		var swiperOption = {};
		if ($('.swiper-slide.swiper-banner').length != 1) {
			swiperOption = {
	            loop: true,
	            autoplay: {
	                delay: 3000,
	            },
	            pagination: {
	                el: '.swiper-pagination-counter',
	                type: 'fraction',
	                clickable: false,
	            }
	        };
		} else {
			// 배너 개수 하나일 때 하단 컨트롤바 및 좌우버튼 미노출 처리
			$('.swiper-button-prev, .swiper-button-next').addClass('hidden');
			swiperOption = {
	            loop: false,
	            autoplay: false,
	            pagination: {
	                el: '.swiper-pagination-counter',
	                type: 'fraction',
	                clickable: false,
	            }
	        };
		}
        $('.main-promotion-bann .swiper')._slide(swiperOption);

        // 세대별 필요보장 안내 슬라이드
        $('.main-guaranteed-bann .swiper')._slide({
            loop: true,
            autoplay: {
                delay: 3000,
            }
        });

        // main 내비게이션
        const $nav = $('.main-nav');
        const $navItems = $nav.find('a');
        const headerH = $('.header').outerHeight();
        let navScrFlag = false;
        let winScr;
        let lastId;

        const scrollItems = $navItems.map(function() {
            const item = $($(this).attr('href'));
            if (item.length) {
                return item;
            }
        });

        function onNavMenu(id) {
            const $activeEl = $navItems.filter(`[href="#${id}"]`);
            $nav.find('a').removeClass('active');
            $activeEl.closest('a').addClass('active');
        }

        function nav() {
            winScr = $(window).scrollTop();

            let current = $(scrollItems).map(function() {
                if ($(this).offset().top - headerH <= winScr)
                    return this;
            });
            current = current[current.length - 1];
            let id = current && current.length ? current[0].id : '';

            if (lastId !== id) {
                lastId = id;

                if (navScrFlag) return false;
                onNavMenu(id);
            }
        }

        // product nav event
        $(window).on('load scroll', nav);

        // anchor click event
        $nav.find('a').on('click', function(e) {
            e.preventDefault();
            const $target = $(this.hash);
            const targetTop = $target.offset().top - headerH + 36; // offsetTop - (headerHeight + sectionMarginTop)
            const id = this.hash.replace(/^#/, '');

            navScrFlag = true;
            $('html, body')._ani({
                duration: 0.2,
                scrollTo: targetTop,
                onComplete: () => navScrFlag = false
            });
            onNavMenu(id);
        });
    });

	$(document).ready(function() {
		let mainEvtDialogCheck = localStorage.getItem("todayPopup-mainEvtDialog");

		if (mainEvtDialogCheck != null && parseInt(mainEvtDialogCheck) < $nowDateDay) {
			localStorage.removeItem("todayPopup-mainEvtDialog");
			mainEvtDialogCheck = null;
		}

		if (mainEvtDialogCheck == null || parseInt(mainEvtDialogCheck) !== $nowDateDay) {
			commUtil.openPopup("mainEvtDialog");
		}

		$("#btnMainEvtDialogCloseToday").on("click", function() {
			localStorage.setItem("todayPopup-mainEvtDialog", $nowDateDay);
			commUtil.closePopup("mainEvtDialog");
		});

		$("#btnMainEvtDialogClose").on("click", function() {
			commUtil.closePopup("mainEvtDialog");
		});

		// 상단 롤링 공지사항 상세
		$(".main-notice-bann.annc a").on("click", function(e) {
			e.preventDefault();

			$('#anncTopForm input[name=searchAnncId]').val($(this).data("anncId"));
	        $('#anncTopForm input[name=tableID]').val('CMTM02007');
	        $('#anncTopForm input[name=pk1]').val($(this).data("anncId"));

			$('#anncTopForm').attr("action", '/comm/cst/annc/getAnncView.do');

			$('#anncTopForm').submit();
		});

		// 하단 공지사항 상세
		$(".main-notice-list .list-item").on("click", function(e) {
			e.preventDefault();

			$('#anncForm input[name=searchAnncId]').val($(this).data("anncId"));
	        $('#anncForm input[name=tableID]').val('CMTM02007');
	        $('#anncForm input[name=pk1]').val($(this).data("anncId"));

			$('#anncForm').attr("action", '/comm/cst/annc/getAnncView.do');

			$('#anncForm').submit();
		});
		
		//CMS
		//자동차보험 갱신/재가입버튼
		$('#pc_hm_01_01').on("click", function(){
			commUtil.goCmUrl('/at/prd/atarc/step1/formStepPreView.do?isRenew=Y'); 
			return false;
		});
		//자동차보험 계산/가입 버튼
		$('#pc_hm_01_02').on("click", function(){
			commUtil.goCmUrl('/at/prd/atarc/step1/formStepPreView.do'); 
			return false;
		});
		//이륜차보험 계산/가입 버튼
		$('#pc_hm_01_03').on("click", function(){
			commUtil.goCmUrl('/at/prd/mtcc/step1/formStepPreView.do'); 
			return false;
		});
		//법인 계산/가입 버튼
		$('#pc_hm_01_04').on("click", function(){
			commUtil.goCmUrl('/copr/atarc/step1/formStepPreView.do'); 
			return false;
		});
		//종합보험
		$('#pc_hm_03_01').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/cmph/custInfoView.do?searchPdcCd=30658&searchPdcTrtHistCd=00&pdcDvcd=l_total');
			return false;
		});
		//암보험
		$('#pc_hm_03_02').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/canr/custInfoView.do?searchPdcCd=30604&searchPdcTrtHistCd=00&pdcDvcd=l_cancer'); 
			return false;
		});
		//치아보험
		$('#pc_hm_03_03').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/teth/custInfoView.do?searchPdcCd=30581&searchPdcTrtHistCd=00&pdcDvcd=l_tooth');
			return false;
		});
		
		//1035건강보험 모바일 전용
		$('#pc_hm_03_04').on("click", function(){
			commUtil.openPopup("youthQrGidPop");
			return false;
		});
		//유병자간편건강보험
		$('#pc_hm_03_05').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/splcheal/custInfoView.do?searchPdcCd=31026&searchPdcTrtHistCd=00&pdcDvcd=l_health&selfPlanDvcd=2');
			return false;
		});
		//운전자
		$('#pc_hm_02_01').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/drvr/custInfoView.do?searchPdcCd=30547&searchPdcTrtHistCd=00&pdcDvcd=l_driver');
			return false;
		});
		//라이더+오토바이
		$('#pc_hm_02_03').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/ridr/custInfoView.do?searchPdcCd=30580&searchPdcTrtHistCd=00&pdcDvcd=l_mtcc&selfPlanDvcd=10');
			return false;
		});
		//라이더+PM
		$('#pc_hm_02_05').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/ridr/custInfoView.do?searchPdcCd=30580&searchPdcTrtHistCd=00&pdcDvcd=l_mtcc&selfPlanDvcd=20');
			return false;
		});
		//운전자1년
		$('#pc_hm_02_04').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/drve/drvr/custInfoView.do?searchPdcCd=10544&searchPdcTrtHistCd=00&pdcDvcd=g_driver'); 
			return false;
		});
		//자녀
		$('#pc_hm_04_01').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/chd/custInfoView.do?searchPdcCd=30548&searchPdcTrtHistCd=00&pdcDvcd=l_child');
			return false;
		});
		//치아
		$('#pc_hm_04_02').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/teth/custInfoView.do?searchPdcCd=30581&searchPdcTrtHistCd=00&pdcDvcd=l_tooth&chdDvcd=1');
			return false;
		});
		//유병자(자녀)
		$('#pc_hm_04_03').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/mdhtsplcheal/custInfoView.do?searchPdcCd=30727&searchPdcTrtHistCd=00&pdcDvcd=l_simple&chdDvcd=1');
			return false;
		});
		//자녀보험 태아플랜 모바일 전용
		$('#pc_hm_04_04').on("click", function(){
			commUtil.openPopup("chdFtQrGidPop");
			return false;
		});
		//펫블리반려견보험
		$('#pc_hm_05_01').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/cpnm/custInfoView.do?searchPdcCd=31104&searchPdcTrtHistCd=00&pdcDvcd=l_pet_dog');
			return false;
		});
		//펫블리반려묘보험
		$('#pc_hm_05_02').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/cpnmcat/custInfoView.do?searchPdcCd=31105&searchPdcTrtHistCd=00&pdcDvcd=l_pet_cat');
			return false;
		});
		//가정보장보험
		$('#pc_hm_06_01').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/fmas/custInfoView.do?searchPdcCd=30800&searchPdcTrtHistCd=00&pdcDvcd=l_fire');
			return false;
		});
		//주택화재
		$('#pc_hm_06_02').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/dmg/fire/custInfoTrmView.do?searchPdcCd=10548&searchPdcTrtHistCd=00&pdcDvcd=g_fire');
			return false;
		});
		//해외여행보험
		$('#pc_hm_07_01').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/trvl/ovse/custInfoView.do?searchPdcCd=10543&searchPdcTrtHistCd=00&pdcDvcd=g_ov_trvl'); 
			return false;
		});
		$('#pc_hm_07_02').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/trvl/stab/custInfoView.do?searchPdcCd=13510&searchPdcTrtHistCd=00&pdcDvcd=g_ov_longtrvl'); 
			return false;
		});
		//프리미엄해외여행
		$('#pc_hm_07_03').on("click", function(){
			commUtil.openPopup('joinPop'); 
			return false;
		});
		//국내여행
		$('#pc_hm_07_04').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/trvl/dmst/custInfoView.do?searchPdcCd=10542&searchPdcTrtHistCd=00&pdcDvcd=g_in_trvl');
			return false;
		});
		
		//오잘공골프 3년
		$('#pc_hm_08_01').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/bbot/custInfoView.do?searchPdcCd=31042&searchPdcTrtHistCd=00&pdcDvcd=l_golf');
			return false;
		});
		
		//골프보험1년
		$('#pc_hm_08_02').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/lise/golf/custInfoView.do?searchPdcCd=10545&searchPdcTrtHistCd=00&pdcDvcd=g_golf');
			return false;
		});
		
		//레저스키
		$('#pc_hm_08_03').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/lise/ski/custInfoView.do?searchPdcCd=13501&searchPdcTrtHistCd=00&pdcDvcd=g_outdoor');
			return false;
		});		
		
		//실손의료비보험
		$('#pc_hm_09_01').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/pmimdcs/custInfoView.do?searchPdcCd=31020&searchPdcTrtHistCd=00&pdcDvcd=l_pmi');
			return false;
		});	
		//유병자간편실손
		$('#pc_hm_09_02').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/mdhtsplcheal/custInfoView.do?searchPdcCd=30727&searchPdcTrtHistCd=00&pdcDvcd=l_simple');
			return false;
		});	
		//실손의료비(계약자전환)
		$('#pc_hm_09_03').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/pmimdcscns/custInfoView.do?searchPdcCd=31035&searchPdcTrtHistCd=00&pdcDvcd=l_cns_pmi');
			return false;
		});	
		//유병자 간편실손보험(재가입)
		$('#pc_hm_09_04').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/pmiexp/custInfoView.do?searchPdcCd=31062&searchPdcTrtHistCd=00&pdcDvcd=l_exp_simple');
			return false;
		});	
		//재난배상책임
		$('#pc_hm_10_01').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/dmg/cmtyLbt/custInfoView.do?searchPdcCd=13401&searchPdcTrtHistCd=00&pdcDvcd=g_cmtylbt');
			return false;
		});	
		//연금보험
		$('#pc_hm_10_02').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/pnn/custInfoView.do?searchPdcCd=30551&searchPdcTrtHistCd=00&pdcDvcd=l_annuity');
			return false;
		});	
		//풍수해보험
		$('#pc_hm_10_03').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/dmg/wdst/custInfoView.do?searchPdcCd=13809&searchPdcTrtHistCd=00&pdcDvcd=g_windstorm');
			return false;
		});	
		//개인정보보호책임
		$('#pc_hm_10_04').on("click", function(){
			commUtil.goCmUrl('/gnrl/prd/gnrlCorp/custInfoCorpView.do?searchPdcCd=13418&searchPdcTrtHistCd=00&pdcDvcd=g_prniflbt');
			return false;
		});	
		//자동차보험 
		$('#pc_hm_11_01').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=atarc');
			return false;
		});	
		//이륜차보험 
		$('#pc_hm_11_02').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=mtcc');
			return false;
		});	
		//운전자보험 
		$('#pc_hm_11_03').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=driver');
			return false;
		});	
		//간편실손
		$('#pc_hm_11_04').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=simple');
			return false;
		});	
		//암보험 
		$('#pc_hm_11_05').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=cancer');
			return false;
		});	
		//치아보험 
		$('#pc_hm_11_06').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=tooth');
			return false;
		});	
		//실손보험 
		$('#pc_hm_11_07').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=pmi');
			return false;
		});	
		//종합보험 
		$('#pc_hm_11_08').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=total');
			return false;
		});	
		//주택화재보험 
		$('#pc_hm_11_09').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=fire');
			return false;
		});	
		//펫보험 
		$('#pc_hm_11_10').on("click", function(){
			commUtil.goCmUrl('/tlpeny/telephoneEntryView.do?tab=pet');
			return false;
		});	
		//보장분석
		$('#pc_hm_12_01').on("click", function(){
			commUtil.goCmUrl('/aseanal/cnfm/custInfoAnalView.do');
			return false;
		});	
		//스마트사전심사
		$('#pc_hm_12_02').on("click", function(){
			commUtil.goCmUrl('/befundw/custInfoView.do');
			return false;
		});	
		//유병자 간편실손보험
		$('#pc_hm_13_01').on("click", function(){
			commUtil.goCmUrl('/ltm/prd/mdhtsplcheal/custInfoView.do?searchPdcCd=30727&searchPdcTrtHistCd=00&pdcDvcd=l_simple');
			return false;
		});	
		//유병자 간편건강보험 모바일 전용
		$('#pc_hm_13_02').on("click", function(){
			commUtil.openPopup("splchealQrGidPop");
			return false;
		});	
		
		
		
	});
}