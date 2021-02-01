function readfile() {
    $.get('config.json', function (data) {
        window.config = data;
    });
    $.get('page.json', function (data) {
        window.page = data;
    });
}
$(document).ready(function () {
    readfile();
    setTimeout(function () {
        $(document).attr('title', window.config.name);
        $('body').append('<div class=\'content mw-body\'></div>').append('<div class=\'mw-navigation\'></div>');
        $('.mw-navigation').append('<div class=\'mw-head\'></div>').append('<div class=\'mw-panel\'></div>');
        $('.mw-panel').append('<div class=\'p-logo\'></div>').append('<nav class=\'p-navigation mw-portlet mw-portlet-navigation vector-menu vector-menu-portal portal\'></nav>');
        $('.p-logo').append('<a class=\'mw-wiki-logo\' href=\'index.html\' title=\'Home\'><img src=\'' + window.config.icon + '\'></a>');
        $('.p-navigation').append('<div class=\'vector-menu-content\'></div>');
        $('.vector-menu-content').append('<ul class=\'vector-menu-content-list\'></ul>');
        $('.vector-menu-content-list').append('<li class=\'n-test\'></li>');
        $('.n-test').append('<a href=\'index.html\'>' + window.langtext['text.home'] + '</a>');
    }, 500)
});
