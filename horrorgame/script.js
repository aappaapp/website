$.fn.addEvent = function (type, handler) {
	this.bind(type, { 'selector': this.selector }, handler);
};
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
	$(document).attr('title', dialog['text.name']);
	$('span.name').text(dialog['text.name']);
	$('span.start').text(dialog['text.start']);
	$('span.setting').text(dialog['text.setting']);
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
function changebackground() {
	setInterval(function () {
		var character = $('.character.main');
		var top = character.position().top;
		var left = character.position().left;
		var vh = $(document).height();
		var vw = $(document).width();
		var i;
		var backgroundindex = {};
		for (i = 0; i < backgrounds.length; i++) {
			var j;
			for (j = 0; j < backgrounds[i].length; j++) {
				backgroundindex[backgrounds[i][j]] = {
					x: j,
					y: i
				}
			}
		}
		var xpm = 0;
		var ypm = 0;
		if (left <= -50) {
			character.css('left', vw - 50)
			xpm = -1;
		}
		if (left >= vw - 50) {
			character.css('left', -50)
			xpm = 1;
		}
		if (top <= -50) {
			character.css('top', vh - 50)
			ypm = -1;
		}
		if (top >= vh - 50) {
			character.css('top', -50)
			ypm = 1;
		}
		var nx = backgroundindex[currentbackground].x;
		var ny = backgroundindex[currentbackground].y;
		var ax = nx + xpm;
		var ay = ny + ypm;
		var k;
		var l;
		for (k = 0; k < Object.keys(backgroundindex).length; k++) {
			var objbackground = backgroundindex[Object.keys(backgroundindex)[k]];
			if (objbackground.x == ax && objbackground.y == ay) {
				currentbackground = Object.keys(backgroundindex)[k];
				for (l = 0; l < Object.keys(characters).length; l++) {
					var characterobjcharacter = characters[Object.keys(characters)[l]];
					var characterbackground = characterobjcharacter.background;
					var x = characterobjcharacter.x || 0;
					var y = characterobjcharacter.y || 0;
					if (characterbackground == currentbackground) {
						$('.character.' + Object.keys(characters)[l]).show();
						$('.character.' + Object.keys(characters)[l]).css({
							'left': x,
							'top': y
						});
					} else {
						$('.character.' + Object.keys(characters)[l]).hide();
					}
				}
			}
		}
	});
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
		speed = 2;
	}
	if (typeof walkitv != 'undefined') {
		clearInterval(walkitv);
	}
	window.walkitv = setInterval(function () {
		if (window.keys[16]) {
			walk(4);
		} else {
			walk(2);
		}
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
	gsap.fromTo('.homepagemain > h1', 2, {
		autoAlpha: 0,
		y: -20
	}, {
		autoAlpha: 1,
		y: 0
	});
	var i = 0;
	var gsapitv = setInterval(function () {
		gsap.fromTo($('.homepagemain > .select').eq(i).getSelector()[0], 0.6, {
			autoAlpha: 0,
			x: -20
		}, {
			autoAlpha: 1,
			x: 0
		});
		i++;
		if (i > $('.homepagemain > .select').length) {
			clearInterval(gsapitv);
		}
	}, 600);
	window.keys = {};
	window.currentbackground = 'main-playground';
	window.currentdirection = 'right';
	window.backgrounds = [
		['first-playground', 'main-playground', 'second-playground'],
		[]
	];
	window.characters = {
		'mrluk': {
			background: 'second-playground',
			x: '50%',
			y: '50%'
		}
	};
	changebackground();
	window.ondragstart = function () {
		return false;
	};
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
