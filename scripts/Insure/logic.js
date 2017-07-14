var app = angular.module("publicApp", []);
app.controller("myCtrl", function ($scope, $http) {
    /**
     * 初始模块
     * @type {string}
     */
    var name = ''; //用户名称
    var id = '';
    var phone = '';
    var email = '';
    var read = false;
    var notEnough = ''; //是否答题完毕 0为未,1为完
    var host = 'https://210.5.30.221';
    // var host = '';
    var userId;
    var token;
    var app_name = '/hmc_olympicaio_server/activity/addInsure';
    var reqUrl = host + app_name;
    var postString = "";
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
    var status = Url.status;
    notEnough = Url.notEnough;
    var storage = window.localStorage;
    /**
     * 缓存 用作储存用户信息
     * @type {string}
     */
    storage.name;
    storage.phone;
    storage.id;
    storage.email;

    if (userId == null || userId == 'null' || userId == undefined || userId == "undefined"){
        userId = storage.rioolympic_userId;
    }else{
        storage.rioolympic_userId = userId;
    }
    if (token == null || token == 'null' || token == undefined || token == "undefined"){
        token = storage.token;
    }else{
        storage.token = token;
    }
    if(notEnough == null || notEnough == "null" || notEnough == undefined || notEnough == "undefined"){
        notEnough = storage.notEnough;
    }else{
        storage.notEnough = notEnough;
    }

    console.log("userId:"+userId);
    console.log("token:"+token);
    console.log("notEnough:"+notEnough);

    /**
     * 获取status值判断是否支付成功
     */
    if (status == 'y') {
        clear();
        console.log("success");
        document.getElementById('success').style.display = "block";
    } else if (status == 'n') {
        console.log("error");
        document.getElementById('error').style.display = "block";
    }
    /**
     * 把缓存赋值
     */
    document.getElementById('name').value = storage.name;
    document.getElementById('phone').value = storage.phone;
    document.getElementById('id').value = storage.id;
    document.getElementById('email').value = storage.email;
    /**
     * 如果值为null时初始化
     */
    if (!document.getElementById('name').value || document.getElementById('name').value == undefined || document.getElementById('name').value == "undefined"){
        document.getElementById('name').value = '';
    }
    if (!document.getElementById('phone').value || document.getElementById('phone').value == undefined || document.getElementById('phone').value == "undefined"){
        document.getElementById('phone').value = '';
    }
    if (!document.getElementById('id').value || document.getElementById('id').value == undefined || document.getElementById('id').value == "undefined"){
        document.getElementById('id').value = '';
    }
    if (!document.getElementById('email').value || document.getElementById('email').value == undefined || document.getElementById('email').value == "undefined"){
        document.getElementById('email').value = '';
    }
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
            $scope.show_tips_popup("请输入正确的姓名;");
            document.getElementById('name_TorF').src = 'images/Insure/wrong.png';
            return false;
        } else {
            console.log("nameSuccess");
            document.getElementById('name_TorF').src = 'images/Insure/right.png';
            return true;
        }
    };
    /**
     * 身份证验证
     */
    $scope.id_cheak = function () {
        id = document.getElementById('id').value;
        id = id.replace(/\s/g, '');
        id = id.toUpperCase();
        id = text_chinese(id);
        id = IDstripscript(id);
        document.getElementById('id').value = id;
        if (id == '' || id == undefined || id == null) {
            document.getElementById('id_TorF').src = 'images/Insure/wrong.png';
            $scope.isShowId = 2;
            $scope.tips_Msg = '';
            $scope.show_tips_popup("请输入正确的身份证号;");
            return false;
        } else if (id.length > 18 || id.length < 15 || !checkId(id)) {
            document.getElementById('id_TorF').src = 'images/Insure/wrong.png';
            $scope.isShowId = 1;
            $scope.show_tips_popup("请输入正确的身份证号");
            return false;
        } else {//符合条件
            if (id.length == 18) {
                if (checkAge(id)) {//判断年龄是否符合,是
                    document.getElementById('id_TorF').src = 'images/Insure/right.png';
                    $scope.isShowId = 2;
                    return true;
                } else {//不符合
                    $scope.isShowId = 3;
                    document.getElementById('id_TorF').src = 'images/Insure/wrong.png';
                    $scope.tips_Msg = '';
                    $scope.show_tips_popup("投保年龄须在18~60周岁;");
                    return false;
                }
            } else {
                var vs = "10X98765432";
                var v = new Array();
                v.push(2, 4, 8, 5, 10, 9, 7, 3, 6, 1, 2, 4, 8, 5, 10, 9, 7);
                var cardID17 = id.substring(0, 6) + "19" + id.substring(6);
                var N = 0;
                var R = -1;
                var T = '0';//储存最后一个数字
                var j = 0;
                var cardID18 = "";
                //计数出第18位数字
                for (var i = 16; i >= 0; i--) {
                    N += parseInt(cardID17.substring(i, i + 1)) * v[j];
                    j++;
                }
                R = N % 11;
                T = vs.charAt(R);
                cardID18 = cardID17 + T;
                if (checkAge(cardID18)) {//判断年龄是否符合,是
                    $scope.isShowId = 2;
                    document.getElementById('id_TorF').src = 'images/Insure/right.png';
                    return true;
                } else {//不符合
                    $scope.isShowId = 3;
                    document.getElementById('id_TorF').src = 'images/Insure/wrong.png';
                    $scope.show_tips_popup("投保年龄须在18~60周岁;");
                    return false;
                }
            }
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
            $scope.show_tips_popup("请输入正确的手机号码;");
            hideLoading();
            document.getElementById('phone_TorF').src = 'images/Insure/wrong.png';
            return false;
        } else {
            document.getElementById('phone_TorF').src = 'images/Insure/right.png';
            return true;
        }
    };
    /**
     * 邮箱验证
     */
    $scope.email_cheak = function () {
        email = document.getElementById('email').value;
        email = email.replace(/\s/g, '');
        email = text_chinese(email);
        document.getElementById('email').value = email;
        var result = validateEmail(email);
        if (!result.isValid) {
            $scope.show_tips_popup("请输入正确的邮箱地址;");
            hideLoading();
            document.getElementById('email_TorF').src = 'images/Insure/wrong.png';
            return false;
        } else {
            document.getElementById('email_TorF').src = 'images/Insure/right.png';
            return true;
        }
    };
    /**
     * 阅读勾选
     */
    $scope.isRead = function () {
        if (read) {
            read = false;
            document.getElementById('isRead').src = 'images/Insure/yy.png';
        } else {
            read = true;
            document.getElementById('isRead').src = 'images/Insure/yyy.png';
        }
    };
    /**
     * 点击支付提交
     */
    $scope.submit = function () {
        showLoading();
        storage.name = name;
        storage.phone = phone;
        storage.id = id;
        storage.email = email;
        if (!$scope.name_cheak()) {
            console.log("名称错误");
            hideLoading();
            return false;
        }
        if (!$scope.id_cheak()) {
            console.log("身份证错误");
            hideLoading();
            return false;
        }
        if (!$scope.phone_cheak()) {
            console.log("手机错误");
            hideLoading();
            return false;
        }
        if (!$scope.email_cheak()) {
            console.log("邮箱错误");
            hideLoading();
            return false;
        }
        if (!read) {
            $scope.show_tips_popup("请勾选并阅读保险条例;");
            hideLoading();
            return false;
        }
        $scope.post_userInfo()
    };
    /**
     * 信息提交
     */
    $scope.post_userInfo = function () {
        postString = "userId=" + userId + "&token=" + token + "&idcard=" + id + "&name=" + name + "&email=" +email + "&phone=" + phone;
        $http.post(reqUrl, postString, httpConfig)
            .success(function (data) {

            })
            .error(function () {
                setTimeout(function () {
                    if (document.getElementById('loading').style.display == "block"){
                        hideLoading();
                        alert("网络出现异常!")
                    }
                },15000);
                console.log("error")
            })
    }
    /**
     *  弹窗关闭
     */
    $scope.close = function () {
        document.getElementById('success').style.display = "none";
        document.getElementById('error').style.display = "none";
        document.getElementById('readProductChangePopup').style.display = 'none';
        document.getElementById('popup_bg').style.display = 'none';
        document.getElementById('popup_bg2').style.display = 'none';
    }
    /**
     * 阅读条款
     */
    $scope.textR = function(){
        if (document.getElementById('tips_popup').style.display == 'block'){
            document.getElementById('readProductChangePopup').style.display = 'none';
        }else {
            document.getElementById('readProductChangePopup').style.display = 'block';
        }
    }


    $scope.showReadProductPopup = function(){
        document.getElementById('popup_bg').style.display = 'block';
    }
    $scope.showReadProductPopup2 = function(){
        document.getElementById('popup_bg2').style.display = 'block';
    }
    /**
     * 首页跳转
     */
    $scope.jumpToIndex = function () {
        var url = 'http://index.html?Insure=success&userId=' + userId + '&token=' + token+"&notEnough="+notEnough;
        console.log(url);
        window.location.href = url;
    }
    /**
     * 清空了数据
     */
    function clear() {
        // document.getElementById('name').value = '';
        // document.getElementById('id').value = '';
        // document.getElementById('phone').value = '';
        // document.getElementById('email').value = '';
        storage.name = '';
        storage.phone = '';
        storage.id ='';
        storage.email ='';
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

    /**
     * 招行title返回按钮
     */
    document.getElementById("goBack").addEventListener('click',function () {
        window.history.go(-1);
    })

    /**
     * loading出现
     */
    function showLoading() {
        document.getElementById('loading').style.display = 'block';
    }

    /**
     * 关闭loading
     */
    function hideLoading() {
        document.getElementById('loading').style.display = 'none';
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

        var url = 'http://210.5.30.221/hms-cmb-act/hmc_rioolympic_web/share.html';
        var selectedTitle = titles[index];
        console.log("分享的文案是：" + selectedTitle);
        var shareUrl = 'http://CMBLS/socialShare?id=' + id + '&type=' + type + '&text=' + text + '&title=' + selectedTitle + '&url=' + url;
        console.log("分享的链接是：" + shareUrl);
        window.location.href = shareUrl;
    }
})