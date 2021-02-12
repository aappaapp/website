/* jquery-ondrag.js | Made By Aden Pun | adenpun.github.io */
$.fn.ondrag = function (callback) {
    var dragisfirsttime = true;
    var dragismousedown = false;
    $(this).mousedown(function () {
        dragismousedown = true;
    }).mouseup(function () {
        dragisfirsttime = true;
        dragismousedown = false;
    });
    $(this).mousemove(function () {
        event.first = dragisfirsttime;
        if (dragismousedown) {
            dragisfirsttime = false;
            callback(event);
        }
    });
}
