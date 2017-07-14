/**
 * 提交表单(ajax)
 */

/**
 * 模型
 */
//var httpAddress;//投保成功返回地址


var host = "https://210.5.30.221";
//var host = "";//host为空时,跳转本地测试服务器
var appName = "/hmc_rioolympic_server";
var cmbLocation = host + "/hms-cmb/app.html";//返回招行APP
/**
 * 事件
 */

//获取答题记录列表
function questionListPost() {
    var reqUrl = host + appName + "/activity/questionComponent/getQuestionRecordList";
    var postString = "userId=" + postData.userId + "&token=" + postData.token;
    $.ajax({
        type: "post",
        url: reqUrl,
        data: postString,
        success: function (data) {
            console.log(data);
            console.log(data.data);
            if (data.statusCode == 200 || data.statusCode == '200') {
                $.each(data.data, function (key, value) {
                    switch (key) {
                        case "foreheadResult":
                            key = "head";
                            break;
                        case "shoulderResult":
                            key = "shoulder";
                            break;
                        case "lapResult":
                            key = "knee";
                            break;
                        case "lumbarResult":
                            key = "lumbar";
                            break;
                        case "muscleResult":
                            key = "fat";
                            break;
                        case "ankleResult":
                            key = "ankle";
                            break;
                    }
                    console.log(key);
                    console.log(value);
                    checkQuestionList(key, value);
                });

                //当六道问题都被回答时,显示两个底部按钮
                if (data.data.foreheadResult != 0 && data.data.shoulderResult != 0 && data.data.lapResult != 0 && data.data.muscleResult != 0 && data.data.lumbarResult != 0 && data.data.ankleResult != 0) {
                    var containerTitle = $(".container .title");
                    var titleImg = $(".title img");
                    titleImg.attr("src", "images/index/title_action_orange.png");
                    $(".wrong").hide();
                    if (!passNotEnough) {
                        $(".top").show();
                    } else if (passNotEnough == 0 || passNotEnough == 1) {
                        titleImg.attr("src", "images/index/title_success.png");
                    }
                    $(".bottom").show();
                    $(".notice").hide();
                    containerTitle.css("margin-top", "3.2em");

                    notEnough = 1;

                    topChange();

                    if (data.data.foreheadResult == 1 && data.data.shoulderResult == 1 && data.data.lapResult == 1 && data.data.muscleResult && data.data.lumbarResult == 1 && data.data.ankleResult == 1) {
                        $(".top").show();
                        $(".container .footer .bottom").css("padding", "0.5em 0");
                        if (localStorage.alreadyInsure) {
                            titleImg.attr("src", "images/index/title_success.png");
                        }
                        containerTitle.css("margin-top", "2.7em");
                        passNotEnough = 3;
                    }

                } else if (data.data.foreheadResult == 0 && data.data.shoulderResult == 0 && data.data.lapResult == 0 && data.data.muscleResult == 0 && data.data.lumbarResult == 0 && data.data.ankleResult == 0) {

                    notEnough = 0;

                    $(".notice").show();
                    $(".title img").attr("src", "images/common/title_think.png");
                    autoJump();

                } else {
                    console.log("localStorage.alreadyInsure=" + localStorage.alreadyInsure);
                    notEnough = 0;

                    if (!passNotEnough) {
                        topChange();
                        var top = $(".top");
                        top.show();
                    }

                    var title = $(".title img");

                    console.log("alIn=" + alIn);

                    if (alIn) {
                        if (passNotEnough != 2) {
                            title.attr("src", "images/index/title_success.png");
                        } else {
                            title.attr("src", "images/index/title_action_red.png");
                        }
                    } else {
                        title.attr("src", "images/index/title_action_red.png");
                    }

                    autoJump();
                }

                answerQuestion();
                indexPost();

            } else if (data.statusCode == "500") {
                showTipsPopUp(data.msg);
                hide("loading");
            } else {
                hide("loading");
            }
        },
        error: function (msg) {
            setTimeout(function () {
                showGlobalNetworkError();
                setBodyScrollDisable();
                hide("loading");
            }, 15000);
        }
    });
}

//答题请求
function answerQuestionPost() {
    var reqUrl = host + appName + "/activity/questionComponent/answerQuestion";
    var postString = "userId=" + postData.userId + "&token=" + postData.token + "&questionAnswer=" + postData.questionAnswer + "&questionCode=" + postData.questionCode;
    console.log(postString);

    $.ajax({
        type: "post",
        url: reqUrl,
        data: postString,
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200 || data.statusCode == '200') {
                if (passNotEnough) {
                    window.location.href = "index.html" + "?status=answer" + "&userId=" + postData.userId + "&token=" + postData.token + "&notEnough=" + passNotEnough;
                } else {
                    window.location.href = "index.html" + "?status=answer" + "&userId=" + postData.userId + "&token=" + postData.token;
                }
            } else if (data.statusCode == "500") {
                showTipsPopUp(data.msg);

            } else {

            }

        },
        error: function (msg) {
            setTimeout(function () {
                showGlobalNetworkError();
                setBodyScrollDisable();

            }, 15000);

        }
    });
}



