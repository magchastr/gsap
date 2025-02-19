/*
 * FILE NAME    : native.js
 * SYSTEM       : CM 플랫폼 통합 구축
 * DESCRIPTION  : Native Bridge Interface
 * AUTHOR       : 81500835
 * HISTORY      :
 *    2015.12.28  최초작성
 */
'use strict';
var native = (function(jQuery) {
    var self = {};

    var PackageName = 'com.dongbudirect.cm',
        AppScheme = 'dbcmapp',
        InterfaceServiceName = 'dbcmPlugin',
        NativeCallbackMethod = 'native.callback',
        SpassUserId = '__SPASS_BIND_FREE_AUTH__';
        ;

    // iOS 단말기 여부
    self.isIos = (function(userAgent) {
        return /iphone|ipad|ipod/.test(userAgent);
    })(navigator.userAgent.toLowerCase());

    // Android 단말기 여부
    self.isAndroid = (function(userAgent) {
        return /android/.test(userAgent);
    })(navigator.userAgent.toLowerCase());

    self.isChrome = (function(userAgent) {
        return self.isAndroid ? /chrome/.test(userAgent) : false;
    })(navigator.userAgent.toLowerCase());

    self.isKitkat = (function(userAgent) {
        return /android 4.4/.test(userAgent);
    })(navigator.userAgent.toLowerCase());

    self.isKakaoTalk =  (function(userAgent) {
        return /kakaotalk/.test(userAgent);
    })(navigator.userAgent.toLowerCase());

    // 모바일 앱 실행환경 여부, 홈페이지유입경로구분코드(1:홈페이지, 2:모바일, 3:모바일앱)
    try {
        self.isDeviceLocal = window.sessionStorage.getItem(AppScheme);
        self.isDevice = (self.isDeviceLocal || (hpgIflwRutDvcd != undefined && hpgIflwRutDvcd == '3')) ? true : false;
        self.isDevice && window.sessionStorage.setItem(AppScheme, true);
    } catch (e){
        self.isDevice = false;
    }

    //삼성패스지원단말해당여부
    self.isSpassDevice = (function(userAgent) {
        var isResult = false;
        try {
            if(supportedDeviceList != null && supportedDeviceList != undefined) {
                if(self.isAndroid || self.isChrome) {
                    for (var i = 0 ; i < supportedDeviceList.length ; i++) {
                        if (userAgent.toUpperCase().indexOf(supportedDeviceList[i]) >= 0) {
                            isResult = true;
                            break;
                        }
                    }
                }
            }
        }
        catch(e) {
            isResult = false;
        }

        return isResult;
    })(navigator.userAgent.toLowerCase());


    // 앱 인트로 화면 감춤 여부
    self.isHideIntroScene = false;

    // 모바일앱 실행 환경인 경우 (Android Device Monitor or Xcode Device) LogCat 으로 target 변경
    self.logger = function() {
        // argument object에서 배열로 변환
        var result = [].slice.call(arguments);

        if (self.isDevice) {
            // App 실행 환경
            var messages = [];
            for (var index in result) {
                var item = result[index];
                messages.push(typeof item == 'object' ? JSON.stringify(item) : item);
            }
            var logMessage = messages.join(' ');
            if (self.isIos) {
                var params = JSON.stringify({message: logMessage});
                //document.location = InterfaceServiceName + '://?serviceName=device&action=showLog&params='+params+'&callbackId=ios-log&callbackMethod=native.nothing';
            }
            window.console.log.apply(console, [logMessage]);
        } else {
            // browser 환경
            window.console.log.apply(console, result);
        }
    };

    self.nothing = function() { };

    //  Fast UUID generator, RFC4122 version 4 compliant.
    self.UUID = (function() {
        var self = {};
        var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
        self.generate = function() {
            var d0 = Math.random()*0xffffffff|0;
            var d1 = Math.random()*0xffffffff|0;
            var d2 = Math.random()*0xffffffff|0;
            var d3 = Math.random()*0xffffffff|0;
            return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
                    lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
                    lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
                    lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
        };
        return self;
    })();

    // Native Method 호출 상태를 저장하는 Array
    var _callbackMap = {};

    // 예약된 callback 이벤트..
    var _reservedCallbackMap = {
        // Android HW Back Down
        HW_BACK_ACTION_DOWN: function() {
            self.logger('native:callback.HW_BACK_ACTION_DOWN', arguments);

            if (gConfirm) {
                gConfirm.show({
                    message: '<span style="word-break:keep-all;">휴대폰의 뒤로 가기 버튼을 누르면 앱이 종료됩니다. 계속 이용하시려면 화면의 "이전" 버튼이나 홈 버튼을 눌러주세요.<span>',
                    changeBtnOrder: {
                        okText : "앱 종료",
                        cancelText : "계속 이용하기"
                    }
                }, function(ok) {
                    native.device.terminateApp(true);

                    gConfirm.textChangeBack();
                    gConfirm.close();
                }, function(cancel) {
                    gConfirm.textChangeBack();
                    gConfirm.close();
                });

            } else {
                if (confirm('앱을 종료하시겠습니까?')) {
                    native.device.terminateApp(true);
                }
            }
        },
        // Android OPEN_FILE_CHOOSER
        OPEN_FILE_CHOOSER: function() {
            self.logger('native:callback.OPEN_FILE_CHOOSER', arguments);
        },
        // Android SMS Notification
        SMS_NOTIFICATION: function(result) {
            self.logger('native:callback.SMS_NOTIFICATION', result);
            $(document).trigger('SMS_NOTIFICATION', result);
        }
    };

    // 예약된 callback 이벤트 변경
    self.changeReservedCallbackMap = function(action, callback) {
        var previous = _reservedCallbackMap[action] || null;
        _reservedCallbackMap[action] = callback;
        return previous;
    };

    // Native Method 호출 상태 추가
    var addCallbackStatus = function(serviceName, action, successCallback, failCallback) {
        // UUID 생성
        var callbackId = self.UUID.generate();
        // 해당 callback 함수 상태를 맵에 저장
        _callbackMap[callbackId] = [serviceName, action, successCallback, failCallback];
        //self.logger('addCallbackStatus', callbackId, _callbackMap[callbackId]);
        return callbackId;
    };

    // Native Method 호출 상태 삭제
    var removeCallbackStatus = function(callbackId) {
        // callbackId 에 해당하는 callback 함수 상태 조회
        var result = _callbackMap[callbackId] || null;
        // callbackId 가 유효한 경우 맵에서 해당 callback 함수 상태 삭제
        result && delete _callbackMap[callbackId];
        //self.logger('removeCallbackStatus', callbackId, result);
        return result;
    };

    // Native Method 호출
    var nativeExecute = function(serviceName, action, params, callbackMethod, success, exception) {

        // JSON 포맷으로 변환
        var data = JSON.stringify(params) || '';
        // callbackStatus 저장
        var callbackId = addCallbackStatus(serviceName, action, success, exception);

        // Native Method 호출
        if (self.isDevice && self.isAndroid) {
            // Android
            try {
                window[InterfaceServiceName].execute(serviceName, action, data, callbackId, NativeCallbackMethod);
            }catch(e) {}
        }
        else if (self.isDevice && self.isIos) {
            // iOS
            if(callbackMethod == null || callbackMethod == undefined || callbackMethod == 'undefined' || callbackMethod == '' ) {
                callbackMethod = NativeCallbackMethod;
            }

            document.location = InterfaceServiceName + "://?serviceName="+serviceName+"&action="+action+"&params="+data+"&callbackId="+callbackId+"&callbackMethod="+callbackMethod;
        }
        else {
            //단말기 환경이 아닌 경우 exception 발생
            var callbackStatus = removeCallbackStatus(callbackId);
            exception(callbackStatus);
        }
    };

    // Promise 방식으로 Native Method 호출
    var promise = function(serviceName, action, params, callbackMethod) {
        callbackMethod = callbackMethod || '';
        self.logger('native:'+serviceName+'.'+action, params, callbackMethod);

        var deferred = jQuery.Deferred();

        nativeExecute(serviceName, action, params, callbackMethod,
            function(success){
                self.logger('native:'+serviceName+'.'+action+':success', success);
                deferred.resolve(success);
            },
            function(e) {
                self.logger('native:'+serviceName+'.'+action+':exception', e);
                deferred.reject(e);
            }
        );

        return deferred.promise();
    };

    // 지정값을 Promise 방식으로 즉시 반환
    var promiseFake = function(serviceName, action, params) {
        self.logger('native:'+serviceName+'.'+action+'.FAKE');

        var deferred = jQuery.Deferred();

        self.logger('native:'+serviceName+'.'+action+'.FAKE:success', params);
        deferred.resolve(params);

        return deferred.promise();
    };

    /**
     * Native Method 호출 결과 callback
     *
     * @param response JSON 문자열
     */
    self.callback = function(response) {
        /*
        response = {
            callbackId: '1234-12-34-56-78-123456',
            status: 'success' || 'fail',
            result: {
                a: 'aa',
                b: 'bb'
            }
        }
        */
        // 결과 문자열을 object로 변환
        var data;
        try {
            data = JSON.parse(response || '');
        } catch (e){
            data = response || '';
        }

        // 정상적인 결과 구조체인지 확인
        if (data.callbackId && data.status) {
            // 예약된 callback 이벤트인 경우
            var reversedCallback = _reservedCallbackMap[data.callbackId];
            if (reversedCallback) {
                reversedCallback(data.result);
            }
            // Native Method 호출한 결과인 경우
            else {
                // callbackStatus 에 data.callbackId 로 저장된 값 조회
                var callbackStatus = removeCallbackStatus(data.callbackId);
                // data.callbackId 가 유효한 경우
                if (callbackStatus) {
                    // success/exception callback 호출
                    data.status == 'success' ? callbackStatus[2](data.result) : callbackStatus[3](data);
                }
            }
        } else {
            // 결과 구조체 비정상인 경우
            self.logger('native:exception', data);
            // callbackStatus 에 data.callbackId 로 저장된 값 조회
            var callbackStatus = removeCallbackStatus(data.callbackId);
            // data.callbackId 가 유효한 경우
            callbackStatus && callbackStatus[3](data);
        }

    };

    /**
     * 디바이스 정보 관련 함수
     */
    self.device = {
        serviceName : 'device',
        /**
         * 디바이스 정보 조회
         * @returns
         */
        getInfo: function() {
            if (self.isDevice) {
                return promise(this.serviceName, 'getInfo');
            }
        },
        /**
         * App 위.변조 확인 (1차, 루팅/해킹 포함)
         * @returns
         */
        checkFalsification: function() {
            if (self.isDevice) {
                return promise(this.serviceName, 'checkFalsification');
            } else {
                // 모바일웹에서는 약속된 특정값을 반환하여 서버에서 2차검증 처리 안함.
                var params = {
                    sessionId: 'isMobileWeb',
                    token: 'true'
                };

                var deferred = jQuery.Deferred();

                self.logger('native:'+this.serviceName+'.checkFalsification.prepared:success', params);
                deferred.resolve(params);

                return deferred.promise();
            }
        },
        /**
         * 앱 최초 인트로 화면 감추기
         */
        hideIntroScene: function() {
            if (self.isDevice && !self.isHideIntroScene) {
                return promise(this.serviceName, 'hideIntroScene').then(function() {
                    self.isHideIntroScene = true;
                    self.logger('native:'+self.device.serviceName+'.hideIntroScene.status', self.isHideIntroScene);
                });
            }
        },
        /**
         * 앱 최초 인트로 화면 감추기
         */
        getStarterType: function() {
            return promise(this.serviceName, 'getStarterType');
        },
        /**
         * Android HW BACK 버튼 이벤트 콜백 설정
         */
        setHWBackEvent: function() {
            return promise(this.serviceName, 'setHWBackEvent', {
                id: 'HW_BACK_ACTION_DOWN',
                callbackMethod: NativeCallbackMethod
            });
        },
        setSMSNotification: function(filter) {
            return promise(this.serviceName, 'setSMSNotification', {
                id: 'SMS_NOTIFICATION',
                callbackMethod: NativeCallbackMethod,
                filter: filter
            });
        },
        /**
         * App 종료
         */
        terminateApp: function(immediate, message) {
            return promise(this.serviceName, 'terminateApp', {
                immediate: immediate ? 'true' : 'false',
                message: message || ''
            });
        },

        /**
         * Native Method appsFlyer 스크립트 호출
         * @param event_name : 이벤트명
         * @param event_key : 키
         * @param event_value : 데이터
         */
        appsFlyer: function(event_name, event_key, event_value) {

            if(self.isDevice) {
                if(self.isAndroid) {
                    return promise(this.serviceName, 'appsFlyer', {
                        event_name: event_name,
                        event_key: event_key,
                        event_value: event_value
                    });
                }
            }
        },

        /**
         * Native Method openIosAppPopup(ios일 떄 팝업처리 )
         */
        openIosAppPopup: function(url) {
            try {
                self.logger("openIosAppPopup 호출");

                if(self.isDevice) {
                    if(self.isIos) {
                           return promise(this.serviceName, 'openIosAppPopup', { url: url });
                    }
                }
            }catch(e) {}
        },

        /**
         * Native Method closeIosAppPopup(ios일 떄 창 닫기 )
         */
        closeIosAppPopup: function(callbackFunc) {
            try {
                self.logger("closeIosAppPopup 호출");
                //앱호출을 위해 강제로 세팅
                self.isDevice = true;
                self.isIos = true;

                return promise(this.serviceName, 'closeIosAppPopup', null, callbackFunc);
            }catch(e) {}
        }
    };

    /**
     * Android 카메라 관련 함수
     */
    self.camera = {
        serviceName : 'camera',
        /**
         * Android 카메라 또는 갤러리 앱을 통해 선택된 이미지 전송
         */
        takePicture: function(accept) {
            return promise(this.serviceName, 'takePicture', {
                accept: accept ||'image/*'
            });
        }
    };

    /**
     * 공인인증서 관련 함수
     */
    self.certificate = {
        serviceName : 'certificate',
        /**
         * 공인인증서 관련 화면으로 이동
         */
        moveForm: function(url) {
            var targetUrl = contextPath + '/common/cert/' + url + 'Form.do';
            if (self.isDevice) {
                window.location.href = targetUrl;
            } else {
                native.openApp('open', targetUrl, {
                    '__dbcmapp__': ';;;'
                });
            }
        },
        /**
         * 디바이스 내에 저장 되어있는 인증서 정보 조회.
         */
        getList : function(isFully) {
            // 인증서 subjectDn 에서 필드 분리
            var splitText = function(input, seperator, delimiter) {
                // "subjectDn" : "cn=HKD(KILDONG.HONG)009104420150812191000025,ou=INITECH,ou=personal4IB,o=yessign,c=kr"
                var result = [];
                if (input && input.length > 0) {
                    var items = input.split(seperator);
                    if (jQuery.isNumeric(delimiter)) {
                        result.push(items[delimiter]);
                    } else {
                        items.forEach(function(element, index, array) {
                            var temp = element.split('=');
                            if (temp[0] == delimiter) {
                                result.push(temp[1]);
                            }
                        });
                    }
                }
                return result[0];
            };

            // Native 인증서 목록 정보에서 화면표시에 필요한 항목만 추출
            var parseCertificateList = function(certList) {
                var issuerNames = {
                    KICA:      '한국정보인증',
                    SIGNKOREA: '한국증권전산',
                    YESSIGN:   '금융결제원',
                    NCA:       '한국전산원',
                    CROSSCERT: '한국전자인증',
                    TRADESIGN: '한국무역정보통신'
                };
                var result = [];
                for (var index in certList) {
                    var item = certList[index];
                    var subject_dn_cn = splitText(item.subjectDn, ',', 'cn');
                    var newItem = {};
                    newItem.index = item.index;
                    newItem.cn_no = splitText(subject_dn_cn, ')', 1);
                    newItem.cn_name = splitText(subject_dn_cn, ')', 0) + (newItem.cn_no ? ')' : '');
                    newItem.status = item.status;
                    newItem.policy = item.policy;
                    newItem.issuerName = issuerNames[item.issuerName.toUpperCase()] || item.issuerName;
                    newItem.expiredTime = item.expiredTime;
                    newItem.isSpass = '0';
                    result.push(newItem);
                }
                return result;
            };

            return promise(this.serviceName, 'getList').then(function(response) {
                // Native 인증서 목록 정보에서 화면표시에 필요한 항목만 추출
                var result = isFully ? response : parseCertificateList(response);
                return result;
            });
        },
        /**
         * 인증서 비밀번호 입력 보안키패드 표시
         * @param index 인증서 index
         * @param title 입력항목 제목
         * @param min 최소입력 문자수
         * @param max 최대입력 문자수
         * @param placeholder 입력항목 힌트
         */
        getPassword: function(index, title, min, max, placeholder) {
            var minLegnth = min || 1;
            var maxLength = max || 30;
            return promise(this.serviceName, 'getPassword', {
                index: index,
                title: title,
                placeholder: placeholder || title,
                minLength: minLegnth + '',
                minMessage: '최소 ' + minLegnth + '자 이상 입력',
                maxLength: maxLength + '',
                maxMessage: '최대 ' + maxLength + '자 미만 입력'
            });
        },
        /**
         * 인증서 소유자 검증.
         * @param index 인증서 index
         * @param cipherPassword 인증서 비밀번호
         * @param ramdon 랜덤값
         */
        checkPassword : function(index, cipherPassword) {
            return promise(this.serviceName, 'checkPassword', {
                index: index,
                cipherPassword: cipherPassword
            });
        },
        /**
         * 전자서명문 생성 (선택한 인증서로 데이터를 전자서명함)
         * @param index 인증서 index
         * @param password 인증서 비밀번호
         * @param data 전자서명할데이터
         */
        sign : function(index, password, data) {
            return promise(this.serviceName, 'sign', {
                index: index,
                password: password,
                data: data
            });
        },
        /**
         * 대법원 가족관계증명서 스크래핑 (선택한 인증서로 데이터를 전자서명함)
         * @param index 인증서 index
         * @param password 인증서 비밀번호
         * @param data 전자서명할데이터
         * @param myName 피보험자명
         * @param jumin 암호화된 주민등록번호
         * @param addinfoGb 대법원에 보낼 구분값
         * @param addinfo 자녀이름
         */
        sasFamilyScraping : function(index, password, data, myName,jumin,addinfoGb,addinfo) {
            return promise(this.serviceName, 'sasFamilyScraping', {
                index: index,
                password: password,
                data: data,
                myName: myName,
                jumin: jumin,
                addinfoGb: addinfoGb,
                addinfo: addinfo
            });
        },
        /**
         * 디바이스에 저장된 인증서 파일을 삭제.
         * @param location 인증서경로
         * @param subjectRdn 인증서발급정보
         */
        remove : function(indexes) {
            return promise(this.serviceName, 'remove', indexes);
        },
        /**
         * 인증서의 비밀번호를 변경.
         * @param location 인증서경로
         * @param subjectRdn 인증서발급정보
         * @param oldPassword 이전 패스워드
         * @param newPassword 변경할 패스워드
         */
        changePassword : function(index, oldPassword, newPassword) {
            return promise(this.serviceName, 'changePassword', {
                index: index,
                oldPassword:oldPassword,
                newPassword: newPassword
            });
        },
        /**
         * PC 에 있는 인증서를 서버에 업로시 필요한 인증번호 조회.
         */
        getAuthNumber : function() {
            if (self.isDevice) {
                return promise(this.serviceName, 'getAuthNumber');
            }
        },
        /**
         * 중계서버에서 인증서 가져오기.
         */
        importCertificate : function() {
            return promise(this.serviceName, 'importCertificate');
        },
        /**
         * 인증서를 내보낸다.
         * @param index 인증서 index
         * @param authNumber 인증번호
         */
        exportCertificate : function(index, authNumber) {
            return promise(this.serviceName, 'exportCertificate', {
                index: index,
                authNumber: authNumber
            });
        },
        /**
         * 인증서를 가져오기를 취소한다.
         */
        cancelImportCertificate : function() {
            return promise(this.serviceName, 'cancelImportCertificate');
        }
    };


    /**
     * S-PASS 인증 관련 함수
     */
    self.spssCertificate = {
        serviceName : 'spssCertificate',
        /**
         * S-PASS 인증서 관련 화면으로 이동
         */
        moveForm: function(url) {
            var targetUrl = contextPath + '/common/cert/' + url + 'Form.do';
            if (self.isDevice) {
                window.location.href = targetUrl;
            } else {
                native.openApp('open', targetUrl, {
                    '__dbcmapp__': ';;;'
                });
            }
        },

        /*****************************************************************************************************************************
         *
         * 삼성패스 시작
         *
         *****************************************************************************************************************************/
        /**
         * 삼성패스 사용가능 여부 체크.
         * @param index 인증서 index
         * @param cipherPassword 인증서 비밀번호
         * @param ramdon 랜덤값
         */
        passStatus : function() {
            if (self.isDevice && self.isAndroid) {
                return promise(this.serviceName, 'passStatus').then(function(response) {
                    self.logger("response.result==>" + response);
                    return response;
                });
            }
            else {
                return {"status":"0","iris":"0","fingerprint":"0"};
            }
        },

        /**
         * 생체인증서 전자서명 전 토큰 값 호출
         * @param authType 0-홍채, 1-지문
         * @param eventid evntid
         * @param userid 고객번호
         */
        authSPass : function(authType, eventid) {
            return promise(this.serviceName, 'authSPass', {
                authType: authType,
                eventid: eventid,
                userid: SpassUserId
            });
        },

        /**
         * 생체인증서 전자서명문 생성 (선택한 생체 인증서로 데이터를 전자서명함)
         * @param authType 0-홍채, 1-지문
         * @param eventid evntid
         * @param userid 고객번호
         * @param data 전자서명할데이터
         */
        signSPass : function(authType, eventid, data) {
            return promise(this.serviceName, 'signSPass', {
                authType: authType,
                eventid: eventid,
                userid: SpassUserId,
                data: data
            });
        }
        /*****************************************************************************************************************************
         *
         * 삼성패스 끝
         *
         *****************************************************************************************************************************/
    };




    /**
     * 보이는 ARS 관련 함수
     */
    self.callgate = {
        serviceName : 'callgate',

        /**
         * 앱에서 휴대폰 본인인증한 폰번호 일 경우 호출
         * @param phone_no 휴대폰 인증번호
         */
        setInfo : function(phoneNo) {
            //앱일때만
            if(self.isDevice) {
                return promise(this.serviceName, 'setInfo', {
                    phone_no: phoneNo
                });
            }
        }
        /*****************************************************************************************************************************
         *
         * 보이는 ARS 관련 함수 끝
         *
         *****************************************************************************************************************************/
    };

    self._gfnPdfViewLayer = null;
    self.view = {
        serviceName : 'view',
        /**
         * PDF 보기
         * @param url 파일이름을 제외한 경로
         * @param filename 파일이름
         */
        pdf: function(url, filename) {
            if (self.isAndroid) {
                if (self.isDevice) {
                    promise(this.serviceName, 'pdf', {
                        url: url,
                        filename: filename
                    });
                } else {
                    self.openApp('pdf', url, {filename: filename});
                }
            } else {
                 // 브라우저 새 창 열기
                window.open(url + filename);
            }
        },
        /**
         * 브라우저 새 창 열기
         */
        browser: function(url, windowName) {
            if (url.toLowerCase().substring(url.length-4,url.length) == '.pdf' && url.indexOf('iDongbuPdf.do?') < 0) {

                //현재주소가 앞에 붙어 있으면 그건 제거한다.
                if(url.toLowerCase().indexOf(window.location.origin) == 0) {
                    url = url.replace(location.origin,'');

                    //도메인 제거 후에도 포트정보가 있으면으면 포트까지 제거를 해야 한다.
                    if(url.indexOf(':') == 0) {
                        url = url.substring(url.indexOf('/'),url.length);
                    }
                }

                //도메인주소면 뺀다.
                if(url.toLowerCase().substring(0,4) == 'http') {
                    if (self.isDevice) {
                        return promise(this.serviceName, 'browser', {
                            url: url
                        });
                    } else {
                         // 브라우저 새 창 열기
                        window.open(url, windowName || '');
                    }
                }
                else {
                    // 브라우저 새 창 열기
                    var newUrl = '/contents/viewPdfInApp.do?pdfUrl='+url;
                    //window.open(newUrl, windowName || '');

                    if(native._gfnPdfViewLayer != null) {
                        native._gfnPdfViewLayer.remove();
                    }

                    var params   = {};
                    params['pdfUrl']   = url;

                    $.ajax({
                        url         : location.origin + '/contents/viewPdfInApp.do',
                        method      : 'get',
                        data        : params,
                        //beforeSend  : gfnBlockScreen,
                        success     : function (data, textStatus, jqXHR) {
                            //gfnUnblockScreen();
                            native._gfnPdfViewLayer = $(data);
                            native._gfnPdfViewLayer.appendTo(document.body);

                            commUtil.openPopup('__pdfViewLayer_');

							if(typeof gRdViewer === 'undefined'){
								$('#__pdfViewLayer_ #btn_pdf_close').removeAttr('onclick').on('click', ()=>{
									commUtil.closePopup('__pdfViewLayer_');
								});
							}else{
								gRdViewer.getRdIndex(url);
								let btn_text = '확인';
					
								if(gRdViewer.RD_INFO.length > 1 && gRdViewer.rd_index > -1){
									btn_text = `확인(${gRdViewer.rd_index+1}/${gRdViewer.RD_INFO.length})`;
								}
								$('#__pdfViewLayer_ #btn_pdf_close').removeAttr('onclick').text(btn_text).on('click', ()=>{
									gRdViewer.closePopup('pdf');
								});
							}
                        },
                        error       : function (jqXHR, textStatus, errorThrown) {
                            //gfnUnblockScreen();
							commUtil.alert('오류', 'PDF 파일 오픈 시 오류가 발생했습니다.');
                        },
                        //complete    : gfnUnblockScreen
                    });
                }
            }
            else {
                if (self.isDevice) {
                    return promise(this.serviceName, 'browser', {
                        url: url
                    });
                } else {
                     // 브라우저 새 창 열기
                    window.open(url, windowName || '');
                }
            }
        }
    };



    /**
     * 앱푸시 관련 함수
     */
    self.push = {
        serviceName : 'push',

        /**
         * 푸시회원 가입
         * @returns
         */
        addSvcApp: function() {
            return promise(this.serviceName, 'addSvcApp');
        },
        /**
         * 푸시회원 탈퇴
         * @returns
         */
        deleteSvcApp: function() {
            return promise(this.serviceName, 'deleteSvcApp');
        }
    };

    // OS 별 스토어 경로 조회 (DB손해보험 다이렉트 앱)
    var getStoreAppName = function() {
        var appStoreAppName = self.isIos ?
                'https://itunes.apple.com/kr/app/dongbuhwajae-dailegteu/id1095657443?&mt=8' :
                'https://play.google.com/store/apps/details?id=' + PackageName
        return appStoreAppName;
    };

    // OS 별 스토어 경로 조회 (DB손해보험 앱)
    var getStoreAppName2 = function() {
        var appStoreAppName = self.isIos ?
                'https://itunes.apple.com/kr/app/dongbuhwajae-dailegteu/id430297602?&mt=8' :
                'https://play.google.com/store/apps/details?id=com.idongbusmart'
        return appStoreAppName;
    };

    // OS 별 스토어로 이동 (DB 손해보험 다이렉트 앱)
    self.moveStore = function() {
        var appStoreAppName = getStoreAppName();
        native.logger('appStoreAppName', appStoreAppName)
        self.view.browser(appStoreAppName);
    };

    // OS 별 스토어로 이동
    self.moveStore2 = function() {
        var appStoreAppName = getStoreAppName2();
        native.logger('appStoreAppName', appStoreAppName)
        self.view.browser(appStoreAppName);
    };

    /**
     * 웹에서 모바일앱 호출하고 특정 화면으로 이동
     */
    self.openApp = function(action, url, param) {
        // Native 에서 '__dbcmapp__' 파라미터의 ';;;' 값을 'SessionId;token;osType;appVersion' 값으로 변경
        // param['__dbcmapp__'] = 'SessionId;token;osType;appVersion';
        var p = param ? encodeURIComponent(JSON.stringify(param)) : '';
        var appScheme = self.isAndroid ?
            'intent://' + action + '?url=' + url + '&p=' + p + '#Intent;scheme=' + AppScheme + ';package=' + PackageName + ';launchFlags=67108864;end' :
            AppScheme + '://' + action + '?url=' + url + '&p=' + p + '&version=1';
        var appStoreAppName = getStoreAppName();
        var iosVersion = (function(userAgent) {
            return self.isIos ? parseFloat(userAgent.substr(userAgent.search(/ipad|iphone|ipod/), 30).match(/\d+\_+\d+/)[0].replace('_', '.')) : null;
        })(navigator.userAgent.toLowerCase());
        self.logger('native:openApp', action, url, param, appScheme, appStoreAppName, iosVersion, self.isDevice);

        function runApp(scheme, appStore){
            var clickedAt = +new Date;
            window.location.href = scheme;
            // 안드로이드이고 오래된 브라우저인 경우 1.5초 후에 플레이스토어로 이동
            false && self.isAndroid && !self.isChrome && setTimeout(function() {
                self.logger('안드로이드이고 오래된 브라우저인 경우 1.5초 후에 플레이스토어로 이동');
                if (+new Date - clickedAt < 2000) {
                    window.location.href = appStore;
                }
            }, 1500);
        }

        if (self.isIos && iosVersion >= 9.2){
            runApp(appScheme, appStoreAppName);
        } else if(self.isIos && iosVersion >= 9){
            runApp(appScheme, appStoreAppName);
        } else {
            runApp(appScheme, appStoreAppName);
        }
    };

    // Android HW BACK 버튼 이벤트 콜백 설정
    self.isDevice && self.isAndroid && self.device.setHWBackEvent();
    // Android SMS 수신 이벤트 콜백 설정
    self.isDevice && self.isAndroid && self.device.setSMSNotification(["15771006"]);
    // 앱 최초 인트로 화면 감추기
    self.isDevice && self.isAndroid && self.device.hideIntroScene();

    return self;
})(jQuery);
