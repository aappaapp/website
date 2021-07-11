$(function () {
    $('body').css('padding-top', $('nav').height());
    gsap.fromTo('section', 1, {
        autoAlpha: 0,
        x: -50
    }, {
        autoAlpha: 1,
        x: 0
    });
});
