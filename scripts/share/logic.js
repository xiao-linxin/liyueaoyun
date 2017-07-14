function down() {
    console.log("下载点击");
    window.location.href = 'http://m.cmbchina.com/app2/index.html?source=nmsms';
}

function start() {
    if (WXReg.test(agent)) {//如果在微信浏览器内
        showShareTips();
    } else if (mpmBankReg.test(agent)) { //如果在招行app
        showShareTips();
    } else {//其它浏览器
        console.log("share");
        window.location.href = 'cmbmobilebank://CMBLS/FunctionJump?id=1&action=gocorpno&corpno=001043';
    };
}


function showShareTips() {
    // $('.share_tips').css("display", "block");
    document.getElementById('share_tips').style.display = 'block';
}

function hideShareTips() {
    // $('.share_tips').css("display", "none");
    document.getElementById('share_tips').style.display = 'none';
}