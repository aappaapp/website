function fileexpcss() {
    $('.fileexp .sidebar').height($('.fileexp').parent().parent().height() - $('.fileexp').parent().parent().children('.title').height());
    $('.fileexp .topbar').css('left', $('.fileexp .sidebar').width());
    $('.fileexp .filedisplay').css({
        left: $('.fileexp .sidebar').width(),
        top: $('.fileexp .topbar').height() + $('.fileexp').parent().parent().children('.title').height()
    });
}
fileexpcss();
setTimeout(function () {
    $('.fileexpconmenu').conmenu('.fileexp');
    $('.fileexp').parent().css('padding', '0');
    setTimeout(function () {
        $('.fileexp').parent().parent().height($('.fileexp .filedisplay').height() + $('.fileexp .sidebar').height()).width($('.fileexp .sidebar').width() + $('.fileexp .topbar').width() + 100);
    }, 100);
    $('.fileexp').parent().parent().children('.ui-resizable-handle').ondrag(function () {
        fileexpcss();
        console.log('dragging');
    });
});
$.get('./file.json', function (data) {
    //console.log(Object.keys(data[Object.keys(data)[0]])[0]);
    $('.filedisplay').html('');
    for (filevalue = 0; filevalue < Object.keys(data[Object.keys(data)[0]]).length; filevalue++) {
        var filename = Object.keys(data[Object.keys(data)[0]])[filevalue];
        var filecontent = data[Object.keys(data)[0]][filename];
        console.log(filename, filecontent);
        $('.filedisplay').append('<div class=\'file\'>' + filename + '</div>');
    }
    $('.filedisplay .file').dblclick(function () {
        console.log(data[Object.keys(data)[0]][$(this).text()]);
        generatewindow({
            title: 'Text Viewer - ' + $(this).text(),
            content: data[Object.keys(data)[0]][$(this).text()],
            css: {
                this: {
                    'white-space': 'break-spaces'
                }
            }
        });
    });
});
