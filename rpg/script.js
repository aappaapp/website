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
            onended: keydownskipanimate
        }
    });
    $(document).on('keydown.start', keydownskipanimate);
    function keydownskipanimate() {
        $(document).off('keydown.start');
        $($('start_animation').gamemaker('get')).fadeOut(1000, function () {
            $($('start_animation_video').gamemaker('get')).find('video')[0].pause();
            $('start_menu').gamemaker('show');
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
                    alert('sd');
                }
            });
        });
    }
});
