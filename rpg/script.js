$(function () {
    $.gamemaker.createscene({
        type: 'fullscreen',
        bg: 'black',
        id: 'start_animation',
        show: true
    });
    $('start_animation').gamemaker({
        createsprite: {
            id: 'animation',
            txtcolor: 'white',
            type: 'button',
            vid: 'output0001-0240.mkv',
            mw: '50%',
            mh: '50%',
            x: '50%',
            y: '50%'
        }
    });
    $.gamemaker.createscene({
        type: 'fullscreen',
        bg: 'black',
        id: 'start_menu'
    });
});
