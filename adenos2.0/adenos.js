/* Aden OS by Aden Pun | adenpun.github.io */


// Start
window._start = function () {
	_init();
	var texts = window._start.texts;
	var i = 0;
	$('body').append('<div class=\'startscreen\'></div>');
	var func1 = function () {
		$('body > .startscreen').append(`<span class=\'starttext\' id=\'starttext${i}\'>${texts[i]}</span><br>`);
		i++;
		if (i == texts.length) {
			clearInterval(window._start.itv1);
		}
	};
	func1();
	window._start.itv1 = setInterval(func1, window._start.timeout);
};

// Initialization
window._init = function () {
	window._init.style();
	window._init.gl();
	window._init.variables();
	window._init.custom();
	setTimeout(function () {
		window._init.finish();
	}, window._start.timeout * (window._start.texts.length + 2));
};
window._init.style = function () {
	var style = `
		html {
			background-color: white;
			color: white;
			cursor: default;
			user-select: none;
		}
		body {
			margin: 0;
		}
		.startscreen {
			background-color: black;
			height: 100vh;
		}
		.starttext {
			font-family: courier;
		}
		.taskbar {
			position: absolute;
			bottom: 0;
		}
	`;
	$('head').append(`<style>${style}</style>`);
};
window._init.variables = function () {
	var canvas = $('#glcanvas')[0];
	var gl = canvas.getContext("experimental-webgl");
	function getUnmaskedInfo(gl) {
		var unMaskedInfo = {
			renderer: '',
			vendor: ''
		};

		var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
		if (dbgRenderInfo != null) {
			unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
			unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
		}

		return unMaskedInfo;
	}
	window._start.texts = [
		'Aden OS 2.0',
		'User Agent: ' + navigator.userAgent,
		'CPU: ' + getUnmaskedInfo(gl).renderer + ' ' + navigator.hardwareConcurrency + ' cores',
		'Memorys: ' + navigator.deviceMemory + 'GB'
	];
	window._start.timeout = 100;
	window._system.setting = {};
	window._system.setting.theme = {
		bgcolor: 'white',
		txtcolor: 'black'
	};
};
window._init.gl = function () {
	$('html').append('<canvas id=\'glcanvas\' width=\'0\' height=\'0\'></canvas>')
};
window._init.finish = function () {
	clearInterval(window._start.itv1);
	$('body > .startscreen').fadeOut(100, function () {
		window.location.href = 'https://adenpun.github.io/RPG_Game/';
		if (window._system.firstuse) {
			window._system.generateregisterpage();
		} else {
			window._system.generateloginpage();
		}
	});
	//window._desktop.generate();
};

//System
window._system = function () { };
window._system.reloadtheme = function () {
	$('style').append(`html {
		background-color: ${window._system.setting.theme.bgcolor};
		color: ${window._system.setting.theme.txtcolor};
	}`);
};
window._system.generateloginpage = function () {
	window._system.reloadtheme();
	$('body').html('');
	$('body').append('<div></div>');
};

//Desktop
window._desktop = function () { };
window._desktop.generate = function () {
	window._system.reloadtheme();
	$('body').html('');
	$('body').append('<div class=\'taskbar\'><div class=\'taskbar-title\'>Aden OS 2.0</div></div>');
};
