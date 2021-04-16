$(function () {
    vh = $(document).height();
    vw = $(document).width();
    $('body > *').wrapAll('<div class=\'content\'></div>');
    $.get('nav.html', function (data) {
        $('body > .content').before(data);
        gsap.fromTo('nav', 0.6, {
            autoAlpha: 0,
            y: -10
        }, {
            autoAlpha: 1,
            y: 0
        });
        setTimeout(function () {
            gsap.fromTo('body > .content', 0.6, {
                autoAlpha: 0,
                x: -10
            }, {
                autoAlpha: 1,
                x: 0
            });
        }, 600);
    });
});
