/**
 * Created by brave on 15/12/30.
 *
 */
var agent = navigator.userAgent;
//var agent = 'Mozilla/5.0 (Linux; U; Android 4.1.2; zh-cn; GT-N7102 Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 MPBank/4.0.0 Android/4.1.2 AID/cTklJYYKFMWgj+WRKUNOMh+9N78= SID/mK6cOqtgq4LYD1Fro4p/IYrDLU8=';
console.log(agent);

var androidReg = new RegExp("Android");
var iphoneReg = new RegExp("iPhone");
var mpmBankReg = new RegExp("MPBank");
var weixinReg = new RegExp("MicroMessenger");

//window.screen.lockOrientation(["portrait-primary","portrait-secondary"]);

if (mpmBankReg.test(agent)) {
    doThingsInMpMApp();
}
else {//其它浏览器
    doThingsNotInMpMApp();
}
;

//顶部栏现实
function doThingsInMpMApp() {
    $('.globalHeader').css('display', 'block');
    console.log('inMpmApp');
};

//顶部栏隐藏
function doThingsNotInMpMApp() {
    $('.globalHeader').css('display', 'none');
    console.log('NotInMpmApp');
};

