/**
 * 模型
 */
var firstTime;//是否强制弹窗
var bodyPart;//身体各部位翻转
var postData = {};//前端请求数据
var notEnough;//投保前,用户是否已经答题完毕
var passNotEnough;//投保页成功返回参数
var alIn;//临时存储投保页返回时的title样式
var titlePerfect;//投保后,title完美人生
//var backToTool;//在首页点击返回按钮,返回到招行APP

/**
 * 初始化
 */

$(function () {
    getPageNo();
    clearSession();
    checkAnswer();
    btnClick();
    jumpToAnswer();
    questionListPost();
    popUpClick();

});

/**
 * 事件
 */

//路径参数解析,变量赋值
function getPageNo() {
    var url_search = new UrlSearch();
    postData.userId = url_search.userId;
    postData.token = url_search.token;
    localStorage.rioolympic_userId = url_search.userId;
    localStorage.token = url_search.token;
    firstTime = url_search.firstTime;
    bodyPart = url_search.status;
    console.log(bodyPart);
    passNotEnough = url_search.notEnough;
    console.log(passNotEnough);
    if (passNotEnough != "undefined") {
        if (passNotEnough) {
            $(".top").attr("src", "images/index/button_wrong.png");
            //已投保则设置本地缓存
            localStorage.alreadyInsure = 1;
            alIn = 1;
        }

    } else {
        topChange();
    }
    localStorage.setItem("index", "1");


}

//进入首页,根据路径参数,判断是否需要"立即参与--强制弹窗"
function indexPost() {
    if (localStorage.getItem("notFirst") != postData.userId) {
        if (firstTime == 1 || firstTime == "1") {
            if (localStorage.getItem("pop") == 1) {
                $(".activity_description").show();
                setBodyScrollDisable();
                $(".notice").show();
                $(".wrong").hide();
                $(".top").hide();
                $(".bottom").hide();
                $(".remainder").hide();
                $(".title img").attr("src", "images/common/title_think.png");
                localStorage.setItem("notFirst", postData.userId);
            }
            if (localStorage.alreadyInsure) {
                localStorage.removeItem("alreadyInsure");
            }
        }
    }

}

//根据投保页传参,显示按钮
function answerQuestion() {
    if (passNotEnough == 0) {
        $(".notice").hide();
        $(".wrong").show();
        $(".top").hide();
        $(".bottom").hide();
        $(".remainder").show();

    } else if (passNotEnough == 1) {
        $(".notice").hide();
        $(".wrong").show();
        $(".top").hide();
        $(".bottom").show();
        $(".remainder").hide();
    } else if (passNotEnough == "undefined") {
        $(".notice").hide();
        $(".wrong").hide();
        $(".top").show();
        //$(".bottom").show();
        $(".remainder").hide();
    }
}

//已投保的投保按钮跳转页
function alreadyJump() {
    window.location.href = "answer.html" + "?notEnough=" + passNotEnough;
}

//跳转到答题页
function jumpToAnswer() {
    var head = $(".head");
    var shoulder = $(".shoulder");
    var knee = $(".knee");
    var lumbar = $(".lumbar");
    var fat = $(".fat");
    var ankle = $(".ankle");
    head.click(function () {
        alreadyJump();
        sessionStorage.fat = 1;
        localStorage.setItem("fat", "1");
    });
    shoulder.click(function () {
        alreadyJump();
        sessionStorage.head = 1;
        localStorage.setItem("head", "1");
    });
    knee.click(function () {
        alreadyJump();
        sessionStorage.shoulder = 1;
        localStorage.setItem("shoulder", "1");
    });
    lumbar.click(function () {
        alreadyJump();
        sessionStorage.lumbar = 1;
        localStorage.setItem("lumbar", "1");
    });
    fat.click(function () {
        alreadyJump();
        sessionStorage.knee = 1;
        localStorage.setItem("knee", "1");
    });
    ankle.click(function () {
        alreadyJump();
        sessionStorage.ankle = 1;
        localStorage.setItem("ankle", "1");
    });
}

//判断答题页传递参数,动态改变title样式
function checkAnswer() {
    $(".notice").hide();
    if (!bodyPart) {
        localStorage.setItem("pop", "1");
    } else {
        $(".top").show();
        localStorage.setItem("pop", "0");

    }

}

//根据是否已经投保,动态修改top按钮的样式
function topChange() {
    var top = $(".top");
    if (!localStorage.alreadyInsure) {
        top.attr("src", "images/index/button_wrong_83.png");

    } else {
        top.attr("src", "images/index/button_wrong.png");
    }
}

//调用后端接口,检查答题情况,动态改变拼图样式
function checkQuestionList(que, num) {

    if (que == "fat") {

        if (num == "1" || num == 1) {
            $(".head img").attr("src", "images/index/right_head.png");
            $(".head").unbind("click");
        } else if (num == "2" || num == 2) {
            $(".head img").attr("src", "images/index/right_head.png");
            $(".head").unbind("click");
        } else {
            $(".head img").attr("src", "images/index/part_05.png");
        }

    } else if (que == "head") {

        if (num == "1" || num == 1) {
            $(".shoulder img").attr("src", "images/index/right_shoulder.png");
            $(".shoulder").unbind("click");
        } else if (num == "2" || num == 2) {
            $(".shoulder img").attr("src", "images/index/error_head.png");
            $(".shoulder").unbind("click");
        } else {
            $(".shoulder img").attr("src", "images/index/part_01.png");
        }

    } else if (que == "shoulder") {

        if (num == "1" || num == 1) {
            $(".knee img").attr("src", "images/index/right_knee.png");
            $(".knee").unbind("click");
        } else if (num == "2" || num == 2) {
            $(".knee img").attr("src", "images/index/error_shoulder.png");
            $(".knee").unbind("click");
        } else {
            $(".knee img").attr("src", "images/index/part_02.png");
        }

    } else if (que == "lumbar") {

        if (num == "1" || num == 1) {
            $(".lumbar img").attr("src", "images/index/right_lumbar.png");
            $(".lumbar").unbind("click");
        } else if (num == "2" || num == 2) {
            $(".lumbar img").attr("src", "images/index/error_lumbar.png");
            $(".lumbar").unbind("click");
        } else {
            $(".lumbar img").attr("src", "images/index/part_04.png");
        }

    } else if (que == "knee") {

        if (num == "1" || num == 1) {
            $(".fat img").attr("src", "images/index/right_fat.png");
            $(".fat").unbind("click");
        } else if (num == "2" || num == 2) {
            $(".fat img").attr("src", "images/index/error_knee.png");
            $(".fat").unbind("click");
        } else {
            $(".fat img").attr("src", "images/index/part_03.png");
        }

    } else if (que == "ankle") {

        if (num == "1" || num == 1) {
            $(".ankle img").attr("src", "images/index/right_ankle.png");
            $(".ankle").unbind("click");
        } else if (num == "2" || num == 2) {
            $(".ankle img").attr("src", "images/index/error_ankle.png");
            $(".ankle").unbind("click");
        } else {
            $(".ankle img").attr("src", "images/index/part_06.png");
        }

    }

    if (passNotEnough == 0 || passNotEnough == 1) {

        $(".title img").attr("src", "images/index/title_success.png");
        $(".head img").attr("src", "images/index/blank_head.png");
        $(".shoulder img").attr("src", "images/index/blank_shoulder.png");
        $(".knee img").attr("src", "images/index/blank_knee.png");
        $(".lumbar img").attr("src", "images/index/blank_lumbar.png");
        $(".fat img").attr("src", "images/index/blank_fat.png");
        $(".ankle img").attr("src", "images/index/blank_ankle.png");

        $(".head").unbind("click");
        $(".shoulder").unbind("click");
        $(".knee").unbind("click");
        $(".lumbar").unbind("click");
        $(".fat").unbind("click");
        $(".ankle").unbind("click");
    }


    $(".ankle img").imagesLoaded(function () {
        hide('loading');
    });
}


//清理缓存
function clearSession() {
    if (sessionStorage) {
        sessionStorage.clear();
        //localStorage.clear();
    }
}

//跳转到投保页
function insure() {
    window.location.href = "Insure.html" + "?userId=" + postData.userId + "&token=" + postData.token + "&notEnough=" + notEnough;
}

//跳转到抽奖页
function drawAndshare() {
    window.location.href = "drawAndshare.html" + "?userId=" + postData.userId + "&token=" + postData.token;
}

//回答问题后,按钮点击事件
function btnClick() {
    $(".wrong").click(function () {
        insure();
    });
    $(".top").click(function () {
        insure();
    });
    $(".bottom").click(function () {
        drawAndshare();
    });
    $(".remainder").click(function () {

        passNotEnough = 2;

        jumpToAnswer();
        questionListPost();

        var titleImg = $(".title img");
        titleImg.attr("src", "images/index/title_action_red.png");

        $(".notice").hide();
        $(".wrong").hide();
        $(".top").show();
        $(".bottom").hide();
        $(".remainder").hide();

        if (alIn) {
            alIn = undefined;
        }

    });

}

//首页弹窗点击事件
function popUpClick() {
    $(".button_noticePopUp").click(function () {
        $(".activity_description").hide();
        setBodyScrollEnable();
    });
    $(".close_noticePopUp").click(function () {
        $(".activity_description").hide();
        setBodyScrollEnable();
    });
    $(".rightButton").click(function () {
        $(".activity_description").show();
        setBodyScrollDisable();
    });

}

//查询用户答题记录的本地缓存,自动跳转至对应答题页
function autoJump() {
    var head = localStorage.getItem("head");
    var shoulder = localStorage.getItem("shoulder");
    var knee = localStorage.getItem("knee");
    var lumbar = localStorage.getItem("lumbar");
    var fat = localStorage.getItem("fat");
    var ankle = localStorage.getItem("ankle");

    if (head) {
        sessionStorage.head = 1;
        window.location.href = "answer.html";
    } else if (shoulder) {
        sessionStorage.shoulder = 1;
        window.location.href = "answer.html";
    } else if (knee) {
        sessionStorage.knee = 1;
        window.location.href = "answer.html";
    } else if (lumbar) {
        sessionStorage.lumbar = 1;
        window.location.href = "answer.html";
    } else if (fat) {
        sessionStorage.fat = 1;
        window.location.href = "answer.html";
    } else if (ankle) {
        sessionStorage.ankle = 1;
        window.location.href = "answer.html";
    }
}






























