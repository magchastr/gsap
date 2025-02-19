var joinPop = new joinPop();

function joinPop(){
	
	/* ================ constant definitions ================ */
	var vm = this;

    /* ================ variable definitions ================ */
    vm.calcPssDt = null;

    /* ================ execution codes ================ */
	vm.goNext = goNext;				//다음화면이동

	
	//다음화면으로 이동
	function goNext(){
		var actUrl = "";
		var value = $('input[type="radio"][name="rdoJoin"]:checked').val();
		
		if(value == "0"){
			actUrl = contextPath + "/gnrl/prd/trvl/prm/custInfoView.do?searchPdcCd=13505&searchPdcTrtHistCd=00&pdcDvcd=g_ov_prmtrvl";
		}else{
			actUrl = contextPath + "/ctc/chng/gnrl/prm/myPrmTrvlSjlWriteView.do?dvCd=1";
		}
		
		commUtil.closePopup("joinPop");
		commUtil.goCmUrl(actUrl);
	}
	
}