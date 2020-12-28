function ap43() {
    $('.ap43').height($(document).height());
    $('.ap43').width($(document).height() * 1.3);
}
function speak(text, icon, speed, callback, element, sound) {
    if (sound == undefined || sound == '') {
        sound = 'audio/talk.mp3';
    }
    if (speed == undefined || speed == '') {
        speed = 100;
    }
    if (icon == undefined) {
        icon = '';
    }
    if (callback == undefined || callback == '') {
        callback = function () { };
    }
    if (element == '' || element == undefined) {
        $('body').append('<div class=\'speakcontainer speakcontainer' + window.speaki + '\'><img src=' + icon + '><div class=\'speak speak' + window.speaki + '\'></div></div>');
    } else if (element == '.fightbox') {
        $(element).html('<div class=\'fightspeak speak' + window.speaki + '\'></div>');
    } else if (element.includes('.icon')) {
        $(element).append('<div class=\'dialogspeak speak' + window.speaki + '\'></div>');
    }
    $('.speak' + window.speaki).each(function () {
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
            $('body').append('<audio src=\'' + sound + '\' autoplay onended=\'audioended(this);\'></audio>');
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
function gotofight(enemyinfo) {
    enemy1 = {
        hp: enemyinfo['1'].hp,
        name: enemyinfo['1'].name,
        hpvalue: enemyinfo['1'].hp,
        icon: enemyinfo['1'].icon
    }
    $('.storymode').append('<div class=\'fightarea\'><div class=\'icon\'><img src=\'' + enemy1.icon + '\'></div><div class=\'fightbox\'><div class=\'soul\'><img src=\'textures/entity/hero/soul.png\'></div></div><div class=\'fightbar\'><div class=\'attackbtn fightbarbtn\'>' + window.dialog1['ui.attackbtn'] + '</div></div></div>');
    $('.fightbox').width((30 / 100) * $('.fightarea').width()).height((30 / 100) * $('.fightarea').width());
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
function leavefight() {
    $('.fightarea').fadeOut(100, function () {
        $(this).remove();
    });
}
function confirmkeypress() {
    if (event.which == 13 || event.which == 69) {
        return true;
    } else {
        return false;
    }
}
function notconfirmkeypress() {
    if (event.which == 16 || event.which == 81) {
        return true;
    } else {
        return false;
    }
}

function story() {
    $('title').text(window.dialog1['ui.storytitle']);
    ue = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    le = 'abcdefghijklmnopqrstuvwxyz'.split('');
    for (i = 0; i < ue.length; i++) {
        $('.nameselect').append('<div class=\'lett ue ue' + ue[i] + '\'>' + ue[i] + '</div>');
        console.log(ue[i]);
        if ((i + 1) % 10 == 0) {
            $('.ue' + ue[i]).after('<br class=\'uebr\'>');
        }
        if (i == ue.length - 1) {
            $('.ue, .uebr').wrapAll('<div class=\'uegroup lettgroup\'></div>');
        }
    }
    for (i = 0; i < le.length; i++) {
        $('.nameselect').append('<div class=\'lett le le' + le[i] + '\'>' + le[i] + '</div>');
        if ((i + 1) % 10 == 0) {
            $('.le' + le[i]).after('<br class=\'lebr\'>');
        }
        if (i == le.length - 1) {
            $('.le, .lebr').wrapAll('<div class=\'legroup lettgroup\'></div>');
        }
        $('.legroup').after('<div class=\'nametools\'><div class=\'backlett lett\'>Backspace</div> <div class=\'finish lett\'>Finish</div></div>');
    }
    $('.lettgroup').after('<br>');
    $('.lett').click(function () {
        if ($(this).hasClass('backlett')) {
            $('.namedisplay').val($('.namedisplay').val().substr(0, $('.namedisplay').val().length - 1));
        } else if ($(this).hasClass('finish')) {
            if ($('.namedisplay').val() != '') {
                window.name = $('.namedisplay').val();
                $('body').off('keydown.body5');
                chosenamefuc();
            }
        } else {
            if ($('.namedisplay').val().length >= 6) {
                $('.namedisplay').val($('.namedisplay').val().substr(0, $('.namedisplay').val().length - 1) + $(this).attr('class').split(' ')[2].substr($(this).attr('class').split(' ')[2].length - 1, 1));
            } else {
                $('.namedisplay').val($('.namedisplay').val() + $(this).attr('class').split(' ')[2].substr($(this).attr('class').split(' ')[2].length - 1, 1));
            }
        }
    });
    $('body').on('keydown.body5', function () {
        if (event.which >= 65 && event.which <= 90) {
            if ($('.namedisplay').val().length >= 6) {
                $('.namedisplay').val($('.namedisplay').val().substr(0, $('.namedisplay').val().length - 1) + event.key);
            } else {
                $('.namedisplay').val($('.namedisplay').val() + event.key);
            }
        }
        if (event.which == 8) {
            $('.namedisplay').val($('.namedisplay').val().substr(0, $('.namedisplay').val().length - 1));
        } else if (event.which == 13) {
            if ($('.namedisplay').val() != '') {
                window.name = $('.namedisplay').val();
                $('body').off('keydown.body5');
                chosenamefuc();
            }
        }
    });
}
function chosenamefuc() {
    $('.nameselect').css('display', 'none');
    $('.nameconfirm').show();
    $('.nameconfirm h1').html('Your name is ' + window.name + ',<br>do you confirm?');
    $('.notconfirm').click(function () {
        $('.nameconfirm').css('display', 'none');
        $('.nameselect').css('display', 'block');
        $('.namedisplay').val('');
        $('body').off('keydown.body2');
    });
    $('.confirm').click(function () {
        $('.nameconfirm').css('display', 'none');
        $('.nameselect').css('display', 'none');
        $('.map').css('display', 'block');
        $('body').off('keydown.body2');
        storystart();
    });
    $('body').on('keydown.body2', function () {
        if (notconfirmkeypress()) {
            $('.nameconfirm').css('display', 'none');
            $('.nameselect').css('display', 'block');
            $('.namedisplay').val('');
            $('body').off('keydown.body2');
        } else if (confirmkeypress()) {
            $('.nameconfirm').css('display', 'none');
            $('.nameselect').css('display', 'none');
            $('.map').css('display', 'block');
            $('body').off('keydown.body2');
            storystart();
        }
    });
}
function audioended(ele) {
    $(ele).remove();
}
