$(function () {
    $.gamemaker.createscene({
        type: 'fullscreen',
        bg: 'black',
        id: 'start_animation',
        show: true
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
            onended: keydownskipanimate
        }
    });
    $(document).on('keydown.start', keydownskipanimate);
    function keydownskipanimate() {
        $(document).off('keydown.start');
        $($('start_animation').gamemaker('get')).fadeOut(1000, function () {
            $($('start_animation_video').gamemaker('get')).find('video')[0].pause();
            $.gamemaker.createscene({
                type: 'fullscreen',
                bg: 'black',
                id: 'start_menu',
                show: true
            });
            $.gamemaker.playaudio('BLA.mp3');
            $('start_menu').gamemaker({
                createsprite: {
                    id: 'Title',
                    text: 'RPG',
                    txtcolor: 'white',
                    x: '50%',
                    y: '50%'
                }
            });
            $('start_menu').gamemaker({
                createsprite: {
                    id: 'start_tips',
                    text: 'Press Spacebar<span class=\'material-icons\' style=\'vertical-align: middle;font-size: 2em;\'>space_bar</span> To Start',
                    txtcolor: 'white',
                    x: '50%',
                    y: '60%'
                }
            });
            $(document).on('keydown.keydownstart', function (event) {
                if (event.which == '32') {
                    $(document).off('keydown.keydownstart');
                    $('start_menu').gamemaker('hide');
                    $.gamemaker.createscene({
                        type: 'fullscreen',
                        bg: 'black',
                        id: 'choose_name',
                        show: true
                    });
                    $('choose_name').gamemaker({
                        createsprite: {
                            id: 'choose_name_display',
                            text: 'as',
                            txtcolor: 'white',
                            x: '50%',
                            y: '30%'
                        }
                    });
                }
            });
        });
    }
});
