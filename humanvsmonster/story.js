function gotofighttutorial() {
    gotofight('textures/entity/monster/snowy/snowy.png', {
        '1': {
            hp: 100,
            name: 'Snowy'
        }
    });
    $('.fightbar').hide();
    speak(window.dialog1['dialog.snowy.fighttur'], '', 100, function () {
        speak(window.dialog1['dialog.snowy.fighttur1'], '', 100, function () {
            speak(window.dialog1['dialog.snowy.fighttur2'], '', 100, function () {
                speak(window.dialog1['dialog.snowy.fighttur3'], '', 100, function () {
                    speak('You want some LV, don\'t you?', '', 100, function () {
                        speak('In here, LV is shared through the bullet.', '', 100, function () {
                            speak('I did not lie to you! You fail, but you will become stronger!', '', 100, function () {
                                speak('Ready? Collect the bullet to gain LV!', '', 100, function () {
                                    snowybullet('40%', '0%');
                                    snowybullet('45%', '0%');
                                    snowybullet('50%', '0%');
                                    snowybullet('55%', '0%');
                                    snowybullet('60%', '0%');
                                    window.stopsnowbulitv = false;
                                    window.snowybulletidiot = false;
                                    window.snowybulletdis = false;
                                    itv = setInterval(function () {
                                        console.log(window.stopsnowbulitv, window.snowybulletidiot);
                                        if (window.snowybulletidiot) {
                                            console.log('You\'re Idiot');
                                            window.stopsnowbulitv = true;
                                            $('.snowybullet').remove();
                                            speak(window.dialog1['dialog.snowy.idiot'], '', 500, function () {
                                                speak(window.dialog1['dialog.snowy.fightpayhit'], '', 100, function () {
                                                    speak(window.dialog1['dialog.snowy.fightpayhit1'], '', 100, function () {
                                                        speak(window.dialog1['dialog.snowy.fightpayhit2'], '', 250, function () {
                                                            powerfulsnowybullet();
                                                        }, '.icon', 'audio/eviltalk.mp3');
                                                    }, '.icon', 'audio/eviltalk.mp3');
                                                }, '.icon', 'audio/eviltalk.mp3');
                                            }, '.icon', 'audio/eviltalk.mp3');
                                        }
                                        if (window.snowybulletdis && !window.snowybullettouch) {
                                            speak('Why you don\'t touch! Are you stupid!?', '', 250, function () {
                                                speak('You want to die?', '', 250, function () {
                                                    speak('Okay, I will kill YOU!', '', 100, function () {
                                                        powerfulsnowybullet();
                                                    }, '.icon', 'audio/eviltalk.mp3');
                                                }, '.icon', 'audio/eviltalk.mp3');
                                            }, '.icon', 'audio/eviltalk.mp3');
                                            window.stopsnowbulitv = true;
                                        }
                                        if (window.stopsnowbulitv) {
                                            clearInterval(itv);
                                            console.log(window.stopsnowbulitv);
                                        }
                                    });
                                }, '.icon');
                            }, '.icon');
                        }, '.icon');
                    }, '.icon');
                }, '.icon');
            }, '.icon');
        }, '.icon');
    }, '.icon');
}
function storystart() {
    $('body').off('keydown.body2');
    $('.map').append('<div class=\'snowy entity\'><img src=\'textures/entity/monster/snowy/snowy.png\'></div>');
    speak(window.dialog1['dialog.snowy.hi'], 'textures/entity/monster/snowy/snowy.png', 100, function () {
        speak(window.dialog1['dialog.snowy.hi1'], 'textures/entity/monster/snowy/snowy.png', 100, function () {
            speak(window.dialog1['dialog.snowy.hi2'], 'textures/entity/monster/snowy/snowy.png', 100, function () {
                speak(window.dialog1['dialog.snowy.hi3'], 'textures/entity/monster/snowy/snowy.png', 100, function () {
                    gotofighttutorial();
                });
            });
        });
    });
}
function snowypowerfulbulletdisapear() {
    speak('What happen?', '', 100, function () {
        speak('Go away!', '', 100, function () {
            toralsave();
        }, '', 'none');
    }, '.icon');
}
function toralsave() { }
