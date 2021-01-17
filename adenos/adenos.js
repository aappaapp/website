function generatewindow(config) {
    if (typeof config.path !== 'undefined') {
        $.get(config.path, function (data) {
            $('body').append('<div class=\'window\' data-windowvalue=\'' + window.windowvalue + '\'><div class=\'title\'>' + config.title + '<div class=\'close\' onclick=\'closewindow(this);\'>X</div></div><br><div class=\'content\'>' + data + '</div></div>');
            $('[data-windowvalue=\'' + window.windowvalue + '\'] > .title').text($('[data-windowvalue=\'' + window.windowvalue + '\'] > .content > title').text());
        });
    } else {
        $('body').append('<div class=\'window\' data-windowvalue=\'' + window.windowvalue + '\'><div class=\'title\'>' + config.title + '<div class=\'close\' onclick=\'closewindow(this);\'>X</div></div><br><div class=\'content\'>' + config.content + '</div></div>');
    }
    if (typeof config.css !== 'undefined') {
        console.log(config.css);
        if (config.css.this != undefined) {
            $('[data-windowvalue=\'' + window.windowvalue + '\']').css(config.css.this);
        }
        console.log('[data-windowvalue=\'' + window.windowvalue + '\'] ' + Object.keys(config.css)[0]);
        for (i = 0; i < Object.keys(config.css).length; i++) {
            $('[data-windowvalue=\'' + window.windowvalue + '\'] ' + Object.keys(config.css)[i]).css(config.css[Object.keys(config.css)[i]]);
        }
    }
    if (typeof config.callback !== 'undefined') {
        callback = config.callback;
        callback();
    }
    $('[data-windowvalue=\'' + window.windowvalue + '\']').resizable();
    window.windowvalue++;
    setTimeout(function () {
        draggable();
    }, 500)
}
function closewindow(ele) {
    $(ele).closest('.window').remove();
}
function draggable() {
    $('.window').draggable({
        cancel: '.content'
    });
}
function time() {
    setInterval(function () {
        date = new Date;
        $('.time').html(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes());
    }, 100);
}
function logoutpage() {
    $('body > *').hide();
    $('body').append('<div class=\'logoutpage\'><div class=\'usericon\'><img src=\'./userphoto.png\'></div></div>');
}
function addBodyContent() {
    $('body > *').wrapAll('<div class=\'content\'></div>');
    $('body > .content').before('<div class=\'nav\'><div class=\'aden nav-item\'><div class=\'text\'>AdenOS</div></div><div class=\'nav-item\'><div class=\'text time\'></div></div></div>');
    $('body >.nav').after($('.content > *'));
    $('body > .content').remove();
}
function init() {
    window.windowvalue = 0;
    addBodyContent();
    appicon();
    //logoutpage();
}
function appicon() {
    $('.appicon').click(function () {
        $('.appicon').removeClass('focus');
        $(this).addClass('focus');
    });
    $('.desktop .push').click(function () {
        $('.appicon').removeClass('focus');
    });
    $('.appicon').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $('.appicon').removeClass('hover');
    });
}
$(function () {
    init();
    time();
    $('.aden').click(function () {
        alert('AdenOS');
    });
})
