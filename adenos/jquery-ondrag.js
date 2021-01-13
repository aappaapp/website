$.fn.ondrag = function (callback) {
    $(this).mousedown(function () {
        $(this).mousemove(function () {
            callback();
        })
    })
}
