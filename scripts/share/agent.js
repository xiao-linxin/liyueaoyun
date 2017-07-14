var agent = navigator.userAgent;
// var agent = 'Mozilla/5.0 (Linux; U; Android 4.1.2; zh-cn; GT-N7102 Build/JZO54K) MicroMessenger AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 duduBus/4.0.0 Android/4.1.2 AID/cTklJYYKFMWgj+WRKUNOMh+9N78= SID/mK6cOqtgq4LYD1Fro4p/IYrDLU8=';

//console.log(agent)
var androidReg = new RegExp("Android");
var iphoneReg = new RegExp("iPhone");
var mpmBankReg = new RegExp("MPBank");
var WXReg = new RegExp("MicroMessenger"); //嘟嘟巴士

//window.screen.lockOrientation(["portrait-primary","portrait-secondary"]);

// console.log(duduBusReg);
if (mpmBankReg.test(agent)  ) { //如果在招行app内

}
else {//其它浏览器

};
