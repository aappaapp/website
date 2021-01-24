$(function () {
    $('.bar').width($('.bar').height() / 10);
    $('.ball').width($('.bar').width() / 2).height($('.bar').width() / 2);
    gamestart();
});
function gamestart() {
    ballphy();
}
function ballphy() {
    var orgspeed = 2;
    $('.ball').data('speed', orgspeed);
    var speed = $('.ball').data('speed');
    var angle = 20;
    var speeddivis = 100;
    var resetvalue = 2;
    setInterval(function () {
        var isOverlap = $('.bar').overlap({
            rect: {
                x: $('.ball').position().left,
                y: $('.ball').position().top,
                w: $('.ball').width(),
                h: $('.ball').height()
            }
        });
        speed = $('.ball').data('speed');
        $('.ball').css({
            left: $('.ball').position().left + speed * (speed / speed),
            top: $('.ball').position().top + speed * (speed / (speed * angle))
        });
        if (speed >= resetvalue) {
            $('.ball').data('speed', orgspeed);
        }
        if (speed <= -resetvalue) {
            $('.ball').data('speed', -orgspeed);
        }
        //$('.ball').before('<div class=\'ballmark\' style=\'left: ' + $('.ball').position().left + ';top: ' + $('.ball').position().top + ';\'></div>');
        $('.ballmark').width($('.bar').width() / 2).height($('.bar').width() / 2);
        if (typeof isOverlap[0] != 'undefined') {
            if ($(isOverlap).hasClass('rightbar')) {
                $('.ball').data('speed', speed - (angle / speeddivis));
            } else if (($(isOverlap).hasClass('leftbar'))) {
                $('.ball').data('speed', speed + (angle / speeddivis));
            }
        } else { }
    });
}
