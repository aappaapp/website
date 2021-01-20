/* jquery-ondrag.js | Made By Aden Pun | adenpun.github.io */
$.fn.ondrag = function (callback) {
    $(this).mousedown(function () {
        window.dragismousedown = true;
    }).mouseup(function () {
        window.dragismousedown = false;
    });
    $(this).mousemove(function () {
        if (window.dragismousedown) {
            callback();
        }
    });
}
