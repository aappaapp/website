$.fn.conmenu = function (place) {
    ele = this;
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
    });
    $(document).click(function () {
        if (typeof $(event.target).closest(ele)[0] == 'undefined') {
            $(ele).hide();
        }
    });
}
