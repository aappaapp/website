$(function () {
	window.cornertipsi = 0;
	window.dev = $.cookie('dev');
	uid = $.cookie('uid');
	setTimeout(function () {
		if (window.dev == 'true') {
			window.location.replace('./game.html');
		}
	}, 1000);
	$(document).keydown(function () {
		if (event.which == 191) {
			var ans = prompt('Please enter command:');
			if (ans == 'dev123') {
				if (window.dev != true) {
					window.dev = true;
					$.cookie('dev', true);
					cornertips('dev mode is open!', 2000);
				} else {
					window.dev = false;
					$.cookie('dev', false);
					cornertips('dev mode is close.', 2000);
				}
			} else if (ans == 'hide-cursor') {
				$('html').css('cursor', 'none');
			} else if (ans == 'show-cursor') {
				$('html').css('cursor', 'default');
			} else if (ans == 'soler') {
				setInterval(function () {
					alert('This is a secret.');
				});
			} else if (ans == 'login') {
				if (window.dev) {
					window.location.replace('./game.html');
					$.cookie('login', true);
				} else {
					alert('Please use normal method to login.');
				}
			} else {
				try {
					eval(ans);
				} catch (err) {
					alert(err.message);
				}
			}
		}
	});
})
function cornertips(text, time, callback) {
	$('.ap43').append('<div class=\'cornertips cornertips' + window.cornertipsi + '\'>' + text + '</div>');
	$('.cornertips' + window.cornertipsi).each(function () {
		cornertipseach(this, time, callback);
	});
	window.cornertipsi++;
}
function cornertipseach(element, time, callback) {
	var ths = element;
	setTimeout(function () {
		$(ths).remove();
		if (callback != '' || callback != undefined) {
			callback();
		}
	}, time);
}
function ap43() {
	$('.ap43').height($(document).height()).width($(document).height() * 1.33333333333);
	$('.ap43left').height($(document).height()).width(($(document).width() - $('.ap43').width()) / 2);
	$('.ap43right').height($(document).height()).width(($(document).width() - $('.ap43').width()) / 2);
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
		$('.ap43').append('<div class=\'speakcontainer speakcontainer' + window.speaki + '\'><img src=' + icon + '><div class=\'speak speak' + window.speaki + '\'></div></div>');
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
	$(ths).parent().show();
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
	$('.fightbox').width((30 / 100) * $('.fightarea').height()).height((30 / 100) * $('.fightarea').height());
	$('.fightarea .icon').after('<div class=\'enemyhpbar\'><div class=\'enemyhpbarline\'></div></div>');
	$('body').on('keydown.fightwalk', fightwalk);
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
	$('.fightarea').fadeOut(250, function () {
		$(this).remove();
	});
	$('body').append('<audio src=\'audio/leavefight.mp3\' autoplay onended=\'audioended(this);\'></audio>');
	$('body').off('keydown.fightwalk');
	$('body').on('keydown.walk', walk);
}
function walk() {
	if (event.which == 87) {
		$('.main.entity').move(0, -10);
	} else if (event.which == 65) {
		$('.main.entity').move(-10, 0);
	} else if (event.which == 83) {
		$('.main.entity').move(0, 10);
	} else if (event.which == 68) {
		$('.main.entity').move(10, 0);
	}
}
function fightwalk() {
	if (event.which == 87) {
		$('.soul').move(0, -10);
	} else if (event.which == 65) {
		$('.soul').move(-10, 0);
	} else if (event.which == 83) {
		$('.soul').move(0, 10);
	} else if (event.which == 68) {
		$('.soul').move(10, 0);
	}
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
	$('.nameselect').html('').append('<input type=\'text\' class=\'namedisplay\' readonly>');
	$('.namedisplay').attr('placeholder', window.dialog1['ui.namedisplay']);
	$('title').text(window.dialog1['ui.storytitle']);
	ue = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	le = 'abcdefghijklmnopqrstuvwxyz'.split('');
	for (i = 0; i < ue.length; i++) {
		$('.nameselect').append('<div class=\'lett ue\' data-letter=\'' + ue[i] + '\'>' + ue[i] + '</div>');
		console.log(ue[i]);
		if ((i + 1) % 10 == 0) {
			$('.ue').last().after('<br class=\'uebr\'>');
		}
		if (i == ue.length - 1) {
			$('.ue, .uebr').wrapAll('<div class=\'uegroup lettgroup\'></div>');
		}
	}
	for (i = 0; i < le.length; i++) {
		$('.nameselect').append('<div class=\'lett le\' data-letter=\'' + le[i] + '\'>' + le[i] + '</div>');
		if ((i + 1) % 10 == 0) {
			$('.le').last().after('<br class=\'lebr\'>');
			console.log($('.lebr'));
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
				$('.namedisplay').val($('.namedisplay').val().substr(0, $('.namedisplay').val().length - 1) + $(this).attr('data-letter'));
			} else {
				$('.namedisplay').val($('.namedisplay').val() + $(this).attr('data-letter'));
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
	var reset = function () {
		$('.nameconfirm').hide();
		$('.nameselect').show();
		$('.namedisplay').val('');
		story();
		$('body').off('keydown.body2');
	};
	var yes = function () {
		$('.nameconfirm').hide();
		$('.nameselect').hide();
		$('.map').show();
		$('body').off('keydown.body2');
		storystart();
	};
	$('.nameselect').hide();
	$('.nameconfirm').show();
	$('.nameconfirm h1').html('Your name is ' + window.name + ',<br>do you confirm?');
	$('.notconfirm').click(function () {
		reset();
	});
	$('.confirm').click(function () {
		yes();
	});
	$('body').on('keydown.body2', function () {
		if (notconfirmkeypress()) {
			reset();
		} else if (confirmkeypress()) {
			yes();
		}
	});
}
function audioended(ele) {
	$(ele).remove();
}
function detectscene() {
	setInterval(function () {
		maintop = $('.main.entity').position().top;
		mainleft = $('.main.entity').position().left;
		vh = $('.ap43').height();
		vw = $('.ap43').width();
		direct = '';
		if (maintop <= 0) {
			direct = 'top';
		} else if (maintop >= vh) {
			direct = 'bottom';
		} else if (mainleft >= vw + $('.ap43').position().left) {
			direct = 'right';
		} else if (mainleft <= $('.ap43').position().left) {
			direct = 'left';
		}
		offset = {
			'left': mainleft,
			'right': vw - mainleft,
			'top': maintop,
			'bottom': vh - maintop
		}
		scenechange(direct, offset);
	});
}
function scenechange(direct, offset) {
	sceneid = $('.storymode').attr('data-scene-id');
	if (window.scenechanged) {
		window.scenechanged = false;
		$('.storymode').fadeOut(200).fadeIn(200);
	}
	if (sceneid == 'first') {
		if (direct == 'top') {
			$('.storymode').attr('data-scene-id', 'second');
			window.scenechanged = true;
		}
	} else if (sceneid == 'second') {
		if (direct == 'bottom') {
			$('.storymode').attr('data-scene-id', 'first');
			window.scenechanged = true;
		}
	}
}
function interactive() {
	$('body').on('keydown.interactive', function () {
		if (confirmkeypress()) {
			console.log('interactive');
		}
	});
}
