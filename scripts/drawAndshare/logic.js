var app = angular.module("publicApp", []);
app.controller("myCtrl", function ($scope, $http) {
    /**
     * 初始模块
     * @type {string}
     */
    $scope.num = "0";
    $scope.show_user_info = {};
    $scope.tips_Msg = "提示语";
    $scope.award = "nothing";
    $scope.result = 0;
    $scope.awardCode = 0;
    var userId;
    var token;
    var name = '';
    var phone = '';
    var address = '';
    var sex = '';
    var host = 'https://210.5.30.221';
    // var host = '';
    var app_name = '/hmc_rioolympic_server/activity/userComponent/getUserRightAnswerCount';
    var reqUrl = host + app_name;
    var postString = "";
    //抽奖
    var draw_app_name = '/hmc_rioolympic_server/activity/awardComponent/drawAward';
    var draw_reqUrl = host + draw_app_name;
    var draw_postString = "";
    //公示
    var publicity_app_name = '/hmc_rioolympic_server/activity/awardComponent/showAward';
    var publicity_reqUrl = host + publicity_app_name;
    var publicity_postString = "";
    //获取用户信息
    var queryUserInfo_app_name = '/hmc_rioolympic_server/activity/userComponent/queryUserInfo';
    var queryUserInfo_reqUrl = host + queryUserInfo_app_name;
    var queryUserInfo_postString = "";
    //更新用户信息
    var updateUserInfo_app_name = '/hmc_rioolympic_server/activity/userComponent/updateUserInfo';
    var updateUserInfo_reqUrl = host + updateUserInfo_app_name;
    var updateUserInfo_postString = "";
    var httpConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 10000
    };
    /**
     * 获取路径参数
     */
    var Url = new UrlSearch();
    userId = Url.userId;
    token = Url.token;
    /**
     * 开始执行
     */
    getUserRightAnswerCount();
    show_loading();
    // startmarquee(0, 50, 0);
    setTimeout(function () {
        hide_loading();
        document.getElementById('List_bg').style.display = "block";
    }, 1000);
    /**
     * 名称验证
     */
    $scope.name_cheak = function () {
        name = document.getElementById('name').value;
        name = name.replace(/\s/g, '');
        name = nameStripscript(name);
        document.getElementById('name').value = name;
        var result = validateName(name);
        if (!result.isValid) {
            console.log("nameError");
            return false;
        } else {
            console.log("nameSuccess");
            return true;
        }
    };
    /**
     * 手机号码验证
     */
    $scope.phone_cheak = function () {
        phone = document.getElementById('phone').value;
        phone = phone.replace(/\s/g, '');
        phone = phoneStripscript(phone);
        phone = text_chinese(phone);
        document.getElementById('phone').value = phone;
        var result = validateMobile(phone);
        if (!result.isValid) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * 性别验证
     */
    $scope.sexy_cheak = function () {
        console.log(sex);
        if (sex == '' || sex == null || sex == undefined) {
            $scope.show_tips_popup("请选择性别!");
            return false;
        } else {
            return true
        }
    }
    /**
     * 抽奖
     */
    $scope.submit = function () {
        address = document.getElementById('address').value;
        if (!$scope.name_cheak()) {
            $scope.show_tips_popup("姓名有错误!");
            return false;
        }
        if (!$scope.phone_cheak()) {
            $scope.show_tips_popup("手机有错误!");
            return false;
        }
        if (address == '' || address == undefined || address == null) {
            $scope.show_tips_popup("地址不能为空!");
            return false;
        }
        if (!$scope.sexy_cheak()) {
            return false;
        }
        $scope.updateUserInfo();
    }
    /**
     * 获取用户信息
     */
    $scope.show_Information_fill = function () {
        queryUserInfo_postString = "userId=" + userId + "&token=" + token;
        $http.post(queryUserInfo_reqUrl, queryUserInfo_postString, httpConfig)
            .success(function (data) {
                $scope.closePopup();
                if (data.statusCode == "200" || data.statusCode == 200) {
                    document.getElementById('Information_fill_Popup').style.display = 'block';
                    document.getElementById('name').value = data.data.nickUser;
                    document.getElementById('phone').value = data.data.phone;
                    document.getElementById('address').value = data.data.address;
                } else {
                    document.getElementById('Information_fill_Popup').style.display = 'block';
                }
            }).error(function (data) {
            console.log(data)
        })
    }
    /**
     * 抽奖方法
     */
    $scope.draw = function () {
        draw_postString = "userId=" + userId + "&token=" + token + "&awardCode=" + $scope.awardCode;
        $http.post(draw_reqUrl, draw_postString, httpConfig)
            .success(function (data) {
                $scope.closePopup();
                if (data.data.result == 1 || data.data.result == '1') {
                    console.log("success");
                    document.getElementById('success').style.display = "block";
                    $scope.award = data.data.awardName;
                    document.getElementById('name').value = '';
                    document.getElementById('phone').value = '';
                    document.getElementById('address').value = '';
                } else {
                    document.getElementById('Error').style.display = "block";
                    console.log("error");
                }
            }).error(function (data) {
            alert("网络错误!请稍后再试");
        })
    };
    /**
     * 公示框
     */
    function getDrawInfo() {
        publicity_postString = "userId=" + userId + "&token=" + token;
        $http.post(publicity_reqUrl, publicity_postString, httpConfig)
            .success(function (data) {
                if (data.statusCode == "200" || data.statusCode == 200) {
                    $scope.show_user_info = data.data.awardList;
                    console.log($scope.show_user_info);
                } else {
                    $scope.show_tips_popup(data.msg);
                }
            }).error(function () {
            alert("网络错误!请稍后再试");
        })
    }

    /**
     * 关闭所有弹窗
     */
    $scope.closePopup = function () {
        document.getElementById('Error').style.display = "none";
        document.getElementById('success').style.display = "none";
        document.getElementById('Information_fill_Popup').style.display = "none";
    }
    /**
     * 提示框显示
     * @param value
     */
    $scope.show_tips_popup = function (value) {
        $scope.tips_Msg = value;
        document.getElementById('tips_popup').style.display = 'block';
        setTimeout(function () {
            document.getElementById('tips_popup').style.display = 'none';
        }, 3000)
    }
    //获取用户的答题信息
    function getUserRightAnswerCount() {
        postString = "userId=" + userId + "&token=" + token;
        $http.post(reqUrl, postString, httpConfig)
            .success(function (data) {
                if (data.statusCode == 200 || data.statusCode == "200") {
                    // data.data.result = parseInt(data.data.result);
                    $scope.result = parseInt(data.data.result);
                    if (data.data.isJoined == 0 || data.data.isJoined == '0') { //0 已参与过
                        $scope.num = "90";
                        document.getElementById('share2').style.display = 'block';
                        document.getElementById('share2').style.top = '35%';
                        console.log("awardInfo:" + data.data.awardInfo);
                        if (!data.data.awardInfo) { //不中奖0
                            console.log("xxx");
                            document.getElementById('Award_main').src = 'images/drawAndshare/Award/Winning_nothing.png';
                            document.getElementById('Award_main').style.width = '71%';
                            document.getElementById('Award_main').style.left = '16%';
                            document.getElementById('Award_main').style.top = '29%';
                            if ($scope.result < 3) {
                                $scope.num = "33";
                                document.getElementById('tips3').style.display = "block";
                                document.getElementById('tips3').style.top = '20%';
                            } else if ($scope.result == 3 || $scope.result == 4 || $scope.result == 5) {
                                console.log("3-4-5")
                                if ($scope.result == 3) {
                                    $scope.num = "50";
                                } else if ($scope.result == 4) {
                                    $scope.num = "67";
                                } else if ($scope.result == 5) {
                                    $scope.num = "83";
                                }
                                document.getElementById('tips2').style.display = 'block';
                                document.getElementById('tips2').style.top = '22%';
                            } else if ($scope.result == 6) {
                                $scope.num = "100";
                                document.getElementById('tips1').style.display = "block";
                                document.getElementById('tips1').style.top = "18%";
                            }
                        } else { //中奖
                            // document.getElementById('Prize2').style.display = 'block';
                            if ($scope.result < 3) {
                                document.getElementById('tips3').style.display = "block";
                                document.getElementById('tips3').style.top = '22%';
                                document.getElementById('Award_main').src = 'images/drawAndshare/Award/Winning_nothing.png';
                                document.getElementById('Award_main').style.top = '29%';
                            } else if ($scope.result == 3) {
                                $scope.num = "50";
                                document.getElementById('tips2').style.display = 'block';
                                document.getElementById('tips2').style.top = '22%';
                                document.getElementById('Award_main').src = 'images/drawAndshare/Award/Winning_10yuan.png';
                                document.getElementById('Award_main').style.top = '29%';
                            } else if ($scope.result == 4) {
                                $scope.num = "67";
                                document.getElementById('tips2').style.display = 'block';
                                document.getElementById('tips2').style.top = '22%';
                                document.getElementById('Award_main').src = 'images/drawAndshare/Award/Winning_yongmao.png';
                                document.getElementById('Award_main').style.top = '26%';
                                document.getElementById('Award_main').style.width = '60%';
                                document.getElementById('Award_main').style.left = '20%';
                            } else if ($scope.result == 5) {
                                $scope.num = "83";
                                document.getElementById('tips2').style.display = 'block';
                                document.getElementById('tips2').style.top = '22%';
                                document.getElementById('Award_main').src = 'images/drawAndshare/Award/Winning_qiupai.png';
                                document.getElementById('Award_main').style.top = '28%';
                            } else if ($scope.result == 6) {
                                $scope.num = "100";
                                document.getElementById('Award_main').src = 'images/drawAndshare/Award/winning_daijinquan.png';
                                document.getElementById('tips2').style.display = "none";
                                document.getElementById('tips1').style.display = "block";
                                document.getElementById('tips1').style.top = "22%";
                                document.getElementById('Award_main').style.top = "30%";
                            }
                        }

                    } else { //未参与抽奖
                        document.getElementById('Information_fill_Popup').style.display = 'none';
                        if ($scope.result == '6' || $scope.result == 6) { //6条全对
                            console.log("6条全对");
                            $scope.awardCode = "voucher";
                            $scope.num = "100";
                            document.getElementById('tips1').style.display = 'block';
                            document.getElementById('draw').style.display = 'block';
                            document.getElementById('share1').style.display = 'block';
                            document.getElementById('Prize1').style.display = 'block';
                            document.getElementById('Award_main').src = 'images/drawAndshare/Award/Draw_daijinquan.png';
                            document.getElementById('Award_main').style.top = '30%';
                        } else if ($scope.result > 2 && $scope.result < 6) { //答对3-5题
                            console.log("3-5条全对");
                            if ($scope.result == 3) {
                                $scope.num = "50";
                                $scope.awardCode = "phone_expenses";
                                document.getElementById('Award_main').src = 'images/drawAndshare/Award/Draw_10yuan.png';
                                document.getElementById('Award_main').style.top = '29%';
                            } else if ($scope.result == 4) {
                                $scope.num = "67";
                                $scope.awardCode = "swing_cap";
                                document.getElementById('Award_main').src = 'images/drawAndshare/Award/Draw_yongmao.png';
                                document.getElementById('Award_main').style.top = '26%';
                                document.getElementById('Award_main').style.width = '60%';
                                document.getElementById('Award_main').style.left = '20%';
                            } else if ($scope.result == 5) {
                                $scope.num = "83";
                                $scope.awardCode = "battledore";
                                document.getElementById('Prize1').style.display = 'block';
                                document.getElementById('Award_main').src = 'images/drawAndshare/Award/Draw_qiupai.png';
                                document.getElementById('Award_main').style.top = '28%';
                            }
                            document.getElementById('tips2').style.display = 'block';
                            document.getElementById('draw').style.display = 'block';
                            document.getElementById('share1').style.display = 'block';
                        } else {   //小于3题
                            console.log("小于3条全对");
                            $scope.closePopup();
                            document.getElementById('Award_main').src = 'images/drawAndshare/result.png';
                            document.getElementById('tips3').style.display = 'block';
                            document.getElementById('tips3').style.top = '20%';
                            document.getElementById('share2').style.display = 'block';
                            document.getElementById('share2').style.top = '35%';
                            document.getElementById('Prize1').style.display = 'none';
                            document.getElementById('Award_bg').style.display = 'block';
                            document.getElementById('Award_main').style.width = '90%';
                            document.getElementById('Award_main').style.left = '5%';
                        }
                    }
                } else {
                }
                getDrawInfo();
            }).error(function (data) {
            console.log("error")
        })
    }

    /**
     * 更新用户信息
     */
    $scope.updateUserInfo = function () {
        updateUserInfo_postString = "userId=" + userId + "&token=" + token + "&nickUser=" + name + "&address=" + address + "&phone=" + phone + "&sex=" + sex;
        $http.post(updateUserInfo_reqUrl, updateUserInfo_postString, httpConfig)
            .success(function (data) {
                if (data.statusCode == "200" || data.statusCode == 200) {
                    $scope.draw();
                } else {
                    $scope.show_tips_popup(data.msg);
                }
            }).error(function () {
            console.log("error")
        })
    }

    $scope.know_btn = function () {
        $scope.closePopup();
        location.reload();
    }

    /**
     * 招行title返回按钮
     */
    document.getElementById("goBack").addEventListener('click', function () {
        window.history.go(-1);
    })

    $scope.man = function () {
        sex = "0";
        document.getElementById('sexy_man').style.color = "white";
        document.getElementById('sexy_man').style.backgroundColor = "#B35C51";
        document.getElementById('sexy_gril').style.color = "#545454";
        document.getElementById('sexy_gril').style.backgroundColor = "white";
    }

    $scope.gril = function () {
        sex = "1";
        document.getElementById('sexy_gril').style.color = "white";
        document.getElementById('sexy_gril').style.backgroundColor = "#B35C51";
        document.getElementById('sexy_man').style.color = "#545454";
        document.getElementById('sexy_man').style.backgroundColor = "white";
    }

    /**
     * loading显示
     */
    function show_loading() {
        document.getElementById('loading').style.display = "block";
    }

    /**
     * loading隐藏
     */
    function hide_loading() {
        document.getElementById('loading').style.display = "none";
    }

    /**
     * 分享功能
     */
    $scope.shareBtn = function() {
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

})

