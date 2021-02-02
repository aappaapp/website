$(function () {
    $.get('./nav.html', function (data) {
        $('body > *').wrapAll('<div class=\'content\'></div>');
        $('body > .content').before(data);
        setTimeout(function () {
            $(document).attr('title', window.langtext['text.title']);
        }, 500);
    });
});
