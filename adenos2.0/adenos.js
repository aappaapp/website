/* Aden OS by Aden Pun | adenpun.github.io */


// Start
window._start = function () {
	_init();
	var text1 = ['Aden OS 2.0 Starting.', 'Aden OS 2.0 Starting..', 'Aden OS 2.0 Starting...'];
	var i1 = 0;
	$('body').append('<span id=\'starttext1\'></span>');
	var func1 = function () {
		$('#starttext1').text(text1[i1]);
		i1++;
		i1 = (i1 == 3) ? 0 : i1;
	};
	func1();
	window._start.itv1 = setInterval(func1, 750);
};

// Initialization
window._init = function () {
	window._init.style();
	window._init.variables();
	setTimeout(function () {
		window._init.finish();
	}, 3750);
};
window._init.style = function () {
	var style = `
		html {
			background-color: black;
			color: white;
			cursor: default;
			user-select: none;
		}
		.taskbar {
			position: absolute;
			bottom: 0;
		}
	`;
	$('head').append(`<style>${style}</style>`);
};
window._init.variables = function () {
	window._system.setting = {};
	window._system.setting.theme = {
		bgcolor: 'white',
		txtcolor: 'black'
	};
};
window._init.finish = function () {
	clearInterval(window._start.itv1);
	window._desktop.generate();
};

//System
window._system = function () {
};
window._system.reloadtheme = function () {
	$('style').append(`html {
		background-color: ${window._system.setting.theme.bgcolor};
		color: ${window._system.setting.theme.txtcolor};
	}`);
}

//Desktop
window._desktop = function () { };
window._desktop.generate = function () {
	window._system.reloadtheme();
	$('body').html('');
	$('body').append('<div class=\'taskbar\'><div class=\'taskbar-title\'>Aden OS 2.0</div></div>');
};


$(function () {
	_start();
});
