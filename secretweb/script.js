function recommend_post() {
    $('body').animate({
        scrollTop: $('.recommend-post')
    });
}
function gotop() {
    $('body').animate({
        scrollTop: 0
    });
}
$(function () {
    $('body > *').wrapAll('<div class=\'content\'></div>');
    $.get('nav.html', function (data) {
        $('body > .content').before(data);
        $('body > .content').css({
            'margin-top': $('nav').height() + 20
        });
    });
    $.get('footer.html', function (data) {
        $('body > .content').after(data).after('<div class=\'footer-push\'></div>');
        $('.footer-push').height($('body').height() - $('body > .content').height());
    });
});
