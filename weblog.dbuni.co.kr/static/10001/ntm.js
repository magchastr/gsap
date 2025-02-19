var Ntm = window.Ntm || {};

Ntm.Settings = {"tags":[{"type":"PLUGIN","id":"TAG-10001","name":"00_공통_페이지","enabled":true,"operator":"AND","triggers":["TRG-00001"],"exceptions":[],"pluginType":"nlogger","logType":"EVENT","path":"","parameters":{"chn":"VAR-10004","pdccd":"VAR-10014","pdcdvcd":"VAR-10015","pdcdvnm":"VAR-10006","tagType":"VAR-10023","plv_01":"VAR-10016","plv_02":"VAR-10017","plv_03":"VAR-10018","plv_04":"VAR-10019","page":"VAR-10020","join_page":"VAR-10027","renew":"VAR-10028","hash":"VAR-10021"},"cookies":{"custNo":"VAR-10005"}},{"type":"PLUGIN","id":"TAG-10002","name":"01_MAIN 클릭","enabled":true,"operator":"OR","triggers":["TRG-10006"],"exceptions":[],"pluginType":"nlogger","logType":"EVENT","path":"","parameters":{"clickNm":"VAR-10009","areaNm":"VAR-10007","tagType":"VAR-10022","chn":"VAR-10004","plv_01":"VAR-10016","plv_02":"VAR-10017","plv_03":"VAR-10018","plv_04":"VAR-10019","page":"VAR-10020","hash":"VAR-10021"},"cookies":{"custNo":"VAR-10005"}},{"type":"PLUGIN","id":"TAG-10003","name":"02_이어하기","enabled":true,"operator":"AND","triggers":["TRG-10008"],"exceptions":[],"pluginType":"nlogger","logType":"EVENT","path":"","parameters":{"sign":"VAR-10029","tagType":"VAR-10022","chn":"VAR-10004","pdccd":"VAR-10014","pdcdvcd":"VAR-10015","pdcdvnm":"VAR-10006","plv_01":"VAR-10016","plv_02":"VAR-10017","plv_03":"VAR-10018","plv_04":"VAR-10019","page":"VAR-10020","hash":"VAR-10021"},"cookies":{"custNo":"VAR-10005"}},{"type":"PLUGIN","id":"TAG-10004","name":"03_가입방식선택","enabled":true,"operator":"AND","triggers":["TRG-10009"],"exceptions":[],"pluginType":"nlogger","logType":"EVENT","path":"","parameters":{"joinBtn":"VAR-10013","chn":"VAR-10004","tagType":"VAR-10022","pdccd":"VAR-10014","pdcdvcd":"VAR-10015","pdcdvnm":"VAR-10006","clickNm":"VAR-10025","plv_01":"VAR-10016","plv_02":"VAR-10017","plv_03":"VAR-10018","plv_04":"VAR-10019","page":"VAR-10020","hash":"VAR-10021"},"cookies":{"custNo":"VAR-10005"}},{"type":"PLUGIN","id":"TAG-10006","name":"04_이탈팝업클릭","enabled":true,"operator":"AND","triggers":["TRG-10014"],"exceptions":[],"pluginType":"nlogger","logType":"EVENT","path":"","parameters":{"chn":"VAR-10004","tagType":"VAR-10022","pdccd":"VAR-10014","pdcdvcd":"VAR-10015","pdcdvnm":"VAR-10006","clickNm":"VAR-10026","plv_01":"VAR-10016","plv_02":"VAR-10017","plv_03":"VAR-10018","plv_04":"VAR-10019","page":"VAR-10020","hash":"VAR-10021"},"cookies":{"custNo":"VAR-10005"}},{"type":"SCRIPT","id":"TAG-10005","name":"04_MAIN 클릭_ADD","enabled":false,"operator":"AND","triggers":["TRG-10013"],"exceptions":[],"code":"function() {\n  var dmn = window.document.domain;\n\n  if (dmn === \"tcmik.dbins.net\"){\n    var clck = document.querySelectorAll(\".main-product-box a.link\");\n    for(i=0; i < clck.length; i++){\n      clck[i].addEventListener('click' , function() {\n        var cnm = this && this.closest(\"a\");\n        cnm = cnm && cnm.querySelector(\"strong\");\n        cnm = cnm && cnm.innerText;\n        // console.log(\"%c [Tag] custom data cnm :: \" + cnm, \"color:blue\");\n\n        var anm = this && this.closest(\"section\");\n        anm = anm && anm.querySelector(\"div.main-title h2.tit\");\n        anm = anm && anm.innerText;\n        // console.log(\"%c [Tag] custom data anm :: \" + anm, \"color:blue\");\n        \n        Ntm.Event.fireUserDefined( \"mainclick\", {\n          clickNm : cnm , \n          clickAr : anm\n        });\n      });\n    };\n  }\n}","approval":"DONE","logs":[{"time":1709793019350,"userId":"nethru","action":"CONFIRM","comment":""}]}],"triggers":[{"type":"GENERAL","id":"TRG-00001","name":"페이지 이동","event":"PAGELOADED","desc":"","conditions":[]},{"type":"ELEMENTCLICK","id":"TRG-10006","name":"메인클릭","event":"ELEMENTCLICKED","desc":"","conditions":[{"operator":"NOTEQUALS","variable":"VAR-10007","value":"false"}],"selector":"div.popup-content a, div.main-product-box a, nav.main-nav a, div.main-product-list a, div.quick-menu a, div.main-guaranteed-box a, div.swiper-wrapper div a.link, div.main-menu-list li a, div.main-sns-list li a, div.btn-group button"},{"type":"ELEMENTCLICK","id":"TRG-10008","name":"상품상세 > 이어하기 버튼","event":"ELEMENTCLICKED","desc":"","conditions":[{"operator":"NOTEQUALS","variable":"VAR-10029","value":"false"}],"selector":"div.step-info button.btn.btn-line.btn-xl, button#btnCarMenu3"},{"type":"ELEMENTCLICK","id":"TRG-10009","name":"joinBtn_가입방식","event":"ELEMENTCLICKED","desc":"div.car-btn button.btn.btn-fill-primary.btn-xl","conditions":[{"operator":"NOTEQUALS","variable":"VAR-10013","value":"false"}],"selector":"div.car-btn button"},{"type":"GENERAL","id":"TRG-10013","name":"페이지(DOM)","event":"DOMREADY","desc":"","conditions":[]},{"type":"ELEMENTCLICK","id":"TRG-10014","name":"이탈팝업클릭","event":"ELEMENTCLICKED","desc":"","conditions":[{"operator":"NOTEQUALS","variable":"VAR-10026","value":"false"}],"selector":"div.prevent-event-group a, #popHome div.btn-area button.btn.btn-l"}],"variables":[{"type":"BUILTIN","id":"VAR-00001","name":"url","description":"페이지 전체 URL"},{"type":"BUILTIN","id":"VAR-00002","name":"host","description":"페이지 URL 호스트"},{"type":"BUILTIN","id":"VAR-00003","name":"path","description":"페이지 URL 경로"},{"type":"BUILTIN","id":"VAR-00004","name":"params","description":"페이지 URL 파라미터"},{"type":"BUILTIN","id":"VAR-00005","name":"paramDict","description":"페이지 URL 파라미터 (객체)"},{"type":"BUILTIN","id":"VAR-00006","name":"hash","description":"페이지 URL 해시"},{"type":"BUILTIN","id":"VAR-00007","name":"referrer","description":"이전 방문 페이지 주소"},{"type":"BUILTIN","id":"VAR-00008","name":"title","description":"페이지 제목"},{"type":"BUILTIN","id":"VAR-00009","name":"clickId","description":"클릭 항목 ID"},{"type":"BUILTIN","id":"VAR-00010","name":"clickClass","description":"클릭 항목 클래스명"},{"type":"BUILTIN","id":"VAR-00011","name":"clickText","description":"클릭 항목 텍스트"},{"type":"BUILTIN","id":"VAR-00012","name":"clickTag","description":"클릭 항목 태그명"},{"type":"BUILTIN","id":"VAR-00013","name":"clickElement","description":"클릭 항목 DOM 요소"},{"type":"BUILTIN","id":"VAR-00014","name":"activeTag","description":"현재 활성된 태그"},{"type":"BUILTIN","id":"VAR-00015","name":"activeTriggers","description":"현재 활성된 트리거 목록"},{"type":"BUILTIN","id":"VAR-00016","name":"customData","description":"커스텀 이벤트 변수"},{"type":"PLUGIN","id":"VAR-00017","name":"nlogger","description":"넷스루 로깅 모듈"},{"type":"SCRIPT","id":"VAR-10002","name":"XX_009_sessionid_세션id","description":null,"code":"function() {\n  try{\n    if(window.Ntm){\n      var ssid = Ntm.Plugin.nlogger.generateUuid();\n      var getCookie = Ntm.Cookie.get(\"SESSPCID\");\n\n      if(getCookie){\n        return getCookie;\n      }\n      else{\n        Ntm.Cookie.set(\"SESSPCID\", ssid, {path : \"/\"});\n        return ssid;\n      }\n    }\n  }\n  catch(e){\n    console.log(\"%c error_sesspcid ::\" + e.message,\"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1705364653348,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10004","name":"DD_002_chn_접속채널구분","description":null,"code":"function() {\n  try{\n    var chn = window.n_Chn;\t\t// cm_pc, cm_mweb, cm_app\n    var retn = chn ? chn : \"\";\n    //console.log(\"%c [Tag] n_Chn :: \" + retn, \"color:blue\");\n    return retn;\n  }\n  catch(e){\n    //console.log(\"%c [Tag] n_Chn 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1705897302617,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10005","name":"DD_001_custNo_고객번호","description":null,"code":"function() {\n  try{\n    var cno = window.n_CustNo;\t\t// 본인인증시 번호발급.\n    var retn = cno ? cno : \"\";\n    //console.log(\"%c [Tag] custNo :: \" + retn, \"color:blue\");\n    return retn;\n  }\n  catch(e){\n    //console.log(\"%c [Tag] custNo 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1705897378628,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10006","name":"AA_001_pdcDvnm_상품명","description":null,"code":"function() {\n  try{\n    // URL과 비교하여 매핑되는 상품명을 사용\n    // 상품 첫페이지 진입시, 해당 상품명을 저장/갱신\n    // 매핑정보와 일치하는 내용이 없을 경우, 발급된 상품명을 사용\n    // 이어하기 기능을 이용하여 중간 단계 진입시, 이어하기에서 클릭한 상품명 저장/갱신\n\n    var retn = \"\";\n    var N_PATH = [\n      {pdcDvcd: '', dirPath: '/atarc/step1', pdcDvnm: '자동차보험'},\n      {pdcDvcd: '', dirPath: '/atarc/step2', pdcDvnm: '자동차보험'},\n      {pdcDvcd: '', dirPath: '/atarc/step3', pdcDvnm: '자동차보험'},\n      {pdcDvcd: '', dirPath: '/atarc/step4', pdcDvnm: '자동차보험'},\n      {pdcDvcd: '', dirPath: '/copr/atarc/', pdcDvnm: '자동차보험(법인)'},\n      {pdcDvcd: '', dirPath: '/copr/mtcc/', pdcDvnm: '이륜차보험(법인)'},\n      {pdcDvcd: '', dirPath: '/copr/atarc/multi/', pdcDvnm: '다수차량동시보험(법인)'},\n      {pdcDvcd: 'oneday', dirPath: '/at/prd/ondy/', pdcDvnm: '원데이자동차보험'},\n      {pdcDvcd: 'g_ew', dirPath: '/gnrl/prd/dmg/', pdcDvnm: '자동차고장수리비용보험'},\n      {pdcDvcd: 'm_mtcc', dirPath: '/at/prd/mtcc/', pdcDvnm: '이륜차보험'},\n      {pdcDvcd: 'l_tooth', dirPath: '/teth/', pdcDvnm: '치아보험'},\n      {pdcDvcd: 'l_golf', dirPath: '/bbot/', pdcDvnm: '오잘공골프보험'},\n      {pdcDvcd: 'l_driver', dirPath: '/ltm/prd/drvr/', pdcDvnm: '운전자보험'},\n      {pdcDvcd: 'l_ubi_driver', dirPath: '/ltm/prd/ubi/', pdcDvnm: 'UBI운전자보험'},\n      {pdcDvcd: 'l_fire', dirPath: '/ltm/prd/fmas/', pdcDvnm: '가정보장보험(화재)'},\n      {pdcDvcd: 'l_total', dirPath: '/cmph/', pdcDvnm: '종합보험'},\n      {pdcDvcd: 'l_annuity', dirPath: '/pnn/', pdcDvnm: '연금보험'},\n      {pdcDvcd: 'l_pmi', dirPath: '/pmimdcs/', pdcDvnm: '실손의료비보험'},\n      {pdcDvcd: 'l_cns_pmi', dirPath: '/pmimdcscns/', pdcDvnm: '실손의료비보험(계약전환)'},\n      {pdcDvcd: 'l_health', dirPath: '/splcheal/', pdcDvnm: '간편건강보험'},\n      {pdcDvcd: 'l_cancer', dirPath: '/canr/', pdcDvnm: '암보험'},\n      {pdcDvcd: 'l_mtcc', dirPath: '/ridr/', pdcDvnm: '라이더+보험'},\n      {pdcDvcd: 'l_child', dirPath: '/chd/', pdcDvnm: '자녀보험'},\n      {pdcDvcd: 'l_simple', dirPath: '/mdhtsplcheal/', pdcDvnm: '간편실손보험'},\n      {pdcDvcd: 'l_exp_simple', dirPath: '/pmiexp/', pdcDvnm: '간편실손보험(재가입)'},\n      {pdcDvcd: 'l_pet_dog', dirPath: 'ltm/prd/cpnm/', pdcDvnm: '펫블리반려견보험'},\n      {pdcDvcd: 'g_pet', dirPath: 'gnrl/prd/cpnm/', pdcDvnm: '펫보험(1년)'},\n      {pdcDvcd: 'g_driver', dirPath: '/gnrl/prd/drve/drvr/', pdcDvnm: '운전자보험(1년이내)'},\n      {pdcDvcd: 'g_fire', dirPath: '/gnrl/prd/dmg/fire/', pdcDvnm: '주택화재보험(3년)'},\n      {pdcDvcd: 'g_ov_trvl', dirPath: '/gnrl/prd/trvl/ovse/', pdcDvnm: '해외여행보험'},\n      {pdcDvcd: 'g_ov_longtrvl', dirPath: '/gnrl/prd/trvl/stab/', pdcDvnm: '해외유학/장기체류보험'},\n      {pdcDvcd: 'g_ov_prmtrvl', dirPath: '/gnrl/prd/trvl/prm/', pdcDvnm: '프리미엄해외여행보험'},\n      {pdcDvcd: 'g_in_trvl', dirPath: '/gnrl/prd/trvl/dmst/', pdcDvnm: '국내여행보험'},\n      {pdcDvcd: 'g_golf', dirPath: '/gnrl/prd/lise/golf/', pdcDvnm: '골프보험(1년 이내)'},\n      {pdcDvcd: 'g_outdoor', dirPath: '/gnrl/prd/lise/ski/', pdcDvnm: 'OUTDOOR레저(스키)보험'},\n      {pdcDvcd: 'g_cmtylbt', dirPath: '/gnrl/prd/dmg/cmtyLbt/', pdcDvnm: '재산배상책임보험(3년이내)'},\n      {pdcDvcd: 'g_windstorm', dirPath: '/gnrl/prd/dmg/wdst/', pdcDvnm: '풍수해보험'},\n      {pdcDvcd: 'g_prniflbt', dirPath: '/gnrl/prd/gnrlCorp/', pdcDvnm: '개인정보보호책임보험2'}\n    ];\n\n    for (i=0; i < N_PATH.length; i++){\n      var path = window.location.pathname.indexOf(N_PATH[i].dirPath);\n      if (path > -1){\n        retn = N_PATH[i].pdcDvnm;\n      }\n    }\n    // 상품 첫페이지 이동시, 상품명 발급/재발급\n    var step1_comm = window.location.pathname.indexOf(\"custInfoView\");\n    var step1_corp = window.location.pathname.indexOf(\"custInfoCorpView\");\n    var step1_trm = window.location.pathname.indexOf(\"custInfoTrmView\");\n    var step1_car = window.location.pathname.indexOf(\"formStepPreView\");\n    // 메인페이지 이동시, 초기화\n    var _main = window.location.pathname.indexOf(\"mainView\");\n    var _plan = window.location.pathname.indexOf(\"conplanView\");\n\n    if (step1_comm > -1 || step1_car > -1 || step1_trm || step1_corp){\n      Ntm.Cookie.set(\"PDCNM\", retn, {path : \"/\"});\n    }\n    else if (_main > -1 || _plan > -1){\n      Ntm.Cookie.set(\"PDCNM\", \"\", {path : \"/\"});\n    }\n\n    // 매핑에 제외된 url일 경우, 발급된 상품명을 사용.\n    var ncg = Ntm.Cookie.get(\"PDCNM\");\n    ncg = ncg && decodeURIComponent(ncg);\n\n    retn = retn ? retn : ncg;\n    retn = retn ? retn.replace(/\\s/g,'') : \"\";\n    //console.log(\"%c [Tag] pdcDvnm :: \" + retn, \"color:blue\");\n    return retn;\n  }\n  catch(e){\n    //console.log(\"%c [Tag] pdcDvnm 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1706172330361,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10007","name":"BB_002_areaNm_메인영역명","description":null,"code":"function() {\n  try{\n    var retn = \"false\";\n    var ntmthis = Ntm.Variable.get(\"clickElement\");\n    var main = window.location.pathname.indexOf(\"mainView\");\n\n    if (main > -1){\n      // 메인팝업\n      if (ntmthis && ntmthis.closest(\"div.popup-content\")){\n        retn = \"메인팝업\";\n      }\n      else if (ntmthis && ntmthis.closest(\"div.main-promotion-bann\")){\n        retn = \"프로모션배너(우측상단)\";\n      }\n      \n      // 좌측메뉴\n      else if (ntmthis && ntmthis.closest(\"nav.main-nav\")){\n        retn = \"좌측메뉴\";\n      }\n\n      // 퀵메뉴(메인만)\n      else if (ntmthis && ntmthis.closest(\"div.quick-menu\")){\n        retn = \"메인 퀵메뉴\";\n      }\n\n      // 인기상품\n      else if (ntmthis && ntmthis.closest(\"div.main-product-list\")){\n        retn = \"인기상품\";\n      }\n\n      // 자주 사용하는 메뉴\n      else if (ntmthis && ntmthis.closest(\"div.main-menu-list\")){\n        retn = \"자주사용하는메뉴\";\n      }\n\n      // 긴급출동/사고접수\n      else if (ntmthis && ntmthis.closest(\"div.main-tel-box\")){\n        retn = \"긴급출동/사고접수\";\n      }\n\n      // SNS\n      else if (ntmthis && ntmthis.closest(\"div.main-sns-list\")){\n        retn = \"SNS\";\n      }\n      \n      // SNS\n      else if (ntmthis && ntmthis.closest(\"div.main-guaranteed-box\")){\n        retn = \"보장분석\";\n      }\n\n      //메인 상품\n      else if (ntmthis && ntmthis.closest(\"div.main-product-box\")){\n        retn = ntmthis && ntmthis.closest(\"section\");\n        retn = retn && retn.querySelector(\"div.main-title h2.tit\");\n        retn = retn && retn.innerText;\n      }\n    }\n    retn = retn ? retn.replace(/\\s+/g,\"\") : \"false\";\n    //console.log(\"%c [Tag] 영역명 ::\" + retn, \"color:blue\");\n    return retn;\n  }\n  catch(e) {\n    //console.log(\"%c error ::\" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1706604585476,"userId":"nethru2","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10009","name":"BB_001_clickNm_메인클릭명","description":null,"code":"function() {\n  try{\n    var ntmthis = Ntm.Variable.get(\"clickElement\");\n    var retn = \"\";\n    var clickbtn =\"\";\n    var header = \"\";\n    var main = window.location.pathname.indexOf(\"mainView\");\n    var path = ntmthis && ntmthis.closest(\"div.btn-group\");\n    var qck = ntmthis && ntmthis.closest(\"div.quick-menu\");\n    var nav = ntmthis && ntmthis.closest(\"nav.main-nav\");\n    var mml = ntmthis && ntmthis.closest(\"div.main-menu-list\");\n    var mpl = ntmthis && ntmthis.closest(\"div.main-product-list\");\n    var mpb = ntmthis && ntmthis.closest(\"div.main-product-box\");\n    var mgbox = ntmthis && ntmthis.closest(\"div.main-guaranteed-box\");\n    var mgban = ntmthis && ntmthis.closest(\"div.main-guaranteed-bann\");\n    var msns = ntmthis && ntmthis.closest(\"div.main-sns-list\");\n    var mpop = ntmthis && ntmthis.closest(\"div.popup-content\");\n    var mprb = ntmthis && ntmthis.closest(\"div.main-promotion-bann\");\n\n\n    if ( main > -1){\n      // 메인팝업 // 프로모션배너(우측상단)\n      if (mpop || mprb){\n        retn = ntmthis && ntmthis.closest(\"a\");\n        retn = retn && retn.title;\n      }\n\n      // 좌측메뉴 // 퀵메뉴(메인만) // SNS \n      else if (nav || qck || msns){\n        retn = ntmthis && ntmthis.innerText; \n      }\n\n      // 인기상품\n      else if(mpl){\n        retn = ntmthis && ntmthis.closest(\"a\");\n        retn = ntmthis && ntmthis.querySelector(\"strong.tit\");\n        retn = retn && retn.innerText;\n      }\n\n      // 메인 상품  \n      else if (mpb){\n        if (cls && cls.closest(\"div.btn-group\")){\n          var cls = ntmthis && ntmthis.closest(\"a\");\n          // 버튼 내장형 상품 타이틀      \n          var tit = cls && cls.closest(\"div.main-product-box\");\n          tit = tit && tit.querySelector(\"strong\");\n          tit = tit && tit.innerText;\n          // 버튼명\n          cls = cls && cls.innerText;\n          // 타이틀 + 버튼명\n          console.log(\"%c [Tag] 메인상품 ::\" + tit, \"color:blue\");\n          retn = tit +\"__\"+ cls;\n        }\n        else {\n          retn = ntmthis && ntmthis.closest(\"a\");\n          retn = ntmthis && ntmthis.querySelector(\"strong\");\n          retn = retn && retn.innerText;\n        }\n      }\n\n      // 메인 상품(자동차보험만)\n      else if (path){\n        // 긴급출동, 사고접수\t\n        if (path.closest(\"div.main-tel-box\")){\n          retn = ntmthis && ntmthis.innerText;\n        }\n        else {\n          clickbtn = ntmthis && ntmthis.innerText;\n          header = ntmthis && ntmthis.closest(\"div.inner\");\n          header = header && header.querySelector(\"strong.tit\").innerText;        \n          retn = header +\"_\"+clickbtn;\n        }\n      }\n\n      // 보장분석 클릭버튼\n      else if (mgbox){\n        retn = ntmthis && ntmthis.innerText;\n      }\n\n      // 보장분석 배너\n      else if (mgban){\n        retn = ntmthis && ntmthis.querySelector(\"strong.tit\");\n        retn = retn && retn.innerText;\n      }\n\n      // 자주사용하는 메뉴\n      else if (mml){\n        retn = ntmthis && ntmthis.querySelector(\"strong.tit\");\n        retn = retn && retn.innerText;\n      }\n\n    }\n    retn = retn ? retn.replace(/\\s*/g,'') : \"\" ;\n    //console.log(\"%c [Tag] 메인클릭명 ::\" + retn, \"color:blue\");\n    return retn;  \n  }\n  catch(e){\n    //console.log(\"%c error ::\" + e.message,\"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1706765076736,"userId":"nethru2","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10010","name":"BB_006_sign_이어하기","description":null,"code":"function() {\n  try{\n    var retn = \"\";\n    var txt = \"\";\n    var ntmthis = Ntm.Variable.get(\"clickElement\");\n    var path = ntmthis && ntmthis.closest(\"div.btn-area\");\t\t\t\t// 해당 조건에 걸리는 버튼 다수 (현재는 트리거 조건때문에 안걸림)\n    txt = ntmthis && ntmthis.innerText;\n    if ((path)&&(txt.indexOf(\"이어서 가입하기\") > -1)){\n      retn = txt;\n    }\n    retn = retn ? retn.replace(/\\s+/g,\"\") : \"\";\n    //console.log(\"%c [Tag] sign ::\" + retn, \"color:blue\");\n    return retn;\n  }\n  catch(e){\n  }\n}","approval":"DONE","logs":[{"time":1706776156655,"userId":"nethru2","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10013","name":"BB_007_joinBtn_가입방식_button","description":null,"code":"function() {\n  try{\n    var retn = \"false\";\n    var next = Ntm.Variable.get(\"clickElement\");\n    var target = next && next.closest(\"button\");\n    var slct = document.querySelector(\"div.car-menu > div.car-list button.active\");\n    slct = slct && slct.innerText;\n\n    if (slct) {\n      if (slct.indexOf(\"갱신\") > -1){\n        retn = \"갱신\";\n      } else if (slct.indexOf(\"구매\") > -1){\n        retn = \"신규\";\n      }\n      //console.log(\"%c [Tag] 가입방식 ::\" + retn, \"color:blue\");\n    }\n    retn = retn ? retn.replace(/\\s*/g,'') : \"false\" ;\n    return retn;  \n  }\n\n  catch(e){\n    //console.log(\"%c [Tag] 가입방식 error ::\" + e.message,\"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1707367939619,"userId":"admin","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10014","name":"AA_002_pdcCd_상품코드_숫자","description":null,"code":"function() {\n  try{\n    var url = window.location.pathname;\n    var splt_pdc = window.location.search.split(\"searchPdcCd=\")[1];\n    splt_pdc = splt_pdc ? splt_pdc.split(\"&\")[0] : \"\";\n    var retn = \"\";\n\n    var p_pdc = document.querySelectorAll(\"[name=searchPdcCd]\");\n    var s_pdc = document.querySelectorAll(\"[name=pdcCd]\");\n    var pdc_len = p_pdc.length ? p_pdc.length : s_pdc.length;\n    var pdccd = \"\";\n    for(i=0; i < pdc_len; i++){\n      if (p_pdc[i]){\n        pdccd = p_pdc[i].value;\n      }\n      else if (s_pdc[i]){\n        pdccd = s_pdc[i].value;\n      }\n    }\n\n    if(Ntm){\n      // 초기화 (메인, 이어하기)\n      if (url.indexOf(\"mainView\") > -1 \n          || url.indexOf(\"conplanView\") > -1\n          || url.indexOf(\"atarc/step1/formStepPreView\") > -1\n         ) {\n        Ntm.Cookie.set(\"PDCCD\" , \"\" , {path : \"/\"});\n        retn = \"\";\n      }\n      // 코드재발급 : 화면 내 상품코드\n      else if (pdccd){\n        Ntm.Cookie.set(\"PDCCD\" , pdccd , {path : \"/\"});\n        retn = pdccd;\n      }\n      // 코드재발급 : URL 파라미터에 상품코드\n      else if (splt_pdc){\n        Ntm.Cookie.set(\"PDCCD\" , splt_pdc , {path : \"/\"});\n        retn = splt_pdc;\n      }\n      // 코드유지 : 쿠키 상품코드\n      else {\n        retn = Ntm.Cookie.get(\"PDCCD\");\n      }\n    }\n\n    //console.log(\"%c [Tag] pdcCd  :: \" + retn, \"color:blue\");\n    return retn;\n\n  }\n  catch(e){\n    //console.log(\"%c [Tag] pdcCd 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1708577070924,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10015","name":"AA_003_pdcDvcd_상품코드_영문","description":null,"code":"function() {\n  try{\n    var url = window.location.pathname;\n    var retn = \"\";\n\n    var param_dvcd = window.location.search.split(\"pdcDvcd=\")[1];\n    param_dvcd = param_dvcd ? param_dvcd.split(\"&\")[0] : \"\";\n\n    var mcar_dvcd = window.location.search.indexOf(\"multiCalcYn\");\n\n    var lnb = document.querySelector(\"div.car-menu\");\n    lnb = lnb ? lnb.innerText : \"\";\n\n    // 화면(CSS요소) 내 pdcDvcd 체크\n    var pdc = document.querySelectorAll(\"[name=pdcDvcd]\");\n    var pdvcd = \"\";\n    for(i=0; i<pdc.length; i++){\n      if (pdc[i].value){\n        pdvcd = pdc[i].value;\n      }\n    }\n\n    if(window.Ntm){\n      // 값 초기화 (메인, 이어하기)\n      if (url.indexOf(\"mainView\") > -1 || url.indexOf(\"conplanView\") > -1 ) \n      {\n        Ntm.Cookie.set(\"PDCDVCD\" , \"\" , {path : \"/\"});\n        retn = \"\";\n      }\n      // 코드재발급 : URL 파라미터에 상품코드\n      else if (param_dvcd){\n        Ntm.Cookie.set(\"PDCDVCD\" , param_dvcd , {path : \"/\"});\n        retn = param_dvcd;\n      }\n      // 자동차 (법인)\n      else if (url.indexOf(\"/copr/atarc/\") > -1){\n        // 다수차량 동시가입 (1단계 URL이 일반과 동일)\n        if (mcar_dvcd > -1){\n          Ntm.Cookie.set(\"PDCDVCD\" , \"m_car\" , {path : \"/\"});\n          retn = \"m_car\";\n        }\n        // 다수차량 동시가입 (법인)\n        else if (url.indexOf(\"/copr/atarc/multi/\") > -1){\n          Ntm.Cookie.set(\"PDCDVCD\" , \"m_car\" , {path : \"/\"});\n          retn = \"m_car\";\n        }\n        else{\n          Ntm.Cookie.set(\"PDCDVCD\" , \"c_car\" , {path : \"/\"});\n          retn = \"c_car\";\n        }\n      }\n      // 이륜차 (법인)\n      else if (url.indexOf(\"/copr/mtcc/\") > -1){\n        Ntm.Cookie.set(\"PDCDVCD\" , \"c_mtcc\" , {path : \"/\"});\n        retn = \"c_mtcc\";\n      }\n      // 이륜차 (개인)\n      else if (url.indexOf(\"/at/prd/mtcc/\") > -1){\n        Ntm.Cookie.set(\"PDCDVCD\" , \"m_mtcc\" , {path : \"/\"});\n        retn = \"m_mtcc\";\n      }\n      // 자동차 (개인) - step1\n      else if (url.indexOf(\"/at/prd/atarc/step1\") > -1\n               || url.indexOf(\"/at/prd/atarc/step2\") > -1\n               || url.indexOf(\"/at/prd/atarc/step3\") > -1\n               || url.indexOf(\"/at/prd/atarc/step4\") > -1\n              ){\n        Ntm.Cookie.set(\"PDCDVCD\" , \"a_car\" , {path : \"/\"});\n        retn = \"a_car\";\n      }\n      // 코드재발급 : 화면 내 상품코드\n      else if (pdvcd){\n        Ntm.Cookie.set(\"PDCDVCD\" , pdvcd , {path : \"/\"});\n        retn = pdvcd;\n      }\n      // 기타 페이지 : 발급된 코드유지\n      else {\n        retn = Ntm.Cookie.get(\"PDCDVCD\");\n      }\n    }\n    //console.log(\"%c [Tag] pdcDvcd  :: \" + retn, \"color:blue\");\n    return retn;\n  }\n\n  catch(e){\n    //console.log(\"%c [Tag] pdcDvcd 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1708577364804,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10016","name":"CC_001_PATH_level_01","description":null,"code":"function() {\n  try{\n    var wlp = window.location.pathname.split('/');\n    var plv = wlp && wlp[1];\n    \n    if (plv){\n      if (plv.indexOf(\".do\") == -1){\n        //console.log(\"%c [Tag] Path Level 01 :: \" + plv, \"color:blue\");\n        return plv;\n      }\n    }\n  }\n  catch(e){\n    //console.log(\"%c [Tag] Path Level 01 || 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1708934932695,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10017","name":"CC_002_PATH_level_02","description":null,"code":"function() {\n  try{\n    var wlp = window.location.pathname.split('/');\n    var plv = wlp && wlp[2];\n    \n    if (plv){\n      if (plv.indexOf(\".do\") == -1){\n        //console.log(\"%c [Tag] Path Level 02 :: \" + plv, \"color:blue\");\n        return plv;\n      }\n    }\n  }\n  catch(e){\n    //console.log(\"%c [Tag] Path Level 02 || 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1708934935494,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10018","name":"CC_003_PATH_level_03","description":null,"code":"function() {\n  try{\n    var wlp = window.location.pathname.split('/');\n    var plv = wlp && wlp[3];\n    \n    if (plv){\n      if (plv.indexOf(\".do\") == -1){\n        //console.log(\"%c [Tag] Path Level 03 :: \" + plv, \"color:blue\");\n        return plv;\n      }\n    }\n  }\n  catch(e){\n    //console.log(\"%c [Tag] Path Level 03 || 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1708934938549,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10019","name":"CC_004_PATH_level_04","description":null,"code":"function() {\n  try{\n    var wlp = window.location.pathname.split('/');\n    var plv = wlp && wlp[4];\n    \n    if (plv){\n      if (plv.indexOf(\".do\") == -1){\n        //console.log(\"%c [Tag] Path Level 04 :: \" + plv, \"color:blue\");\n        return plv;\n      }\n    }\n  }\n  catch(e){\n    //console.log(\"%c [Tag] Path Level 04 || 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1708934941644,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10020","name":"CC_005_PATH_page","description":null,"code":"function() {\n  try{\n    var wlp = window.location.pathname.split('/');\n    \n    for (i=0; i<wlp.length; i++){\n      if(wlp[i].indexOf('.do')){\n        var page = wlp[i];\n      }\n    }\n    //console.log(\"%c [Tag] 페이지 :: \" + page, \"color:blue\");\n    return page;\n  }\n  catch(e){\n    //console.log(\"%c [Tag] 구문오류 || 페이지 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1708934944712,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"STRING","id":"VAR-10021","name":"FF_001_LC_해시문자방지","description":null,"value":"H"},{"type":"STRING","id":"VAR-10022","name":"FF_001_tagType_클릭","description":null,"value":"click"},{"type":"STRING","id":"VAR-10023","name":"FF_001_tagType_페이지","description":null,"value":"page"},{"type":"SCRIPT","id":"VAR-10025","name":"BB_003_clickNm_공통클릭명","description":null,"code":"function() {\n  try{\n    var ntmthis = Ntm.Variable.get(\"clickElement\");\n    var wlp = window.location.pathname.split(\"/\");\n    var page = \"\";\n    var retn = \"\";\n\n    // URL 의 \".do\" 앞 page 명을 추출\n    for (i=0; i < wlp.length; i++){\n      var wlp_pg = wlp[i].indexOf(\".do\");\n      if (wlp_pg > -1){\n        page = wlp[i].split(\".do\")[0];\n      }\n    }\n\n    // 페이지명 조건이 맞는 case 에서 클릭명을 추출 (단, 트리거 조건 내 button 대상)\n    switch (page){\n      case \"movepageView\" : \n        retn = ntmthis && ntmthis.innerText;\n        break;\n      default : \n        retn = \"\";\n        break;\n    }\n\n    retn = retn ? retn.replace(/\\s*/g,'') : \"\" ;\n    //console.log(\"%c [Tag] 공통클릭명 ::\" + retn, \"color:blue\");\n    return retn;  \n  }\n  catch(e){\n    //console.log(\"%c error ::\" + e.message,\"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1709182989806,"userId":"nethru","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10026","name":"BB_004_clickNm_이탈팝업","description":null,"code":"function() {\n  try{\n    var retn = \"false\";\n    var pretxt = \"popup__\";\n    var ntmthis = Ntm.Variable.get(\"clickElement\");\n    // 이탈팝업 내 링크\n    var cls_a = ntmthis && ntmthis.closest(\"a\");\n    // 이탈팝업 내 버튼 (홈 or 계속)\n    var cls_btn = ntmthis && ntmthis.closest(\"#popHome div.btn-area button.btn.btn-l\");\n    \n    if (cls_a){\n      retn = cls_a.title ? cls_a.title : cls_a.innerText;\n    }\n    else if (cls_btn) {\n      retn = cls_btn.innerText ? cls_btn.innerText : \"false\";\n    }\n    else {\n      retn = \"false\";\n    }\n    \n    retn = retn ? pretxt + retn.replace(/\\s+/g,\"\") : \"false\";\n    //console.log(\"%c [Tag] 이탈팝업 ::\" + retn, \"color:blue\");\n    return retn;\n  }\n  catch(e) {\n    //console.log(\"%c [태그]이탈팝업_구문ERROR ::\" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1712106014269,"userId":"82100472","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10027","name":"BB_007_joinBtn_가입방식_page","description":null,"code":"function() {\n  try{\n    var retn = \"\";\n    var target = document.querySelector(\"#divPossessionCar\");\n    target = target && target.classList[1];\n    if (target == \"active\") {\n      retn = \"갱신\";\n    }\n    retn = retn ? retn.replace(/\\s*/g,'') : \"\" ;\n    return retn;  \n  }\n  catch(e){\n    //console.log(\"%c [Tag] 가입방식 error ::\" + e.message,\"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1720671773162,"userId":"82100472","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10028","name":"BB_008_renew_갱신여부","description":null,"code":"function() {\n  try{\n    var retn = \"\";\n    var wlp = window.location.pathname;\n    if(wlp.indexOf(\"step4FormView\") > -1){\n      var target = document.querySelector(\"div.guarantee-view\");\n      target = target && target.innerText;\n      if(target && target.indexOf(\"이전계약\") > -1){\n        retn = \"이전계약비교\";\n      }\n    }\n    retn = retn ? retn.replace(/\\s*/g,'') : \"\" ;\n    return retn;  \n  }\n  catch(e){\n    //console.log(\"%c [Tag] 가입방식 error ::\" + e.message,\"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1720673110804,"userId":"82100472","action":"CONFIRM","comment":""}]},{"type":"SCRIPT","id":"VAR-10029","name":"BB_006_clickNm_이어하기","description":null,"code":"function() {\n  try{\n    var retn = \"false\";\n    var target = Ntm.Variable.get(\"clickElement\");\n    //var tgmain = target && target.closest(\"div.popup.full\");\t    \t\t// 풀팝업 내 버튼 제외 (다른인증방식선택 등..)\n    // var step1_comm = window.location.pathname.indexOf(\"custInfoView\");\t\t// 첫페이지 버튼만 집계 (이어하기)\n    var step1_car = window.location.pathname.indexOf(\"formStepPreView\");\t// 첫페이지 버튼만 집계 (이어하기)\n    var step2_land = window.location.pathname.indexOf(\"movepageView\");\t// 2.자동차정보(계산할 자동차선택) (이어하기)\n    //var plan = window.location.pathname.indexOf(\"conplanView\"); \t// 가입 진행중인 상품\n\n    if (step1_car > -1) {\n      retn = \"이어서가입하기\";\n    } else if (step2_land > -1) {\n      retn = \"이어서가입하기\";\n    }\n\n    retn = retn ? retn : \"false\";\n    //console.log(\"%c [Tag] sign :: \" + retn, \"color:blue\");\n    return retn;\n  }\n  catch(e){\n    // console.log(\"%c [Tag] sign 구문오류 :: \" + e.message, \"color:red\");\n  }\n}","approval":"DONE","logs":[{"time":1720676188322,"userId":"82100472","action":"CONFIRM","comment":""}]}],"variableGroups":[{"id":"VRG-10001","name":"(A type) 공통","desc":"","values":{"chn":"VAR-10004","pdccd":"VAR-10014","pdcdvcd":"VAR-10015","pdcdvnm":"VAR-10006"}},{"id":"VRG-10002","name":"(C type) Full Path","desc":"","values":{"plv_01":"VAR-10016","plv_02":"VAR-10017","plv_03":"VAR-10018","plv_04":"VAR-10019","page":"VAR-10020","hash":"VAR-10021"}}],"lastModified":"2024-07-11 14:47:38","plugins":[{"type":"PLUGIN","id":"VAR-00017","name":"nlogger","description":"넷스루 로깅 모듈"}]};

Ntm.Console = function() {
    var _this = {};

    _this.log = function() {
        if(!Ntm.Preview.isPreviewMode()) return;
        console.log.apply(this, arguments);
    };

    return {
        log: _this.log
    }
}();

Ntm.Cookie = function() {
    var _this = {};

    _this.get = function(key, decode) {
        var map = _this.map(decode);
        var value = map[key];

        return value ? value : "";
    };

    _this.set = function(key, value, options) {
        if(!options) options = {};

        document.cookie = key + '=' + encodeURIComponent(value) + ';' +
            (options.expires ? 'expires=' + options.expires + ';' : '') +
            (options.path ? 'path=' + options.path + ';' : '') +
            (options.domain ? 'domain=' + options.domain : '');
    };

    _this.remove = function(key, options) {
        _this.set(key, "", Ntm.Helper.extend({
            expires: "Thu, 01-Jan-1970 00:00:01 GMT",
            path: "/"
        }, options));
    };

    _this.map = function(decode) {
        var cookies = document.cookie.split(';');
        var cookieMap = {};

        for (var index = 0; index < cookies.length; index++) {
            var cookie = cookies[index].trim();
            if(cookie.length === 0) continue;

            var token = cookie.split('=');
            var key = token.shift();
            var value = token.join("=");

            if(decode) value = decodeURIComponent(value);

            cookieMap[key] = value;
        }

        return cookieMap;
    };

    return {
        get: _this.get,
        set: _this.set,
        remove: _this.remove
    }
}();

Ntm.Variable = function() {
    var _this = {};

    _this.activeTag = null;
    _this.clickEvent = {};
    _this.customData = {};
    _this.addOnData = {
        param: {},
        cookie: {}
    };

    _this.setActiveTag = function(tag) {
        _this.activeTag = tag;
    };

    _this.getActiveTriggers = function() {
        if(!_this.activeTag) return [];

        return _this.activeTag.triggers.map(function(id) {
                return Ntm.Trigger.getById(id);
            }).filter(function(trigger) {
                return trigger.fired;
            });
    };

    _this.setClickEvent = function(event, target, noOverride) {
        if(noOverride && _this.clickEvent.target) return;

        _this.clickEvent = Ntm.Helper.extend(event, {
            target: target
        });
    };

    _this.setClickTarget = function(target) {
        _this.clickEvent = Ntm.Helper.extend(_this.clickEvent, {
            target: target
        });
    };

    _this.setCustomData = function(customData) {
        _this.customData = customData;
    };

    _this.clearClickEvent = function() {
        _this.clickEvent = {};
    };

    _this.clearCustomData = function() {
        _this.customData = {};
    };

    _this.getBuiltinVariable = function(name) {
        switch(name) {
            case "url":
                return window.location.href;

            case "host":
                return window.location.origin;

            case "path":
                return window.location.pathname;

            case "referrer":
                return _this.getReferer();

            case "params":
                return _this.getUrlParams();

            case "paramDict":
                return _this.getUrlParamsAsDict();

            case "title":
                return document.title;

            case "clickElement":
                return _this.getClickElement();

            case "clickId":
                return _this.getClickId();

            case "clickClass":
                return _this.getClickClass();

            case "clickText":
                return _this.getClickText();

            case "clickTag":
                return _this.getClickTag();

            case "hash":
                return window.location.hash;

            case "activeTag":
                return _this.activeTag;

            case "activeTriggers":
                return _this.getActiveTriggers();

            case "customData":
                return _this.customData;
        }

        return null;
    };

    _this.getReferer = function() {
        var ref = self.document ? self.document.referrer : window.document.referrer;
        var parentHref = "";
        var parentRef = "";

        try {
            parentHref = top.document.location.href;
            parentRef = top.document.referrer;
        } catch (e) {
            return ref;
        }

        if(ref === parentHref) return parentRef;

        return ref;
    };

    _this.getPlugin = function(name) {
        return "Ntm.Plugin." + name;
    };

    _this.getUrlParams = function() {
        return decodeURI(window.location.search.substr(1));
    };

    _this.getUrlParamsAsDict = function() {
        var urlParams = _this.getUrlParams();
        return urlParams ? JSON.parse('{"' + decodeURI(urlParams).replace(/&/g, '","').replace(/=/g, '":"') + '"}') : ''
    };

    _this.getCookie = function(key, decode) {
        return Ntm.Cookie.get(key, decode);
    };

    _this.getClickElement = function() {
        return _this.clickEvent.target;
    };

    _this.getClickId = function() {
        if(_this.clickEvent.target) return _this.clickEvent.target.id || "";
        return "";
    };

    _this.getClickClass = function() {
        if(_this.clickEvent.target) return _this.clickEvent.target.className || "";
        return "";
    };

    _this.getClickText = function() {
        if(_this.clickEvent.target) return _this.clickEvent.target.innerText || "";
        return "";
    };

    _this.getClickTag = function() {
        if(_this.clickEvent.target) return _this.clickEvent.target.tagName || "";
        return "";
    };

    _this.getElementValue = function(variable) {
        var element;
        var clickTarget = _this.clickEvent.target;

        switch (variable.selector) {
            case "CLICK":
                element = clickTarget;
                break;

            case "ENTIRE":
                element = document.querySelector(variable.value);
                break;

            case "DESCENDANT":
                if(clickTarget) element = clickTarget.querySelector(variable.value);
                break;

            case "ASCENDANT":
                if(clickTarget) {
                    var tagName = variable.value.toUpperCase();
                    var target = clickTarget.parentElement;
                    var order = 0;

                    while(target) {
                        if(target.tagName.toUpperCase() === tagName) {
                            order++;

                            if(order == variable.order) {
                                element = target;
                                break;
                            }
                        }

                        target = target.parentElement;
                    }
                }
                break;
        }

        return element ? (variable.attribute ? element.getAttribute(variable.attribute) : element.innerText) : undefined;
    };

    _this.addOnParam = function(data) {
        _this.addOnData.param = Ntm.Helper.extend(_this.addOnData.param, data);
    };

    _this.addOnCookie = function(data) {
        _this.addOnData.cookie = Ntm.Helper.extend(_this.addOnData.cookie, data);
    };

    _this.getAddOnData = function() {
        return _this.addOnData;
    };

    _this.clearAddOnData = function() {
        _this.addOnData = {
            param: {},
            cookie: {}
        };
    };

    return {
        get: _this.getBuiltinVariable,
        getPlugin: _this.getPlugin,
        getCookie: _this.getCookie,
        getElementValue: _this.getElementValue,
        setActiveTag: _this.setActiveTag,
        setClickEvent: _this.setClickEvent,
        setClickTarget: _this.setClickTarget,
        setCustomData: _this.setCustomData,
        clearClickEvent: _this.clearClickEvent,
        clearCustomData: _this.clearCustomData,
        addOnParam: _this.addOnParam,
        addOnCookie: _this.addOnCookie,
        getAddOnData: _this.getAddOnData,
        clearAddOnData: _this.clearAddOnData
    }
}();

Ntm.Helper = function() {
    var _this = {};

    _this.stringify = function(obj) {
        return obj.toJSON ? obj.toJSON() : JSON.stringify(obj);
    };

    _this.find = function (values, key, match) {
        for (var index = 0; index < values.length; index++) {
            var value = values[index];
            if (value[key] === match) {
                return value;
            }
        }

        return undefined;
    };

    _this.getVariableById = function (id) {
        return _this.find(Ntm.Settings.variables, "id", id);
    };

    _this.getVariableByName = function(name) {
        return _this.find(Ntm.Settings.variables, "name", name);
    };

    _this.copy = function(obj) {
        if(obj === null || typeof obj !== 'object') return obj;

        const cloned = Array.isArray(obj) ? [] : {};

        for(var key in obj) {
            if(Object.prototype.hasOwnProperty.call(obj, key)) {
                cloned[key] = _this.copy(obj[key]);
            }
        }

        return cloned;
    };

    _this.extend = function() {
        var extended = {};

        for(var index = 0; index < arguments.length; index++) {
            var source = arguments[index];

            for(var prop in source) {
                if(Object.prototype.hasOwnProperty.call(source, prop))
                    extended[prop] = source[prop];
            }
        }

        return extended;
    };

    _this.length = function(obj) {
        var count = 0;

        for(key in obj) {
            count++;
        }

        return count;
    };

    _this.replaceAll = function(text, find, replace) {
        return text ? text.split(find).join(replace) : text;
    };

    _this.isValidSettings = function() {
        return Ntm.Settings.hasOwnProperty("tags") &&
            Ntm.Settings.hasOwnProperty("triggers") &&
            Ntm.Settings.hasOwnProperty("variables");
    };

    return {
        stringify: _this.stringify,
        extend: _this.extend,
        copy: _this.copy,
        length: _this.length,
        find: _this.find,
        replaceAll: _this.replaceAll,
        getVariableById: _this.getVariableById,
        getVariableByName: _this.getVariableByName,
        isValidSettings: _this.isValidSettings
    }
}();

Ntm.Evaluator = function() {
    var _this = {};

    _this.forbiddenChars = "";

    _this.evaluate = function(variable) {
        switch(variable.type) {
            case "BUILTIN":
                return Ntm.Variable.get(variable.name);

            case "PLUGIN":
                return Ntm.Variable.getPlugin(variable.name);

            case "STRING":
            case "NUMBER":
                return variable.value;

            case "COOKIE":
                return Ntm.Variable.getCookie(variable.key);

            case "ELEMENT":
                return Ntm.Variable.getElementValue(variable);

            case "SCRIPT": {
                var result = _this.runScript(_this.evaluateNested(variable.code));
                if(variable.approval && _this.forbiddenChars) {
                    result = result.replace(new RegExp(_this.forbiddenChars, "g"), "");
                }
                return result;
            }

            case "VARIABLE":
                return _this.runScript('function(){return ' + variable.value + '}');
        }

        return null;
    };

    _this.evaluateNested = function(script) {
        var variables = _this.gatherAllVariables(script);

        if(Ntm.Helper.length(variables) > 0) {
            script = _this.replaceVariables(script, variables);
        }

        return script;
    };

    _this.gatherAllVariables = function(script) {
        var regex = /{{([^{}]+)}}/g;
        var variables = {};

        while(true) {
            var match = regex.exec(script);
            if(!match) break;

            var expression = match[0];
            if(variables[expression]) continue;
            var name = match[1];

            variables[expression] = Ntm.Helper.getVariableByName(name) ? name : "";
        }

        return variables;
    };

    _this.replaceVariables = function(script, variables) {
        for(var key in variables) {
            var name = variables[key];
            var expression = name ? ("Ntm.Evaluator.evaluate(Ntm.Helper.getVariableByName('" + name + "'))") : "undefined";
            var variable = Ntm.Helper.getVariableByName(name);

            if(variable && variable.type == "PLUGIN") expression = Ntm.Evaluator.evaluate(variable);
            script = Ntm.Helper.replaceAll(script, key, expression);
        }

        return script;
    };

    _this.runScript = function(script) {
        try {
            return eval("(" + script + ")()");
        }
        catch(e) {
            Ntm.Console.log(e, script);
        }
    };

    return {
        evaluate: _this.evaluate,
        parse: _this.gatherAllVariables
    }
}();

Ntm.Matcher = function() {
    var _this = {};

    _this.matchAll = function(conditions) {
        return !conditions.some(function(condition) {
            var variable = Ntm.Helper.getVariableById(condition.variable);
            var operand1 = Ntm.Evaluator.evaluate(variable);
            var operand2 = condition.value;

            return !_this.match(condition.operator, operand1, operand2);
        });
    };

    _this.match = function(operator, operand1, operand2) {
        switch (operator) {
            case "EQUALS":
                return equals(operand1, operand2);

            case "NOTEQUALS":
                return !equals(operand1, operand2);

            case "CONTAINS":
                return contains(operand1, operand2);

            case "NOTCONTAINS":
                return !contains(operand1, operand2);

            case "STARTSWITH":
                return startsWith(operand1, operand2);

            case "NOTSTARTSWITH":
                return !startsWith(operand1, operand2);

            case "ENDSWITH":
                return endsWith(operand1, operand2);

            case "NOTENDSWITH":
                return !endsWith(operand1, operand2);

            case "MATCHES":
                return match(operand1, operand2);

            case "NOTMATCHES":
                return !match(operand1, operand2);

            case "LESSTHAN":
                return lessThan(operand1, operand2);

            case "LESSTHANOREQUALS":
                return lessThan(operand1, operand2) || equals(operand1, operand2);

            case "GREATERTHAN":
                return greaterThan(operand1, operand2);

            case "GREATERTHANOREQUALS":
                return greaterThan(operand1, operand2) || equals(operand1, operand2);

            case "VALID":
                return !isInvalid(operand1);

            case "INVALID":
                return isInvalid(operand1);

            default:
                return false;
        }

        function equals(operand1, operand2) {
            switch(typeof operand1) {
                case "number":
                    return isNumber(operand2) && operand1 === Number(operand2);

                case "string":
                    return isString(operand2) && operand1.toUpperCase() === operand2.toUpperCase();

                case "boolean":
                    return isBoolean(operand2) && operand1 === toBoolean(operand2);
            }

            return false;
        }

        function contains(operand1, operand2) {
            return isString(operand1) && isString(operand2) &&
                operand1.toUpperCase().indexOf(operand2.toUpperCase()) >= 0;
        }

        function startsWith(operand1, operand2) {
            return isString(operand1) && isString(operand2) &&
                operand1.toUpperCase().indexOf(operand2.toUpperCase()) == 0;
        }

        function endsWith(operand1, operand2) {
            return isString(operand1) && isString(operand2) &&
                operand1.toUpperCase().lastIndexOf(operand2.toUpperCase()) == operand1.length - operand2.length;
        }

        function match(operand1, operand2) {
            if(isNumber(operand1)) operand1 = operand1 + "";
            return isString(operand1) && isString(operand2) && operand1.match(operand2);
        }

        function lessThan(operand1, operand2) {
            return isNumber(operand1) && isNumber(operand2) && Number(operand1) < Number(operand2);
        }

        function greaterThan(operand1, operand2) {
            return isNumber(operand1) && isNumber(operand2) && Number(operand1) > Number(operand2);
        }

        function isNumber(operand) {
            return !isNaN(Number(operand));
        }

        function isString(operand) {
            return typeof operand === "string";
        }

        function isBoolean(operand) {
            return operand === "true" || operand === "false";
        }

        function toBoolean(operand) {
            return operand === "true";
        }

        function isInvalid(operand) {
            return operand === undefined || operand === null || operand.trim() === "";
        }
    };

    return {
        matchAll: _this.matchAll
    }
}();

Ntm.Tag = function() {
    var _this = {};

    _this.isExecutable = function(tag) {
        var triggersFired;

        if (tag.operator === "OR") {
            triggersFired = tag.triggers.some(function (id) {
                return Ntm.Trigger.getById(id).fired;
            });
        } else {
            triggersFired = tag.triggers.every(function (id) {
                return Ntm.Trigger.getById(id).fired;
            });
        }

        var allExceptionsNotFired = tag.exceptions.every(function(id) {
            return !Ntm.Trigger.getById(id).fired;
        });

        return triggersFired && allExceptionsNotFired;
    };

    _this.run = function(tag) {
        if(!tag.enabled || !_this.isExecutable(tag)) return;

        switch(tag.type) {
            case "PLUGIN":
                _this.runPlugin(tag);
                break;

            case "SCRIPT":
                Ntm.Variable.setActiveTag(tag);
                Ntm.Evaluator.evaluate({
                    type: "SCRIPT",
                    code: tag.code
                });
                Ntm.Variable.clearAddOnData();
                break;
        }
    };

    _this.runPlugin = function(t) {
        var tag = Ntm.Helper.copy(t);
        var addOnData = Ntm.Variable.getAddOnData();
        var parameters = variable(Ntm.Helper.extend(tag.parameters, addOnData.param));
        var cookies = variable(Ntm.Helper.extend(tag.cookies, addOnData.cookie));

        tag.type = "SCRIPT";
        tag.code = "function() { {{" + tag.pluginType + "}}.";

        switch(tag.logType) {
            case "EVENT":
                tag.code += "event(" + parameters + "," + cookies + ");";
                break;

            case "USER":
                tag.code += "user(" + parameters + ");";
                break;

            case "ORDER":
                tag.code += "order(" + parameters + ");";
                break;

            case "CANCEL":
                tag.code += "cancel(" + parameters + ");";
                break;

            case "CANCELALL":
                tag.code += "cancelAll(" + parameters + ");";
                break;

            case "CUSTOM":
                tag.code += "log('" + evaluate(tag.path) + "'," + parameters + "," + cookies + ");";
                break;
        }

        tag.code += "}";

        _this.run(tag);

        function variable(obj) {
            var result = '{';

            for(key in obj) {
                var v = Ntm.Helper.getVariableById(obj[key]);
                result += result.length > 1 ? ',' : '';
                result += '"' + key + '":';
                result += v ? ('{{' + v.name + '}}') : Ntm.Helper.stringify(obj[key]);
            }

            result += '}';

            return result;
        }

        function evaluate(script) {
            var variables = Ntm.Evaluator.parse(script);

            for(var key in variables) {
                var variable = Ntm.Helper.getVariableByName(variables[key]);

                if(variable) {
                    var expression = Ntm.Evaluator.evaluate(variable);
                    script = Ntm.Helper.replaceAll(script, key, expression);
                }
            }

            return script;
        }
    };

    _this.runAll = function() {
        Ntm.Settings.tags.forEach(function(tag) {
            _this.run(tag);
        });
    };

    _this.hasTriggerByType = function(tag, event) {
        return tag.triggers.some(function(id) {
            return Ntm.Trigger.getById(id).event === event;
        });
    };

    _this.hasTriggerByField = function(tag, key, value) {
        return tag.triggers.some(function(id) {
            var trigger = Ntm.Trigger.getById(id);
            return trigger[key] == value;
        });
    };

    _this.hasTriggerById = function(tag, id) {
        return tag.triggers.includes(id);
    };

    _this.getAllTriggerIds = function(tag) {
        var result = tag.exceptions ? tag.exceptions : [];
        return result.concat(tag.triggers);
    };

    return {
        run: _this.run,
        runAll: _this.runAll,
        hasTriggerByType: _this.hasTriggerByType,
        hasTriggerByField: _this.hasTriggerByField,
        hasTriggerById: _this.hasTriggerById,
        getAllTriggerIds: _this.getAllTriggerIds
    }
}();

Ntm.Trigger = function() {
    var _this = {};

    _this.settings = Ntm.Settings;

    _this.init = function(event) {
        _this.settings.triggers.forEach(function(trigger) {
            if(event && event !== trigger.event) return;
            trigger.fired = false;
        });
    };

    _this.getById = function(id) {
        return Ntm.Helper.find(_this.settings.triggers, "id", id);
    };

    _this.listByEvent = function(event) {
        var result = [];

        _this.settings.triggers.forEach(function(trigger) {
            if(trigger.event === event) result.push(trigger);
        });

        return result;
    };

    _this.listByReferedEvent = function(event) {
        var triggers = _this.listByEvent(event);

        return triggers.filter(function(trigger) {
            return _this.settings.tags
                .filter(function(tag) {
                    return tag.enabled;
                })
                .some(function(tag) {
                    return Ntm.Tag.hasTriggerById(tag, trigger.id);
                });
        });
    };

    return {
        init: _this.init,
        getById: _this.getById,
        listByEvent: _this.listByEvent,
        listByReferedEvent: _this.listByReferedEvent
    }
}();

Ntm.Event = function() {
    var _this = {};

    _this.NTM_READY = "NTMREADY";
    _this.PAGE_LOADED = "PAGELOADED";
    _this.WINDOW_LOADED = "WINDOWLOADED";
    _this.DOM_READY = "DOMREADY";
    _this.ELEMENT_CLICKED = "ELEMENTCLICKED";
    _this.CLICKED = "CLICKED";
    _this.URL_CHANGED = "URLCHANGED";
    _this.HASH_CHANGED = "HASHCHANGED";
    _this.CUSTOM = "CUSTOM";

    _this.CUSTOM_HANDLING_DELAY = 100;
    _this.clickHandlingDelay = 2;

    _this.eventBindings = [];
    _this.rebindTimer = null;
    _this.timoutId = null;

    _this.init = function() {
        _this.register();

        if(document.readyState === 'interactive' || document.readyState === 'complete') _this.onDomReady();
        else {
            document.addEventListener("DOMContentLoaded", function() {
                _this.onDomReady();
            });
        }

        window.addEventListener("load", function() {
            _this.onWindowLoaded();
        });

        window.addEventListener("hashchange", function(event) {
            _this.onHashChanged(event);
        });

        window.addEventListener("pushstate", function(event) {
            _this.onUrlChanged(event);
        });

        window.addEventListener("popstate", function(event) {
            _this.onUrlChanged(event);
        });
    };

    _this.register = function() {
        window.history.pushState = overrideHistoryState(window.history.pushState);
        window.history.replaceState = overrideHistoryState(window.history.replaceState);

        function overrideHistoryState(func) {
            var _func = func;

            return function(state, title, url) {
                var result = _func.apply(history, arguments);
                var event = new CustomEvent("pushstate", {
                    detail: {
                        state: state,
                        title: title,
                        url: url
                    }
                });

                window.dispatchEvent(event);
                return result;
            };
        }
    };

    _this.registerObserver = function() {
        var interval = 0;
        
        if(interval <= 0 && window.MutationObserver) {
            var observer = new MutationObserver(function(mutations) {
                clearTimeout(_this.rebindTimer);
                _this.rebindTimer = setTimeout(_this.rebind, 100);
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        else setInterval(_this.rebind, interval > 0 ? interval : 1000);
    };

    _this.bind = function() {
        document.addEventListener("click", function(event) {
            _this.handleForClick(event, event.target);
        });
    };

    _this.rebind = function() {
        _this.eventBindings.forEach(function(binding) {
            binding.handler(null, binding.target);
        });

        _this.eventBindings = [];

        var triggers = Ntm.Trigger.listByReferedEvent(_this.ELEMENT_CLICKED);

        triggers.forEach(function(trigger) {
            var elements = _this.querySelectorAll(trigger.selector);

            for (var i = 0; i < elements.length; i++) {
                var handler = function(event, target) {
                    if(target) target.removeEventListener("click", arguments.callee);
                    else _this.handleForElementClick(event, event.currentTarget, trigger);
                };

                elements[i].addEventListener("click", handler);

                _this.eventBindings.push({
                    "target": elements[i],
                    "handler": handler
                });
            }
        });

        //Ntm.Console.log("rebinded: " + _this.eventBindings.length);
    };

    _this.querySelectorAll = function(selector) {
        var elements = [];


        _this.querySelectorAllAsArray(document, selector).forEach(function(element) {
            elements.push(element);
        });

        _this.querySelectorAllAsArray(document, "iframe").forEach(function(iframe) {
            try {
                _this.querySelectorAllAsArray(iframe.contentWindow.document, selector).forEach(function (element) {
                    elements.push(element);
                });
            }
            catch(e) {
                Ntm.Console.log("cannot bind events because of CORS problems");
            }
        });

        return elements;
    };

    _this.querySelectorAllAsArray = function(documentBase, selector) {
        var elements = documentBase.querySelectorAll(selector);
        if(elements.forEach === undefined) elements = Array.prototype.slice.call(elements);
        return elements ? elements : [];
    };

    _this.onNtmReady = function() {
        Ntm.Console.log('%c EVENT >> NTMREADY ', 'background:#2196F3;color:white');
        window.dispatchEvent(new Event(_this.NTM_READY));
    };

    _this.onPageLoaded = function() {
        Ntm.Console.log('%c EVENT >> PAGELOADED ', 'background:#2196F3;color:white');
        _this.handle(_this.PAGE_LOADED);
    };

    _this.onDomReady = function() {
        Ntm.Console.log('%c EVENT >> DOMREADY ', 'background:#2196F3;color:white');
        _this.registerObserver();
        _this.bind();
        _this.rebind();
        _this.handle(_this.DOM_READY);
    };

    _this.onWindowLoaded = function() {
        Ntm.Console.log('%c EVENT >> WINDOWLOADED ', 'background:#2196F3;color:white');
        _this.handle(_this.WINDOW_LOADED);
    };

    _this.onUrlChanged = function() {
        Ntm.Console.log('%c EVENT >> URLCHANGED ', 'background:#2196F3;color:white');
        _this.handle(_this.URL_CHANGED);
    };

    _this.onHashChanged = function() {
        Ntm.Console.log('%c EVENT >> HASHCHANGED ', 'background:#2196F3;color:white');
        _this.handle(_this.HASH_CHANGED);
    };

    _this.handle = function(eventType, trigger) {
        var triggers = trigger ? [trigger] : Ntm.Trigger.listByEvent(eventType);

        triggers.forEach(function(trigger) {
            if(Ntm.Matcher.matchAll(trigger.conditions)) trigger.fired = true;
        });

        if(!trigger) {
            Ntm.Settings.tags.forEach(function(tag) {
                if(!Ntm.Tag.hasTriggerByType(tag, eventType)) return;
                Ntm.Tag.run(tag);
            });
        }
    };

    _this.handleForElementClick = function(event, target, trigger) {
        Ntm.Console.log('%c EVENT >> %s ', 'background:#2196F3;color:white', _this.ELEMENT_CLICKED, event.clientX, event.clientY, target);

        Ntm.Variable.setClickEvent(event, target);
        _this.handle(_this.ELEMENT_CLICKED, trigger);

        if(_this.clickHandlingDelay > 0) _this.timoutId = setTimeout(_this.runForClick, _this.clickHandlingDelay);
        else _this.runForClick();
    };

    _this.handleForClick = function(event, target) {
        Ntm.Console.log('%c EVENT >> %s ', 'background:#2196F3;color:white', _this.CLICKED, event.clientX, event.clientY, target);

        Ntm.Variable.setClickEvent(event, target, true);

        Ntm.Settings.tags.forEach(function(tag) {
            Ntm.Tag.getAllTriggerIds(tag).forEach(function(triggerId) {
                var trigger = Ntm.Trigger.getById(triggerId);

                if(!trigger.event || trigger.event !== _this.CLICKED) return;
                if(_this.match(trigger.target) && Ntm.Matcher.matchAll(trigger.conditions)) trigger.fired = true;
            });
        });

        _this.runForClick();
    };

    _this.runForClick = function() {
        if(_this.timoutId) {
            clearTimeout(_this.timoutId);
            _this.timoutId = null;
        }

        Ntm.Settings.tags.forEach(function(tag) {
            if(!Ntm.Tag.hasTriggerByType(tag, _this.CLICKED) && !Ntm.Tag.hasTriggerByType(tag, _this.ELEMENT_CLICKED)) return;
            Ntm.Tag.run(tag);
        });

        Ntm.Trigger.init(_this.CLICKED);
        Ntm.Trigger.init(_this.ELEMENT_CLICKED);
        Ntm.Variable.clearClickEvent();
    };

    _this.handleForUserDefined = function(name, data) {
        Ntm.Console.log('%c EVENT >> CUSTOM : ', 'background:#2196F3;color:white', name, data);

        Ntm.Trigger.init(_this.CUSTOM);
        Ntm.Variable.setCustomData(data);

        Ntm.Trigger.listByEvent(_this.CUSTOM).forEach(function(trigger) {
            if(trigger.eventName === name && Ntm.Matcher.matchAll(trigger.conditions)) trigger.fired = true;
        });

        Ntm.Settings.tags.forEach(function(tag) {
            if(!Ntm.Tag.hasTriggerByField(tag, "eventName", name)) return;
            Ntm.Tag.run(tag);
        });

        Ntm.Variable.clearCustomData();
    };

    _this.match = function(tagName) {
        if(tagName) {
            var target = Ntm.Variable.get("clickElement");

            while(target) {
                if(target.tagName.toUpperCase() === tagName.toUpperCase()) {
                    Ntm.Variable.setClickTarget(target);
                    return true;
                }

                target = target.parentElement;
            }

            return false;
        }

        return true;
    };

    return {
        init: _this.init,
        fireNtmReady: _this.onNtmReady,
        firePageLoaded: _this.onPageLoaded,
        fireClicked: function(event) {
            _this.handleForClick(event, event.target);
        },
        fireUserDefined: function(name, data) {
            setTimeout(function() {
                _this.handleForUserDefined(name, data);
            }, _this.CUSTOM_HANDLING_DELAY);
        }
    }
}();

Ntm.Preview = function() {
    var _this = {
        previewMode: false,
        containerId: ""
    };

    _this.init = function(preview, id) {
        if(!preview) Ntm.Cookie.remove(id);

        _this.previewMode = preview;
        _this.containerId = id;

        if(!preview) return;

        _this.showPreviewBanner();
    };

    _this.showPreviewBanner = function() {
        var frame = _this.makeFrame();

        var lastNode = document.body && document.body.lastChild || document.body || document.head;
        lastNode.parentNode.insertBefore(frame, lastNode);

        var frameDocument = frame.document;
        if (frame.contentDocument) frameDocument = frame.contentDocument;
        else if (frame.contentWindow) frameDocument = frame.contentWindow.document;

        if(frameDocument) {
            var html =
                '<p style="float:left; padding-left:20px; font-size:15px; font-weight: bold; margin-top:12px">미리보기 모드</p>' +
                '<p style="float:right; padding-right:20px; font-size:12px; margin-top:15px">최근 수정: ' + Ntm.Settings.lastModified + '</p>';

            frameDocument.open();
            frameDocument.writeln(html);
            frameDocument.close();
        }

        Ntm.Console.log('%c PREVIEW MODE ', 'background:#F44336;color:white');
    };

    _this.isPreviewMode = function() {
        return _this.previewMode;
    };

    _this.getContainerId = function() {
        return _this.containerId;
    };

    _this.makeFrame = function() {
        var iframe = document.createElement('iframe');
        iframe.src = 'about:blank';
        iframe.style.position = 'fixed';
        iframe.style.width = '100%';
        iframe.style.height = '60px';
        iframe.style.bottom = '0';
        iframe.style.borderTop = '1px solid #eee';
        iframe.style.borderRight = '0';
        iframe.style.borderLeft = '0';
        iframe.style.borderBottom = '0';
        iframe.style.margin = '0';
        iframe.style.padding = '0';
        iframe.style.visibility = 'visible';
        iframe.style.backgroundColor = '#fffacc';
        iframe.style.visible = '1';
        iframe.style.zIndex = '2147483647';
        return iframe;
    };

    return {
        init: _this.init,
        isPreviewMode: _this.isPreviewMode,
        getContainerId: _this.getContainerId
    }
}();

Ntm.Plugin = {};

Ntm.Plugin.nlogger = (function() {
    var _this = {};

    _this.serviceId = "CM_PC";
    _this.baseUrlHttp = "https://weblog.dbuni.co.kr:9370/nlog";
    _this.baseUrlHttps = "https://weblog.dbuni.co.kr:9370/nlog";
    _this.previewServiceId = "wcpreview";
    _this.previewCotainerKey = "nth_cid";
    _this.previewTimeKey = "nth_time";
    _this.cookieKeys = [ {
  "cookie" : "PCID",
  "logging" : "nth_pcid",
  "removable" : false,
  "required" : true,
  "always" : false,
  "builtin" : false
}, {
  "cookie" : "UID",
  "logging" : "notused",
  "removable" : false,
  "required" : false,
  "always" : false,
  "builtin" : false
}, {
  "cookie" : null,
  "logging" : "nth_sdk",
  "removable" : false,
  "required" : false,
  "always" : false,
  "builtin" : true
}, {
  "cookie" : null,
  "logging" : "nth_locale_lang",
  "removable" : false,
  "required" : true,
  "always" : false,
  "builtin" : true
}, {
  "cookie" : null,
  "logging" : "nth_locale_country",
  "removable" : false,
  "required" : true,
  "always" : false,
  "builtin" : true
}, {
  "cookie" : null,
  "logging" : "nth_resolution",
  "removable" : false,
  "required" : true,
  "always" : false,
  "builtin" : true
}, {
  "cookie" : null,
  "logging" : "nth_screen_id",
  "removable" : false,
  "required" : false,
  "always" : false,
  "builtin" : true
}, {
  "cookie" : null,
  "logging" : "nth_screen_title",
  "removable" : false,
  "required" : true,
  "always" : false,
  "builtin" : true
} ];
    _this.cookieDomain = "directdb.co.kr";

    _this.loggingByXhr = true;
    _this.withCredentials = false;
    _this.requestMethod = "post";
    _this.requestTimeout = 1000;
    _this.requestDelay = 300;
    _this.requestQueueSize = 3;
    _this.requestRetry = true;
    _this.sessionStorageKey = "__nlogger__";

    _this.log = function(path, params, cookies, options, serviceId) {
        _this.send(_this.makeUrl("/log/event", path, params, cookies, serviceId), options);
    };

    _this.event = function(params, cookies, serviceId) {
        _this.send(_this.makeUrl("/log/event", null, params, cookies, serviceId));
    };

    _this.user = function(params) {
        _this.send(_this.makeUrl("/user", null, params));
    };

    _this.order = function(params) {
        _this.send(_this.makeUrl("/order/request", null, params));
    };

    _this.cancel = function(params) {
        _this.send(_this.makeUrl("/order/cancel", null, params));
    };

    _this.cancelAll = function(params) {
        _this.send(_this.makeUrl("/order/cancel-all", null, params));
    };

    _this.send = function(url, options) {
        
        if(_this.loggingByXhr) _this.sendByXhr(url);
        else {
            options = _this.extend({
                async: true,
                onSuccess: null,
                onError: null,
                callBackTimeOutAsMillis: 400
            }, options);

            _this.sendByTag(url, options);
        }
    };

    _this.makeUrl = function(action, path, params, cookies, serviceId) {
        var preview = Ntm.Preview.isPreviewMode();
        var baseUrl = window.location.protocol === "https:" ? _this.baseUrlHttps : _this.baseUrlHttp;
        var query = _this.toQueryString(params, true);
        var url = window.location.protocol + "//" + _this.getDomainWithPort();
        var hash;

        if(path) url += "/" + path;
        else {
            url += window.location.pathname + window.location.search;

            if(window.location.hash) {
                if(!window.location.search || window.location.hash.indexOf("?") >=0) url = window.location.href;
                else hash = window.location.hash;
            }
        }

        if(query) {
            url += url.indexOf("?") < 0 ? "?" : "&";
            url += query;
        }

        if(hash) url += hash;

        cookies = _this.extend(cookies, _this.getCookies());

        addCookie('nth_sdk', 'WEB');
        addCookie('nth_locale_lang', _this.getLocaleLanguage());
        addCookie('nth_locale_country', _this.getLocaleCountry());
        addCookie('nth_resolution', _this.getResolution());
        addCookie('nth_screen_id', document.location.pathname);
        addCookie('nth_screen_title', document.title);

        

        if(preview) {
            addCookie(_this.previewCotainerKey, Ntm.Preview.getContainerId());
            addCookie(_this.previewTimeKey, new Date().getTime());
        }

        params = {
            s: preview ? _this.previewServiceId : (serviceId ? serviceId : _this.serviceId),
            u: url,
            r: _this.getReferer(),
            a: navigator.userAgent.replace(/\"/gi, ""),
            c: _this.toCookieString(cookies, true),
            v: _this.cacheBuster()
        };

        return baseUrl + action + "?" + _this.toQueryString(params, true);

        function addCookie(key, value) {
            if(!isReserved(key) && !isRequired(key)) return;

            var cookie = {};
            cookie[key] = value;

            cookies = _this.extend(cookie, cookies);
        }

        function isReserved(loggingKey) {
            return loggingKey === _this.previewCotainerKey || loggingKey === _this.previewTimeKey;
        }

        function isRequired(loggingKey) {
            for (var index = 0; index < _this.cookieKeys.length; index++) {
                var cookieKey = _this.cookieKeys[index];
                if (cookieKey.logging === loggingKey) return cookieKey.required;
            }

            return false;
        }
    };

    _this.getReferer = function() {
        var ref = self.document ? self.document.referrer : window.document.referrer;
        var parentHref = "";
        var parentRef = "";

        try {
            parentHref = top.document.location.href;
            parentRef = top.document.referrer;
        } catch (e) {
            return ref;
        }

        if(ref === parentHref) return parentRef;

        return ref;
    };

    _this.getDomainWithPort = function() {
        var port = location.port;
        if (port === undefined || port === "" || port === "0" || port === 0) return document.domain;
        return document.domain + ":" + port;
    };

    _this.getDomain = function() {
        var domain = document.domain;
        if(_this.isIpType(domain)) return domain;

        var tokens = domain.split('.');
        var length = tokens.length;
        if(length !== 4 && length !== 3) return domain;

        var dm = tokens[length - 2] + '.' + tokens[length - 1];
        return tokens[length - 1].length === 2 ? tokens[length - 3] + '.' + dm : dm;
    };

    _this.isIpType = function(domain) {
        var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(domain);
    };

    _this.getResolution = function() {
        var screenSize = "";
        var screen = window.screen;

        if(screen != null && typeof screen === "object") {
            screenSize = screen.width + "x" + screen.height;
        }

        return screenSize;
    };

    _this.getLocaleLanguage = function() {
        var tokens = _this.getLanguage().split("-");
        return tokens.length > 0 ? tokens[0] : "";
    };

    _this.getLocaleCountry = function() {
        var tokens = _this.getLanguage().split("-");
        return tokens.length > 1 ? tokens[1] : "";
    };

    _this.getLanguage = function() {
        var language = "-";
        var navigator = window.navigator;

        if(navigator.language) language = navigator.language.toLowerCase();
        else if(navigator.userLanguage) language = navigator.userLanguage.toLowerCase();

        return language;
    };

    _this.getCookies = function() {
        var result = {};

        for(var index = 0; index < _this.cookieKeys.length; index++) {
            var keyPair = _this.cookieKeys[index];

            if(keyPair.builtin) continue;

            var value = _this.getCookie(keyPair.cookie);

            if(!value) {
                if(!keyPair.required) continue;
                value = _this.generateUuid();
                setUuid(keyPair.cookie, value);
                if(!keyPair.always) continue;
            }

            if(keyPair.required) setUuid(keyPair.cookie, value);

            result[keyPair.logging] = value;
        }

        return result;

        function setUuid(key, value) {
            var date = new Date();
            var options = {
                path: "/",
                expires: date
            };

            if(!_this.cookieDomain) options.domain = _this.getDomain();
            else if(_this.cookieDomain !== "default") options.domain = _this.cookieDomain;

            date.setFullYear(date.getFullYear() + 10);
            _this.setCookie(key, value, options);
        }
    };

    _this.getCookie = function(key) {
        var result = new RegExp('(?:^|; )' + key + '=([^;]*)').exec(document.cookie);
        return (result != null) ? decodeURIComponent(result[1]) : null;
    };

    _this.setCookie = function(key, value, options) {
        if(!options) options = {};

        var expires = options.expires;
        var path = options.path;
        var domain = options.domain;

        document.cookie = key + '=' + encodeURIComponent(value) + ';' +
            (expires ? 'expires=' + expires.toUTCString() + ';' : '') +
            (path ? 'path=' + path + ';' : '') +
            (domain ? 'domain=' + domain : '');
    };

    _this.deleteCookie = function(key) {
        document.cookie = key + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
    };

    _this.generateUuid = function() {
        var result = "";

        if(typeof window.crypto != 'undefined' && typeof window.crypto.getRandomValues != 'undefined') {
            var buf = new Uint16Array(8);
            window.crypto.getRandomValues(buf);
            var S4 = function (num) {
                var ret = num.toString(16);
                while (ret.length < 4) {
                    ret = "0" + ret;
                }
                return ret;
            };

            result = (S4(buf[0]) + S4(buf[1]) + "-" + S4(buf[2]) + "-"
            + S4(buf[3]) + "-" + S4(buf[4]) + "-" + S4(buf[5])
            + S4(buf[6]) + S4(buf[7]));
        }
        else {
            result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r
                        : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
        }

        return result + '-' + new Date().getTime();
    };

    _this.sendByTag = function(url, options) {
        var element = _this.createScriptElement(url, options);
        _this.appendElement(element);
        _this.removeElement(element);
    };

    _this.sendByXhr = function(url) {
        try {
            _this.addRequest(url);
            _this.sendAllRequests();
        } catch(e) {
            console.log("send error", e);
        }
    };

    _this.createScriptElement = function(src, options) {
        var element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = src;
        element.async = options.async;
        element.charset = 'UTF-8';

        if(options.onSuccess) {
            if(typeof element.onreadystatechange !== 'undefined') {
                element.onreadystatechange = function() {
                    if(this.readyState === 'complete' || this.readyState === 'loaded')
                        setTimeout(options.onSuccess, options.callBackTimeOutAsMillis);
                };
            }
            else {
                element.onload = function() {
                    setTimeout(options.onSuccess, options.callBackTimeOutAsMillis);
                };
            }
        }

        if(options.onError) {
            element.onerror = function() {
                setTimeout(options.onError, options.callBackTimeOutAsMillis);
            };
        }

        return element;
    };

    _this.appendElement = function(element) {
        var ssc = document.getElementsByTagName('script')[0];
        ssc.parentNode.insertBefore(element, ssc);
    };

    _this.removeElement = function(element) {
        if(typeof element.remove === 'function') element.remove();
        else element.parentNode.removeChild(element);   // For IE
    };

    _this.sendAllRequests = function() {
        setTimeout(function() {
            while(true) {
                var request = _this.takeRequest();
                if(!request) break;
                _this.sendRequest(request);
            }
        }, _this.requestDelay);
    };

    _this.sendRequest = function(url) {
        var xhr = _this.createXmlHttpRequest();
        if (!xhr) return false;

        xhr.withCredentials = _this.withCredentials;

        var timer = setTimeout(function() {
            xhr.abort();
        }, _this.requestTimeout);

        if(_this.requestMethod.trim().toLowerCase() === "post") {
            var parts = url.split("?");
            xhr.open("POST", parts[0], true);
            if(xhr.setRequestHeader) xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send(parts[1]);
        }
        else {
            xhr.open("GET", url, true);
            xhr.send(null);
        }

        xhr.onload = function () {
            clearTimeout(timer);
        };

        xhr.onerror = xhr.onabort = function () {
            clearTimeout(timer);
            if(_this.requestRetry) _this.addRequest(url);
        };
    };

    _this.createXmlHttpRequest = function() {
        var xhr;
        var xhrs = [
            function() {return new XDomainRequest()},
            function() {return new XMLHttpRequest()},
            function() {return new ActiveXObject("Msxml2.XMLHTTP")},
            function() {return new ActiveXObject("Msxml3.XMLHTTP")},
            function() {return new ActiveXObject("Microsoft.XMLHTTP")}
        ];

        for (var i = 0; i < xhrs.length; i++) {
            try {
                xhr = xhrs[i]();
            }
            catch (e) {
                continue;
            }
            break;
        }

        return xhr;
    };

    _this.addRequest = function(url) {
        var requests = _this.getRequests();
        if(requests instanceof Array === false || requests.length >= _this.requestQueueSize) return;
        requests.push(url);
        _this.setRequests(requests);
    };

    _this.takeRequest = function() {
        var requests = _this.getRequests();
        var request = (requests instanceof Array && requests.length > 0) ? requests.shift() : undefined;
        _this.setRequests(requests);
        return request;
    }

    _this.clearRequests = function() {
        _this.setRequests([]);
    };

    _this.getRequests = function() {
        var data = sessionStorage.getItem(_this.sessionStorageKey);
        return JSON.parse(data ? data : "[]");
    };

    _this.setRequests = function(requests) {
        sessionStorage.setItem(_this.sessionStorageKey, Ntm.Helper.stringify(requests));
    };

    _this.cacheBuster = function() {
        return Math.round(Math.random() * 1999083012);
    };

    _this.extend = function() {
        var extended = {};

        for(var index = 0; index < arguments.length; index++) {
            var source = arguments[index];

            for(var prop in source) {
                if(Object.prototype.hasOwnProperty.call(source, prop))
                    extended[prop] = source[prop];
            }
        }

        return extended;
    };

    _this.toQueryString = function(obj, skipNull) {
        return _this.objectToString(obj, "&", skipNull);
    };

    _this.toCookieString = function(obj, skipNull) {
        return _this.objectToString(obj, "; ", skipNull);
    };

    _this.objectToString = function(obj, delimeter, skipNull) {
        var result = "";

        for(var prop in obj) {
            if(Object.prototype.hasOwnProperty.call(obj, prop)) {
                if(skipNull && !obj[prop]) continue;

                if(result.length > 0) result += delimeter;
                result += prop + "=" + encodeURIComponent(obj[prop]);
            }
        }

        return result;
    };

    return {
        
        log: _this.log,
        event: _this.event,
        user: _this.user,
        order: _this.order,
        cancel: _this.cancel,
        cancelAll: _this.cancelAll,
        generateUuid: _this.generateUuid
    };
})();



Ntm.Main = function() {
    var disabled = false;
    var preview = false;
    var id = 10001;

    if(Ntm.Main !== undefined || disabled || !Ntm.Helper.isValidSettings()) return false;

    Ntm.Preview.init(preview, id);
    Ntm.Event.fireNtmReady();
    Ntm.Event.firePageLoaded();
    Ntm.Event.init();

    return true;
}();