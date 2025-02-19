$(function(){

	'use strict';

	let uiDbd = {};
	window.uiDbd = uiDbd;

	// [12-28] 브라우저 스크롤 감지
	const scrObserver = new ResizeObserver(entries => {
		const winW = $(window).outerWidth();
		const docW = $('html').width();

		if( winW > docW ) {
			$('body').addClass('is-scroll');
		}else{
			$('body').removeClass('is-scroll')
		}
	});
	scrObserver.observe(document.body);


	// header
	if( $('#header').length ) {
		const $html = $('html');
		const $header = $('#header');
		const $gnb = $('.gnb-menu');
		const $gnbBtn = $gnb.find('.gnb-item > a');
		const $firstAnchor = $gnb.find('a').first();
		const $lnbLast = $('.header .lnb').last().find('a').last();

		headerVar();

		if($header.hasClass('header-gnb')){
			// Gnb hover, focus
			$gnbBtn.on('mouseenter focus', function(e){
				const type = (e.type == 'mouseenter') ? 'hover' : 'focus';

				$(this).parent().addClass(type).siblings().removeClass('hover focus');
			})

			$gnb.on('mouseleave blur', function(){
				$('.gnb-item').removeClass('hover focus');
			});

			// 첫번쨰 a 요소에서 focus out 시 lnb hide
			$firstAnchor.on('blur', function(e) {
				setTimeout(function() {
					const $focusElement = $(document.activeElement);
					const isParentGnb = $focusElement.closest('.gnb').length;

					if(!isParentGnb) {
						const $focusGnbItem = $gnb.find('.gnb-item.focus');
						$focusGnbItem.removeClass('focus');
					}
				}, 1);
			});

			// lnb 마지막 요소에서 focus out 시, lnb hide
			$lnbLast.on('blur', function(e){
				$(this).parents('.gnb-item').removeClass('hover focus');
			});
		}

		// 장기 > 보험료 계산 > CM 알릴사항 높이 감지
		if( $('#header .top-banner').length ) {
			const $topBann = $('#header .top-banner');
			const elObserver = new MutationObserver((mutations) => {
				headerVar();
			});

			elObserver.observe($topBann[0], { attributes: true, childList: true, characterData: true });
		}

		function headerVar(){
			let _headerH = `${($header.outerHeight() * 0.1).toFixed(2)}rem`;
			$html.css('--header-h', _headerH);
		}
	}

	// popup close
	// .btn-close.disabled의 경우 팝업 닫기 예외
	$(document).on('click', '.popup-wrap .popup-close .btn-close:not(.disabled), .popup-wrap .popup-footer .btn-close:not(.disabled)', function(e){
		e.preventDefault();
		const $popup = $(this).closest('.popup-wrap');

		if(!$popup.hasClass('open')) return;

		$(this)._popup('close');
	});

	// tooltip 열기
	$('.btn-tooltip').off('click.tooltip').on('click.tooltip', function(e){
		e.preventDefault();
		const isActive = $(this).closest('.tooltip').hasClass('active');
		$('.tooltip').removeClass('active');
		$(this).closest('.tooltip')._toggle('active', isActive);
		$(this).closest('.tooltip').find('.tooltip-cont-body').attr('tabindex', '0');
		$(this).closest('.tooltip').find('.tooltip-cont-body').focus();
	});

	// tooltip 닫기
	$('.btn-tooltip-close').on('click', function(e){
		e.preventDefault();
		$(this).closest('.tooltip').removeClass('active');
		$('.tooltip').find('.tooltip-cont-body').attr('tabindex', -1);
		$(this).closest('.tooltip').find('.btn-tooltip').focus();
	})

	// tooltip attr title 추가
	$('.btn-tooltip').add('.btn-tooltip-close').each(function(idx, el) {
		$(el).attr('title', $(el).attr('aria-label'));
	});

	// tab (이벤트 호출 예외)
	const tabList = $('.tab-list').not('[data-none-tab="true"]');
	const tabLine = $('.tab-line').not('[data-none-tab="true"]');
	const tabBox = $('.tab-box').not('[data-none-tab="true"]');

	if(tabList.length || tabLine.length || tabBox.length){
		tabList._tab();
		tabLine._tab();
		tabBox._tab();
	}

	// accordion
	const $baseAccr = $('.base-acc');
	if( $baseAccr.length ) {
		$baseAccr.each(function(){
			const $this = $(this);

			$this.find('.base-acc-item').eq(0).addClass('active');
			$this._accordion({
				clickEl: '.base-acc-tit',
				content: '.base-acc-cont',
				active: '.base-acc-item'
			})
		});
	}

	// table caption add
	const $table = $('.table');
	if( $table.length ) {
		$table._addCaption();
	}

	// slide
	const $swiper = $('.swiper');
	if( $swiper.length ){
		$swiper._slide();
	}

	// select
	const $select = $('select');
	if( $select.length ){
		$select._select();
	}

	// input type = file title="파일찾기" 제공
	const $inputFile = $('input[type=file]');
	if( $inputFile.length ){
		$inputFile.each(function(){
			$(this).attr('title', '파일찾기')
		})
	}

	// skip-nav #gnb 클릭시 gnb 사이트맵 오픈
	const $skipGnb = $('a[href="#gnb"]');
	$skipGnb.on('click', function(){
		const $gnbAllmenu = $('.gnb-all-menu');
		$gnbAllmenu.focus();
	});

	// input del
	$(document).on('focusin', '.inp', function(e){
		const $this = $(this);
		const $inpText = $this.find('.inp-text');
		const isReadonly = $inpText.prop('readonly');

		if(!$inpText.length || isReadonly) return;

		const isValue = $inpText.val().length > 0;
		const $inpDel = $inpText.next('.inp-del');

		$this.addClass('focusin');
		isValue
			? $inpDel.css('display', 'block')
			: $inpDel.css('display', 'none');
	})
	.on('focusout', '.inp', function(e){
		const $this = $(this);
		const $inpText = $this.find('.inp-text');

		if(!$inpText.length) return;

		const isValue = $inpText.val().length > 0;
		const $inpDel = $inpText.next('.inp-del');

		$this.removeClass('focusin');
		setTimeout(function() {
			!$this.hasClass('focusin')
				? $inpDel.css('display', 'none')
				: isValue && $inpDel.css('display', 'block');
		}, 1);
	})
	.on('focus keyup', '.inp-text', function(e){
		const $this = $(this);
		const $inp = $this.closest('.inp');
		const hasFocusinClass = $inp.hasClass('focusin');
		const isValue = $this.val().length > 0;
		const $inpDel = $this.next('.inp-del');
		const isReadonly = $this.prop('readonly');

		if(isReadonly) return;

		hasFocusinClass && isValue
			? $inpDel.css('display', 'block')
			: $inpDel.css('display', 'none');
	})
	.on('mousedown click', '.inp .inp-del', function(e){
		const $this = $(this);
		const $inpText = $this.prev('.inp-text');

		$inpText.val('');
		setTimeout(() => $inpText.focus(), 1);
	});

    $(document)
    // select 및 option 외의 영역.
    .on("click.notSelect", function(e) {
        if("BUTTON" == e.target.nodeName) {
            e.preventDefault();
        }

        let selObj = $(e.target).closest("div.inp-group");
        if(!selObj.length) {
            $("div.inp-group.active")._selectActive(false);
        }
    })
    ._btnSelGrtCommEvt();

/*
	// input select list
	$(document).on('keydown click', '.inp-group .inp-select-list button', function (e) { // select list의 버튼
		// 마지막 버튼의 포커스가 영역 밖으로 빠졌을 때 select 닫음
		const $this = $(this);
		const $inp = $this.closest('.inp-group');
		const $parent = $this.closest('.inp-select-list li');
		const len = $inp.find('.inp-select-list li').length - 1;
		const idx = $parent.index();

		if ( idx == len && e.keyCode == 9 ) {
			$inp._selectActive(false);

			if (e.shiftKey) {
				$inp._selectActive(true);
			}
		}

		if( e.type == 'click') {
			$inp._selectActive(false, true);
		}

		$parent.siblings().find('button').attr('title', '');
		$this.attr('title', '선택됨');
	})
	.on('keydown', '.inp-group.active .inp-select', function (e) { // select 버튼
		// 버튼의 포커스가 영역 밖으로 빠졌을 때 select 닫음
		const $inp = $(this).closest('.inp-group');
		if ( e.shiftKey && e.keyCode == 9 ) {
			$inp._selectActive(false);
		}
	})
	.on('click', '.inp-select', function(){ // select open [12-15]: 동적생성 대응
		const $this = $(this);
		const $parent = $this.closest('.inp-group');
		const $elseParent = $('.inp-select').not($this).closest('.inp-group');
		const isActive = $parent.hasClass('active');

		$elseParent._selectActive(false); // select가 이중으로 열릴 때 선택 이외에는 닫힘

		if( isActive ){
			$parent._selectActive(false);
		}else{
			$parent._selectActive(true);
		}

	})
	.on('click', function (e) {
		const $inp = $(e.target).closest('.inp-group');

		if(!$inp.length) {
			$('.inp-group.active')._selectActive(false);
		}
	});
*/
	// 청약 공통 상품안내 > anchor click
	$(document).on('click', '.anchor-list a', function(e) {
		e.preventDefault();
		const $this = $(this);
		const _target = $this.attr('href');
		const headerH = $('.header').outerHeight();
		let tabH = 0;
		let thisPos = 0;

		if( $this.closest('.popup-wrap').length ) {
			tabH = $this.closest('.popup-wrap').find('.tab-list').outerHeight();
			thisPos = $(_target).position().top + tabH;

			$(_target).closest('.popup-main')._ani({duration: 0.5, scrollTo: thisPos});
		} else {
			tabH = $this.closest('#content').find('.tab-list').outerHeight();
			thisPos = $(_target).offset().top - headerH;

			$('html, body')._ani({duration: 0.5, scrollTo: thisPos});
		}
	});

	// * 표시 title="필수항목" 제공
	const $dotRed = $('.dot-red');
	if( $dotRed.length ) {
		$dotRed.attr('title', '필수항목');
	}

	// chking-group/chking-grid-group button.active title="선택됨" 제공
	const $chkingGridButtons = $('.chking-group .btn-round.active, .chking-grid-group .btn-round.active');
	if( $chkingGridButtons.length ) {
		$chkingGridButtons.attr('title', '선택됨');
	}

	// chking-grid-group/chking-group button 클릭 시 title="선택됨" 제공
	$(document).on('click', '.chking-group .btn-round, .chking-grid-group .btn-round', function(e) {
		const $this = $(this);
		const $siblingButtons = $(this).siblings();

		$siblingButtons.attr('title', '');
		$this.attr('title', '선택됨');
	});

	// 적용된 담보 보험료 확인 페이지 - 등호 대체 텍스트 추가
	const $insuranceFeeInfo = $('.insurance-fee-info');
	if( $insuranceFeeInfo.length ) {
		const $infoBox = $insuranceFeeInfo.children('.info-box');
		const $before = $infoBox.children('.before');
		const $after = $infoBox.children('.after');

		if( $before.length ) $before.after('<span class="blind">빼기</span>');
		if( $after.length ) $after.after('<span class="blind">합계</span>');
	}
});

// prototype
$.fn.extend({
	_accordion: function(options){
		return this.each(function(){
			const opt = $.extend({
				clickEl: '',
				content: '',
				active: '',
				activeClass: 'active',
			}, options);

			const $this = $(this);

			// 동적 생성시 faq 있으면 title 속성 제공
			addAccordionTitle();

			$(document)
			.off('click.accordion', opt.clickEl) // accordion이 한 화면에 두개 이상 있을 경우 event remove
			.on('click.accordion', opt.clickEl, function(e){
				e.preventDefault();

				const $clickEl = $(this);
				const $parentWrap = $clickEl.closest('.base-acc');
				const $parent = $clickEl.closest(opt.active);
				const $otherConts = $parent.siblings();
				const $cont = $parent.find(opt.content);

				if( $parent.hasClass(opt.activeClass) ){
					$cont.css('display', 'block').slideUp(250);
					$parent.removeClass('active');
					ariaExpanded($parentWrap);
				}else{
					$otherConts.find(opt.content).slideUp(250);
					$cont.slideDown(250, function() {
						$otherConts.removeClass('active');
						ariaExpanded($parentWrap);
					});
					$parent.addClass('active');
				}
			});

			ariaExpanded();

			function ariaExpanded($parentWrap){
				// 접근성
				if(!$parentWrap) $parentWrap = $this;

				const hasClassBaseAccTit = $parentWrap.hasClass('base-acc-tit');
				const hasClassNotiAccTit = $parentWrap.hasClass('noti-acc-tit');

				if(hasClassBaseAccTit) $parentWrap = $parentWrap.closest('.base-acc');
				if(hasClassNotiAccTit) $parentWrap = $parentWrap.closest('.noti-acc');

				$parentWrap.find(opt.active).each(function(i){
					const $btn = $(this).find(opt.clickEl);

					if($(this).hasClass('active')) {
						$btn.attr('title', '접기');
						$btn.attr('aria-expanded', true);
					}else{
						$btn.attr('title', '펼치기');
						$btn.attr('aria-expanded', false);
					}
				});
			}
		});
	},
	_toggle: function(_class, condition){
		return this.each(function(){
			const $this = $(this);

			if(condition) {
				$this.removeClass(_class);
			}else{
				$this.addClass(_class);
			}

		});
	},
	_tab: function(options){
		return this.each(function(){
			const tabList = $(this);
			const $tab = tabList.parent();
			const tabListBtn = tabList.find('li button');
			const tabListActive = tabList.find('li.active');
			let tabListLi, tabIndex;
			const opt = $.extend({
				idx: tabListActive.index(),
			}, options);

			//tab active setting
			// tabDetailActive($tab, tabListActive, tabListActive.index());
			if( tabListActive.index() != opt.idx ){
				tabList.find('li').eq(opt.idx).addClass('active').siblings().removeClass();
			}
			tabDetailActive($tab, tabListActive, opt.idx);

			//tab active
			$(document)
            .off('click.tab', '.tab-list li button')
            .on('click.tab', '.tab-list li button', function(e){
				if( e.namespace == 'tab') return false;
				const $tab = $(this).closest('.tab-list').parent();
				const isPopup = $tab.closest('.popup-wrap').length;
				const isSticky = ($tab.css('position') == 'sticky') ? true : false;
				const $scrBox = (isPopup) ? $tab.closest('.popup-main') : $(window);

				if( isSticky ){
					$scrBox.scrollTop(0);
				}

				tabListLi = $(this).parents('li');
				tabIndex = tabListLi.index();

				tabListLi.addClass('active').siblings().removeClass();
				tabListLi.siblings().children('button').removeAttr('title');
				tabDetailActive($tab, tabListLi, tabIndex);

			});

			//tab-line scroll
			let tabListWidth = 0, hasScroll;

			tabListBtn.each(function(idx, el){
				tabListWidth += $(this).outerWidth();
			});

			hasScroll = $tab.hasClass('tab-line') ? $tab.outerWidth() < tabListWidth : false;

			if(hasScroll){
				tabList.closest('.tab-line').addClass('is-scroll');
				tabList.on('scroll', function(){
					let scrollLeft = $(this).scrollLeft();

					if(scrollLeft > 10) {
						$tab.addClass('scroll');
					} else{
						$tab.removeClass('scroll');
					}
				});
			}

			function tabDetailActive($this, tabListLi, tabIndex){
				const tab = tabListLi.closest($this);
				const button = tabListLi.children('button');
				const tabContWrap = tab.siblings('.tab-cont-wrap');
				const tabCont = tabContWrap.children('.tab-cont');
				const tabAllCont = $this.siblings('.tab-cont-wrap').children('.tab-cont');
				let tabChild, tabChildActiveIndex, tabChildCont;

				button.attr('title', '선택됨');
				tabAllCont.removeClass('active');
				tabCont.eq(tabIndex).addClass('active');

				tabChild = tabContWrap.find('> .tab-cont.active .tab-box');
				tabChildActiveIndex = tabChild.find('li.active').index();
				tabChildCont = tabChild.siblings('.tab-cont-wrap').children('.tab-cont');

				if(tabChild.length){
					tabChildCont.eq(tabChildActiveIndex).addClass('active');
				}
			}
		})
	},
	_slide: function(options){
		return this.each(function(){
			const opt = $.extend({
				slidesPerView: 'auto',
				spaceBetween: 20,
				centerdSlides: true,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				keyboard: true,
				// 접근성 a11y
				a11y: {
					enabled: true,
					containerMessage: "슬라이드",
					containerRoleDescriptionMessage: "carousel",
					prevSlideMessage: "이전 슬라이드",
					nextSlideMessage: "다음 슬라이드",
					slideLabelMessage: "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드",
					firstSlideMessage: "첫번째 슬라이드",
					lastSlideMessage: "마지막 슬라이드",
					itemRoleDescriptionMessage: "slide",
					slideRole: "group",
					paginationBulletMessage: "{{index}}번째 슬라이드로 이동",
				},
				on: {
					init() {
						const $pagination = $(this.pagination.el);

						// clickable: true로 하여도 swiper pagination bullets keydown event 가 발생하지 않는 경우
						// 부모요소에 keydown event 위임
						if($pagination.length) {
							$pagination.off('keydown').on('keydown', function(e) {
								const $target = $(e.target);
								const index = $target.index();
								const { key } = e;

								if(key === 'Enter') {
									swiper.slideTo(index, 300);
								}
							});
						}
					}
				}
			}, options);

			// 이미 선언되어 있는 swiper destroy
			if( $(this).data('slide') ) $(this).data('slide').destroy();

			// swiper 선언
			// pagination clickable false 값으로 넘어와도 강제로 true (모두 동일하게 수정)
			// const swiper = new Swiper(this, opt);
			const newOpt = {...opt, pagination: { ...opt.pagination, clickable: true }};
			const swiper = new Swiper(this, newOpt);
			const nextBtn = $(swiper.el).find('.swiper-button-next').length ? $(swiper.el).find('.swiper-button-next') : $(swiper.el).find(opt.navigation.nextEl);
			const prevBtn = $(swiper.el).find('.swiper-button-prev').length ? $(swiper.el).find('.swiper-button-prev') : $(swiper.el).find(opt.navigation.prevEl);
			const slideLength = swiper.slidesGrid.length;
			const buttonKeydownAction = (e, type) => {
				const { key } = e;
				const nodeName = e.target.nodeName;
				const isDisabled = $(this).attr('aria-disabled') === 'true' ? true : false;

				// button 제외 div 형식만 클릭이베트 발생
				if(isDisabled || nodeName !== 'DIV') return;
				if(key === 'Enter' || key === ' ') {
					type === 'next' ? swiper.slideNext() : swiper.slidePrev();
				}
			}

			$(this).data('slide', swiper);
			nextBtn.off('keydown').on('keydown', e => buttonKeydownAction(e, 'next'));
			prevBtn.off('keydown').on('keydown', e => buttonKeydownAction(e, 'prev'));

			// slide 하나면 swiper-btn, nextbtn, prevbtn 안보이게

			if(slideLength === 1) {
				const btnWrap = $(this).find('.swiper-btn-wrapper');
				btnWrap.add(nextBtn).add(prevBtn).css('display', 'none');
			} else {
				const btnWrap = $(this).find('.swiper-btn-wrapper');
				btnWrap.add(nextBtn).add(prevBtn).css('display', '');
			}

			// 자동롤링이 있으면 클릭 이벤트 추가
			if( swiper.autoplay.running ) {
				const $playBtn = $(this).find('.swiper-play-control');

				$playBtn.off('click').on('click', function(e) {
					e.stopPropagation();

					let pressState = $(this).attr('aria-pressed');

					if (pressState == 'true') {
						$(this).attr('aria-pressed', false);
						$(this).find('.blind').text('일시정지');
						swiper.autoplay.start();
					} else {
						$(this).attr('aria-pressed', true);
						$(this).find('.blind').text('재생');
						swiper.autoplay.stop();
					}
				});
			}
		})
	},
	_aniSet: function(options){
		return this.each(function(){
			const $this = $(this);
			const opt = $.extend({}, options);

			gsap.set($this, opt);
		})
	},
	_ani: function(options){
		return this.each(function(){
			const $this = $(this);
			const opt = $.extend({}, options);

			gsap.to($this, opt);
		})
	},
	_aniToggle: function(options){
		return this.each(function(){
			const $this = $(this);
			const opt = $.extend({
				from: {},
				to: {}
			}, options);

			gsap.fromTo($this, opt.from, opt.to);
		})
	},
	_popup: function(state, options){
		return this.each(function(){
			const $this = $(this);
			const $wrap = $this.closest('.popup-wrap');
			const $content = $wrap.find('.popup');
			const $main = $content.find('.popup-main');
			const opt = $.extend({
				init: function(){},
				onEnd: function(){},
			}, options);

			if(state == 'open') {
				$wrap._ani({duration: 0, display: 'block', onComplete: () => {
					// 동적 생성시 테이블 있으면 table caption 추가
					if( $content.find('.table').length ) {
						$content.find('.table')._addCaption();
					}

					// 동적 생성시 faq 있으면 title 속성 제공
					addAccordionTitle();

					$wrap.addClass('open');
					toggleElementAttr(['#skip-nav', '#header', '#wrap', '#footer', '.quick-menu'], true);

					// 낮은 순
					const zIndexLowOrderOpenPopups = $('.popup-wrap.open:not(.basic-loading-wrap, .loading-wrap)')
						.sort((a, b) => {
							if(parseInt($(a).css('z-index')) === parseInt($(b).css('z-index'))) {
								return $(a).index() - $(b).index();
							}

							return parseInt($(a).css('z-index')) - parseInt($(b).css('z-index'));
						});

					if(zIndexLowOrderOpenPopups.length > 1) {
						for(let i = 0; i < zIndexLowOrderOpenPopups.length; i++) {
							if(i !== zIndexLowOrderOpenPopups.length - 1) {
								toggleElementAttr($(zIndexLowOrderOpenPopups[i]), true);
							}
						}
					}

					// #wrap안에 팝업이 존재할 경우
					if( $(this).attr('tabindex') < 0) {
						$(this).removeAttr('aria-hidden tabindex');
						$(this).find('*').removeAttr('aria-hidden tabindex');

						// 부모 요소 aria-hidden 제거 (접근성 이슈)
						const parents = ['form', 'section.contents', '.contents-inner', 'main'];
						for(const parent of parents) {
							const $parent = $(this).closest(`${parent}`);
							const isParent = $parent.length;

							if(isParent) {
								$parent.removeAttr('aria-hidden');
							}
						}
					}

					// popup-main 초점이동
					$main.attr('tabindex', '0');
					$main.focus();

					// popup 콜백이벤트
					opt.onEnd.call($this);

					if( !$wrap.hasClass('basic-loading-wrap') ){
						scrLock();
					}
				}});

				if(!window.uiDbd.focusBtnArr) {
					window.uiDbd.focusBtnArr = [];
				}

				window.uiDbd.focusBtn = opt.prevBtn;
				window.uiDbd.focusBtnArr.push(opt.prevBtn);
			}

			if( state == 'close' ) {

				// 높은순
				const zIndexHighOrderOpenPopups = $('.popup-wrap.open:not(.basic-loading-wrap, .loading-wrap)')
					.sort((a, b) => {
						if(parseInt($(b).css('z-index')) === parseInt($(a).css('z-index'))) {
							return $(b).index() - $(a).index();
						}

						return parseInt($(b).css('z-index')) - parseInt($(a).css('z-index'));
					});

				if(zIndexHighOrderOpenPopups[1]) {
					toggleElementAttr($(zIndexHighOrderOpenPopups[1]), false);
				}

				$wrap.removeClass('open');
				$wrap._ani({duration: 0, opacity: '0', onComplete: () => {
					$wrap.removeAttr('style').removeClass('open');

					const tempBtn = window.uiDbd.focusBtnArr?.pop();
					const $openPopups = $('.popup-wrap.open:not(.basic-loading-wrap, .loading-wrap)');
					if($openPopups.length === 0) {
						toggleElementAttr(['#skip-nav', '#header', '#wrap', '#footer', '.quick-menu'], false);
					}

					$('body').attr('tabindex', '-1');
					// focusBtn 값이 없거나 document 일때
					if(window.uiDbd.focusBtn === document || !window.uiDbd.focusBtn) {
						window.uiDbd.focusBtn = document.body;

						if(tempBtn) {
							$(tempBtn).focus();
						} else {
							$(window.uiDbd.focusBtn).focus();
						}
					} else {
						$(window.uiDbd.focusBtn).focus();
					}

					$('body').removeAttr('tabindex');
					// opt.onEnd.call($this, window.uiDbd.focusBtn);
					const focusBtn = tempBtn || window.uiDbd.focusBtn;
					opt.onEnd.call($this, focusBtn);
					window.uiDbd.focusBtn = null;

					isOpen = $('.popup-wrap:not(.basic-loading-wrap,.loading-wrap)').hasClass('open');
					if( !$wrap.hasClass('basic-loading-wrap') ){
						scrUnlock(isOpen);
					}

					$main.removeAttr('tabindex');
				}});
			}

			// 요소 속성값 토글(tabindex, aria-hidden)
			function toggleElementAttr(targets, toggle) {
				const elems = targets;

				for(const elem of elems) {
					const $elem = $(elem);

					if($elem.length) {
						const $child = $elem.find('*');

						if(toggle) {
							$child.attr({'aria-hidden': 'true', 'tabindex': '-1'})
						} else {
							$elem.removeAttr('aria-hidden tabindex');
							$child.removeAttr('aria-hidden tabindex');
						}
					}
				}
			}

			function scrLock(){
				$('body').addClass('body-lock');
			}

			function scrUnlock(open){
				if( open ) return false;
				$('body').removeClass('body-lock')
			}
		})
	},
	_toast: function(state){
		return this.each(function(){
			const $this = $(this);

			if(state == 'open') {
				$this.addClass('open');
			}
			if(state == 'close') {
				$this.removeClass('open');
			}
		})
	},
	_addValue: function(_text){
		return this.each(function(){
			const $this = $(this);
			$this.find('.text-value').text(_text);
			$this.addClass('value');
		});
	},
	_selectActive: function(bool, attr){ // selector는 .inp-select의 부모인 .inp-group
		return this.each(function(){
			const $this = $(this);
			const $selectBtn = $this.find('.inp-select');
			const $selectList = $this.find('.inp-select-list');
			const isParentPop = $this.closest('.popup-wrap').length;
			const $popupScr = $this.closest('.popup-main');

			if( bool ){
				!attr && $this.addClass('active');
				$selectBtn.attr('aria-expanded', true);
				$selectList.scrollTop(0);

				if( isParentPop ){
					// $popupScr.css('overflow', 'hidden');
					$this.closest('.popup-inner').css('--popup-scr', $popupScr.scrollTop()).addClass('popup-lock');
				}
			}else{
				!attr && $this.removeClass('active');
				$selectBtn.attr('aria-expanded', false);

				if( isParentPop ){
					// $popupScr.css('overflow', '');
					$this.closest('.popup-inner').removeClass('popup-lock');
				}
			}
		});
	},
	_addCaption: function(options){
		return this.each(function(){
			const $this = $(this);
			const $tables = $this.find('table');

			$tables.each(function(i, v){
				const $tables = $(v);
				const texts = getTableTexts($tables);
				const title = getTableTitle($tables);

				if(texts !== null) {
					const captionText = `${texts !== '' ? texts + ' (으)로 구성된': ''} ${title !== '' ? `'${title}' 에 대한` : ''}  표`;
					const $caption = $(document.createElement('caption'));

					$caption.text(captionText);
					$tables.prepend($caption);
				}
			});

			function getText(elem){
				return $(elem).contents().not($(elem).children()).text().trim();
			}

			// 테이블 scope 텍스트 가져오기
			function getTableTexts($table) {
				const isCaption = $table.find('caption').length > 0;
				const $elems = [...$table.find('[scope=col]'), ...$table.find('[scope=row]'), ...$table.find('[scope=rowgroup]')];

				// caption 있으면 null 반환
				if(isCaption) return null;

				// 이중 테이블 제외
				const $notEmptyTexts = $elems.filter(v => {
					return getText(v) !== '' && !$(v).closest('td').length > 0
				});

				// 이중 테이블
				const $notEmptyTexts2 = $elems.filter(v => {
					return getText(v) !== '' && $(v).closest('td').length > 0
				});

				return $.map($notEmptyTexts.length > 0 ? $notEmptyTexts : $notEmptyTexts2, v => getText(v)).join(', ');
			}

			// 테이블 타이틀 가져오기
			function getTableTitle($table) {
				const conditions = [
					// prev
					() => { return $table.prevAll('.tit1')},
					() => { return $table.prevAll('.tit2')},
					() => { return $table.prevAll('.tit3')},
					() => { return $table.prevAll('.tit-table')},
					() => { return $table.prevAll('.blind')},
					() => { return $table.prevAll('.title')},
					() => { return $table.prevAll('.title-sm')},
					() => { return $table.prevAll('.title-m')},
					() => { return $table.prevAll('.title-mx')},
					() => { return $table.prevAll('.dot-title')},
					() => { return $table.prevAll('.title-area').find('.tit1')},
					// closest
					() => { return $table.closest('.table').prevAll('.tit2')},
					() => { return $table.closest('.table').prevAll('.title-area').find('.tit1')},
					() => { return $table.closest('.table').find('.sub-title .title-area .tit')},
				];
				let tableTitle = '';

				for(let i = 0; i < conditions.length; i++) {
					const title = getText(conditions[i]());

					if(title !== '') {
						tableTitle = title;
						break;
					}
				}

				return tableTitle ? tableTitle : '';
			}
		});
	},
	_select: function(options){
        return this.each(function(){
            const $select = $(this);
            const opt = $.extend({}, options);

			let $selectBox = null;
            let $selectList = null;
            let $button = null;

            /*
                이벤트 연결 시 js-select 클래스 추가
                동적 생성시 _select() 호출해주시면 js-select 제외하고 연결됩니다.

				오버라이딩(val(), prop() 연결되어 있습니다.)
				- $('<element>').val(<value>)
				- $('<element>').find('option:eq(<index>)').prop('selected', true)
				- $('<element>').prop('selectedIndex', <index>)
            */
            if(!$select.hasClass('js-select')) {
                // button, select list html 생성
                displaySelectList($select, opt);
                // select 추가/삭제 감지
                changeDetectionSelect();
                // select chagne 이벤트
                changeSelect();
            }

            // -------------------------------------------------------------------------------- create HTML(button, select list, error)

            // button html 생성
            function createHTMLButton(){
                const placeholder = getSelectedPlaceholder();
                const selectedText = getSeletedText();
				const $selectedOption = $select.find('option').filter((i, v) => $(v).attr('selected') === 'selected');
                const isSelected = $selectedOption.length > 0;
				const $inpGroup = $select.closest('.inp-group');
                const state = $select.attr('readonly') === 'readonly' ? 'readonly' : '';

				if(state === 'readonly') $inpGroup.addClass('readonly');

				// select readonly 시 button disabled
                return `
                    <button
                        type="button"
                        class="inp-select${isSelected ? '' : ' unselected'}"
                        role="combobox"
                        aria-expanded="false"
                        aria-haspopup="listbox"
                        ${state === 'readonly' ? 'disabled' : ''}
                    >
						<span class="text-value" style="display: flex;">${isSelected ? selectedText : placeholder}</span>
                    </button>`;
            }

            // select list html 생성
            function createHTMLSelectList(){
                const $options = $select.find('option');
				const $selectedOption = $select.find('option').filter((i, v) => $(v).attr('selected') === 'selected');

                return `
                    <ul
                        class="inp-select-list"
                        role="listbox"
                        tabindex="-1"
                    >
                        ${$.map($options, function(option, i) {
                            const $option = $(option);
                            const value = $option.val();
                            const text = $option.text();
							const { unit, desc, badgeText: badge } = getSelectOptionDataset($option);
							const isHidden = $option.attr('hidden') === 'hidden';
							const isDisabled = $option.attr('disabled') === 'disabled';
							const isSelected = value === $selectedOption.val();

                            return `
								<li role="option" class="${isHidden ? 'hidden': ''}" ${isSelected ? 'aria-seleted="true"' : ''}>
									<button
										type="button" class="${isDisabled ? 'disabled ' : ''}${isHidden ? 'hidden ': ''}" ${isDisabled ? 'disabled' : ''} ${isHidden ? 'tabindex="-1"': ''}>
										${text}
										${desc ? `<br><span>${desc}</span>` : ''}
										${unit ? `<small>${unit}</small>` : ''}
										${badge ? `${badge}` : ''}
									</button>
								</li>`;
                        }).join('')}
                    </ul>`;
            }

            // select list dom 추가
            function displaySelectList(){
				const $label = $select.closest('.inp-area').prev('.inp-label').find('label');
                const $inpGroup = $select.closest('.inp-group');
                const button = createHTMLButton();
                const selectList = createHTMLSelectList();
                const $fragment = $(document.createDocumentFragment());

				if($label.length && $select.attr('id')) {
					$label.attr('for', `${$select.attr('id')}`);
				}

				$fragment.append('<div class="select-box"></div>');
                $fragment.find('.select-box').append(button);
                $fragment.find('.select-box').append(selectList);

                $select.addClass('js-select');
                $select.after($fragment);

				$selectBox = $inpGroup.find('.select-box');
                $button = $inpGroup.find('.inp-select');
                $selectList = $inpGroup.find('.inp-select-list');

				// 이벤트 핸들링 연결
                $button.on('click', handleButtonClick);
                $button.on('keydown', handleButtonKeydown);
                $selectList.on('click', handleSelectListClick);
                $selectList.on('keydown', handleSelectListKeydown);
            }

            // -------------------------------------------------------------------------------- button

            // button click 클릭 핸들러
            function handleButtonClick(e){
                e.stopPropagation();

                const isExpaneded = $button.attr('aria-expanded') === 'false' ? false : true;
                isExpaneded ? close() : open();
            }

            // button 키다운 핸들러
            function handleButtonKeydown(e){
                const { key } = e;
                const $lis = $selectList.children();
				const lisLength = $lis.length;
				const controlKeys = ['Home', 'End', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];
                const openKeys = ['Enter' , ' '];
                const isMenuOpen = $selectList.hasClass('show');

                if(!isMenuOpen && openKeys.includes(key)) {
                    e.preventDefault();
                    open();
                }

                if(controlKeys.includes(key)) {
                    e.preventDefault();
                    const index = getIndexFromKey(e);

					if(index === lisLength) return;
					if(index < 0) return;

                    updateSelectListState($lis.eq(index));
                    updateSelectState(index)
                    updateButtonText($lis.eq(index));
                }
            }

            // button aria-expaned 값 수정
            function updateButtonAttrExpanded($expandedButton = null){
                const $targetButton = !$expandedButton ? $button: $expandedButton;
                const isExpaneded = $targetButton.attr('aria-expanded') === 'false' ? false : true;

                $targetButton.attr('aria-expanded', `${!isExpaneded}`);
            }

            // button text 값 수정
            function updateButtonText($target){
                const placeholder = getSelectedPlaceholder();
				const text = $target.find('button').contents().not($target.find('button').children()).text().trim();
				const $small = $target.find('button').find('small');
				const $badge = $target.find('button').find('em[class*=badge]');

                $button.find('.text-value').html(text);

				if($small.length) {
					$button.find('.text-value').find('small').remove();
					$button.find('.text-value').append(` ${$small.get(0)?.outerHTML}`);
				}

				if($badge.length) {
					$button.find('.text-value').find('em[class*=badge]').remove();

					if($badge.length > 1) {
						const badgeText = $.map($badge, function(v, i){
							return $(v).get(0)?.outerHTML;
						}).join('');

						$button.find('.text-value').append(` ${badgeText}`);
					} else {
						$button.find('.text-value').append(` ${$badge.get(0)?.outerHTML}`);
					}
				}

                if(text !== placeholder) $button.removeClass('unselected');
            }

            // -------------------------------------------------------------------------------- select list

            // select list 클릭 핸들러
            function handleSelectListClick(e){
				const openNodeNames = ['LI', 'BUTTON', 'SMALL', 'EM', 'SPAN'];
                const nodeName = e.target.nodeName;
				let $target = $(e.target);

                if((openNodeNames.includes(nodeName) && $target.closest('li'))) {
					if(nodeName !== 'LI') {
						$target = $target.closest('li');
					}

                    updateSelectListState($target);
                    updateSelectState($target.index());
                    updateButtonText($target);

                    if($button.attr('aria-expanded') !== 'false') {
                        close();
                    }
                }
            }

            // select list 키다운 핸들러
            function handleSelectListKeydown(e){
				e.preventDefault();

                const { key } = e;
                const controlKeys = ['Home', 'End', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];
                const closeKeys = ['Tab', 'Escape', 'Enter', ' '];
                const $lis = $selectList.children();
                const lisLength = $lis.length;
                const isMenuOpen = $selectList.hasClass('show');
                const index = getIndexFromKey(e);

                if(closeKeys.includes(key)){
                    close();
                    return;
                }

                if(!controlKeys.includes(key) || index === -1 || index === lisLength) return;

                if(!isMenuOpen) return;

                updateSelectListState($lis.eq(index));
                updateSelectState(index);
                updateButtonText($lis.eq(index));
            }

            // select list 선택된 li 가져오기
            function getSelectedLi(){
                return $selectList.children().filter((i, v) => $(v).attr('aria-seleted') === 'true');
            }

            // select list 선택된 li 인덱스 가져오기
            function getSelectedLiIndex(){
                return $selectList.children().filter((i, v) => $(v).attr('aria-seleted') === 'true').index();
            }

            // 키 값에 의해 변경될 index 값 가져오기
            function getIndexFromKey(e){
                const { key } = e;
                const $lis = $selectList.children();
                const lisLength = $lis.length;
                const selectedLiIndex = getSelectedLiIndex();
				const Upkey = ['Home', 'ArrowUp', 'PageUp'];
				const downKey = ['End', 'ArrowDown', 'PageDown'];
				const findClosestNotDisabledElem = ($target, type) => {
					let $sibling = type === 'up' ? $target.prev() : $target.next();

					while($sibling.length) {
						if(
							$sibling.children('button').attr('disabled') !== 'disabled'
							&& !$sibling.children('button').hasClass('hidden')
						) {
							return $sibling
						}

						$sibling = type === 'up' ? $sibling.prev() : $sibling.next();
					}

					return null;
				}
                let index;

                if(key === 'Home') index = 0;
                if(key === 'End') index = lisLength - 1;
                if(key === 'ArrowUp') index = selectedLiIndex - 1;
                if(key === 'ArrowDown') index = selectedLiIndex + 1;
                if(key === 'PageUp') index = selectedLiIndex - 4 < 0 ? 0 : selectedLiIndex - 4;
                if(key === 'PageDown') index = selectedLiIndex + 4 > lisLength ? lisLength - 1 : selectedLiIndex + 4;

				const $moveLi = $lis.eq(index);
				const isDisabled = $moveLi.children('button').attr('disabled') === 'disabled';
				const isHidden = $moveLi.children('button').hasClass('hidden');
				let $closestSibling;

				// option 내 disabled 존재 하면 가장 가까운 형제 요소로 index 재지정
				if(Upkey.includes(key) && (isDisabled || isHidden)) {
					$closestSibling = findClosestNotDisabledElem($moveLi, 'up');

					if($closestSibling === null) {
						$closestSibling = findClosestNotDisabledElem($moveLi, 'down');
					}

					index = $closestSibling.index();
				}

				if(downKey.includes(key) && (isDisabled || isHidden)) {
					$closestSibling  = findClosestNotDisabledElem($moveLi, 'down');

					if($closestSibling === null) {
						$closestSibling = findClosestNotDisabledElem($moveLi, 'up');
					}

					index = $closestSibling.index();
				}

                return index;
            }

            // select list 선택 값 변경
            function updateSelectListState($target){
                const $selectedLi = getSelectedLi();

				if($selectedLi === $target) return;

                if($selectedLi !== $target){
                    $selectedLi.removeAttr('aria-seleted');
                    $target.attr('aria-seleted', 'true');

                    moveScroll();
                }
            }

            // select list 스크롤 이동
            function moveScroll(){
				const isSelectedLi = getSelectedLi().length > 0;

				if(!isSelectedLi) return;

                const { offsetHeight, offsetTop } = getSelectedLi().get(0);
                const { offsetHeight: offsetHeightSelectList, scrollTop } = $selectList.get(0);
                const isTop = offsetTop < scrollTop;
                const isBottom = offsetTop + offsetHeight > scrollTop + offsetHeightSelectList;

                if(isTop) $selectList.scrollTop(offsetTop);
                if(isBottom) $selectList.scrollTop(offsetTop - offsetHeightSelectList + offsetHeight);
            }

            // select list 열기
            function open(){
                const $openSelectList = $('.inp-select-list').filter((i, v) => $(v).hasClass('show'));
                const isOpenSelectList = $openSelectList.length > 0;

                if(isOpenSelectList) close($openSelectList, $openSelectList.prev('button'));

                updateButtonAttrExpanded();
                $selectList.addClass('show');;
                focus();
            }

            // select list 닫기
            function close($openSelectList = null, $expandedButton = null){
                updateButtonAttrExpanded($expandedButton);
                !$openSelectList ? $selectList.removeClass('show') : $openSelectList.removeClass('show');
                $button.attr('tabindex', '-1').focus();
                $button.removeAttr('tabindex');
            }

            // select list 포커스
            function focus(){
                $selectList.focus();
                moveScroll();
            }

            // -------------------------------------------------------------------------------- select

			// select data 값 가져오기
			function getSelectOptionDataset($target){
				const { unit, desc, badge } = $target.data();
				let badgeText = '';

				if(badge) {
					const isMultiple = badge.split('/').length > 1;

					// badge 1개 이상 처리
					if(isMultiple) {
						const multipleBadge = badge.split('/').map(v => {
							if(v === '') return '';
							const newBadge = `${v.replace(/'/g, '"')}`;
							const { text: dataText, type, mode } = JSON.parse(newBadge);

							return `<em class="badge-${type} badge-${mode}">${dataText}</em>`;
						}).join('');

						badgeText = `${multipleBadge}`;
					} else {
						const newBadge = `${badge.replace(/'/g, '"')}`;
						const { text: dataText, type, mode } = JSON.parse(newBadge);

						badgeText = `<em class="badge-${type} badge-${mode}">${dataText}</em>`;
					}
				}

				return { unit, desc, badgeText }
			}

            // select 선택된 value 값 가져오기
            function getSeletedValue(){
                return $select.find('option:selected').val();
            }

            // select 선택된 text 값 가져오기
            function getSeletedText(){
                const $selectedOption = $select.find('option:selected');
				const { unit, badgeText: badge } = getSelectOptionDataset($selectedOption);
				const text = $selectedOption.text();

				if(badge) return `${text} ${badge}`;
				if(unit) return `${text} <small>${unit}</small>`;
                return text;
            }

            // select 선택된 index 값 가져오기
            function getSelectedIndex(){
                return $select.find('option:selected').index();
            }

            // select placeholder 값 가져오기
            function getSelectedPlaceholder(){
                const placeholder = $select.attr('placeholder');
                return placeholder ? placeholder : '';
            }

            // select 선택 값 변경
            function updateSelectState(selectedIndex){
				const options = $select.find('option');
                const $selectedOption = $(options.filter((i, v) => $(v).attr('selected') === 'selected'));
                const isSelected = $selectedOption.length > 0;

				if(isSelected) {
					$selectedOption.removeAttr('selected');
				}

                $select.find(`option:eq(${selectedIndex})`).prop('selected', true).attr('selected', 'selected');
            }

            // select 체인지 이벤트 (select에서 동적으로 값 변경 시 change 이벤트 트리거)
            function changeSelect(){
                $select.on('change', function(e){
                    const $target = e.target.nodeName === 'SELECT' ? $(e.target) : $(e.target).closest('select');
                    const $lis = $target.siblings('.select-box').find('.inp-select-list').children('li');
                    const selectedIndex = getSelectedIndex();

                    $select.find('option').removeAttr('selected');
                    $select.find(`option:eq(${selectedIndex})`).attr('selected', 'selected');

                    updateSelectListState($lis.eq(selectedIndex));
                    updateButtonText($lis.eq(selectedIndex));
                });

				$select.on('click', function(e){
					e.stopPropagation();
                    $button.get(0).dispatchEvent(new Event('click'));
                });
            }

            // select 추가/삭제 감지
            function changeDetectionSelect(){
                const observer = new MutationObserver(function(mutations, observer) {
                    mutations.forEach(function(mutation) {
                        const { addedNodes, removedNodes, type } = mutation;
                        const isAddedNodes = addedNodes.length > 0;
                        const isRemovedNodes = removedNodes.length > 0;

                        // 추가/삭제 감지
                        if(type === 'childList' && (isAddedNodes || isRemovedNodes)) {
                            const isAddNodeSelected = mutation.addedNodes[0]?.selected;
                            const $options = $select.find('option');
                            const selectedValue = getSeletedValue();

                            // 추가되는 옵션 selected 있으면 다른 option selected 삭제
                            if(isAddNodeSelected) {
                                const addNodeIndex = $(mutation.addedNodes[0]).index();

                                $select.find('option').each(function(i, v){
                                    if(addNodeIndex !== i) {
                                        $(this).removeAttr('selected');
                                    }
                                });
                            }

							// select list html 재생성
                            const html = $.map($options, function(option, i) {
								const $option = $(option);
								const value = $option.val();
								const text = $option.text();
								const { unit, desc, badgeText: badge } = getSelectOptionDataset($option);
								const isSelected = value === selectedValue;
								const isDisabled = $option.attr('disabled') === 'disabled';

								return `
									<li role="option" ${isSelected ? 'aria-seleted="true"' : ''}>
										<button type="button" ${isDisabled ? 'disabled' : ''} class="${isDisabled ? 'disabled' : ''}">
											${text}
											${desc ? `<br><span>${desc}</span>` : ''}
											${unit ? `<small>${unit}</small>` : ''}
											${badge ? `${badge}` : ''}
										</button>
									</li>`;
                            }).join('');

                            $selectList.html(html);

							const $lis = $select.siblings('.select-box').find('.inp-select-list').children('li');
							const selectedIndex = getSelectedIndex();

							$lis.eq(selectedIndex).trigger('click');
                        }
                    });
                });

                observer.observe($select.get(0), {
                    attributes: true,
                    childList: true,
                    subtree: true,
                });
            }
        });
    },
    // 0. 기본적으로 가급적 기존 코드를 유지하나... 일부 왜 있는것지 모르겠는것들과 이해가 안되는 동작에 대해서는 주석 처리해둠.
    // 1. button으로 구성되어 있어, 영역별로 최종 결과를 가지는 부분을 감싸고 있는 select, 세부항목을 가지는 부분을 option 으로 간주함.
    // 2. button의 경우 기본적으로 submit 속성을 가지기 때문에 중복 동작을 막기위해 기본동작을 막는 e.preventDefault(); 를 기본적으로 사용함.
    // 3. 동적으로 생성하는 페이지에는...해당 이벤트를 동적으로 부여할 필요가 있으며, 개별로 수정은 어려울 것으로 판단하여  $.ajaxPrefilter 를 이용함. (commUtil.js 에 추가)
    //    (기존에 document 에 이벤트를 부여한 이유인 것으로 판단됨. 추가로 뭐가 붙던 document 아래는 동일하게 이벤트가 동작하도록 하기 위함으로 판단)
    // (보류)3-1. callback 말미에 부여할것이기 때문에 ms 10 정도 sleep 을 줌... (commUtil.js 에 추가)
    // 4. 이미 해당 기능은...공통인 ui-common.js 에 일부, 개별 *.js 에 일부 기능이 구현되는 식으로 파편화 되어 있음.
    // 5. select 개별로...임의의 callback 함수를 인자로 받기 위해, $.fn.extend 아래에 확장 형태로...최종 결정함.
    // (보류)6. select 에 해당하는 button 에 뭔가 구분할 수 있는 name 이나 id 가 없음으로...
    //    >> option 에 해당 하는 button 에 name 이나 id 를 차용하도록 해야 하나!?
    // 7. option 에 해당하는 버튼에 값이 없으면서 option 에 해당하는 텍스트가 없거나, 미가입인 경우가 선택값이 없는 경우라고 정의함. (eg: 법률비용지원금)
    // 8. option 에 해당하는 부분만 재생성하는 경우가 있어, select 와 option 을 분리해서 이벤트를 부여함. (eg:법률비용지원금)
    // 8-1. 해당 경우에... button 이 아니라, button 들을 포함하는 ul 에 이벤트를 부여함.
    _btnSelGrtCommEvt: function() {
        return this.each(function() {
            const that = $(this);

            let btnSel = that.find(":button.inp-select");
            let btnOpt;

            // btnSel 이 that 내부에 있다 => 대충 that 이 option 영역까지 포함하는 영역이다라 판단.
            if(!!btnSel.length) {
                btnOpt = btnSel.closest("div.inp-group").find("div.inp-select-list ul");
            }
            else {
                btnOpt = that.find("ul");
            }
/*
                    // 현재는 없으나...이벤트를 제거/재부여 해야 한다면...추가 수정후 사용...
                    if() {
                        $(obj).off("click.select change.select")
                              .closest("div.inp-group.active").find(">:button.inp-select").off("keydown.select").end().end()
                              .closest("div.inp-group").find("div.inp-select-list :button").off("keydown.select click.select");
                    }
*/
            // select에 해당
            if(!!btnSel.length) {
                btnSel = btnSel.filter(function(idx, obj) {
                    let events = $._data(obj, "events");

                    // 1. 이벤트가 없거나, 이벤트가 있는데 클릭 이벤트는 없는 경우.
                    if(!events || (!!events && !events.click)) {
                        return true;
                    }
                    // 2. 이벤트가 있으면서, 클릭 이벤트도 있는 경우에 namespace가 select 가 있는 경우. false, 없는 경우 true
                    else if(!!events && !!events.click) {
                        return !events.click.filter(d => d.namespace === "select").length;
                    }
                    //return false;
                });

                btnSel.each(function(idx, obj) {
                    $(obj).on("click.select", function(e) {
                        e.preventDefault();

                        let selObj = $(this).closest("div.inp-group");
                        let isActive = selObj.hasClass("active");

                        $(":button.inp-select").closest("div.inp-group")._selectActive(false);

                        if(!isActive) {
                            selObj._selectActive(true);
                        }
                    });
                });

/* // 20240614. 프로젝트간 만든 기존 로직. 용도를 모르겠음. 주석 처리함.
                    // 활성화된 select에 해당하는 것 같긴한데... - 이 이벤트는 역활이 머야...???
                    .closest("div.inp-group.active").find(">:button.inp-select").on("keydown.select", function(e) {
                        e.preventDefault();

                        let selObj = $(this).closest("div.inp-group");
                        if(e.shiftKey && 9 == e.keyCode) {
                            selObj._selectActive(false);
                        }
                    }).end().end()
*/
            }

            // option 에 해당
            if(!!btnOpt.length) {
                btnOpt = btnOpt.filter(function(idx, obj) {
                    let events = $._data(obj, "events");

                    // 1. 이벤트가 없거나, 이벤트가 있는데 클릭 이벤트는 없는 경우.
                    if(!events || (!!events && !events.click)) {
                        return true;
                    }
                    // 2. 이벤트가 있으면서, 클릭 이벤트도 있는 경우에 namespace가 select 가 있는 경우. false, 없는 경우 true
                    else if(!!events && !!events.click) {
                        return !events.click.filter(d => d.namespace === "select").length;
                    }
                    //return false;
                });

                btnOpt.each(function(idx, obj) {
    // 20240614. keydown 이벤트가 왜 필요한건가...싶어 주석처리.
                    //.closest("div.inp-group").find("div.inp-select-list :button").on("keydown.select click.select", function(e) {}
                    $(obj).on("click.select", ":button", function(e) {
                        e.preventDefault();

                        let that = $(this);
                        let selObj = that.closest("div.inp-group");
                        let optObj = selObj.find("div.inp-select-list li");
                        let optObjIdx = optObj.index();
                        let optObjLen = optObj.length;

/* // 20240614. keydown 이벤트 제거와...아래..._selectActive 의 경우 2번째인자가 true 이면 active가 빠지지 않으며 접히지 않음으로 주석처리.
                        if(optObjIdx == optObjLen - 1 && 9 == e.keyCode) {
                            selObj._selectActive(false);

                            if(e.shiftKey) {
                                selObj._selectActive(true);
                            }
                        }

                        if("click" == e.type) {
                            selObj._selectActive(false, true);
                        }
*/
                        selObj._selectActive(false);

                        optObj.siblings().find(":button").removeAttr("title");
                        that.attr("title", "선택됨");

                        let optVal = $.trim(that.val());
                        let optTxt = $.trim(that.text());

                        // 선택된 정보를 select에 해당하는 버튼에 update 해주도록 추가.
                        let selBtn = selObj.find(">:button.inp-select");
                        selBtn.val(optVal).data("txt", optTxt).find("span.text-value").text(optTxt);

                        // 법률비용지원금의 경우...button 에 value 가 없는 것으로 확인되어...보완이 필요함에 따라...
                        // option 에 해당하는 버튼에 값이 없으면서 option 에 해당하는 텍스트가 없거나, 미가입인 경우가 선택값이 없는 경우라고 정의함.
                        let isSelected = true;
                        if(!optVal && (!optTxt || "미가입" == optTxt)) {
                            isSelected = false;
                        }

                        if(isSelected) {
                            selObj.addClass("value");
                        }
                        else {
                            selObj.removeClass("value");
                        }

                        // 앞전에 체크박스가 있는 경우(부가담보영역과 같은 경우) - 경우에 따라 개별 callback 으로 빼야...
                        let chkbox = that.closest(".list-check").find(":checkbox");

                        if(isSelected) {
                            let optData = that.data(); // data-anything 의 형태 값이 있으면...

                            // 부가적으로 data 정보가 있다면...
                            if(!!Object.keys(optData).length) {
                                let optDataKey = Object.keys(optData);
                                let optDataVal = Object.values(optData);

                                for(let i = 0, len = optDataKey.length; i < len; i++) {
                                    selBtn.data(optDataKey[i], optDataVal[i]);
                                }

                                // 체크박스에도 update.
                                if(!!chkbox.length) {
                                    for(let i = 0, len = optDataKey.length; i < len; i++) {
                                        chkbox.data(optDataKey[i], optDataVal[i]);
                                    }
                                }
                            }
                        }
                        else {
                            selBtn.removeData();

                            if(!!chkbox.length) {
                                chkbox.removeData();

                                if(chkbox.is(":checked")) {
                                    chkbox.trigger("click");
                                }
                            }
                        }
                        selBtn.trigger("change.select");
                    });
                });
            }
        });
    },
    // 개별 select 영역. 1개에 대해, 필요한 개별 동작을 정의하기 위함.
    // 앞에 물려야할 jQuery 객체는...
    // - 대충 select 에 해당하는 $(":button.inp-select") 이 포함되는 영역 또는 개별 버튼
    //   eg) $("div.inp-group") or $(":button.inp-select").eq(0)
    // - 대충 option 에 해당하는 $("div.inp-select-list :button") 이 포함되는 영역 또는 개별 버튼.
    //   eg) $("div.inp-select-list :button") or $("div.inp-select-list :button").eq(0)
    // 1. 기존 select 에 해당 하는 버튼에...name 이나 id 가 없는 경우가 많음으로...확인됨.
    // 2. button 으로 구성되어 있다 보니, 기존 이벤트들이 option 에 해당하는 button 들에 걸려 있는 경우가 대다수.
    // 3. 이미 이시점엔...option 이 결정되고 select 에 해당하는 button 이 결정된 option 에 대한 정보를 가지고 있음.
    _btnSelGrtEachEvt: function(fnCallback) {
        return this.each(function() {
            const that = $(this);

            let btnSel;
            if("BUTTON" == $.trim(that.attr("type")).toUpperCase()) {
                // select 에 해당하는 button
                if(that.hasClass("inp-select")) {
                    btnSel = that;
                }
                // option 에 해당하는 button
                else if(!!that.closest("div.inp-select-list").length) {
                    btnSel = that.closest("div.inp-group").find(">:button");
                }
            }
            else if("DIV" == $.trim(that.attr("type")).toUpperCase()) {
                btnSel = that.find(":button.inp-select");

                // select 에 해당 하는 button 을 포함하는 영역이 아니면...
                if(!btnSel.length) {
                    btnSel = that.closest("div.inp-group").find(":button.inp-select");
                }
            }

            if(!!btnSel && 1 != btnSel.length) {
                return;
            }

            btnSel = btnSel.filter(function(idx, obj) {
                let events = $._data(obj, "events");

                // 1. 이벤트가 없거나, 이벤트가 있는데 클릭 이벤트는 없는 경우.
                if(!events || (!!events && !events.change)) {
                    return true;
                }
                // 2. 이벤트가 있으면서, 클릭 이벤트도 있는 경우에 namespace가 select 가 있는 경우. false, 없는 경우 true
                else if(!!events && !!events.change) {
                    return !events.click.filter(d => d.namespace === "select").length;
                }
                //return false;
            });

            btnSel.on("change.select", function(e) {
                fnCallback && fnCallback(btnSel);
            });
        });
    }
});

$(function() {
	// quick-menu
	$(".btn-goto").click(function() {
		$('html, body')._ani({duration: 0.3, scrollTo: 0});
	});

	// 보험료 계산
	if($('.plan-area.plan-chk').length > 0){
		let radio;
		let previousTd =$();
		const $trEle = $('.plan-chk .plan-detail-group tr');
		const $tblRadio = $trEle.find('.inp-radio .inp-label');
		const $notSelected = $trEle.not('.not-selected');
		const $thEle = $('.plan-chk .plan-detail-group thead th');
		const $tbEle = $trEle.find('td:not(.th)');

		uiDbd.planHeight = function planHeight(){ // 활성화된 plan높이 계산
			let tblHeight = $('.plan-area').outerHeight() * 0.1 ;
			setTimeout(function(){
				$('html').css('--planHeight', tblHeight + 'rem');
			}, 0);
		}

		$(window).on('load', function(){
			uiDbd.planHeight();
		});

		$tblRadio.on('click', function(event){
			const $radio = $(this);
			const $th = $radio.closest('th');
			const idx = $th.index();

			if(radio) radio.removeClass('on')
			if(previousTd) previousTd.removeClass('on')

			radio = $th;
			$thEle.removeClass('on');
			$tbEle.removeClass('on');
			radio.addClass('on');

			previousTd = $();
			$notSelected.each(function(){
				const $this = $(this);
				const $target = $this.find('td:not(.th)').eq(idx - 1);

				if($target.length > 0 && $target[0].nodeName === 'TD'){
					$target.addClass('on');
					previousTd = previousTd.add($target);
				}
			})

			uiDbd.planHeight();

		})

		$tbEle.on('click', function(event){
			const tdTargetIdx = $(this).index();

			if(!$(event.currentTarget).hasClass('on')){
				$tblRadio
					.eq(tdTargetIdx -1)
					.trigger('click');
			}
		});

		$(document).on('change', '.plan-area thead input', function(){
			const $this = $(this);

			if($this.is(':checked')) {
				$this.siblings('.inp-label').trigger('click');
			}
		});

	}
/*
	// 외부 영역 클릭시 select list 닫힘
    $(document).on('click', function(e) {
        const $target = $(e.target);
        const $openSelectList =  $('.inp-select-list.show');
        const isOpenSelectList = $openSelectList.length > 0;
        const isParentSelectList = $target.closest('.inp-select-list').length > 0;

        if(isParentSelectList || !isOpenSelectList) return;

		const $button = $openSelectList.prev();
		const isExpaneded = $button.attr('aria-expanded') === 'false' ? false : true;

		$button.attr('aria-expanded', `${!isExpaneded}`);
		$openSelectList.removeClass('show');

		$button.focus();
    });
*/
	// select val() 오버라이딩
	const originalVal = $.fn.val;
	$.fn.val = function(){
		const result = originalVal.apply(this, arguments);

		// 값 조회 시
		if(this.is('select')) {
			if($.type(result) === 'string') {
				return result;
			}

			// 값 수정 시 chagne event trigger
			if($.type(result) === 'object') {
				result[0].dispatchEvent(new Event('change'));
			}
		}

		return result;
	}

	// select prop() 오버라이딩
	const originalProp = $.fn.prop;
	$.fn.prop = function(){
		const result = originalProp.apply(this, arguments);

		// prop('selected')
		if(arguments.length === 2 && arguments[0] === 'selected') {
			const isSelected = arguments[1];

			if(isSelected) {
				const selectedOption = this.filter(':selected');

				if(selectedOption.length) {
					this.closest('select').val(selectedOption.val());
				} else {
					return this.closest('select');
				}
			}
		}

		// prop('selectedIndex')
		if(arguments.length === 2 && arguments[0] === 'selectedIndex') {
			const index = parseInt(arguments[1]);

			if(
				!isNaN(index)
				&& Number.isInteger(index)
				&& index >= 0
			) {
				const selectedOption = this.find('option').filter(':selected');

				if(selectedOption.length && this.is('select')) {
					this.closest('select').val(selectedOption.val());
				}
			}
		}

		return result;
	}

	skipMenu('#gnb');
	skipMenu('#footer');
	addAccordionTitle();
});

// skip-menu
function skipMenu(target) {
	if(!$(target).length){
		$(`#skip-nav a[href="${target}"]`).hide();
	}
}

// faq-q title="질문", faq-a title="답변" 제공
function addAccordionTitle() {
	const $faqs = $('.faq-q, .faq-a').filter(function(i, v) {
		return $(v).attr('title') === undefined;
	});

	if($faqs.length) {
		$faqs.each(function(idx, el) {
			const $this = $(el);
			const className = $this.attr('class');

			if(className === 'faq-q') $this.attr('title', '질문');
			if(className === 'faq-a') $this.attr('title', '답변');
		});
	}
}

// 동적으로 생성된 팝업과 같은 경우에 select 에 기본 동작 이벤트를 부여하기 위함.
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    // 뭔가 다 들어와서 .do로 호출되는것만 거름...
    if(/.*\.do/.test(options.url)) {
        let successHandler = originalOptions.success;
        let completeHandler = originalOptions.complete;

        // success함수가 정의되어 있으면 해당 함수 호출 - callback 으로 뭔가 하는게 없다면...
        // 붙일 컨텐츠도 없는 것이라 select 이벤트를 동적으로 부여할 이유도 없다라 판단.
        if(successHandler) {
            // 일부의 경우...successHandler 를 타다 빠져 버리는 것 같아...complete 로 변경.
            options.complete = function(jqXHR, textStatus) {
                completeHandler && completeHandler(jqXHR, textStatus);

                // select 기본 동작 이벤트 부여
                //commUtil.sleep(50, function() { $(document)._btnSelGrtCommEvt(); });
                $(document)._btnSelGrtCommEvt();
            };
        }
    }
});