$(function () {
    $.gamemaker.createscene({
        type: 'fullscreen',
        bg: 'black',
        id: 'start_animation',
        show: true
    });
    $.gamemaker.createscene({
        type: 'fullscreen',

        bg: 'black',
        id: 'start_menu'
    });
    $('start_animation').gamemaker({
        createsprite: {
            id: 'start_animation_video',
            vid: 'start_animation.mkv',
            autoplay: true,
            mw: '50%',
            mh: '50%',
            x: '50%',
            y: '50%',
            onended: keydownstart
        }
    });
    $(document).on('keydown.start', keydownstart);
    function keydownstart() {
        $(document).off('keydown.start');
        $($('start_animation').gamemaker('get')).fadeOut(1000, function () {
            $($('start_animation_video').gamemaker('get')).find('video')[0].pause();
            $('start_menu').gamemaker('show');
            $('body').append('<audio src=\'BLA.mp3\' autoplay></audio>');
        });
    }
    $('start_menu').gamemaker({
        createsprite: {
            id: 'start_tips',
            text: 'RPG',
            txtcolor: 'white',
            x: '50%',
            y: '50%'
        }
    });
    $('start_menu').gamemaker({
        createsprite: {
            id: 'start_btn',
            text: 'START!!',
            txtcolor: 'white',
            x: '50%',
            y: '60%'
        }
    });
});
