$(function () {
    vh = $(document).height();
    vw = $(document).width();
    console.log($().warpAll);
    $('body > *').wrapAll('<div class=\'content\'></div>');
    $.get('nav.html', function (data) {
        $('body > .content').before(data);
        $('.nav-title').click(function () {
            location = './index.html';
        });
        $('html, body').animate({
            scrollTop: $('.aboutme').position().top - $('nav').height()
        }, 2000);
    });
});
