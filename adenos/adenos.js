function generatewindow(config) {
    $('body').append('<div class=\'window\' data-windowvalue=\'' + window.windowvalue + '\'><div class=\'title\'>' + config.title + '<div class=\'close\' onclick=\'closewindow(this);\'>X</div></div><br><div class=\'content\'>' + config.content + '</div></div>');
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
    $('[data-windowvalue=\'' + window.windowvalue + '\']').data('dragvalue', window.windowvalue);
    $(':data(\'dragvalue\')').ondrag(function () {
        ths = $('[data-windowvalue=\'' + window.windowvalue + '\']');
        console.log(ths);
        $(ths).css('transform', '0');
    });
    window.windowvalue++;
    draggable();
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
    $('.appicon').hover(function () {
        $(this).css('background', '#0000ff11');
    }, function () {
        if (!$(this).hasClass('focus')) {
            $(this).css('background', 'transparent');
        }
    });
    $('.appicon').click(function () {
        $('.appicon').css('background', 'transparent');
        $(this).css('background', '#0000ff11');
        $(this).addClass('focus');
    });
}
$(function () {
    init();
    time();
    $('.aden').click(function () {
        alert('AdenOS');
    });
})