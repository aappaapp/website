$(function () {
    $.gamemaker.createscene({
        type: 'fullscreen',
        bg: 'black',
        id: 'Home',
        show: true
    });
    $.gamemaker.createscene({
        type: 'fullscreen',
        bg: 'black',
        id: 'Main'
    });
    $('Home').gamemaker({
        createsprite: {
            id: 'startbtn',
            text: 'This is the start button',
            txtcolor: 'white',
            type: 'button'
        }
    });
    $('Main').gamemaker({
        createsprite: {
            id: 'fye',
            img: 'Iye - Fire - Fye.png'
        }
    });
    $('Fye').gamemaker('gravity');
    $('Main').gamemaker('gravity_floor');
});
