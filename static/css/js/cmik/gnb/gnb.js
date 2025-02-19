var gnb   = new Gnb();

/* ================ object definitions ================ */
/**
 * radio handler
 */
function Gnb() {
	var vm  = this;
	vm.akc_enable;
	vm.prevKeyword = "";

	/* ================ constant definitions ================ */

	/* ================ variable definitions ================ */

	/* ================ execution codes ================ */

	/* ================ assign functions ================ */

	/* ================ function definitions ================ */

	$(document).ready(function() {
		vm.akc_enable = commUtil.getCookie("akc_enable") == "true";

		$("#header .btn-gnb-search").on("click", function() {
			if ($("#header .gnb-search-box").hasClass("open")) {
				$("#frmGnbSearch").submit();
			} else {
				$("#header .gnb-search-box").addClass("open");
				$("#inpGnbSearch").focus(); //포커스 이동 수정 psm
			}
		});

		$("#btnAkcAble").on("keydown", function(e) { //psm
			if(e.keyCode == 9) {
				e.preventDefault();
				$("#header .btn-gnb-search").focus();
				return;
			}
		});

		$("#header .btn-gnb-search").on("keydown", function(e) { //psm
			if(e.keyCode == 9 && !e.shiftKey) {
				e.preventDefault();
				if ($("#header .gnb-search-box").hasClass("open")) {
					$("#header .gnb-search-box").removeClass("open");
				}
				$('nav .gnb-menu .gnb-item a').eq(0).focus();
			}
		});

		$("#header #inpGnbSearch").on("input focus", function(e) {
			var keyword = $.trim($(this).val());

			if (keyword) {
				openAkc();
			} else {
				closeAkc();
			}

			if (e.type == "input" && vm.akc_enable && keyword != vm.prevKeyword && !/[ㅏ-ㅢㄱ-ㅎ]/.test(keyword)) {
				var data = {
					kwd : keyword
				};

				/*commUtil.callAjaxData(`/inersrh/ajaxAkc.do?kwd=${keyword}`, data, $.noop, ({item}) => {
					if (item.success == "Y") {
						var akc_html = "";

						$.each(item.akc.resultdata, (idx, dataObj) => {
	                        var temp_hilight = dataObj;

	                        temp_hilight = temp_hilight.replace("<em>", "");
	                        temp_hilight = temp_hilight.replace("</em>", "");
							temp_hilight = temp_hilight.replace(keyword, `<em>${keyword}</em>`);

							akc_html += `
								<li>
									<a class="akcList" href="#">${temp_hilight}</a>
								</li>
							`;
	                    });

						$("#header .gnb-search-result ul").html(akc_html);
					}
				}, "N");*/

				vm.prevKeyword = keyword;
			}
		});

		$("#header .akcList").on("click", function(e) {
			e.preventDefault();

			$("#header #inpGnbSearch").val($(this).text());
			$("#frmGnbSearch").submit();
		});

		$("#header .gnb-search-box .btn-search-list").on("click", function() {
			if ($("#header .gnb-search-box").hasClass("active")) {
				$(".btn-search-list span").text("자동완성 열기");
				closeAkc();
			} else {
				$(".btn-search-list span").text("자동완성 접기");
				openAkc();
			}
		});

		$("#header #btnAkcAble").on("click", function() {
			vm.akc_enable = !vm.akc_enable;
			commUtil.setCookie("akc_enable", vm.akc_enable, 365);

			akcInit();
		});

		$("#header").on("click", "*", function(e) {
			if ($(this).closest(".gnb-search").length == 0) {
				closeSearchArea();
			} else {
				return false;
			}
		});

		$("#wrap").on("click", function() {
			closeSearchArea();
		});


        //스토리지교체 작업으로 인한 SSO 링크 제어 2024.07.17 jeon
        if($('#isStorageNotiYn').val() == '1') {
            $("a", $('.gnb')).each(function(item, index) {
                if($(this).attr('href').indexOf($('#idbinsWebUrl').val())>=0) {
                    $(this).attr('href', '#');
                    $(this).attr('target', '');
                    $(this).on("click", function() {
                        sLinkUrl(''); return false;
                    });
                }
            });
        }

		akcInit();
	});

	function akcInit() {
		if (vm.akc_enable) {
			$("#header .search-noti").text("자동 완성 기능이 활성화 상태입니다.");
			$("#header #btnAkcAble span").text("끄기");
			$("#header .gnb-search-result ul").removeClass("hidden");
		} else {
			$("#header .search-noti").text("자동 완성 기능이 비활성화 상태입니다.");
			$("#header #btnAkcAble span").text("켜기");
			$("#header .gnb-search-result ul").addClass("hidden");
		}
	}

	function openAkc() {
		$("#header .gnb-search-box").addClass("active");
		$("#header .gnb-search-box .btn-search-list").attr("aria-select", "true");
	}

	function closeAkc() {
		$("#header .gnb-search-box").removeClass("active");
		$("#header .gnb-search-box .btn-search-list").attr("aria-select", "false");
	}

	function closeSearchArea() {
		if (!$("#header #inpGnbSearch").val()) {
			$("#header .gnb-search-box").removeAttr("style").removeClass("open");
		}

		closeSearchResultArea();
	}

	function closeSearchResultArea() {
		$("#header .gnb-search-box").removeClass("active");
		$("#header .gnb-search-box .btn-search-list").attr("aria-select", "false");
	}
}



