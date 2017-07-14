/**
 * 全局请求路径
 */


/**
 * 全局httpConfig配置
 */
var httpConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 4000
};

/**
 * 搜索url路径名称
 */
function UrlSearch() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.lastIndexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}

/**
 * 全局解释userId与token
 */
//function extractParamsFromUrl() {
//    var request = new UrlSearch();
//    return "?userId=" + request.userId + "&token=" + request.token;
//}

/**
 * 弹出全局网络请求错误
 */
function showGlobalNetworkError() {
    document.getElementById("globalNetworkError").style.display = "table";
}
/**
 * 关闭全局网络请求错误
 */
function closeGlobalNetworkError() {
    document.getElementById("globalNetworkError").style.display = "none";
    if (localStorage.getItem("index")) {
        window.location.href = cmbLocation;
        localStorage.removeItem("index");
    }
}

/**
 * 等待加载(loading)
 */
//类Jquery封装show/hide方法
function hide(objid) {
    document.getElementById(objid).style.display = "none";
}
function show(objid) {
    document.getElementById(objid).style.display = "block";
}
/**
 * 显示body
 */
function showBody() {
    document.getElementsByTagName("body")[0].setAttribute("style", "display:block");
}

/**
 * 设置底部不能滚动
 */

function setBodyScrollDisable() {
    var height;
    var container = document.getElementsByTagName("body")[0];
    height = document.body.scrollTop;
    container.style.position = "fixed";
    container.style.top = '-' + height + 'px';
}
/**
 * 设置底部可以滚动
 */
function setBodyScrollEnable() {
    document.getElementsByTagName("html")[0].setAttribute("style", "height:auto;overflow:scroll");
    document.getElementsByTagName("body")[0].setAttribute("style", "height:auto;overflow:scroll");
}

/**
 * 分享功能
 */
function shareBtn () {
    var titles = ["里约奥运『惠』，『奖』出你智慧！", "里约全是套，来这，10万奖金无套（路）发放！", "回答热门冷知识，奖品里约外放送！"];
    var id = '123';
    var type = 'url';
    var text = '动动金手指，解锁里约奥运新姿势和大礼包！';
    var index = parseInt(Math.random() * 3);
    //需要跳转的url
    var url = 'https://210.5.30.221/hms-cmb-act/hmc_rioolympic_web/share.html';
    var selectedTitle = titles[index];
    console.log("分享的文案是：" + selectedTitle);
    var shareUrl = 'http://CMBLS/socialShare?id=' + id + '&type=' + type + '&text=' + text + '&title=' + selectedTitle + '&url=' + url;
    console.log("分享的链接是：" + shareUrl);
    window.location.href = shareUrl;
}

/**
 * 招行title返回按钮
 */
$("#goBack").click(function () {

    if (localStorage.getItem("index")) {
        window.location.href = cmbLocation;
        localStorage.removeItem("index");
    } else {
        window.history.go(-1);

    }

    //答题页返回时,清空缓存
    if (sessionStorage.head == 1) {
        localStorage.removeItem("head");
    } else if (sessionStorage.shoulder == 1) {
        localStorage.removeItem("shoulder");
    } else if (sessionStorage.knee == 1) {
        localStorage.removeItem("knee");
    } else if (sessionStorage.lumbar == 1) {
        localStorage.removeItem("lumbar");
    } else if (sessionStorage.fat == 1) {
        localStorage.removeItem("fat");
    } else if (sessionStorage.ankle == 1) {
        localStorage.removeItem("ankle");
    }

    ////首页返回答题页,读取上次答题数据
    //if (localStorage.getItem("backHead")) {
    //    sessionStorage.head = 1;
    //    localStorage.removeItem("backHead");
    //} else if (localStorage.getItem("backShoulder")) {
    //    sessionStorage.shoulder = 1;
    //    localStorage.removeItem("backShoulder");
    //} else if (localStorage.getItem("backKnee")) {
    //    sessionStorage.knee = 1;
    //    localStorage.removeItem("backKnee");
    //} else if (localStorage.getItem("backLumbar")) {
    //    sessionStorage.lumbar = 1;
    //    localStorage.removeItem("backLumbar");
    //} else if (localStorage.getItem("backFat")) {
    //    sessionStorage.fat = 1;
    //    localStorage.removeItem("backFat");
    //} else if (localStorage.getItem("backAnkle")) {
    //    sessionStorage.ankle = 1;
    //    localStorage.removeItem("backAnkle");
    //}


});

/**
 * 全局网络错误模块--按钮点击事件
 */
$(".cancel").click(function () {
    closeGlobalNetworkError();
    setBodyScrollEnable();
});
$(".reload").click(function () {
    window.location.reload();
});

/**
 * 服务器返回错误状态提示框
 */
//信息或提示框
function showTipsPopUp(data) {
    $('.tipsPopupBg').css("display", "block");
    $('#msg').text(data);

    setTimeout(function () {
        $('.tipsPopupBg').css("display", "none");
    }, 2000)
}

