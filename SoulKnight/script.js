function getDeviceType() {
    var ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
    ) {
        return "mobile";
    }
    return "desktop";
};
$(document).ready(function () {
    var deviceType = getDeviceType();
    if (deviceType == 'desktop') {
        $('div:not(#warning)').css('display', 'none');
        $('#warning').css('display', 'block');
        $('#warning h1').html('This is a Mobile Game.<br>But the app is not finish.<br>if the app finish, this page will change to download page.');
    }
    $(document).click(function () {
        $('#homepage').css('display', 'none');
        $('#gamearea').css('display', 'block');
    });
});
