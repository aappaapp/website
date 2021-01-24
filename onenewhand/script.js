$(function () {
    vh = $(document).height();
    vw = $(document).width();
    console.log($().warpAll);
    $('body > *').wrapAll('<div class=\'content\'></div>');
    $.get('nav.html', function (data) {
        $('body > .content').before(data);
        reloadchange(function () {
            $('.textloadtips').hide();
            $('.nav-title').click(function () {
                location = './index.html';
            });
            $('.orgwebbtn').click(function () {
                location.href = '../index.html';
                console.log('sd');
            });
        });
        /*$('html, body').animate({
            scrollTop: $('.aboutme').position().top - $('nav').height()
        }, 2000);*/
    });
});
