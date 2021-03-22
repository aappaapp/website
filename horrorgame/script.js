function detectlanguage() {
	window.language = navigator.language;
	if (language.includes('zh')) language = 'zh';
	else language = 'en';
	$('select.language').val(language);
}
function languagechange() {
	language = $('select.language').val();
	dialogset();
}
function languagetextset() {
	$('span.back').text(dialog['text.back']);
}
function dialogset() {
	$.get('dialog-' + language + '.json', function (data) {
		window.dialog = data;
		languagetextset();
	});
}
function changepage(selector, config) {
	var returnval = '';
	var originalpage = $('.page').filter(function () {
		return $(this).css('background').length > 0;
	}).eq(0);
	if (config == 'return') {
		returnval = originalpage;
	}
	window.lastchangepage = originalpage;
	$('.page').hide();
	$(selector).show();
	return returnval;
}
function start() {
	plotdisplay(dialog['plot1'], {
		redirect: '.page.game',
		callback: function () {
			speak({
				text: dialog['main.whereteacher'],
				callback: function () {
					speak({
						text: dialog['main.whereteacher2'],
						callback: function () {
							walk();
							speak({
								text: dialog['tutorial.wasd'],
								finishtime: 10000
							});
						},
					});
				}
			});
		}
	});
	//changepage('.page.game');
}
function setting() {
	changepage('.page.setting');
}
function back() {
	changepage('.' + lastchangepage.attr('class').replaceAll(' ', '.'));
}
function move(x, y, ele) {
	$(ele).css({
		position: 'absolute',
		top: $(ele).position().top + y,
		left: $(ele).position().left + x
	});
}
function walk(speed) {
	if (typeof speed == 'undefined') {
		speed = 1;
	}
	if (typeof walkitv != 'undefined') {
		clearInterval(walkitv);
	}
	window.walkitv = setInterval(function () {
		$(document).on('keydown.character', function () {
		});
		if (window.keys[65]) {
			move(-speed, 0, $('.character.main'));
		}
		if (window.keys[87]) {
			move(0, -speed, $('.character.main'));
		}
		if (window.keys[68]) {
			move(speed, 0, $('.character.main'));
		}
		if (window.keys[83]) {
			move(0, speed, $('.character.main'));
		}
	});
}
function plotdisplay(text, config) {
	var originalpage = changepage('.page.plotdisplay', 'return');
	var i = 0;
	text = text.split('');
	var textitv = setInterval(function () {
		$('.page.plotdisplay').append(text[i]);
		i++;
		if (i == text.length + 1) {
			setTimeout(function () {
				clearInterval(textitv);
				config.callback();
				if (typeof config.redirect != 'undefined') {
					changepage(config.redirect);
				}
			}, 1000);
		}
	}, 100);
}
function speak(config) {
	var i = 0;
	var text = config.text || '';
	var img = config.img || '';
	var finishtime = config.finishtime || 500;
	var callback = config.callback || function () { };
	text = text.split('');
	$('body').append('<div class=\'speakcontainer\'><img src=\'' + img + '\'></div>');
	var textitv = setInterval(function () {
		$('.speakcontainer').append(text[i]);
		i++;
		if (i == text.length + 1) {
			setTimeout(function () {
				clearInterval(textitv);
				$('.speakcontainer').fadeOut(1000);
				setTimeout(function () {
					$('.speakcontainer').remove();
					callback();
				}, 1000);
			}, finishtime);
		}
	}, 100);
}
$(function () {
	//Init
	detectlanguage();
	dialogset();
	window.keys = {};
	//Start
	$('.homestart').click(start);
	//Setting
	$('.select.setting').click(setting);
	//Back
	$('.select.back').click(back);
	//Language Select
	$('select.language').change(languagechange);
	//Detect Keys
	$(document).on('keydown.detectkeys', function () {
		window.keys[event.which] = true;
		if (event.which == 18) {
			event.preventDefault();
		}
	});
	$(document).on('keyup.detectkeys', function () {
		delete window.keys[event.which];
	});
	//Detect Window Focus & Blur
	$(window).blur(function () {
		window.keys = {};
	});
});
