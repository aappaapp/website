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
function init() {
    window.windowvalue = 0;
    $('body > *').wrapAll('<div class=\'content\'></div>');
    $('.content').before('<div class=\'nav\'><div class=\'aden nav-item\'><div class=\'text\'>AdenOS</div></div><div class=\'nav-item\'><div class=\'text time\'></div></div></div>');
    appicon();
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
    generatewindow({
        title: 'Welcome to AdenOS',
        content: '<h1>Welcome to AdenOS</h1><p>This is a operating system made with HTML, CSS, JS.</p><input type=\'button\' value=\'Close\' onclick=\'closewindow(this);\'>',
        css: {
            this: {
                position: 'absoulte',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }
        }
    });
    time();
    $('.aden').click(function () {
        alert('AdenOS');
    });
})
