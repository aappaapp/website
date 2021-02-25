$(function () {
    $.gamemaker.createscene({
        type: 'fullscreen',
        w: 360,
        h: 280,
        bg: 'black',
        id: 'Scene1',
        show: true
    });
    $('Scene1').gamemaker({
        createsprite: {
            id: 'Fye',
            img: 'Iye - Fire - Fye.png',
        }
    });
    $('Fye').gamemaker('gravity');
    $('Scene1').gamemaker('gravity_floor')
});
