$(function () {
    $('.bar').width($('.bar').height() / 10);
    $('.ball').width($('.bar').width() / 2).height($('.bar').width() / 2);
    gamestart();
});
function gamestart() {
    ballphy();
}
function ballphy() {
    $('.ball').data('angle', 10);
    var angle = $('.ball').data('angle');
    var speed = 10;
    var anglespeed = 100;
    var anglemulit = 100;
    var angledivis = 1;
    var randomrange = 0;
    var resetvalue = 1000;
    setInterval(function () {
        var isOverlap = $('.bar').overlap({
            rect: {
                x: $('.ball').position().left,
                y: $('.ball').position().top,
                w: $('.ball').width(),
                h: $('.ball').height()
            }
        });
        angle = $('.ball').data('angle');
        $('.ball').css({
            left: $('.ball').position().left + speed * (angle / anglespeed),
            top: $('.ball').position().top + speed * (angle / (anglespeed * anglemulit))
        });
        if (angle >= resetvalue || angle <= -resetvalue) {
            $('.ball').data('angle', 10);
        }
        console.log(angle);
        $('.ball').before('<div class=\'ballmark\' style=\'left: ' + $('.ball').position().left + ';top: ' + $('.ball').position().top + ';\'></div>');
        $('.ballmark').width($('.bar').width() / 2).height($('.bar').width() / 2);
        if (typeof isOverlap[0] != 'undefined') {
            var random = Math.floor(Math.random() * (angledivis + randomrange)) + (angledivis - randomrange);
            if ($(isOverlap).hasClass('rightbar')) {
                $('.ball').data('angle', angle - (anglemulit / random));
            } else if (($(isOverlap).hasClass('leftbar'))) {
                $('.ball').data('angle', angle + (anglemulit / random));
            }
        } else { }
    });
}
