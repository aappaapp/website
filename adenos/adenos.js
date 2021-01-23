function generatewindow(config) {
    var afterappend = function () {
        if (typeof config.css !== 'undefined') {
            if (config.css.this != undefined) {
                $('[data-windowvalue=\'' + window.windowvalue + '\']').css(config.css.this);
            }
            for (i = 0; i < Object.keys(config.css).length; i++) {
                $('[data-windowvalue=\'' + window.windowvalue + '\'] ' + Object.keys(config.css)[i]).css(config.css[Object.keys(config.css)[i]]);
            }
        }
        if (typeof config.callback !== 'undefined') {
            callback = config.callback;
            callback();
        }
        $('[data-windowvalue=\'' + window.windowvalue + '\']').resizable({
            handles: "e, s, w, n, se, sw, nw, ne"
        });
        $('.window').removeClass('focus');
        $('[data-windowvalue=\'' + window.windowvalue + '\']').addClass('focus');
        windowfocus();
        navbarapp();
        $('.titleconmenu').children('.closewin').data('close', window.windowvalue);
        $('.titleconmenu').conmenu('[data-windowvalue=\'' + window.windowvalue + '\'] > .title', function () {
            var ths = '.titleconmenu';
            console.log($(ths).children('.closewin'));
            $(ths).children('.closewin').click(function () {
                closewindow($('[data-windowvalue=\'' + $(ths).children().data('close') + '\']'));
            });
        });
        draggable();
        window.windowvalue++;
    };
    if (typeof config.path !== 'undefined') {
        $.get(config.path, function (data) {
            $('body').append('<div class=\'window\' data-windowvalue=\'' + window.windowvalue + '\'><div class=\'title\'>' + config.title + '<div class=\'close\' onclick=\'closewindow(this);\'>X</div></div><br><div class=\'content\'>' + data + '</div></div>');
            $('[data-windowvalue=\'' + window.windowvalue + '\'] > .title').html($('[data-windowvalue=\'' + window.windowvalue + '\'] > .content > title').html() + '<div class=\'close\' onclick=\'closewindow(this);\'>X</div>');
            $('[data-windowvalue=\'' + window.windowvalue + '\']').trigger('ready');
            afterappend();
        });
    } else {
        $('body').append('<div class=\'window\' data-windowvalue=\'' + window.windowvalue + '\'><div class=\'title\'>' + config.title + '<div class=\'close\' onclick=\'closewindow(this);\'>X</div></div><br><div class=\'content\'>' + config.content + '</div></div>');
        afterappend();
    }
}
function navbarapp() {
    allapp = '<div class=\'text\'>Open App(s): </div>';
    for (i = 0; i < $('.window').length; i++) {
        str = $('.window').eq(i).children('.title').text();
        str = str.substr(0, str.length - 1);
        allapp += '<div class=\'nav-item\'><div class=\'text\'>' + str + '</div></div>';
    }
    if ($('.window').length != 0) {
        $('.allapp').html(allapp);
    } else {
        $('.allapp').html('<div class=\'text\'></div>');
    }
}
function generateapp(config) {
    $('.desktop').append('<div class=\'appicon\' data-openpath=\'' + config.path + '\'><div class=\'img\'><img src=\'' + config.icon + '\'></div><div class=\'name\'>' + config.name + '</div></div>');
    appicon();
}
function closewindow(ele) {
    $(ele).closest('.window').remove();
    navbarapp();
}
function draggable() {
    $('.window').draggable({
        cancel: '.content'
    });
}
function time() {
    setInterval(function () {
        date = new Date;
        $('.time').children().html(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes());
    }, 100);
}
function logoutpage() {
    $('body > *').hide();
    $('body').append('<div class=\'logoutpage\'><div class=\'usericon\'><img src=\'./userphoto.png\'></div></div>');
}
function addBodyContent() {
    $('body > *').wrapAll('<div class=\'content\'></div>');
    $('body > .content').before('<div class=\'nav\'><div class=\'aden nav-item\'><div class=\'text\'>AdenOS</div></div><div class=\'allapp nav-item\'><div class=\'text\'></div></div><div class=\'nav-item time\'><div class=\'text\'></div></div></div>');
    $('body >.nav').after($('.content > *'));
    $('body > .content').remove();
}
function init() {
    window.windowvalue = 0;
    window.ondragstart = function () {
        event.preventDefault();
    }
    addBodyContent();
    time();
    appicon();
    windowfocus();
    $('.deskconmenu').conmenu('.desktop');
    //logoutpage();
}
function windowfocus() {
    $('.window').mousedown(function () {
        $('.window').removeClass('focus');
        $(this).addClass('focus');
    });
}
function appicon() {
    $('.appicon').click(function () {
        $('.appicon').removeClass('focus');
        $(this).addClass('focus');
    });
    $('').click(function () {
        $('.appicon').removeClass('focus');
    });
    $('.appicon').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $('.appicon').removeClass('hover');
    });
    $('.appicon').dblclick(function () {
        generatewindow({
            path: $(this).attr('data-openpath')
        });
    });
}
$(function () {
    init();
    $(document).keydown(function () {
        if (event.key == 'Alt') {
            event.preventDefault();
        }
    });
    $(document).contextmenu(function () {
        event.preventDefault();
    });
    $('.aden').click(function () {
        alert('AdenOS');
    });
})
