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
function moveitv(x, y, element) {
	var i = 0;
	var itv = setInterval(function () {
		var ths = element;
		var x1 = $(ths).offset().left;
		var y1 = $(ths).offset().top;
		$(ths).css('position', 'absolute');
		$(ths).css('left', x1 + x + 'px');
		$(ths).css('top', y1 + y + 'px');
		if (i == 500) {
			$(ths).remove();
		}
		i++;
	});
}
function generatescene(blockvalue) {
	window.randomscene = 1;
	window.blockgroup = '';
	var scenevalue = 5;
	for (i = 1; i < blockvalue + 1; i++) {
		window.blockgroup = window.blockgroup + ' auto';
	}
	window.generatescenestr = '';
	window.addClass = 'cantdestroy';
	window.removeClass = 'trap enemy candestroy';
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
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', window.block[0].skin.normal.src);
			$('.block' + i).addClass(window.addClass);
			$('.block' + i).removeClass(window.removeClass);
			$('.block' + i + ' > *').removeClass(window.removeClass);
		} else if (i % blockvalue == 1) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', window.block[0].skin.normal.src);
			$('.block' + i).addClass(window.addClass);
			$('.block' + i).removeClass(window.removeClass);
			$('.block' + i + ' > *').removeClass(window.removeClass);
		} else if (i % blockvalue == 0) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', window.block[0].skin.normal.src);
			$('.block' + i).addClass(window.addClass);
			$('.block' + i).removeClass(window.removeClass);
			$('.block' + i + ' > *').removeClass(window.removeClass);
		} else if (i >= blockvalue * blockvalue - blockvalue) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', window.block[0].skin.normal.src);
			$('.block' + i).addClass(window.addClass);
			$('.block' + i).removeClass(window.removeClass);
			$('.block' + i + ' > *').removeClass(window.removeClass);
		}
	}
	$('.startblockgroup').door('bottom', blockvalue, window.block[0].skin.disable.src);
	$('.blockgroup').after('<br>');
	$('.blockgroup, .fightarea br').wrapAll('<div class=scene></div>');
	$('.scene').wrapAll('<div class=scenecontainer></div>');
	$('.fightarea .entity').append('<div class=weapon><img></div>');
	trap();
	weaponsetup();
	restore();
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
function mpfull() {
	window.entitymp = window.choseentity.mp;
}
function weaponuse(event) {
	if (window.cdtime && window.entitymp - window.choseweapon.mp >= 0) {
		if (window.choseweapon.type == 'gun') {
			window.entitymp = window.entitymp - window.choseweapon.mp;
			//$('.fightarea .entity').tooltip({
			//	items: ".fightarea .entity",
			//	content: 'You use the gun and your mp is ' + window.entitymp + '!'
			//});
			//$('.fightarea .entity').tooltip("open");
			//setTimeout(function () {
			//	$('.fightarea .entity').tooltip("disable");
			//}, 1000);
			bullet();
			cd(window.choseweapon.cd);
		} else if (window.choseweapon.type == 'sword') {
			window.entitymp = window.entitymp - window.choseweapon.mp;
			$('.fightarea .entity').tooltip({
				items: ".fightarea .entity",
				content: 'You use the sword and sword is not using mp so your mp is ' + window.entitymp + '!'
			});
			$('.fightarea .entity').tooltip("open");
			setTimeout(function () {
				$('.fightarea .entity').tooltip("disable");
			}, 1000);
			cd(window.choseweapon.cd);
		}
	}
}
function bullet() {
	$('.fightarea').append('<div class=\'gunbullet bullet' + window.gunbulleti + '\'><img src=' + window.choseweapon.skin.bullet.src + '></div>');
	$('.bullet' + window.gunbulleti).css({
		'top': $('.fightarea .entity').position().top,
		'left': $('.fightarea .entity').position().left
	});
	$('.bullet' + window.gunbulleti).each(function () {
		weapondestroy(this, window.gunbulleti);
		moveitv(5, 0, this);
	});
	window.gunbulleti++;
}
function weapondestroy(ths, value) {
	var a = setInterval(function () {
		var candestroy = ['.candestroy'];
		var cantdestroy = ['.cantdestroy'];
		for (i = 0; i < candestroy.length; i++) {
			if ($(ths).overlaps(candestroy[i])[0] != undefined) {
				$($(ths).overlaps(candestroy[i])[0]).children().removeAttr('src').parent().removeClass('candestroy');
				$(ths).remove();
			}
		}
		for (i = 0; i < cantdestroy.length; i++) {
			if ($(ths).overlaps(cantdestroy[i])[0] != undefined) {
				$(ths).remove();
			}
		}
		if ($('.bullet' + value).length == 0) {
			clearInterval(a);
		}
	});
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
			$('.block' + i + '.blockvalue' + window.randomscene).children().attr('src', window.block[1].skin.normal.src).parent().addClass('candestroy');
		} else if (value == 11) {
			$('.block' + i + '.blockvalue' + window.randomscene).children().attr('src', window.block[2].skin.normal.src).addClass('trap').parent().addClass('cantdestroy');
		} else if (value > 11 && value < 21) {
			$('.randomblockgroup' + window.randomscene).enemygen();
		}
	}
	$('.blockvalue' + window.randomscene).wrapAll('<div class=\'blockgroup randomblockgroup' + window.randomscene + '\'></div>');
	$('.randomblockgroup' + window.randomscene).css('grid-template-columns', window.blockgroup);
	$('.randomblockgroup' + window.randomscene).door('top', blockvalue, window.block[0].skin.disable.src);
	$('.randomblockgroup' + window.randomscene).door('bottom', blockvalue, window.block[0].skin.disable.src);
	window.randomscene++;
	trap();
}
$.fn.enemygen = function () {
	$(this).append('<div class=\'enemy\'><img src=\'trapopen\'></div>');
}
function readfile() {
	$.get('./entity.json', function (data) {
		var entity = data.all_entity;
		window.entity = [];
		for (i = 0; i < entity.length; i++) {
			$.get('./entity/hero/' + entity[i] + '.json', function (data) {
				window.entity.push(data);
			});
		}
	});
	$.get('./block.json', function (data) {
		var block = data.all_block;
		console.log(block);
		window.block = [];
		for (i = 0; i < block.length; i++) {
			console.log(i);
			console.log(block[i]);
			$.get('./block/' + block[i] + '.json', function (data) {
				console.log(block[i]);
				console.log(data);
				window.block.push(data);
			});
		}
	});
	$.get('./item.json', function (data) {
		var item = data.all_item;
		window.item = [];
		window.filewait = item.length * 500;
		for (i = 0; i < item.length; i++) {
			$.get('./item/weapon/' + item[i] + '/' + item[i] + '.json', function (data) {
				console.log(data);
				window.item.push(data);
			});
		}
	});
	if (navigator.language.includes('zh')) {
		$.get('./dialog/zh.txt', function (data) {
			var dialog = data.split('\n#');
			window.dialog = {};
			for (i = 0; i < dialog.length; i++) {
				window.dialog[dialog[i].split('=')[0].trim()] = dialog[i].split('=')[1].trim();
			}
		});
	} else {
		$.get('./dialog/en.txt', function (data) {
			var dialog = data.split('\n#');
			window.dialog = {};
			for (i = 0; i < dialog.length; i++) {
				window.dialog[dialog[i].split('=')[0].trim()] = dialog[i].split('=')[1].trim();
			}
		});
	}
	$.get('./thanks.txt', function (data) {
		window.thankstext = data.split('\n');
	});
}
function trap() {
	var a = 0;
	window.trapi = 0;
	setInterval(function () {
		if (a == 0) {
			$('.trap').addClass('trapopen');
			$('.trap').attr('src', window.block[2].skin.open.src);
			if ($('.trapopen').overlaps($('.fightarea .entity img'))[0] != undefined && window.trapi == 0) {
				window.entityhp = window.entityhp - window.block[2].damage;
				window.trapi++;
			}
		} else if (a == 1) {
			$('.trap').attr('src', window.block[2].skin.normal.src);
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
	try {
		$('.hpprogress .bar').html(window.entityhp + '/' + window.choseentity.hp);
		$('.hpprogress .bar').css('width', ((window.entityhp - 0) / (window.choseentity.hp - 0)) * 100 + '%');
		$('.mpprogress .bar').html(window.entitymp + '/' + window.choseentity.mp);
		$('.mpprogress .bar').css('width', ((window.entitymp - 0) / (window.choseentity.mp - 0)) * 100 + '%');
		if (window.entityhp <= 0) {
			died();
		}
		if (window.choseentity.mp == Infinity) {
			$('.mpprogress .bar').css('width', '100%');
		}
	} catch { }
}
function setskin() {
	for (i = 0; i < window.entity.length; i++) {
		$('.' + window.entity[i].id).append('<img src=\'' + window.entity[i].skin.normal.action.lobby.src + '\'>');
	}
}
function die() {
	window.entityhp = 0;
}
function died() {
	$('.fightarea div:not(.diedpage)').css('display', 'none');
	$('.diedpage').css('display', 'inline-block');
}
function setvariable() {
	window.deviceType = getDeviceType();
	window.gunbulleti = 0;
	window.cornertipsi = 0;
	window.img = {};
	window.img.name = [];
	window.img.src = [];
	window.dev = eval($.cookie('dev'));
	$.cookie.json = true;
	window.choseweapon1 = window.item[0];
	window.choseweapon2 = window.item[1];
	window.choseweapon = window.choseweapon1;
	if ($.cookie('entity') != null) {
		window.entity = JSON.parse($.cookie('entity'));
	} else if ($.cookie('item') != null) {
		window.item = JSON.parse($.cookie('item'));
	} else if ($.cookie('block') != null) {
		window.item = JSON.parse($.cookie('block'));
	}
}
function contains(target, pattern) {
	var value = 0;
	pattern.forEach(function (word) {
		value = value + target.includes(word);
	});
	return (value === 1)
}
function detectroom() {
	var exceptclass = ['startblockgroup', 'finishroom'];
	if ($('.blockgroup').overlaps('.fightarea .entity')[0] != undefined && !contains($($('.blockgroup').overlaps('.fightarea .entity')[0]).attr('class'), exceptclass)) {
		var str = $($('.blockgroup').overlaps('.fightarea .entity')[0]).attr('class');
		var gclass = str.split(' ')[1];
		$('.' + gclass).door('all', 18, window.block[0].skin.normal.src);
	}
}
function interval() {
	onetime = true;
	onetime2 = true;
	setInterval(function () {
		detecthurt();
		detectroom();
		try {
			$('.fightarea .entity > img').attr('src', window.choseentity.skin.normal.action.normal.src);
		} catch { }
		$('.weapon img').attr('src', window.choseweapon.skin.normal.src);
		$($('.bottombar .box img')[0]).attr('src', window.choseweapon1.skin.normal.src);
		$($('.bottombar .box .after')[0]).text(window.choseweapon1.mp);
		$($('.bottombar .box img')[1]).attr('src', window.choseweapon2.skin.normal.src);
		$($('.bottombar .box .after')[1]).text(window.choseweapon2.mp);
		if (window.block[0].name != 'block' && onetime) {
			onetime = false;
			alert(window.dialog['error.mustreload']);
			window.location.reload();
		}
		if (window.item[0].name != 'normal gun' && onetime) {
			onetime2 = false;
			window.location.reload();
		}
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
	setInterval(function () {
		if (window.entityhp < window.choseentity.hp) {
			window.entityhp = window.entityhp + window.choseentity.hprestorevalue;
		}
	}, window.choseentity.hprestorespeed);
	setInterval(function () {
		if (window.entitymp < window.choseentity.mp) {
			window.entitymp = window.entitymp + window.choseentity.mprestorevalue;
		}
	}, window.choseentity.mprestorespeed);
	setInterval(function () {
		if (window.entitymp > window.choseentity.mp) {
			window.entitymp = window.choseentity.mp;
		} else if (window.entityhp > window.choseentity.hp) {
			window.entityhp = window.choseentity.hp;
		}
		if (window.entitymp < 0) {
			window.entitymp = 0;
		} else if (window.entityhp < 0) {
			window.entityhp = 0;
		}
	})
}
function inner() {
	for (i = 0; i < window.entity.length; i++) {
		window.entity[i].name = window.dialog["entity." + window.entity[i].id + ".name"];
		window.entity[i].introduction = window.dialog["entity." + window.entity[i].id + ".intro"];
	}
	$('.title').html(window.dialog["ui.title"]);
	$('.update').html(window.dialog["ui.twinkingtext"]);
	$('.startremind').html(window.dialog["ui.startremind"]);
	$('.entityinfotitle').html(window.dialog["error.select.title"]);
	$('.powerbarhp').html(window.dialog["ui.hpbar"]);
	$('.powerbarmp').html(window.dialog["ui.mpbar"]);
	$('.fightmodebtn').attr('value', window.dialog["ui.fightmodebtn"]);
	$('.tutorialmodebtn').attr('value', window.dialog["ui.tutorialmodebtn"]);
	$('.storymodebtn').attr('value', window.dialog["ui.storymodebtn"]);
	$('.startbtn').attr('value', window.dialog["ui.startbtn"]);
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
function entityselectclick() {
	$('.' + window.entity[0].id).click(function () {
		displayselect(0);
	});
	$('.' + window.entity[1].id).click(function () {
		displayselect(1);
	});
}
function displayselect(value) {
	$('.entityselect > *').css('display', 'none');
	$('.entityinfo').css('display', 'inline-block');
	$('.entityinfo h1').text(window.entity[value].name);
	$('.entityinfo .info').text(window.entity[value].introduction);
	$('.entityinfo input').addClass(window.entity[value].id);
	$('.entityinfo .powerinfohp').text(window.entity[value].hp);
	$('.entityinfo .powerinfomp').text(window.entity[value].mp);
}
function thanks() {
	for (i = 0; i < window.thankstext.length; i++) {
		var a = window.thankstext[i].split('\\');
		console.log(a);
		console.log(a[2]);
		console.log(a[2] == 'slideup');
		if (a[2] == 'slideup') {
			console.log(i);
			$('.thanksname' + i).css({
				'bottom': '-100'
			});
		}
		$('.thankspage').append('<div class=\'thanksname' + i + '\'>' + a[0] + '</div>  ');
	}
	$('body > *:not(.thankspage)').css('display', 'none');
}
function conclear() {
	setInterval(function () {
		//console.clear();
	}, 1000);
}
function tutorial() {
	$('.fightarea .entity').tooltip({
		items: ".fightarea .entity",
		content: 'Tips: You can press f11 to fullscreen; You can press arrow key to move'
	});
	$('.fightarea .entity').tooltip("open");
	setTimeout(function () {
		$('.fightarea .entity').tooltip({
			items: ".fightarea .entity",
			content: 'Howdy, To day I will teach you how to \"play\" this game!'
		});
		setTimeout(function () {
			$('.fightarea .entity').tooltip({
				items: ".fightarea .entity",
				content: 'Howdy, To day I will teach you how to \"play\" this game!'
			});
		}, 5000);
	}, 5000);
}
function changeweaponto(value) {
	if (window.choseweapon == window.choseweapon1) {
		window.choseweapon = window.choseweapon2;
		$($('.bottombar .weapon .box')[0]).css('border', '2.5px solid white');
		$($('.bottombar .weapon .box')[1]).css('border', '5px solid white');
	} else if (window.choseweapon == window.choseweapon2) {
		window.choseweapon = window.choseweapon1;
		$($('.bottombar .weapon .box')[0]).css('border', '5px solid white');
		$($('.bottombar .weapon .box')[1]).css('border', '2.5px solid white');
	}
}
$(document).ready(function () {
	readfile();
	console.log(window.filewait);
	setTimeout(function () {
		alert(window.dialog['warning.computerperformance']);
		setvariable();
		setTimeout(function () {
			webapp();
			setskin();
			interval();
			inner();
			entityselectclick();
			conclear();
		}, 500);
	}, 500)
	$(document).tooltip();
	$(document).mousewheel(function (event) {
		console.log(event.deltaY);
		changeweaponto();
		if (event.deltaY == 1) {

		}
	});
	$(document).contextmenu(function (event) {
		event.preventDefault();
	});
	$('.cmdgenbtn').click(function () {
		console.log('sd');
		window.location.href = './cmdgen';
	});
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
		$('.entityselect').css('display', 'inline-block');
	});
	$('.homepage .mode .container .tutorialmodebtn').click(function () {
		$('.homepage').css('display', 'none');
		$('.gamearea').css('display', 'inline-block');
		$('.fightarea').css('display', 'inline-block');
		tutorial();
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
		if (window.choseentity != undefined) {
			$('.entityselect').css('display', 'none');
			$('.generateoption').css('display', 'inline-block');
			window.entityhp = window.choseentity.hp;
			window.entitymp = window.choseentity.mp;
		} else {
			alert(window.dialog['warning.forgherochose']);
		}
	});
	$('.generate').click(function () {
		$('.generateoption').css('display', 'none');
		$('.fightarea').css('display', 'inline-block');
		$('.entityinfoinfight').css('display', 'inline-block');
		$('.bottombar').css('display', 'inline-block');
		generatescene(Number($('.generaterange').val()));
		$('.fightarea .entity').tooltip({
			items: ".fightarea .entity",
			content: 'Tips: You can press f11 to fullscreen; You can press arrow key to move'
		});
		$('.fightarea .entity').tooltip("open");
		setTimeout(function () {
			$('.fightarea .entity').tooltip("disable");
		}, 5000);
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
	$('.thanksbtn').click(function () {
		thanks();
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
		var moveele = '.fightarea > *:not(.entity, .entityinfoinfight, .gunbullet, .bottombar)';
		if (event.which == 39 || event.which == 68) {
			$(moveele).each(function () {
				$(this).move(-10, 0);
			});
		} else if (event.which == 37 || event.which == 65) {
			$(moveele).each(function () {
				$(this).move(10, 0);
			});
		} else if (event.which == 38 || event.which == 87) {
			$(moveele).each(function () {
				$(this).move(0, 10);
			});
		} else if (event.which == 40 || event.which == 83) {
			$(moveele).each(function () {
				$(this).move(0, -10);
			});
		} else if (event.which == 81) {
			changeweaponto();
			//alert('This button use for change weapon but I did\'t make and other weapon so this button if useless, HaHaHa!');
		} else if (event.which == 69) {
			changeweaponto();
			//alert('This button use for change weapon but I did\'t make and other weapon so this button if useless, HaHaHa!');
		} else if (event.which == 71) {
			window.open('https://github.com/adenpun/adenpun.github.io/issues/new', '', 'width=750, height=750');
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
					eval(ans);
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
