$(function () {
    $('body').append('<div class=\'fileexpconmenu conmenu\'>asdasd</div>');
    $.get('./app.json', function (data) {
        var i;
        for (i = 0; i < Object.keys(data).length; i++) {
            console.log(data[Object.keys(data)[i]]);
            generateapp(data[Object.keys(data)[i]]);
        }
    });
});
function welcomeapp() {
    generatewindow({
        path: './welcome.html'
    });
};
function drawapp() {
    generatewindow({
        path: './draw.html'
    });
};
function documentapp() {
    generatewindow({
        path: './documentation.html'
    });
}
function fileexp() {
    generatewindow({
        path: './fileexp.html'
    });
}
