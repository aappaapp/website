$(function () {
    date = new Date;
    $('.year').text(date.getFullYear());
    $('.month').text(date.getMonth() + 1);
    $('.day').text(date.getDate());
    setTimeout(function () {
        $('.nav').addClass('box');
        $('.nav').draggable();
        setInterval(function () {
            $('.window').addClass('box');
        });
    });
});
