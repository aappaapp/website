$(function () {
    setTimeout(function () {
        $('.nav').addClass('box');
        $('.nav').draggable();
        $('.nav .aden .text').text('AdenOS - futuristic');
        setInterval(function () {
            $('.window').addClass('box');
        });
    });
});
