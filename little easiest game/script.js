$(function () {
    $.gamemaker.createscene({
        type: 'fullscreen',
        bg: 'grey',
        id: 'Main',
        show: true
    });
    $('Main').gamemaker({
        createsprite: {
            text: 'sd',
            txtcolor: 'white'
        }
    });
});
