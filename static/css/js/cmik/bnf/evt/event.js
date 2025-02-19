/**
 * FILE NAME       : event.js
 * SYSTEM          : CM 플랫폼 통합 구축
 * DESCRIPTION     : 이벤트
 * AUTHOR          : 82300831
 * HISTORY         :
 */

var envent = new event();

function event() {

	var vm = this;

	/* ================ constant definitions ================ */
	vm.ID = 'event';

	/* ================ assign functions ================ */
	//vm.changeTab = changeTab; //제휴처 이벤트 추가 탭 변경
	vm.goEvtDetail = goEvtDetail; //진행중인 이벤트 상세보러가기
	vm.gotoEvtList = gotoEvtList;
	vm.searchEvtEndList = searchEvtEndList;
	vm.goWinnAnceDetail = goWinnAnceDetail;
	vm.headerMenu = headerMenu;
	vm.searchByPageno = searchByPageno;

	/* ================ function definitions ================ */
	$(document).ready(function() {

		// 헤더부분 진행 중인 이벤트 누르면 혜택/서비스 > 이벤트 > 진행 중인 이벤트
		$("#evtTab1").on('click', function() {
			$("#stepNm").text("진행중인이벤트");
		});
		// 헤더부분 당첨자확인 누르면 혜택/서비스 > 이벤트 > 당첨자확인
		$("#evtTab2").on('click', function() {
			$("#stepNm").text("당첨자확인");
		});

		//초기 설정 : 이벤트 진행중
		$('#evtTab1').trigger('click');

		/*$('#evtTab1').parent().addClass("active");
		$('#evting_list_Tab').show();
		$('#evted_list_Tab').hide();*/

		headerMenu();

        // 기존 리스트 지우기
		//clearList();

		// 종료된 이벤트 검색
		//searchEvtEndList('1');

        //존재할때만 조회
        if($('#winnerList').length > 0) {
    		searchEvtEndList('1', function(data){
                clearList();              // 기존 리스트 지우기
                appendEvtList(data); // 리스트 가져와 보여주기

                /*var flag =  $('#endListFlag').val();
                console.log('flag = '+ flag);
                if(flag == 'endList'){
                    $('#evtTab2').trigger('click');
                }*/
            });
        }

		// 당첨자발표 상세보기에서 목록보기를 눌렀을때 endList를 보내고 다시 이벤트리스트 화면에 왔을 때 보여주는 부분
        if($('#endListFlag').val() == 'endList'){
            $('#evtTab2').trigger('click');
        }

		if ($("#tab").val() == "evtTab1" || $("#tab").val() == "evtTab2") {
			$(`#${$("#tab").val()}`).click();
		}
	});

	/**
     *  이벤트 제휴처 추가 탭 이동
     */
	/*function changeTab(num) {
		if(num == '1') { // 진행중 이벤트
			$('#m_evting_list_Tab').show();
			$('#m_evted_list_Tab').hide();
			$('#m_evtTab1').parent().addClass("active");
            $('#m_evtTab2').parent().removeClass("active");
		} else if(num =='2') { //당첨자 발표
			$('#m_evting_list_Tab').hide();
			$('#m_evted_list_Tab').show();
			$('#m_evtTab2').parent().addClass("active");
            $('#m_evtTab1').parent().removeClass("active");
			searchEvtEndList(); // 종료된 이벤트 검색
		}
	}*/

	/**
     * 진행중인 이벤트 상세 보러 가기
     */
	//function goEvtDetail(evtNo, evtNm, evtDvpTpcd, e) {
	function goEvtDetail(evtNo) {

		if($('#eventForm').length < 1){
			var tempForm = $('<form></form>');
			$(tempForm).attr('id', 'eventForm');
			$(tempForm).attr('method', 'post');
			
			var tempinput = $('<input></input>');
			$(tempinput).attr('type', 'hidden');
			$(tempinput).attr('id', 'searchEvtNo');
			$(tempinput).attr('name', 'searchEvtNo');
			$(tempinput).attr('id', 'searchEvtNo');
			
			$(tempForm).append(tempinput);
			
			$('body').append(tempForm);
		}

		$('#searchEvtNo').val(evtNo);

		$('#eventForm').attr("action", '/comm/bnf/evt/getEvtView.do');
		$('#eventForm').submit();
	}

	/**
	 * 이벤트상세보기에서 목록보기 이동
	 */
	function gotoEvtList() {
		$('#evtDetailForm').attr("action", '/comm/bnf/evt/evtListView.do');
		$('#evtDetailForm').submit();
	}

	/**
	 * 종료된 이벤트 검색
	 */
	function searchEvtEndList(pageNo, callback) {

		console.log("pageNo::" + pageNo);

		$("#currentPageNo").val(pageNo);

		var evtEndUrl = '/comm/bnf/evt/ajaxEvtEndList.do';

		commUtil.callAjaxForm(evtEndUrl, $('#eventForm'), '', appendEvtList);

	}

	/**
     * 종료된 이벤트 붙이기(보여주기)
     */
	function appendEvtList(data){
		$('#winnerList').empty(); // 초기화

		// 발표중인 이벤트가 없을경우
		if(data.item.evtEndList.length == 0) {
			var noData = `<div class="event-wrap">
                            <div class="no-result">
                                <p> 현재 발표중인 이벤트가 없습니다.</p>
                            </div>
                        </div>`;

			$('#winnerList').append(noData).show();
			$('#paging').hide();
		} else {
		// 발표중인 이벤트가 있을경우
			$('#paging').show();

			for(var i=0; i<data.item.evtEndList.length; i++){

	            var evt = data.item.evtEndList[i];    // 종료된 이벤트 게시물 리스트

					var resultHtml = '';

					resultHtml += `<div class="item">`;
					resultHtml += 	'<a href="#!" title="'+evt.evtNm+' 당첨자 발표 자세히 보기" onclick="envent.goWinnAnceDetail('+"'" + evt.evtNo +"', '"+evt.anceTypeDvcd+"'"+'); return false;" class="link">';
					resultHtml += 		`<div class="tit">`;
					resultHtml += 			`<strong>${evt.evtNm}</strong>`;
					resultHtml += 			`<p>${evt.dtlExpl}</p>`;
					resultHtml += 		`</div>`;
					resultHtml += 		`<p class="period">${formatDate(evt.anceDt)}</p>`;
					resultHtml += 	`</a>`;
					resultHtml += `</div>`;

					$('#winnerList').append(resultHtml).show();
			}
		}

		setCmntPaging(data);
	}

	/**
	 * 날짜형식 변경("-")
	 */
	function formatDateAnce(date) {

		if(date == null || date == '') {
			return "";
		}

		var frstInptDt = date;
		var frstYear = frstInptDt.substring(0, 4);
		var frstMonth = frstInptDt.substring(4, 6);
		var frstDate = frstInptDt.substring(6, 8);

		return frstYear + "-" + frstMonth + "-" + frstDate;
	}

	/**
	 * 날짜형식 변경(".")
	 */
	function formatDate(date) {

		if(date == null || date == '') {
			return "";
		}

		var frstInptDt = date;
		var frstYear = frstInptDt.substring(0, 4);
		var frstMonth = frstInptDt.substring(4, 6);
		var frstDate = frstInptDt.substring(6, 8);

		return frstYear + "." + frstMonth + "." + frstDate;
	}

	/**
     *   종료된이벤트 페이징 처리
     */
	function setCmntPaging(data) {

		var searchVO = data.item.evtSearchVO;
		var resultHtml = '';

		$("#paging").empty();

		console.log("currentPageNo::" + searchVO.currentPageNo);
		console.log("searchVO.totalPageCount::" + searchVO.totalPageCount);
		// 처음 페이지로
		if(parseInt(searchVO.currentPageNo) > 10) {
			resultHtml += '<a href="#!" class="page-prev-jump" onclick="envent.searchByPageno('+"'"+1+"'"+'); return false;" aria-label="처음 리스트로"></a>';
		}

		// 이전 페이지로
		if(parseInt(searchVO.firstPageNo) > 1) {
			resultHtml += '<a href="#!" class="page-prev" onclick="envent.searchByPageno('+"'"+(parseInt(searchVO.firstPageNo)-1)+"'"+'); return false;" aria-label="이전"></a>';
		}

		for(var i=parseInt(searchVO.firstPageNo); i<=parseInt(searchVO.lastPageNo); i++) {
			// 현재페이지
			if(i == parseInt(searchVO.currentPageNo)) {
				resultHtml += '<span class="page-item active">' + i + '</span>';
			// 그외페이지
			} else {
				resultHtml += '<a href="#!" onclick="envent.searchByPageno('+"'"+i+"'"+'); return false;" class="page-item">' + i + '</a>';
			}
		}

		// 다음 페이지로
		if(parseInt(searchVO.lastPageNo) < parseInt(searchVO.totalPageCount)) {
			resultHtml += '<a href="#!" class="page-next" onclick="envent.searchByPageno('+"'"+(parseInt(searchVO.lastPageNo)+1)+"'"+'); return false;" aria-label="다음"></a>';
		}

		var lastPage = (parseInt(searchVO.lastPageNo)%parseInt(searchVO.recordCountPerPage))*parseInt(searchVO.recordCountPerPage);

		// 마지막 페이지로
		if(parseInt(searchVO.lastPageNo) > 10 && parseInt(searchVO.lastPageNo) <= lastPage) {
			resultHtml += '<a href="#!" class="page-next-jump" onclick="envent.searchByPageno('+"'"+searchVO.totalPageCount+"'"+'); return false;" aria-label="마지막 리스트로"></a>';
		}

		$('#paging').append(resultHtml);
	}

	/**
     *   pagination에서 클릭되면 호출되는 함수
     */
	function searchByPageno(pageNo) {

		searchEvtEndList(pageNo, function(data) {
			clearList();              // 기존 리스트 지우기
			appendEvtList(data);      // 리스트 가져와 보여주기
		});
	}

	/**
     *   기존 리스트 지우기
     */
    function clearList(){
        $("#winnerList").empty(); // 종료된 이벤트가 붙을 영역

    }

	/**
	 * 당첨자 확인하기 폼
	 */
    function goWinnAnceDetail(evtNo, anceType){

		$("#searchEvtNo").val(evtNo);
		$("#searchAnceTypeDvcd").val(anceType);

		switch(anceType){
	        case '1': actionUrl = "/comm/bnf/evt/evtWinnAnceView.do"; break;    //html 발표
	        case '2': actionUrl = "/comm/bnf/evt/evtWinnCheckView.do"; break;   //템플릿_생년월일
	        case '3': actionUrl = "/comm/bnf/evt/evtWinnCheckView.do"; break;    //템플릿_전화번호
        }

		if(actionUrl != ''){
            $("#eventForm").attr('action', actionUrl);
            $("#eventForm").submit();
        }
    }

	/**
	 * 초기화
	 */
	function init() {

		$("#winListPh").empty();
		$("#inputNameP").val("");
		$("#inputBirth").val("");
		$("#custNmErrorMsg").empty();
		$("#BirthErrorMsg").empty();

		$("#winListBrth").empty();
		$("#inputNameB").val("");
		$("#inputPhone").val("");
		$("#custNmErrorMsgP").empty();
		$("#clpNoErrorMsg").empty();
	}

	/**
	 * 이벤트 조회에세 상세보기를 할때 헤더부분 메뉴버튼을 목록에서 상세페이지 진입시 메뉴버튼, 제휴사이트에서 유입시 홈버튼으로 출력
	 */
	function headerMenu() {

		const urlparam = new URLSearchParams(location.search);
		if(urlparam.has('partner_code')){
			const partnerCode = urlparam.get('partner_code');

			// 제휴사이트에서 유입시
			if(partnerCode == 'C799') {
				$("#goback").hide();
				$("#gnb").hide();
			// 목록 -> 상세페이지 진입시
			} else {
				$("#home").hide();
			}
		}
	}

	/**
     * 기존 리스트 지우기
     */
    function clearList(){
       $("#winnerList").empty();
    }
}
