$(function () {
    new fullpage('.fullpage ', {
        autoScrolling: true,
        scrollHorizontally: true
    });
    gsap.fromTo('h1', 1, {
        x: 0 - $('h1').width() / 5,
        autoAlpha: 0
    }, {
        x: 0,
        autoAlpha: 1
    });
});
