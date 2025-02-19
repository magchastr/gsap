/*
 * FILE NAME    : smart_chatbot.js
 * DESCRIPTION  : masking values
 */

var smartChatbot = new SmartChatbot();

function SmartChatbot() {

    var vm  = this;

    /* ================ constant definitions ================ */
	vm.beforeFocused = [];

    /* ================ assign functions ================ */
    vm.open = open;
    vm.openCnslChat = openCnslChat; // 상담신청, 채팅 상담하기
    vm.openCnslChatGuide = openCnslChatGuide; // 상담신청, 채팅상담 안내 문구 팝업 노출
    vm.getStartServiceName = getStartServiceName; // 상품별 서비스네임 가져오기
    vm.ltmNotPassOpenChat = ltmNotPassOpenChat; // 장기 인수/가입불가 팝업 내 채팅 기능 호출
    /* ================ function definitions ================ */

    function open(param){
        try{
            var focusedObj  = $('a:focus');
            if (focusedObj.length == 0) {
                focusedObj  = $('input:focus');
            }

            // 현재 포커스 저장
            vm.beforeFocused = focusedObj;

            var addCallbackParam = {
                    onStart : openCallback
                    , onClose : closeCallback
                    , refererPage : document.location.href  //챗봇에 url전달.(분기처리 위함)
            }

            var margeParam = $.extend(param, addCallbackParam);

            dbinsChatbotRun(margeParam);
        }catch(e){
            commUtil.LOG("smartChatbot open failed..");
        }
    }

    function openCallback(){
        try{
            setFocusElement($('#leevi-chatbot-script-iframe-parent iframe'));
        }catch(e){}
    }

    function closeCallback(){
        // 팝업을 열었던 요소에 다시 포커스 주기
        if (vm.beforeFocused.length > 0) {
            try{
                setFocusElement($(vm.beforeFocused));
            }catch(e){}
        }
    }

    // 채팅 상담하기
    function openCnslChat(){
        var param = getCnslChatParam();
        open(param);
        return false;
    }

    // 채팅상담 안내
    function openCnslChatGuide(){
        var param = getCnslChatParam();

        // 얼럿 메시지  창
		commUtil.confirm('알림', "채팅상담을 통해 상담사에게 문의 가능합니다. 채팅상담을 활용해주세요.", '채팅연결', '확인',
            function () {
                open(param);
            },
            function () {
        });
    }

    // 채팅상담하기 파라미터 구하기
    function getCnslChatParam(){

        var cnslChatServiceNameVal = $('#cnslChatServiceName').val();
        var carOptionVal = true;
        var autoTransferVal = true;

        if($('#cnslChatCarOptionVal').val() != "true"){
            carOptionVal = false;
        }
        if($('#cnslChatAutoTransferVal').val() != "true"){
            autoTransferVal = false;
        }

        var returnParam = {
                    startServiceName: cnslChatServiceNameVal,
                    car: carOptionVal,
                    autoTransfer: autoTransferVal
                    };

        return returnParam;
    }

    // 서비스네임(트리거코드) 구하기
    function getStartServiceName(pdcDvcd){
        var startServiceName = '';

	    switch(pdcDvcd){
	        case 'l_driver': // 운전자
	            startServiceName = 'dr_ba';
	            break;
	        case 'l_ubi_driver': // UBI운전자
	            startServiceName = 'dr_ba';
	            break;
	        case 'l_mtcc': // 라이더
	            startServiceName = 'mo_ba';
	            break;
	        case 'l_total': // 종합
	            startServiceName = 'ha_ba';
	            break;
	        case 'l_health': // 간편건강
	            startServiceName = 'si_ba';
	            break;
	        case 'l_cancer': // 암
	            startServiceName = 'ca_ba';
	            break;
	        case 'l_suttcancer': // 실속암
	            startServiceName = 'ca_ba';
	            break;
	        case 'l_child': // 자녀
	            startServiceName = 'ki_ba';
	            break;
	        case 'l_tooth': // 치아
	            startServiceName = 'to_ba';
	            break;
	        case 'l_pmi': // 실손
	            startServiceName = 'ss_ba';
	            break;
	        case 'l_simple': // 간편실손
	            startServiceName = 'us_ba';
	            break;
	        case 'l_fire': // 가정보장
	            startServiceName = 'ho_ba';
	            break;
			case 'l_golf': // 오잘공
	            startServiceName = 'cd_ba';
	            break;
			case 'l_pet_dog': // 펫블리
	            startServiceName = 'pt_ba';
	            break;
			case 'l_annuity': // 연금보험
	            startServiceName = 'cd_ba';
	            break;	
	        default :
	            startServiceName = 'Default';
	    }

        return startServiceName;
    }

    function ltmNotPassOpenChat(){
        var startServiceName = getStartServiceName($('#pdcDvcd').val());
        open({startServiceName: startServiceName });
    }

	/**
	 * 특정 element 포커스 주기(웹접근성 관련)
	 *
	 */
	function setFocusElement(element) {
	    let el;
	    if(typeof element === "object") { // object 타입.
	        if(element instanceof jQuery) { // jQuery 객체
	            el = element[0];
	        }
	        else {
	            el = element; // 그냥 element
	        }
	    }
	    else { // 그외, string 타입
	        el = $(element)[0];
	    }

	    try {
	        // 포커스를 주었을때 포커스를 받을 수 있는 Element인지 확인(포커스를 받을 수 있는 Element 의 범위와 동일하기 때문에...)
	        // input, select, textarea, anchor, button, area - anchor은 href가 있을때, 공통으로 disabled 가 아닐때
	        if(el.isContentEditable !== true) {
	            let tabIdx = $(el).attr("tabindex"); // 포커스를 받을 수 없게 tabindex 가 없거나 음수인 경우
	            if(!tabIdx || 0 > parseInt(tabIdx)) {
	                $(el).attr("tabindex", "0");
	            }
	        }
	        $(el).focus(); // 1차로 포커스를 부여할 대상 Element 에 focus 부여.
	    }
	    catch(e) {}
	}
}