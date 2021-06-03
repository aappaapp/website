$(function () {
    $('body').css('padding-top', $('nav').height());
    gsap.fromTo('section', 1, {
        autoAlpha: 0,
        x: -50
    }, {
        autoAlpha: 1,
        x: 0
    });
    $('.download1').click(function () {
        $('body').animate({
            scrollTop: $('#download').offset().top - $('nav').height()
        }, 500);
    });
});
