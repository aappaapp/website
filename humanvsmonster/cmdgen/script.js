$(document).ready(function () {
    setInterval(function () {
        $('.copytext').val(window.copytext);
    });
    $('.startbtn').click(function () {
        $('.menu').css('display', 'none');
        $('.genarea').css('display', 'inline-block');
    });
    $('.copybtn').click(function () {
        window.copytext = '';
        if ($('.setmp').is(':checked')) {
            window.copytext = window.copytext + 'window.entitymp = ' + $('.setmpval').val() + ';';
        }
        if ($('.setmpreval').is(':checked')) {
            window.copytext = window.copytext + 'window.choseentity.mprestorevalue = ' + $('.setmprevalx2').val() + ';';
        }
        if ($('.setmaxmp').is(':checked')) {
            window.copytext = window.copytext + 'window.choseentity.mp = ' + $('.setmaxmpval').val() + ';';
        }
        if ($('.setcurweamp').is(':checked')) {
            window.copytext = window.copytext + 'window.choseweapon.mp = ' + $('.setcurweampval').val() + ';';
        }
        setTimeout(function () {
            $('.copytext').select();
            document.execCommand('copy');
        }, 100);
    });
});
