$(function () {
    $('.bar').width($('.bar').height() / 10);
    $('.ball').width($('.bar').width() / 2).height($('.bar').width() / 2);
    gamestart();
});
function gamestart() {
    ballphy();
}
function ballphy() {
    var firstoverlap = false;
    $('.ball').data('angle', 10);
    setInterval(function () {
        var isOverlap = $('.bar').overlap({
            rect: {
                x: $('.ball').position().left,
                y: $('.ball').position().top,
                w: $('.ball').width(),
                h: $('.ball').height()
            }
        });
        if (!firstoverlap) {
            $('.ball').css('left', $('.ball').position().left + 1);
        }
        if (typeof isOverlap[0] != 'undefined') {
            firstoverlap = true;
            $('.ball').data('angle', $('.ball').data('angle') + 10);
        } else { }
    });
}
