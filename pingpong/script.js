$(function () {
    $('.bar').width($('.bar').height() / 10);
    size = 0.2;
    $('.ball').width($('.bar').width() / size).height($('.bar').width() / size);
    gamestart();
});
function gamestart() {
    ballphy();
}
function ballphy() {
    var orgspeed = 2;
    $('.ball').data('speed', orgspeed);
    $('.ball img').css('max-width', $('.ball').width());
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
        $('.ballmark').width($('.bar').width() / size).height($('.bar').width() / size);
        if (typeof isOverlap[0] != 'undefined') {
            if ($(isOverlap).hasClass('rightbar')) {
                $('.ball').data('speed', speed - (angle / speeddivis));
            } else if (($(isOverlap).hasClass('leftbar'))) {
                $('.ball').data('speed', speed + (angle / speeddivis));
            }
        } else { }
    });
}
