function speak(text, icon, speed, callback, element, sound) {
    if (element == '' || element == undefined) {
        $('body').append('<div class=\'speakcontainer speakcontainer' + window.speaki + '\'><img src=' + icon + '><div class=\'speak speak' + window.speaki + '\'></div></div>');
    } else if (element == '.fightbox') {
        $(element).html('<div class=\'fightspeak speak' + window.speaki + '\'></div>');
    } else if (element.includes('.icon')) {
        $(element).append('<div class=\'dialogspeak speak' + window.speaki + '\'></div>');
    }
    if (sound == undefined || sound == '') {
        sound = 'audio/talk.mp3';
    }
    $('.speak' + window.speaki).each(function () {
        if (icon == '') {
            //$('.speakcontainer img').replaceWith('<div>*</div>');
        }
        if (!window.speakwait) {
            speakeach(this, '*' + text, speed, window.speaki, callback, sound);
        }
    });
    window.speaki++;
}
function speakeach(element, text, speed, speaki, callback, sound) {
    window.speakwait = true;
    var ths = element;
    var i = 0;
    window.speakspeed = speed;
    //text = text.split('\\w');
    $(ths).parent().css('display', 'block');
    //if (Array.isArray(text)) { } else {
    var itv = setInterval(function () {
        $('body').on('keydown.body3', function () {
            if (notconfirmkeypress()) {
                i = text.length - 1;
                $(ths).html(text.substr(0, text.length - 1));
            }
        });
        $(ths).html($(ths).html() + text[i]);
        if (text[i] != ' ') {
            $('body').append('<audio src=\'' + sound + '\' autoplay></audio>');
        }
        console.log($(ths).html());
        i++;
        if (text[i] == undefined) {
            clearInterval(itv);
            $('body').off('keydown.body3');
            if ($(ths).hasClass('fightspeak')) {
                callback();
                window.speakwait = false;
            } else {
                $('body').on('keydown.body1', function () {
                    if (confirmkeypress()) {
                        if ($(ths).hasClass('dialogspeak')) {
                            $(ths).remove();
                        } else {
                            $(ths).parent().remove();
                        }
                        window.speakwait = false;
                        callback();
                        $('body').off('keydown.body1');
                    }
                });
            }
        }
    }, window.speakspeed);
    //}
}
function gotofight(icon, enemyinfo) {
    enemy1 = {
        hp: enemyinfo['1'].hp,
        name: enemyinfo['1'].name,
        hpvalue: enemyinfo['1'].hp
    }
    $('.storymode').append('<div class=\'fightarea\'><div class=\'icon\'><img src=\'' + icon + '\'></div><div class=\'fightbox\'><div class=\'soul\'><img src=\'textures/entity/hero/soul.png\'></div></div><div class=\'fightbar\'><div class=\'attackbtn fightbarbtn\'>' + window.dialog1['ui.attackbtn'] + '</div></div></div>');
    $('.fightarea .icon').after('<div class=\'enemyhpbar\'><div class=\'enemyhpbarline\'></div></div>');
    $('body').on('keydown.body4', function () {
        if (event.which == 87) {
            $('.soul').move(0, -10);
        } else if (event.which == 65) {
            $('.soul').move(-10, 0);
        } else if (event.which == 83) {
            $('.soul').move(0, 10);
        } else if (event.which == 68) {
            $('.soul').move(10, 0);
        }
    });
    $('.attackbtn').click(function () {
        $('.fightbox').css({
            'width': '80%',
            'padding': '10px'
        }).html('<div class=\'fightopt punch\'>* Punch</div>');
        $('.fightopt.punch').click(function () {
            //speak('You tried to punch snowy. But the attack is unfinished. So you can\'t punch snowy!', '', 100);
            $('.fightbox').html('<div class=\'fightpunchbtn\'>Press Me!</div>');
            oldenemyhp = enemy1.hpvalue;
            $('.fightpunchbtn').click(function () {
                enemy1.hpvalue -= 1;
                console.log(enemy1);
                $('.enemyhpbarline').css('width', ((enemy1.hpvalue / enemy1.hp) * 100) + '%');
            });
            setTimeout(function () {
                speak('You hurt ' + enemy1.name + ' ' + (oldenemyhp - enemy1.hpvalue) + 'hp.', '', 100, function () { }, '.fightbox');
            }, 5000);
            //((value - min) / (max - min)) * percentage
        });
    });
}
function confirmkeypress() {
    if (event.which == 13 || event.which == 90) {
        return true;
    } else {
        return false;
    }
}
function notconfirmkeypress() {
    if (event.which == 16 || event.which == 88) {
        return true;
    } else {
        return false;
    }
}
