/**
 * 模型
 */
//各个部位
var head = {
    "contentTitle": "images/answer/head/head.png",
    "optionA": "images/answer/head/A.png",
    "optionB": "images/answer/head/B.png",
    "optionC": "images/answer/head/C.png",
    "text": "传说中脑后有反骨的人是天才，以下哪一项活动会经常用到反骨？"

};
var shoulder = {
    "contentTitle": "images/answer/shoulder/shoulder.png",
    "optionA": "images/answer/shoulder/A.png",
    "optionB": "images/answer/shoulder/B.png",
    "optionC": "images/answer/shoulder/C.png",
    "text": "我们的口号是：没有肩周炎！得了肩周炎不能进行以下哪项运动？"
};
var knee = {
    "contentTitle": "images/answer/knee/knee.png",
    "optionA": "images/answer/knee/A.png",
    "optionB": "images/answer/knee/B.png",
    "optionC": "images/answer/knee/C.png",
    "text": "膝盖是我们生活中重要的小伙伴，请问以下哪项运动最不伤膝盖？"
};
var lumbar = {
    "contentTitle": "images/answer/lumbar/lumbar.png",
    "optionA": "images/answer/lumbar/A.png",
    "optionB": "images/answer/lumbar/B.png",
    "optionC": "images/answer/lumbar/C.png",
    "text": "万一被中国足球队踢出来的飞鞋砸到腰椎间盘突出，最理想的解决方案是？"
};
var fat = {
    "contentTitle": "images/answer/fat/fat.png",
    "optionA": "images/answer/fat/A.png",
    "optionB": "images/answer/fat/B.png",
    "optionC": "images/answer/fat/C.png",
    "text": "Wuli 涛涛游完800米自由泳比赛，要消耗多少热量？"
};
var ankle = {
    "contentTitle": "images/answer/ankle/ankle.png",
    "optionA": "images/answer/ankle/A.png",
    "optionB": "images/answer/ankle/B.png",
    "optionC": "images/answer/ankle/C.png",
    "text": "万一林丹丹在羽毛球比赛中扭到脚踝，第一时间要做的措施是？"
};

var postData = {};//前端请求参数

var passNotEnough;//投保页成功返回参数

//问题答案
//var headAnswer;
//var shoulderAnswer;
//var kneeAnswer;
//var lumbarAnswer;
//var fatAnswer;
//var ankleAnswer;

//问题编码
var headCode;
var shoulderCode;
var kneeCode;
var lumbarCode;
var fatCode;
var ankleCode;


/**
 * 初始化
 */

$(function () {
    getPageNo();
    checkSessionstorage();
    choseAnswer();
    popUpClick();
});

/**
 * 事件
 */

//路径参数解析,变量赋值,缓存设置
function getPageNo() {
    var url_search = new UrlSearch();
    passNotEnough = url_search.notEnough;
    console.log(passNotEnough);
    localStorage.removeItem("index");
}

//检查首页传参,动态生成页面内容
function checkSessionstorage() {
    var imgTitle = $("#contentTitleImg");
    var titleText = $(".titleText");
    var imgOptionA = $(".optionA img");
    var imgOptionB = $(".optionB img");
    var imgOptionC = $(".optionC img");
    if (sessionStorage.head == 1) {
        imgTitle.attr("src", head.contentTitle);
        titleText.html(head.text);
        imgOptionA.attr("src", head.optionA);
        imgOptionB.attr("src", head.optionB);
        imgOptionC.attr("src", head.optionC);
    } else if (sessionStorage.shoulder == 1) {
        imgTitle.attr("src", shoulder.contentTitle);
        titleText.html(shoulder.text);
        imgOptionA.attr("src", shoulder.optionA);
        imgOptionB.attr("src", shoulder.optionB);
        imgOptionC.attr("src", shoulder.optionC);
    } else if (sessionStorage.knee == 1) {
        imgTitle.attr("src", knee.contentTitle);
        titleText.html(knee.text);
        imgOptionA.attr("src", knee.optionA);
        imgOptionB.attr("src", knee.optionB);
        imgOptionC.attr("src", knee.optionC);
    } else if (sessionStorage.lumbar == 1) {
        imgTitle.attr("src", lumbar.contentTitle);
        titleText.html(lumbar.text);
        imgOptionA.attr("src", lumbar.optionA);
        imgOptionB.attr("src", lumbar.optionB);
        imgOptionC.attr("src", lumbar.optionC);
    } else if (sessionStorage.fat == 1) {
        imgTitle.attr("src", fat.contentTitle);
        titleText.html(fat.text);
        imgOptionA.attr("src", fat.optionA);
        imgOptionB.attr("src", fat.optionB);
        imgOptionC.attr("src", fat.optionC);
    } else if (sessionStorage.ankle == 1) {
        imgTitle.attr("src", ankle.contentTitle);
        titleText.html(ankle.text);
        imgOptionA.attr("src", ankle.optionA);
        imgOptionB.attr("src", ankle.optionB);
        imgOptionC.attr("src", ankle.optionC);
    }

    $(document.body).imagesLoaded(function () {
        hide('loading');
    });

    //theSameHeight();

}

//选择答案
function choseAnswer() {
    var imgOptionA = $(".optionA img");
    var imgOptionB = $(".optionB img");
    var imgOptionC = $(".optionC img");
    imgOptionA.click(function () {
        postData.questionAnswer = "1000";
        if (sessionStorage.head == 1) {
            imgOptionA.attr("src", "images/answer/head/Alight.png");
            imgOptionB.attr("src", "images/answer/head/B.png");
            imgOptionC.attr("src", "images/answer/head/C.png");
        } else if (sessionStorage.shoulder == 1) {
            imgOptionA.attr("src", "images/answer/shoulder/Alight.png");
            imgOptionB.attr("src", "images/answer/shoulder/B.png");
            imgOptionC.attr("src", "images/answer/shoulder/C.png");
        } else if (sessionStorage.knee == 1) {
            imgOptionA.attr("src", "images/answer/knee/Alight.png");
            imgOptionB.attr("src", "images/answer/knee/B.png");
            imgOptionC.attr("src", "images/answer/knee/C.png");
            postData.questionAnswer = "0003";

        } else if (sessionStorage.lumbar == 1) {
            imgOptionA.attr("src", "images/answer/lumbar/Alight.png");
            imgOptionB.attr("src", "images/answer/lumbar/B.png");
            imgOptionC.attr("src", "images/answer/lumbar/C.png");
        } else if (sessionStorage.fat == 1) {
            imgOptionA.attr("src", "images/answer/fat/Alight.png");
            imgOptionB.attr("src", "images/answer/fat/B.png");
            imgOptionC.attr("src", "images/answer/fat/C.png");
            postData.questionAnswer = "0005";
        } else if (sessionStorage.ankle == 1) {
            imgOptionA.attr("src", "images/answer/ankle/Alight.png");
            imgOptionB.attr("src", "images/answer/ankle/B.png");
            imgOptionC.attr("src", "images/answer/ankle/C.png");
        }

        confirm();

    });
    imgOptionB.click(function () {
        postData.questionAnswer = "1000";
        if (sessionStorage.head == 1) {
            imgOptionA.attr("src", "images/answer/head/A.png");
            imgOptionB.attr("src", "images/answer/head/Blight.png");
            imgOptionC.attr("src", "images/answer/head/C.png");
        } else if (sessionStorage.shoulder == 1) {
            imgOptionA.attr("src", "images/answer/shoulder/A.png");
            imgOptionB.attr("src", "images/answer/shoulder/Blight.png");
            imgOptionC.attr("src", "images/answer/shoulder/C.png");
        } else if (sessionStorage.knee == 1) {
            imgOptionA.attr("src", "images/answer/knee/A.png");
            imgOptionB.attr("src", "images/answer/knee/Blight.png");
            imgOptionC.attr("src", "images/answer/knee/C.png");
        } else if (sessionStorage.lumbar == 1) {
            imgOptionA.attr("src", "images/answer/lumbar/A.png");
            imgOptionB.attr("src", "images/answer/lumbar/Blight.png");
            imgOptionC.attr("src", "images/answer/lumbar/C.png");
            postData.questionAnswer = "0004";
        } else if (sessionStorage.fat == 1) {
            imgOptionA.attr("src", "images/answer/fat/A.png");
            imgOptionB.attr("src", "images/answer/fat/Blight.png");
            imgOptionC.attr("src", "images/answer/fat/C.png");
            postData.questionAnswer = "0005";
        } else if (sessionStorage.ankle == 1) {
            imgOptionA.attr("src", "images/answer/ankle/A.png");
            imgOptionB.attr("src", "images/answer/ankle/Blight.png");
            imgOptionC.attr("src", "images/answer/ankle/C.png");
            postData.questionAnswer = "0006";

        }

        confirm();

    });
    imgOptionC.click(function () {
        postData.questionAnswer = "1000";
        if (sessionStorage.head == 1) {
            imgOptionA.attr("src", "images/answer/head/A.png");
            imgOptionB.attr("src", "images/answer/head/B.png");
            imgOptionC.attr("src", "images/answer/head/Clight.png");
            postData.questionAnswer = "0001";
        } else if (sessionStorage.shoulder == 1) {
            imgOptionA.attr("src", "images/answer/shoulder/A.png");
            imgOptionB.attr("src", "images/answer/shoulder/B.png");
            imgOptionC.attr("src", "images/answer/shoulder/Clight.png");
            postData.questionAnswer = "0002";
        } else if (sessionStorage.knee == 1) {
            imgOptionA.attr("src", "images/answer/knee/A.png");
            imgOptionB.attr("src", "images/answer/knee/B.png");
            imgOptionC.attr("src", "images/answer/knee/Clight.png");
        } else if (sessionStorage.lumbar == 1) {
            imgOptionA.attr("src", "images/answer/lumbar/A.png");
            imgOptionB.attr("src", "images/answer/lumbar/B.png");
            imgOptionC.attr("src", "images/answer/lumbar/Clight.png");

        } else if (sessionStorage.fat == 1) {
            imgOptionA.attr("src", "images/answer/fat/A.png");
            imgOptionB.attr("src", "images/answer/fat/B.png");
            imgOptionC.attr("src", "images/answer/fat/Clight.png");
            postData.questionAnswer = "0005";
        } else if (sessionStorage.ankle == 1) {
            imgOptionA.attr("src", "images/answer/ankle/A.png");
            imgOptionB.attr("src", "images/answer/ankle/B.png");
            imgOptionC.attr("src", "images/answer/ankle/Clight.png");
        }

        confirm();
    });
}

//确认按钮,发送请求,跳转回首页
function confirm() {
    var button = $(".button");
    button.click(function () {
        //postData.questionAnswer = "A";
        //postData.questionCode = "foreheadResult";
        postData.userId = localStorage.rioolympic_userId;
        postData.token = localStorage.token;

        headCode = "forehead";
        shoulderCode = "shoulder";
        kneeCode = "lap";
        lumbarCode = "lumbar";
        fatCode = "muscle";
        ankleCode = "ankle";

        if (sessionStorage.head == 1) {
            postData.questionCode = headCode;
            localStorage.removeItem("head");

            //设置点击返回按钮,跳转回答题页时的缓存数据,保留对应问题,清空其余问题
            localStorage.setItem("backHead", "1");
            localStorage.removeItem("backShoulder");
            localStorage.removeItem("backKnee");
            localStorage.removeItem("backLumbar");
            localStorage.removeItem("backFat");
            localStorage.removeItem("backAnkle");

        } else if (sessionStorage.shoulder == 1) {
            postData.questionCode = shoulderCode;
            localStorage.removeItem("shoulder");

            localStorage.setItem("backShoulder", "1");
            localStorage.removeItem("backHead");
            localStorage.removeItem("backKnee");
            localStorage.removeItem("backLumbar");
            localStorage.removeItem("backFat");
            localStorage.removeItem("backAnkle");

        } else if (sessionStorage.knee == 1) {
            postData.questionCode = kneeCode;
            localStorage.removeItem("knee");

            localStorage.setItem("backKnee", "1");
            localStorage.removeItem("backHead");
            localStorage.removeItem("backShoulder");
            localStorage.removeItem("backLumbar");
            localStorage.removeItem("backFat");
            localStorage.removeItem("backAnkle");

        } else if (sessionStorage.lumbar == 1) {
            postData.questionCode = lumbarCode;
            localStorage.removeItem("lumbar");

            localStorage.setItem("backLumbar", "1");
            localStorage.removeItem("backHead");
            localStorage.removeItem("backShoulder");
            localStorage.removeItem("backKnee");
            localStorage.removeItem("backFat");
            localStorage.removeItem("backAnkle");

        } else if (sessionStorage.fat == 1) {
            postData.questionCode = fatCode;
            localStorage.removeItem("fat");

            localStorage.setItem("backFat", "1");
            localStorage.removeItem("backHead");
            localStorage.removeItem("backShoulder");
            localStorage.removeItem("backKnee");
            localStorage.removeItem("backLumbar");
            localStorage.removeItem("backAnkle");

        } else if (sessionStorage.ankle == 1) {
            postData.questionCode = ankleCode;
            localStorage.removeItem("ankle");

            localStorage.setItem("backAnkle", "1");
            localStorage.removeItem("backHead");
            localStorage.removeItem("backShoulder");
            localStorage.removeItem("backKnee");
            localStorage.removeItem("backLumbar");
            localStorage.removeItem("backFat");

        }

        answerQuestionPost();

    });
}

//答题页弹窗点击事件
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

//左选项与右按钮等高
function theSameHeight() {
    var leftH = $(".leftWrap").height();
    //alert(leftH);
    var rightH = $(".rightWrap img").height(leftH);
}

