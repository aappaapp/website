$(function () {
    $('.button').click(function () {
        var text = $('.text').val();
        var number = Number($('.number').val());
        console.log(text, number);
        $('.output').text(caecip(text, number));
    });
});
