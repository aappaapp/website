$(function () {
    var updownspeed = 10;
    var speed = 10;
    setInterval(function () {
        $('.draw').css('left', $('.draw').position().left + speed);
        if ((Math.floor(Math.random() * 2) + 1) == 1) {
            $('.draw').css('top', $('.draw').position().top + updownspeed);
        } else {
            $('.draw').css('top', $('.draw').position().top - updownspeed);
        }
        $('.draw').before('<div class=\'drawline\' style=\'top:' + $('.draw').position().top + ';left:' + $('.draw').position().left + ';\'></div>');
        //console.log($('.draw').position().left, $(document).width());
        if ($('.draw').position().left >= $(document).width() - $('.drawline').css('padding') - 10) {
            $('.draw').css('left', '0');
            console.log('sd');
        }
    });
});

