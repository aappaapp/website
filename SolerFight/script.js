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
function webapp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', { scope: './' })
            .then(function (registration) {
                console.log('Service Worker Registered');
            });

        navigator.serviceWorker.ready.then(function (registration) {
            console.log('Service Worker Ready');
        });
        caches.keys().then(function (cacheNames) {
            cacheNames.forEach(function (cacheName) {
                caches.delete(cacheName);
            });
        });
    }

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-59325548-2', 'auto');
    ga('send', 'pageview');
}
$.fn.move = function (x, y) {
    var x1 = Number(this.css('left').substr(0, this.css('left').length - 2));
    var y1 = Number(this.css('top').substr(0, this.css('top').length - 2));
    console.log(x1 + 'px');
    console.log(x1 + x + 'px');
    this.css('left', x1 + x + 'px');
    this.css('top', y1 + y + 'px');
}
function generatescene() {
    Math.floor(Math.random() * 101) + 1;
    for (i = 1; i < 101; i++) {
        $('#fightarea').append('<div class=\'block\'>block' + i + '</div>');
    }
    $('.block').wrapAll('<div class=\'scene\'></div>');
}
$(document).ready(function () {
    webapp();
    generatescene();
    window.deviceType = getDeviceType();
    if (window.deviceType == 'deskatop') {
        $('div:not(#warning)').css('display', 'none');
        $('#warning').css('display', 'inline-block');
        $('#warning h1').html('This is a Mobile Game.<br>If you want to play in desktop, you can press this <a href=javascript:play_beta()>Link</a> to play beta!');
    }
    setInterval(function () {
        if (window.chosehero == 'warrior') {
            $('#fightarea > #sprite').html('<img src=\'warrior.png\'>');
        } else if (window.chosehero == undefined) {
            window.chosehero = 'warrior';
        }
    }, 10);
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
    });
    $('#gamearea #startbtn').click(function () {
        $('#spriteselect').css('display', 'none');
        $('#fightarea').css('display', 'inline-block');
    });
    $(document).keydown(function () {
        if (event.which == 39) {
            $('#fightarea #sprite').move(10, 0);
        } else if (event.which == 37) {
            $('#fightarea #sprite').move(-10, 0);
        } else if (event.which == 38) {
            $('#fightarea #sprite').move(0, -10);
        } else if (event.which == 40) {
            $('#fightarea #sprite').move(0, 10);
        }
    });
});
