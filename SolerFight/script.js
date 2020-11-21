function getDeviceType() {
	var ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return 'tablet';
	}
	if (
		/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
	) {
		return 'mobile';
	}
	return 'desktop';
};
function play_beta() {
	$('.warning').css('display', 'none');
	$('div:not(.warning)').css('display', 'inline-block');
}
function webapp() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js', { scope: './' })
			.then(function (registration) {

			});

		navigator.serviceWorker.ready.then(function (registration) {

		});
		caches.keys().then(function (cacheNames) {
			cacheNames.forEach(function (cacheName) {
				caches.delete(cacheName);
			});
		});
	}

	(function (i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date(); a = s.createElement(o),
			m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
	})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

	ga('create', 'UA-59325548-2', 'auto');
	ga('send', 'pageview');
}
$.fn.move = function (x, y) {
	var x1 = this.offset().left;
	var y1 = this.offset().top;
	this.css('position', 'absolute');
	this.css('left', x1 + x + 'px');
	this.css('top', y1 + y + 'px');
}
function generatescene(blockvalue) {
	window.randomscene = 1;
	window.blockgroup = '';
	var scenevalue = 5;
	for (i = 1; i < blockvalue + 1; i++) {
		window.blockgroup = window.blockgroup + ' auto';
	}
	window.generatescenestr = '';
	window.removeClass = 'trap enemy';
	for (i = 1; i < scenevalue; i++) {
		if (i == 1) {
			window.generatescenestr = window.generatescenestr + 'generatestartscene(blockvalue);';
			for (a = 0; a < 100; a++) {
				var random = Math.floor(Math.random() * 5) + 1;
			}
		}
		window.generatescenestr = window.generatescenestr + 'generaterandomscene(blockvalue);';
		if (i == scenevalue - 1) {
			eval(window.generatescenestr);
		}
	}
	var except = 'blockreplaceexcept';
	for (i = 1; i < blockvalue * blockvalue + 1; i++) {
		if (i <= blockvalue) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', 'block.png');
			$('.block' + i + ' > *').removeClass(window.removeClass);
		} else if (i % blockvalue == 1) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', 'block.png');
			$('.block' + i + ' > *').removeClass(window.removeClass);
		} else if (i % blockvalue == 0) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', 'block.png');
			$('.block' + i + ' > *').removeClass(window.removeClass);
		} else if (i >= blockvalue * blockvalue - blockvalue) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', 'block.png');
			$('.block' + i + ' > *').removeClass(window.removeClass);
		}
	}
	$('.startblockgroup').door('bottom', blockvalue, 'disableblock.png');
	$('.blockgroup').after('<br>');
	$('.blockgroup, .fightarea br').wrapAll('<div class=scene></div>');
	$('.scene').wrapAll('<div class=scenecontainer></div>');
	$('.fightarea .entity').append('<div class=weapon><img></div>');
	trap();
	weaponsetup();
	setInterval(restore, window.choseentity.mprestorespeed);
	if (window.deviceType == 'mobile') {
		$('.mobilecontrol').css('display', 'block');
	}
}
$.fn.door = function (config, blockvalue, blocksrc) {
	var replaceBlock = blocksrc;
	var a = '.' + $(this[0]).attr('class').replace(' ', '.');
	if (config == 'top') {
		var centerPoint = blockvalue / 2;
		$(a + ' .block' + (centerPoint - 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint - 1)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + centerPoint).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint + 1)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint + 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
	} else if (config == 'left') {
		var centerPoint = blockvalue / 2 - 1;
		$(a + ' .block' + (1 + (centerPoint - 2) * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (1 + (centerPoint - 1) * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (1 + centerPoint * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (1 + (centerPoint + 1) * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (1 + (centerPoint + 2) * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
	} else if (config == 'right') {
		var centerPoint = blockvalue;
		$(a + ' .block' + ((centerPoint - 4) * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + ((centerPoint - 2) * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + ((centerPoint + 2) * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + ((centerPoint + 4) * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
	} else if (config == 'bottom') {
		var centerPoint = blockvalue * blockvalue - blockvalue / 2;
		$(a + ' .block' + ((centerPoint - 2))).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint - 1)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint + 1)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint + 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
	} else if (config == 'all') {
		var centerPoint = blockvalue / 2;
		$(a + ' .block' + (centerPoint - 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint - 1)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + centerPoint).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint + 1)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint + 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		var centerPoint = blockvalue / 2 - 1;
		$(a + ' .block' + (1 + (centerPoint - 2) * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (1 + (centerPoint - 1) * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (1 + centerPoint * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (1 + (centerPoint + 1) * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (1 + (centerPoint + 2) * blockvalue)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		var centerPoint = blockvalue;
		$(a + ' .block' + ((centerPoint - 4) * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + ((centerPoint - 2) * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + ((centerPoint + 2) * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + ((centerPoint + 4) * blockvalue / 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		var centerPoint = blockvalue * blockvalue - blockvalue / 2;
		$(a + ' .block' + ((centerPoint - 2))).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint - 1)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint + 1)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
		$(a + ' .block' + (centerPoint + 2)).children().attr('src', replaceBlock).addClass('blockreplaceexcept');
	}
}
function weaponsetup() {
	window.cdtime = true;
	pointer = document.querySelector('.weapon');
	pointerBox = pointer.getBoundingClientRect();
	centerPoint = window.getComputedStyle(pointer).transformOrigin;
	centers = centerPoint.split(' ');
	$(document).mousemove(weaponfacing);
	setTimeout(weaponsettime, 1000);
}
function weaponsettime() {
	$(document).mousedown(function () {
		window.weaponuseitv = setInterval(weaponuse);
	}).mouseup(function () {
		clearInterval(window.weaponuseitv);
	});
}
function weaponuse(event) {
	if (window.entitymp > 0) {
		if (window.choseweapon.name == 'normal gun' && window.cdtime) {
			window.entitymp = window.entitymp - window.item.gun.mp;
			$('.fightarea .entity').tooltip({
				items: ".fightarea .entity",
				content: 'You use the gun and your mp is ' + window.entitymp + '!'
			});
			$('.fightarea .entity').tooltip("open");
			setTimeout(function () {
				$('.fightarea .entity').tooltip("disable");
			}, 1000);
			//alert('You use the gun.');
			//alert('But not thing happen.');
			//$('.scene').append('<div class=\'gunbullet bullet bullet' + window.gunbulleti + '\'><img src=chest.png></div>');
			window.gunbulleti++;
			cd(window.choseweapon.cd);
		}
	} else {
		$('.fightarea .entity').tooltip({
			items: ".fightarea .entity",
			content: 'Not enough MP!'
		});
		$('.fightarea .entity').tooltip("open");
		setTimeout(function () {
			$('.fightarea .entity').tooltip("disable");
		}, 1000);
	}
}
function cd(time) {
	window.cdtime = false;
	setTimeout(function () {
		window.cdtime = true;
	}, time);
}
function weaponfacing(event) {
	var pointerEvent = event;
	if (event.targetTouches && event.targetTouches[0]) {
		event.preventDefault();
		pointerEvent = event.targetTouches[0];
		mouseX = pointerEvent.pageX;
		mouseY = pointerEvent.pageY;
	} else {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
	centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset;
	centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset;
	radians = Math.atan2(mouseX - centerX, mouseY - centerY);
	degrees = (radians * (180 / Math.PI) * -1) + 90;
	pointer.style.transform = 'rotate(' + degrees + 'deg)';
}
function generatestartscene(blockvalue) {
	for (i = 1; i < blockvalue * blockvalue + 1; i++) {
		$('.fightarea').append('<div class=\'block startblock block' + i + '\'><img></div>');
	}
	$('.startblock').wrapAll('<div class=\'blockgroup startblockgroup\'></div>');
	$('.startblockgroup').css('grid-template-columns', window.blockgroup);
}
function generaterandomscene(blockvalue) {
	for (i = 1; i < blockvalue * blockvalue + 1; i++) {
		$('.fightarea').append('<div class=\'block blockvalue' + window.randomscene + ' block' + i + '\'><img></div>');
		var value = Math.floor(Math.random() * 100) + 1;
		if (value > 0 && value < 11) {
			$('.block' + i + '.blockvalue' + window.randomscene).children().attr('src', 'chest.png');
		} else if (value > 10 && value < 12) {
			$('.block' + i + '.blockvalue' + window.randomscene).children().attr('src', 'trap.png').addClass('trap');
		}
	}
	$('.blockvalue' + window.randomscene).wrapAll('<div class=\'blockgroup randomblockgroup' + window.randomscene + '\'></div>');
	$('.randomblockgroup' + window.randomscene).css('grid-template-columns', window.blockgroup);
	console.log(window.randomscene);
	$('.randomblockgroup' + window.randomscene).door('top', blockvalue, 'disableblock.png');
	$('.randomblockgroup' + window.randomscene).door('bottom', blockvalue, 'disableblock.png');
	console.log(window.randomscene);
	window.randomscene++;
	trap();
}
function readfile() {
	$.get('entity.json', function (data) {
		var entity = data.all_entity;
		window.entity = [];
		for (i = 0; i < entity.length + 1; i++) {
			$.get('./entity/hero/' + entity[i] + '/' + entity[i] + '.json', function (data) {
				console.log(data);
				window.entity.push(data);
			});
		}
	});
	$.get('block.json', function (data) {
		window.block = data;
	});
	$.get('item.json', function (data) {
		window.item = data;
	});
}
function trap() {
	var a = 0;
	window.trapi = 0;
	setInterval(function () {
		if (a == 0) {
			$('.trap').addClass('trapopen');
			$('.trap').attr('src', 'trapopen.png');
			if ($('.trapopen').overlaps('img[src$=\'warrior.png\']')[0] != undefined && window.trapi == 0) {
				window.entityhp = window.entityhp - window.block.trap.damage;
				window.trapi++;
			}
		} else if (a == 1) {
			$('.trap').attr('src', 'trap.png');
			$('.trap').removeClass('trapopen');
			a = -1;
			window.trapi = 0;
		}
		a++;
	}, 1000);
}

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	$.fn.overlaps = function (selector) {
		return this.pushStack(filterOverlaps(this, selector && $(selector)));
	};

	function filterOverlaps(collection1, collection2) {
		var dims1 = getDims(collection1),
			dims2 = !collection2 ? dims1 : getDims(collection2),
			stack = [],
			index1 = 0,
			index2 = 0,
			length1 = dims1.length,
			length2 = !collection2 ? dims1.length : dims2.length;

		if (!collection2) { collection2 = collection1; }

		for (; index1 < length1; index1++) {
			for (index2 = 0; index2 < length2; index2++) {
				if (collection1[index1] === collection2[index2]) {
					continue;
				} else if (checkOverlap(dims1[index1], dims2[index2])) {
					stack.push((length1 > length2) ?
						collection1[index1] :
						collection2[index2]);
				}
			}
		}

		return $.unique(stack);
	}

	function getDims(elems) {
		var dims = [], i = 0, offset, elem;

		while ((elem = elems[i++])) {
			offset = $(elem).offset();
			dims.push([
				offset.top,
				offset.left,
				elem.offsetWidth,
				elem.offsetHeight
			]);
		}

		return dims;
	}

	function checkOverlap(dims1, dims2) {
		var x1 = dims1[1], y1 = dims1[0],
			w1 = dims1[2], h1 = dims1[3],
			x2 = dims2[1], y2 = dims2[0],
			w2 = dims2[2], h2 = dims2[3];
		return !(y2 + h2 <= y1 || y1 + h1 <= y2 || x2 + w2 <= x1 || x1 + w1 <= x2);
	}

}));

function detecthurt() {
	$('.hpprogress .bar').html(window.entityhp + '/' + window.choseentity.hp);
	$('.hpprogress .bar').css('width', ((window.entityhp - 0) / (window.choseentity.hp - 0)) * 100 + '%');
	$('.mpprogress .bar').html(window.entitymp + '/' + window.choseentity.mp);
	$('.mpprogress .bar').css('width', ((window.entitymp - 0) / (window.choseentity.mp - 0)) * 100 + '%');
	if (window.entityhp <= 0) {
		alert('You Die!');
		window.entityhp = 100;
		window.location.reload();
	}
	if (window.choseentity.mp == Infinity) {
		$('.mpprogress .bar').css('width', '100%');
	}
}
function setskin() {
	$('.warrior.entity').append('<img src=\'' + window.choseentity.skin.normal.action.lobby.src + '\'>');
}
function setvariable() {
	window.deviceType = getDeviceType();
	window.choseentity = window.entity[0];
	window.entityhp = window.choseentity.hp;
	window.entitymp = window.choseentity.mp;
	window.gunbulleti = 0;
	window.cornertipsi = 0;
	window.img = {};
	window.img.name = [];
	window.img.src = [];
	window.dev = eval($.cookie('dev'));
	$.cookie.json = true;
	window.choseweapon1 = window.item.gun;
	window.choseweapon2 = window.item.shotgun;
	window.choseweapon = window.choseweapon1;
	if ($.cookie('entity') != null) {
		window.entity = JSON.parse($.cookie('entity'));
	} else if ($.cookie('item') != null) {
		window.item = JSON.parse($.cookie('item'));
	} else if ($.cookie('block') != null) {
		window.item = JSON.parse($.cookie('block'));
	}
}
function detectroom() {
	if ($('.blockgroup').overlaps('.fightarea .entity')[0] != undefined) {
		var str = $($('.blockgroup').overlaps('.fightarea .entity')[0]).attr('class');
		var gclass = str.split(' ')[1];
		$('.' + gclass).door('all', 18, 'block.png');
	}
}
function interval() {
	setInterval(function () {
		detecthurt();
		detectroom();
		$('.fightarea .entity > img').attr('src', window.choseentity.skin.normal.action.normal.src);
		$('.weapon img').attr('src', window.choseweapon.skin.normal.src);
	});
}
function cornertips(config) {
	window.cornertipsi++;
	$('body').append('<div class=\'cornertips cornertips' + window.cornertipsi + '\'>' + config.text + '</div>');
	$('.cornertips').css({
		'z-index': '100',
		'position': 'absolute',
		'bottom': '0px',
		'right': '0',
		'padding': '20px',
		'background-color': 'white',
		'color': 'black'
	});
	setTimeout(function () {
		$('.cornertips').remove();
	}, 2000);
}
function restore() {
	if (window.entitymp < window.choseentity.mp) {
		window.entitymp = window.entitymp + window.choseentity.mprestorevalue;
	} else if (window.entityhp < window.choseentity.hp) {
		window.entityhp = window.entityhp + window.choseentity.hprestorevalue;
	}
	if (window.entitymp > window.choseentity.mp) {
		window.entitymp = window.choseentity.mp;
	} else if (window.entityhp > window.choseentity.hp) {
		window.entityhp = window.choseentity.hp;
	}
}
function inner() {
	$('.block').text($.cookie('block'));
	$('.entity').text($.cookie('entity'));
	$('.item').text($.cookie('item'));
}
function setentityvalue(type, config) {
	if (type == 'mp') {
		window.entitymp = config;
	} else if (type == 'hp') {
		window.entityhp = config;
	}
}
window.ondragstart = function () {
	return false;
}
$(document).ready(function () {
	readfile();
	setTimeout(function () {
		setvariable();
		webapp();
		setskin();
		interval();
		inner();
	}, 1000)
	$(document).tooltip();
	$('.homepage .push').click(function () {
		if ($('.homepage .mode .container').css('bottom') == '-100px') {
			$('.homepage .mode .container').css('display', 'block');
			setTimeout(function () {
				$('.homepage .mode .container').css('bottom', '100px');
			}, 100);
			$('.startremind').css({
				'animation': '0',
				'opacity': '0'
			});
		} else if ($('.homepage .mode .container').css('bottom') == '100px') {
			$('.homepage .mode .container').css('bottom', '-100px');
			$('.startremind').css('animation', 'twinkling 2s infinite');
			window.modecontainerinterval = setInterval(function () {
				if ($('.homepage .mode .container').css('bottom') == '-100px') {
					$('.homepage .mode .container').css('display', 'none');
					clearInterval(window.modecontainerinterval)
				}
			});
		}
	});
	$('.homepage .mode .container .fightmodebtn').click(function () {
		$('.homepage').css('display', 'none');
		$('.gamearea').css('display', 'inline-block');
	});
	$('.warrior.entity').click(function () {
		$('.entityselect > div').css('display', 'none');
		$('.entityinfo').css('display', 'inline-block');
		$('.entityinfo h1').text(window.entity[0].name);
		$('.entityinfo div').text(window.entity[0].introduction);
		$('.entityinfo input').addClass(window.entity[0].id);
	});
	$('.magician.entity').click(function () {
		$('.entityselect > div').css('display', 'none');
		$('.entityinfo').css('display', 'inline-block');
		$('.entityinfo h1').text(window.entity[1].name);
		$('.entityinfo div').text(window.entity[1].introduction);
		$('.entityinfo input').addClass(window.entity[1].id);
	});
	$('.entityinfo').on('click', '.warrior', function () {
		window.choseentity = window.entity[0];
		$('.entityinfo').css('display', 'none');
		$('.entityselect > *:not(.entityinfo, .shop)').css('display', 'inline-block');
	});
	$('.entityinfo').on('click', '.magician', function () {
		window.choseentity = window.entity[1];
		$('.entityinfo').css('display', 'none');
		$('.entityselect > *:not(.entityinfo, .shop)').css('display', 'inline-block');
	});
	$('.gamearea .startbtn').click(function () {
		$('.entityselect').css('display', 'none');
		$('.generateoption').css('display', 'inline-block');
		if (window.choseentity == undefined) {
			window.choseentity = window.entity.warrior;
		}
		window.entityhp = window.choseentity.hp;
		window.entitymp = window.choseentity.mp;
	});
	$('.generate').click(function () {
		$('.generateoption').css('display', 'none');
		$('.fightarea').css('display', 'inline-block');
		$('.entityinfoinfight').css('display', 'inline-block');
		generatescene(Number($('.generaterange').val()));
		$('.fightarea .entity').tooltip({
			items: ".fightarea .entity",
			content: 'Tips: You can press f11 to fullscreen; You can press Q/E to change weapon, W/A/S/D or arrow key to move'
		});
		$('.fightarea .entity').tooltip("open");
		setTimeout(function () {
			$('.fightarea .entity').tooltip("disable");
		}, 10000);
	});
	$('.generaterange').on('input', function () {
		$('.rangevalue').text($('.generaterange').val());
	})
	$('.uploadpagebtn').click(function () {
		$('.homepage').css('display', 'none');
		$('.uploadpage').css('display', 'block');
	});
	$('.settingpagebtn').click(function () {
		$('.homepage').css('display', 'none');
		$('.settingpage').css('display', 'block');
	});
	$('.deleteentity').click(function () {
		$.removeCookie('entity');
		window.location.reload();
	});
	$('.deleteblock').click(function () {
		$.removeCookie('block');
		window.location.reload();
	});
	$('.deleteitem').click(function () {
		$.removeCookie('item');
		window.location.reload();
	});
	$('.upload').change(function () {
		var filereader = new FileReader;
		var uploadfile = $(this).get(0);
		if (uploadfile.files.length) {
			var files = uploadfile.files[0];
			var filename = files.name.split('.')[0];
			var filetype = files.name.split('.')[1];
			filereader.readAsText(files);
			$(filereader).on('load', processFile);
		}
		function processFile(event) {
			var file = event.target.result;
			var results;
			if (file && file.length) {
				results = file;
				if (filename == 'item') {
					window.item = JSON.parse(results);
					$.cookie('item', window.item);
				} else if (filename == 'entity') {
					window.entity = JSON.parse(results);
					console.log('sd');
					$.cookie('entity', window.entity);
				} else if (filename == 'block') {
					window.block = JSON.parse(results);
					$.cookie('block', window.block);
				}
			}
		}
	});
	$(document).keydown(function () {
		var move = '.fightarea > *:not(.entity, .entityinfoinfight)';
		if (event.which == 39 || event.which == 68) {
			$(move).move(-10, 0);
		} else if (event.which == 37 || event.which == 65) {
			$(move).move(10, 0);
		} else if (event.which == 38 || event.which == 87) {
			$(move).move(0, 10);
		} else if (event.which == 40 || event.which == 83) {
			$(move).move(0, -10);
		} else if (event.which == 81) {
			if (window.choseweapon == window.choseweapon1) {
				window.choseweapon = window.choseweapon2;
			} else if (window.choseweapon == window.choseweapon2) {
				window.choseweapon = window.choseweapon1;
			}
			//alert('This button use for change weapon but I did\'t make and other weapon so this button if useless, HaHaHa!');
		} else if (event.which == 69) {
			if (window.choseweapon == window.choseweapon1) {
				window.choseweapon = window.choseweapon2;
			} else if (window.choseweapon == window.choseweapon2) {
				window.choseweapon = window.choseweapon1;
			}
			//alert('This button use for change weapon but I did\'t make and other weapon so this button if useless, HaHaHa!');
		}
		if (event.which == 80) {
			$('.homepagesecret').css('display', 'inline-block');
		}
		if (event.which == 191) {
			var ans = prompt('Please enter command:');
			if (ans == 'dev123') {
				if (window.dev != true) {
					window.dev = true;
					$.cookie('dev', true);
					alert('dev mode is open!');
				} else {
					window.dev = false;
					$.cookie('dev', false);
					alert('dev mode is close.');
				}
			} else if (ans == 'hide-cursor') {
				$('html').css('cursor', 'none');
			} else if (ans == 'show-cursor') {
				$('html').css('cursor', 'default');
			} else if (ans == 'soler') {
				alert('This is a secret.');
				alert('But what you can do?');
			} else if (ans == 'fighttest') { } else {
				try {
					alert(eval(ans));
				} catch (err) {
					alert(err.message);
				}
			}
		}
	});
	$(document).keyup(function () {
		setTimeout(function () {
			$('.homepagesecret').css('display', 'none');
		}, 1000);
	});
	$(window).blur(function () {
		//alert('Don\'t focus to another thing!');
		$('.homepage .mode .container').css('bottom', '-100px');
	});
});
