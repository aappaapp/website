function drag() {
    var gridWidth = 50;
    var gridHeight = 50;
    Draggable.create('.container .box', {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: '.container',
        inertia: true,
        liveSnap: true,
        snap: {
            x: function (endValue) {
                return Math.round(endValue / gridWidth) * gridWidth;
            },
            y: function (endValue) {
                return Math.round(endValue / gridHeight) * gridHeight;
            }
        }
    });
}
function copy() {
    var navitem = $('.nav .box');
    var i;
    for (i = 0; i < navitem.length; i++) {
        navitem.eq(i).click(function () {
            console.log($(event.this).css('background-color'));
            $('.container').append('<div class=\'box\' style=\'background-color: ' + $(this).css('background-color') + ';\'></div>');
            drag();
        });
    }
}
$(function () {
    copy();
    drag();
});
