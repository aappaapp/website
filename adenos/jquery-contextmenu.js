/* jquery-contextmenu.js | Made By Aden Pun | adenpun.github.io */
$.fn.conmenu = function (place, callback) {
    var ele = this;
    $(this).hide();
    $(this).css({
        position: 'absolute',
        'z-index': '100'
    });
    $(place).contextmenu(function () {
        event.preventDefault();
        $(ele).show();
        $(ele).css({
            top: event.pageY,
            left: event.pageX
        });
        console.log();
        if (typeof callback != 'undefined') {
            callback(ele, place);
        }
    });
    $(document).mousedown(function () {
        if (typeof $(event.target).closest(ele)[0] == 'undefined') {
            $(ele).hide();
        } else {
            setTimeout(function () {
                $(ele).hide();
            }, 500);
        }
    });
}
