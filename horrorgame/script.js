function changepage(selector, config) {
	var returnval = '';
	if (config == 'return') {
		returnval = $('.page').filter(function () {
			return $(this).css('background').length > 0;
		}).eq(0);
	}
	$('.page').hide();
	$(selector).show();
	return returnval;
}
function start() {
	plotdisplay('asd', {
		redirect: '.page.game'
	});
	//changepage('.page.game');
	charactercontrol();
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
	text = text.split('');
	console.log(text);
	var textitv = setInterval(function () {

	});
	if (typeof config.redirect != 'undefined') {
		changepage(config.redirect);
	}
}
$(function () {
	//init
	window.keys = {}
	//Start
	$('.homestart').click(start);
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
