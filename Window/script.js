function css() {
    $('body').css({
        'user-select': 'none',
        'overflow': 'hidden',
        'font-family': 'Arial, Helvetica, sans-serif'
    });
    $('#title').css({
        'min-width': '250px',
        'background': 'lightgrey',
        'color': 'white',
        'font-size': '20px',
        'height': '20px'
    });
    $('#content').css({
        'cursor': 'auto'
    });
    $('#window').css({
        'display': 'inline-block',
        'border': '1px solid black',
        'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    });
    $('#title span').css({
        'float': 'right',
        'height': '100% ',
        'display': 'inline-block'
    });
    $('#title span').hover(function () {
        $(this).css({
            'background': 'red'
        });
    }, function () {
        $(this).css({
            'background': 'none'
        });
    });
}
$(document).ready(function () {
    $('.draggable').draggable({
        scroll: false,
        cancel: '#content'
    });
    css();
});
