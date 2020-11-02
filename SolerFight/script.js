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
function play_beta() {
    $('#warning').css('display', 'none');
    $('div:not(#warning)').css('display', 'block');
}
$(document).ready(function () {
    var deviceType = getDeviceType();
    if (deviceType == 'deskatop') {
        $('div:not(#warning)').css('display', 'none');
        $('#warning').css('display', 'block');
        $('#warning h1').html('This is a Mobile Game.<br>If you want to play in desktop, you can press this <a href=javascript:play_beta()>Link</a> to play beta!');
    }
    $(document).click(function () {
        $('#homepage').css('display', 'none');
        $('#gamearea').css('display', 'block');
    });
    $('#warrior').click(function () {
        $('#spriteselect > div').css('display', 'none');
        $('#spriteinfo').css('display', 'block');
        $('#spriteinfo > *:not(#warrior)').css('display', 'none');
        $('#spriteinfo #warrior').css('display', 'block');
    });
    $('#warrior #choosebtn').click(function () {
        window.chosehero = 'warrior';
        $('#spriteinfo').css('display', 'none');
        $('#spriteselect > *:not(#spriteinfo)').css('display', 'block');
        alert(window.chosehero);
    });
});
