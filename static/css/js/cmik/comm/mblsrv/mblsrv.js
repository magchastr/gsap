var mblsrv = new Mblsrv();

function Mblsrv() {
	var vm = this;
	vm.open = open;
	vm.popupLayer;

	$(document).ready(function() {
		vm.popupLayer = $("#mblsrvPopup");

		$("#inpWebDtcTel, #inpAppDtcTel, #inpAppTel, #inpAppTel", vm.popupLayer).on("input", function() {
			commUtil.fnErrorRemove($(this).attr("id"));
			commUtil.onlyNumber(this);

			var _val = $(this).val();

			if (_val.length > 11) {
				$(this).val(_val.substr(0, 11));
			}
		});

		$("[name=rdoOsDtc], [name=rdoOsDtc]", vm.popupLayer).on("change", function() {
			if (!$(this).closest(".inp-radio-group").next().find(".inp-group").hasClass("error")) {
				$(this).closest(".inp-radio-group").next().find(".inp-desc.error").addClass("hidden");
			}
		});

		// DTC WEB
		$("#btnWebDtc", vm.popupLayer).on("click", function() {
			const telId = "inpWebDtcTel";

			if (validateTel(telId)) {
				const data = {
					dstNo: $(`#${telId}`, vm.popupLayer).val(),
					targetSysDvcd: "1",
					targetBizDvcd: "1",
					targetDevDvcd: ""
				}

				sendSms(data);
			}
		});

		// DTC APP
		$("#btnAppDtc", vm.popupLayer).on("click", function() {
			const telId = "inpAppDtcTel";
			const osName = "rdoOsDtc";

			if (validateOsRadio(osName, telId) && validateTel(telId)) {
				const data = {
					dstNo: $(`#${telId}`, vm.popupLayer).val(),
					targetSysDvcd: "2",
					targetBizDvcd: "1",
					targetDevDvcd: $(`:radio[name=${osName}]:checked`, vm.popupLayer).val()
				}

				sendSms(data);
			}
		});

		// 대표 WEB
		$("#btnWeb", vm.popupLayer).on("click", function() {
			const telId = "inpWebTel";

			if (validateTel(telId)) {
				const data = {
					dstNo: $(`#${telId}`, vm.popupLayer).val(),
					targetSysDvcd: "1",
					targetBizDvcd: "2",
					targetDevDvcd: ""
				}

				sendSms(data);
			}
		});

		// 대표 APP
		$("#btnApp", vm.popupLayer).on("click", function() {
			const telId = "inpAppTel";
			const osName = "rdoOs";

			if (validateOsRadio(osName, telId) && validateTel(telId)) {
				const data = {
					dstNo: $(`#${telId}`, vm.popupLayer).val(),
					targetSysDvcd: "2",
					targetBizDvcd: "2",
					targetDevDvcd: $(`:radio[name=${osName}]:checked`, vm.popupLayer).val()
				}

				sendSms(data);
			}
		});
	});

	function open() {
		init();
		commUtil.openPopup("mblsrvPopup");
	}

	function init() {
		$("input[id^=inp]", vm.popupLayer).val("");
		$(":radio[id^=rdo]", vm.popupLayer).prop("checked", false);

		$(".inp.error, .inp-group.error", vm.popupLayer).removeClass("error");
		$(".inp .inp-desc.error", vm.popupLayer).addClass("hidden");

		$(".tooltip.active", vm.popupLayer).removeClass("active");
	}

	function validateTel(id) {
		if (!gValidator.checkPhoneNo($(`#${id}`, vm.popupLayer))) {
			commUtil.fnErrorMsg(id, "휴대전화번호를 정확히 입력해주세요.");
			$(`#mblsrvPopup #${id}`).focus();

			return false;
		} else {
			commUtil.fnErrorRemove(id);

			return true;
		}
	}

	function validateOsRadio(name) {
		if (!$(`:radio[name=${name}]`, vm.popupLayer).is(":checked")) {
			$(`:radio[name=${name}]`, vm.popupLayer).closest(".inp-radio-group").next().find(".inp-desc.error").text("휴대폰의 OS를 선택해주세요.");
			$(`:radio[name=${name}]`, vm.popupLayer).closest(".inp-radio-group").next().find(".inp-desc.error").removeClass("hidden");
			$(`:radio[name=${name}]`, vm.popupLayer).eq(0).focus();

			return false;
		} else {
			$(`:radio[name=${name}]`, vm.popupLayer).closest(".inp-radio-group").next().find(".inp-desc.error").addClass("hidden");

			return true;
		}
	}

	function sendSms(data) {
		commUtil.callAjaxData("/comm/mblsrv/ajaxSndSMS.do", data, $.noop, ({ item }) => {
			if (item.retCd === "Y") {
				commUtil.alert("알림", "입력하신 번호로 모바일웹 url 안내문자가 발송되었습니다.", () => {
					init();
					$(".tooltip.active .btn-tooltip-close", vm.popupLayer).click();
				});
			}
		});
	}
}