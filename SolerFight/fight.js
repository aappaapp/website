function snowybullet(x, y) {
    $('.fightarea').append('<div class=\'snowybullet bullet' + window.bulleti + '\'><img src=\'textures/entity/monster/snowy/bullet.png\'></div>');
    $('.snowybullet.bullet' + window.bulleti).css({
        'top': y,
        'left': x
    });
    $('.snowybullet.bullet' + window.bulleti).each(function () {
        moveitv(0, 1, this);
    });
    window.bulleti++;
}
function powerfulsnowybullet() {
    /*speak('Maybe you will faint.', 'textures/entity/monster/snowy/snowy.png', 100, function () {
        speak('It\'s because my skill is unfinished.', 'textures/entity/monster/snowy/snowy.png', 100, function () {
            speak('That hateful creator!', 'textures/entity/monster/snowy/snowy.png', 150, function () {
                speak('I will kill him!', 'textures/entity/monster/snowy/snowy.png', 250, function () {
                    setTimeout(function () {
                        speak('I can\'t see my face now.', 'textures/entity/monster/snowy/snowy.png', 150, function () { }, '', 'audio/eviltalk.mp3');
                    }, 1000);
                }, '', 'audio/eviltalk.mp3');
            }, '', 'audio/eviltalk.mp3');
        });
    });*/
    console.log('powerfulsnowybullet');
    $('.fightarea').append('<div class=\'powerfulsnowybullet\'><img src=\'textures/entity/monster/snowy/bullet.png\'></div>');
    //moveitv(0, 0, $('.powerfulsnowybullet'));
}
setInterval(function () {
    var overlapsele = $('*').overlaps($('.soul'));
    if (overlapsele != undefined) {
        for (i = 0; i < overlapsele.length; i++) {
            //console.log($(overlapsele[i]).hasClass('snowybullet'));
            if ($(overlapsele[i]).hasClass('snowybullet')) {
                window.snowybulletidiot = true;
                $('body').append('<audio src=\'audio/snowypunch.mp3\' autoplay></audio>');
            } else if ($(overlapsele[i]).parent().hasClass('powerfulsnowybullet')) {
                $(overlapsele[i]).parent().remove();
            }
        }
    }
});
