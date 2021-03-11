$(function () {
    $('.reset.txtbtn').click(function () {
        alert('Sorry, we don\'t support resetting the game.');
    });
    $('.continue.txtbtn').click(function () {
        $('.homepage').hide();
        $('.gamepage').show();
    });
});
