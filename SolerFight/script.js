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
    $('div:not(#warning)').css('display', 'inline-block');
}
$(document).ready(function () {
    var deviceType = getDeviceType();
    if (deviceType == 'deskatop') {
        $('div:not(#warning)').css('display', 'none');
        $('#warning').css('display', 'inline-block');
        $('#warning h1').html('This is a Mobile Game.<br>If you want to play in desktop, you can press this <a href=javascript:play_beta()>Link</a> to play beta!');
    }
    $('#homepage').click(function () {
        $('#homepage').css('display', 'none');
        $('#gamearea').css('display', 'inline-block');
    });
    $('#warrior').click(function () {
        $('#spriteselect > div').css('display', 'none');
        $('#spriteinfo').css('display', 'inline-block');
        $('#spriteinfo > *:not(#warrior)').css('display', 'none');
        $('#spriteinfo #warrior').css('display', 'inline-block');
    });
    $('#warrior #choosebtn').click(function () {
        window.chosehero = 'warrior';
        $('#spriteinfo').css('display', 'none');
        $('#spriteselect > *:not(#spriteinfo, #shop)').css('display', 'inline-block');
        $('#fightarea').css('display', 'inline-block');
        if (window.chosehero == 'warrior') {
            $('#fightarea > #sprite').html('<img src=\'' + window.chosehero + '.png\'>')
        }
    });
    $('#gamearea #startbtn').click(function () { });
});
