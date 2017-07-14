// 姓名验证
function validateName(value) {
    var result = {isValid: true, tips: ''};
    var patt1 = new RegExp("^[\u4e00-\u9fa5]{2,}$");//验证只能中文输入
    if (!patt1.test(value)) {
        result.isValid = false;
        result.tips = result.tips + "请填写正确的中文姓名;";
    }
    return result;
}

//手机验证
function validateMobile(value) {
    var result = {isValid: true, tips: ''};
    //var patt1 = new RegExp("^[1][0-9]{10}$");//验证长度，第一位数必须是1
    var patt1 = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");//验证长度，第一位数必须是1
    if (!patt1.test(value)) {
        result.isValid = false;
        result.tips = result.tips + "请填写正确的手机号码;";
    }
    return result;
}


//电子邮件验证
function validateEmail(value) {
    var result = {isValid: true, tips: ''};
    console.log(value);
    //var patt1 = new RegExp("^[a-zA-Z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z]+$");//验证邮件
    // var patt1 = new RegExp(/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,10}\.[a-zA-Z]{1,5}/);//验证邮件
    // var patt1 = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);//验证邮件
    // var patt1 = new RegExp(/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);//验证邮件
    var patt1 = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");//验证邮件
    if (!patt1.test(value)) {
        result.isValid = false;
        result.tips = result.tips + "请填写正确的邮箱;";
    }
    return result;
}


//中文删除
function text_chinese(s) {
    var pattern = new RegExp("^[\u4e00-\u9fa5]{1,}$");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}


//名称输入其他字符会自动删除
function nameStripscript(s) {
    var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]%<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、@＃¥％＊？_a-zA-Z0-9]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

//手机输入其他字符会自动删除
function phoneStripscript(s) {
    var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]%<>/?~！#￥……&*（）@——|{}【】‘；：”“'。，、？_a-zA-Z]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
} 


//省份证自动删除符号
function IDstripscript(s) {
    var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]%<>/?~！#￥……&*（）@——|{}【】‘；：”“'。，、？_%+-]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

//获取路径特定名称参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

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

//身份证验证
//function checkId(id) {
//
//
//    //if ((/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(id)) || (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(id))) {
//    //    return true;
//    //} else {
//    //    return false;
//}
var powers = new Array("7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2");
var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
var sex = "male";

function checkId(obj) {
    var _id = obj;
    if (_id == "")return;
    var _valid = false;
    if (_id.length == 15) {
        _valid = validId15(_id);
    } else if (_id.length == 18) {
        _valid = validId18(_id);
    }
    if (!_valid) {//身份证号码有误
        return false;
    } else {
        return true;
    }
}

//校验18位的身份证号码

function validId18(_id) {
    _id = _id + "";
    var _num = _id.substr(0, 17);
    var _parityBit = _id.substr(17);
    var _power = 0;
    for (var i = 0; i < 17; i++) {
        //校验每一位的合法性
        if (_num.charAt(i) < '0' || _num.charAt(i) > '9') {
            return false;
            break;
        } else {
            //加权
            _power += parseInt(_num.charAt(i)) * parseInt(powers[i]);
            //设置性别
            if (i == 16 && parseInt(_num.charAt(i)) % 2 == 0) {
                sex = "female";
            } else {
                sex = "male";
            }
        }
    }
    //取模
    var mod = parseInt(_power) % 11;
    if (parityBit[mod] == _parityBit) {
        return true;
    }
    return false;
}

//校验15位的身份证号码

function validId15(_id) {
    var vs = "10X98765432";
    var v = new Array();
    v.push(2, 4, 8, 5, 10, 9, 7, 3, 6, 1, 2, 4, 8, 5, 10, 9, 7);
    var cardID17 = _id.substring(0, 6) + "19" + _id.substring(6);
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
    return validId18(cardID18);
}


function checkAge(age) {
    var year = age.substr(6, 4);
    var month = age.substr(10, 2);
    var day = age.substr(12, 2);
    var d = new Date();
    d.setDate(day);
    d.setMonth(month - 1);
    d.setYear(year);
    var now = new Date().getTime();
    var real = (now - d.getTime()) / (1000 * 60 * 60 * 24 * 365);

    if (real < 18 || real > 60) {
        return false;
    } else {
        return true;
    }
}
