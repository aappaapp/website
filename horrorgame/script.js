function detectlanguage() { }
function changepage(selector, config) {
	console.log(selector);
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
	$.get('plot1.txt', function (data) {
		plotdisplay(data, {
			redirect: '.page.game'
		});
	});
	//changepage('.page.game');
	charactercontrol();
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
function charactercontrol() {
	$(document).on('keydown.character', function () {
		if (window.keys[37]) {
			move(-10, 0, $('.character.main'));
		}
		if (window.keys[38]) {
			move(0, -10, $('.character.main'));
		}
		if (window.keys[39]) {
			move(10, 0, $('.character.main'));
		}
		if (window.keys[40]) {
			move(0, 10, $('.character.main'));
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
				if (typeof config.redirect != 'undefined') {
					changepage(config.redirect);
				}
			}, 1000);
		}
	}, 100);
}
$(function () {
	//Init
	detectlanguage();
	window.keys = {};
	//Start
	$('.homestart').click(start);
	//Setting
	$('.setting').click(setting);
	//Back
	$('.select.back').click(back);
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
