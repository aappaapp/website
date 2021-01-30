$(function () {
    $('.cmdenter').keydown(function () {
        var key = event.key;
        setTimeout(function () {
            var cmdval = $('.cmdenter').val();
            if (cmdval[0] == '/') {
                console.log('/');
                if (event.key == 'Enter') {
                    var cmdval2 = cmdval.substring(1);
                    $('.cmdenter').before('<' + cmdval2 + '></' + cmdval2 + '>');
                    $('.cmdenter').val('');
                }
            }
        });
    });
});
