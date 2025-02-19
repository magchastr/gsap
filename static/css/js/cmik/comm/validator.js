/*
 * FILE NAME    : validator.js
 * SYSTEM       : CM 플랫폼 통합 구축
 * DESCRIPTION  : 입력값 검증용 functions
 * AUTHOR       : 81500938
 * HISTORY      :
 *      2016.01.05  김경석 최초작성
 */

/* ================ create instance ================ */
var gValidator     = new Validator();

/* ================ object definitions ================ */
/**
 * validator handler
 */
function Validator() {
    var vm  = this;

    /* ================ constant definitions ================ */
    // 주민번호 문자열 패턴
    vm.REG_NO_PATTERN       = /^\d{6}[1-4]{1}\d{6}$/;
    // 주민번호 검증을 위해 각자리에 곱할 수
    vm.REG_NO_MULTIPLIER    = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];

    // 사업자번호 문자열 패턴
    vm.CORP_REG_NO_PATTERN       = /^\d{10}$/;
    // 사업자번호 검증을 위해 각자리에 곱할 수
    vm.COPR_REG_NO_MULTIPLIER    = [1, 3, 7, 1, 3, 7, 1, 3, 5];

    /** 전화번호 형식 */
    //vm.PHONE_NO_FORMAT    = /(^02.{0}|^01.{1}|[0-9]{3})\-([0-9]{3,4})\-([0-9]{4})/;
    vm.PHONE_NO_FORMAT    = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})/;

    // 날짜형식
    vm.DATE_FORMAT        = /^\d{8}$/;

    // 도메인 패턴
//    vm.DOMAIN_FORMAT      = /^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,6}$/;
    vm.DOMAIN_FORMAT      = /^((?!-)[a-zA-Z0-9-]{1,63}(?!-)\.)+[a-zA-Z]{2,6}$/;

    // 이메일 아이디 패턴
    vm.EMAIL_ID_FORMAT    = /^[a-zA-Z0-9._-]+$/;

    // 이름(한글, 영문, ' ')
    //vm.NAME_FORMAT        = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z\s]*$/;

    // 이름(한글, 영문, ' ', 천지인 키보드 입력) modified : 2021-04-08
    // 모바일 상에서 천지인 입력 처리 위해서, 유니코드 추가
    vm.NAME_FORMAT        = /^[\sa-zA-Zㄱ-ㅎㅏ-ㅣ가-힣ㆍ\u1100-\u1112\u11A2\u3163\u3161\u318D\u119E\u2022\u2025\u00B7\uFE55\u4E10\uFF1A]*$/;

    /* ================ variable definitions ================ */

    /* ================ execution codes ================ */
    // LOG('gValidator created.');

    /* ================ assign functions ================ */
    vm.checkRegNo       = checkRegNo;       // 주민번호 검증
    vm.checkCorpRegNo   = checkCorpRegNo;   // 사업자등록번호 검증
    vm.checkPhoneNo     = checkPhoneNo;     // 전화번호 검증
    vm.isEmpty          = isEmpty;
    vm.checkMinLength   = checkMinLength;

    /* ================ function definitions ================ */
    /**
     * 주민번호 검증
     * @param value : '-' 없이 13자리 숫자
     */
    function checkRegNo(value) {

        if (!vm.REG_NO_PATTERN.test(value)) {
            return false;
        }

        return true;

        // 각자리를 지정된 수로 곱하여 모두 합산.
//        var sum = 0;
//        for (var i = 0; i < vm.REG_NO_MULTIPLIER.length; i++) {
//            var num = Number(value.charAt(i)) * vm.REG_NO_MULTIPLIER[i];
//            sum += num;
//        }

        // 11 - (N % 11) = 마지막자리와 동일.
//        var checksum    = 11 - (sum % 11);
//        if (checksum == value.charAt(12)) {
//            return true;
//        }
//
//        return false;
    }

    /**
     * 사업자번호 검증
     * @param value : '-' 없이 10자리 숫자
     */
    function checkCorpRegNo(value) {

        if (!vm.CORP_REG_NO_PATTERN.test(value)) {
            return false;
        }

        return true;

        // 각자리를 지정된 수로 곱하여 모두 합산.
//        var sum = 0;
//        for (var i = 0; i < vm.COPR_REG_NO_MULTIPLIER.length; i++) {
//            var num = Number(value.charAt(i)) * vm.COPR_REG_NO_MULTIPLIER[i];
//            sum += num;
//        }
//
//        sum += Math.floor(Number(value.charAt(8)) * 5 / 10);
//
//        var checksum    = 10 - (sum % 10);
//        if (checksum == value.charAt(9)) {
//            return true;
//        }
//
//        return false;
    }

    /**
     * 전화번호검증
     */
    function checkPhoneNo(obj) {
        return vm.PHONE_NO_FORMAT.test($(obj).val());
    }

    /**
     * 값이 없으면 true, 있으면 false
     */
    function isEmpty(obj) {
        var val = $.trim(obj.val());
        obj.val(val);

        return val ? false : true;
    }

    /**
     * obj의 value의 앞뒤 공백을 제거한 후 그 길이가 min보다 작으면 false, 그렇지 않으면 true를 반환.
     * @obj 검증대상
     * @min 허용최저값
     */
    function checkMinLength(obj, min) {
        if (min < 1) {
            return true;
        }

        if (isEmpty(obj) || obj.val().length < min) {
            return false;
        }

        return true;
    }

}

/**
 * validator 기본값 설정
 */
$.validator.setDefaults({
    ignore          : '',
    focusInvalid    : true,
    errorClass      : 'error_txt',
    //ignoreTitle      : true,
    errorElement    : 'p',
    errorPlacement  : function (error, element) {
        // 검증항목이 group으로 묶여 있을 경우 하나의 error label(p tag)를 갖는다.
        var groups  = $(this.groups);
        var name    = element.attr('name');
        var catched = false;
        for (var key in groups[0]) {
            var group   = groups[0][key];

            if (group.indexOf(name) > -1) {
                name    = key;
                break;
            }
        }

        // error label의 id 는 'elb_' + name으로 구성한다.
        var errorLabel  = $('#elb_' + name);
        error.appendTo(errorLabel);             // error label에 오류메시지를 출력

        // select의 경우 error focus를 위한 class를 그 parent span tag에 걸어야 한다.
        var tagName = element[0].tagName.toLowerCase();
        if (tagName == 'select' || tagName == 'textarea') {
            element.parent().addClass(this.errorClass);
        }
    },
    success         : function (label, element) {
        // select의 경우 error focus를 위한 class를 그 parent span tag에 걸려 있다.
        var tagName = element.tagName.toLowerCase();
        if (tagName == 'select' || tagName == 'textarea') {
            $(element).parent().removeClass(this.errorClass);
        }

        //LOG('success]' + element.tagName.toLowerCase());

        label.hide();
    }
//    ,
//    submitHandler   : function (form) {
//        // do nothing.
//        return false;
//    }
});

$.validator.addMethod(
    'customdate',
    function (value, element, params) {

        var objValue    = $(element).val();
        objValue = objValue.replace(/[\-\.]/gi, '');  // seperator 제거

        // 날짜형식에 맞지 않음
        if (!gValidator.DATE_FORMAT.test(objValue)) {
            return false;
        }

        var flag        = params['flag'];       // 'before', 'after'
        var target      = params['target'];     // target object
        var unit        = params['unit'];       // 'year', 'month', 'date'
        var value       = params['value'];      // 정수
        var rangeFlag   = params['rangeFlag'];  // 'inclusive', 'exclusive'
        var fromObj     = params['fromObj'];    // 종료일 기준, 시작일 input object

        var targetValue;
        if (!target) {  // 기준이 없으면 현재일자
            targetValue = gfnYyyymmdd();
        } else {
            targetValue = $(target).val().replace(/[\-\.]/gi, '');  // seperator 제거
        }

        // 이전범위
        if (flag == 'before') {
            value   = value * -1;
        }

        var targetDate  = gfnToDate(targetValue);   // to date object
        var limitValue  = gfnYyyymmdd(gfnAddDate(new Date(targetDate.getTime()), value, unit));      // 값에 범위를 더함(뺌)

        // LOG('objValue=' + objValue);
        // LOG('targetValue=' + targetValue);
        // LOG('limitValue=' + limitValue);

        // value(to)가 from보다 작으면 false
        if (fromObj) {
            var fromValue   = $(fromObj).val();
            if (objValue < fromValue) {
                return false;
            }
        }

        switch (flag) {
            case    'before'    :               // 이전시간

                switch (rangeFlag) {
                    case    'inclusive'    :    // 이내
                        if (objValue <= targetValue && objValue >= limitValue) {
                            return true;
                        }

                        return false;

                    case    'exclusive' :       // 이전
                        if (objValue < limitValue) {
                            return true;
                        }

                        return false;
                }

                break;

            case    'after'     :               // 이후시간
                switch (rangeFlag) {
                case    'inclusive'    :        // 이내
                    if (objValue >= targetValue && objValue <= limitValue) {
                        return true;
                    }

                    return false;

                case    'exclusive' :           // 이후
                    if (objValue > limitValue) {
                        return true;
                    }

                    return false;
            }

            break;
        }

        return false;
    }
);


$.validator.addMethod(
    'regex',
    function (value, element, pattern) {
        // LOG('value=' + value + ', pattern=' + pattern);

        return this.optional(element) || pattern.test(value);
    }
);

$.validator.addMethod(
    'equalValue',
    function (value, element, compareValue) {
        return this.optional(element) || value == compareValue;
    }
);

$.fn._old_valid = $.fn.valid;
$.fn.valid  = function (params) {
    var vm  = $(this);
    var isFocus = true;
    if(params != null && params != undefined && params.isFocus != null && params.isFocus != undefined) {
        isFocus = params.isFocus;
    }

    var valid   = vm._old_valid();
    if (!valid) {

        try {
            var tagName = vm[0].tagName.toLowerCase();
            if (tagName == 'select') {
                if(isFocus) {
                    vm.next().focus();
                }
            }

            else {
                if(isFocus) {
                    vm[0].focus();
                }
            }
        } catch (e) {
        }
    }

    return valid;
}
