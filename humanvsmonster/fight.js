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
    console.log('powerfulsnowybullet');
    $('.fightarea').append('<div class=\'powerfulsnowybullet\'><img src=\'textures/entity/monster/snowy/bullet.png\'></div>');
    setTimeout(function () {
        $('body').append('<audio src=\'audio/snowypunch.mp3\' autoplay onended=\'audioended(this);\'></audio>');
        $('.powerfulsnowybullet').remove();
        snowypowerfulbulletdisapear();
    }, 1000);
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
