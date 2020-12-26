// TODO: Replace the following with your app's Firebase project configuration


// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
	apiKey: "AIzaSyDkSOCf6OlKlQK7dpJytnsZECWczfYApCo",
	authDomain: "webdb200101.firebaseapp.com",
	databaseURL: "https://webdb200101.firebaseio.com",
	projectId: "webdb200101",
	storageBucket: "webdb200101.appspot.com",
	messagingSenderId: "485833164369",
	appId: "1:485833164369:web:66144cf75de59218461a70",
	measurementId: "G-DXYPZLMPD7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var uid = $.cookie('uid');

function writeUserData(data, ref) {
	firebase.database().ref('users/' + uid + '/' + ref).set({
		data: data
	});
}
function readUserData(value) {
	firebase.database().ref('/users/' + uid).once('value').then(function (snapshot) {
		eval('window.data[\'' + value + '\'] = (snapshot.val() && snapshot.val().' + value + ') || undefined;');
		// ...
	});
}
function moveFbRecord(oldRef, newRef) {
	oldRef.once('value', function (snap) {
		newRef.set(snap.value(), function (error) {
			if (!error) { oldRef.remove(); }
			else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
		});
	});
}
function copyFbRecord(oldRef, newRef) {
	oldRef.once('value', function (snap) {
		newRef.set(snap.value(), function (error) {
			if (error && typeof (console) !== 'undefined' && console.error) { console.error(error); }
		});
	});
}
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
	$('div:not(.warning)').show();
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
	var x1 = this.position().left;
	var y1 = this.position().top;
	this.css('transform', '');
	this.css('position', 'absolute');
	this.css('left', (x1 + x) + 'px');
	this.css('top', (y1 + y) + 'px');
}
function moveitv(x, y, element) {
	var i = 0;
	var itv = setInterval(function () {
		$(element).move(x, y);
		if (i == 500) {
			clearInterval(itv);
			if ($(element).hasClass('snowybullet')) {
				window.snowybulletdis = true;
			}
			$(element).remove();
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
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', window.block1['block'].skin.normal.src);
			$('.block' + i).addClass(window.addClass);
			$('.block' + i).removeClass(window.removeClass);
			$('.block' + i + ' > *').removeClass(window.removeClass);
		} else if (i % blockvalue == 1) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', window.block1['block'].skin.normal.src);
			$('.block' + i).addClass(window.addClass);
			$('.block' + i).removeClass(window.removeClass);
			$('.block' + i + ' > *').removeClass(window.removeClass);
		} else if (i % blockvalue == 0) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', window.block1['block'].skin.normal.src);
			$('.block' + i).addClass(window.addClass);
			$('.block' + i).removeClass(window.removeClass);
			$('.block' + i + ' > *').removeClass(window.removeClass);
		} else if (i >= blockvalue * blockvalue - blockvalue) {
			$('.block' + i + ' > *:not(.blockreplaceexcept)').attr('src', window.block1['block'].skin.normal.src);
			$('.block' + i).addClass(window.addClass);
			$('.block' + i).removeClass(window.removeClass);
			$('.block' + i + ' > *').removeClass(window.removeClass);
		}
	}
	$('.startblockgroup').door('bottom', blockvalue, window.block1['block'].skin.disable.src);
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
	if (window.cdtime && window.entitymp - window.weapon['chose'].mp >= 0) {
		if (window.weapon['chose'].type == 'gun') {
			window.entitymp = window.entitymp - window.weapon['chose'].mp;
			//$('.fightarea .entity').tooltip({
			//	items: ".fightarea .entity",
			//	content: 'You use the gun and your mp is ' + window.entitymp + '!'
			//});
			//$('.fightarea .entity').tooltip("open");
			//setTimeout(function () {
			//	$('.fightarea .entity').tooltip("disable");
			//}, 1000);
			bullet();
			cd(window.weapon['chose'].cd);
		} else if (window.weapon['chose'].type == 'sword') {
			window.entitymp = window.entitymp - window.weapon['chose'].mp;
			$('.fightarea .entity').tooltip({
				items: ".fightarea .entity",
				content: 'You use the sword and sword is not using mp so your mp is ' + window.entitymp + '!'
			});
			$('.fightarea .entity').tooltip("open");
			setTimeout(function () {
				$('.fightarea .entity').tooltip("disable");
			}, 1000);
			cd(window.weapon['chose'].cd);
		}
	}
}
function bullet() {
	$('.fightarea').append('<div class=\'gunbullet bullet' + window.bulleti + '\'><img src=' + window.weapon['chose'].skin.bullet.src + '></div>');
	$('.bullet' + window.bulleti).css({
		'top': $('.fightarea .entity').position().top,
		'left': $('.fightarea .entity').position().left
	});
	$('.bullet' + window.bulleti).each(function () {
		weapondestroy(this, window.bulleti);
		moveitv(5, 0, this);
	});
	window.bulleti++;
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
		if (value >= 1 && value <= 10) {
			$('.block' + i + '.blockvalue' + window.randomscene).children().attr('src', window.block1['chest'].skin.normal.src).parent().addClass('candestroy');
		} else if (value == 11) {
			$('.block' + i + '.blockvalue' + window.randomscene).children().attr('src', window.block1['trap'].skin.normal.src).addClass('trap').parent().addClass('cantdestroy');
		} else if (value >= 12 && value <= 20) {
			$('.randomblockgroup' + window.randomscene).enemygen();
		}
	}
	$('.blockvalue' + window.randomscene).wrapAll('<div class=\'blockgroup randomblockgroup' + window.randomscene + '\'></div>');
	$('.randomblockgroup' + window.randomscene).css('grid-template-columns', window.blockgroup);
	$('.randomblockgroup' + window.randomscene).door('top', blockvalue, window.block1['block'].skin.disable.src);
	$('.randomblockgroup' + window.randomscene).door('bottom', blockvalue, window.block1['block'].skin.disable.src);
	window.randomscene++;
}
$.fn.enemygen = function () {
	$(this).append('<div class=\'enemy\'><img src=\'trapopen\'></div>');
}
function readfile() {
	$.get('./entity.json', function (data) {
		var entity = data.all_entity;
		window.entity = [];
		window.entity1 = {};
		for (i = 0; i < entity.length; i++) {
			$.get('./entity/hero/' + entity[i] + '.json', function (data) {
				window.entity.push(data);
				window.entity1[data.id] = data;
			});
		}
	});
	$.get('./block.json', function (data) {
		var block = data.all_block;
		window.block = [];
		window.block1 = {};
		for (i = 0; i < block.length; i++) {
			$.get('./block/' + block[i] + '.json', function (data) {
				window.block.push(data);
				window.block1[data.id] = data;
			});
		}
	});
	$.get('./item.json', function (data) {
		var item = data.all_item;
		window.item = [];
		window.item1 = {};
		for (i = 0; i < item.length; i++) {
			$.get('./item/weapon/' + item[i] + '/' + item[i] + '.json', function (data) {
				window.item.push(data);
				window.item1[data.id] = data;
			});
		}
	});
	if (navigator.language.includes('zh')) {
		$.get('./dialog/zh.txt', function (data) {
			dialogfuc(data);
		});
	} else if (navigator.language.includes('en')) {
		$.get('./dialog/en.txt', function (data) {
			dialogfuc(data);
		});
	} else {
		$.get('./dialog/en.txt', function (data) {
			dialogfuc(data);
		});
		alert('We don\'t have language: ' + navigator.language + '(ISO 639-1) in Human VS Monster! We hope anybody can help us to translate other');
	}
	$.get('./thanks.txt', function (data) {
		window.thankstext = data.split('\n');
	});
}
function dialogfuc(data) {
	dialog = data.split('\n#');
	window.dialog1 = {};
	for (i = 0; i < dialog.length; i++) {
		if (dialog[i].includes('##')) {
			dialog.splice(dialog.indexOf(dialog[i]), 1);
		}
	}
	for (i = 0; i < dialog.length; i++) {
		window.dialog1[dialog[i].split('=')[0].trim()] = dialog[i].split('=')[1].trim();
	}
}
function trap() {
	var a = 0;
	window.trapi = 0;
	setInterval(function () {
		if (a == 0) {
			$('.trap').addClass('trapopen');
			$('.trap').attr('src', window.block1['trap'].skin.open.src);
			if ($('.trapopen').overlaps($('.fightarea .entity img'))[0] != undefined && window.trapi == 0) {
				window.entityhp = window.entityhp - window.block1['trap'].damage;
				window.trapi++;
			}
		} else if (a == 1) {
			$('.trap').attr('src', window.block1['trap'].skin.normal.src);
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
	$('.diedpage').show();
}
function setvariable() {
	window.keys = {};
	window.speakwaititem = {};
	window.speakwait = false;
	window.cornertipsi = 0;
	window.speaki = 0;
	window.data = {};
	window.weapon = {};
	window.deviceType = getDeviceType();
	window.bulleti = 0;
	window.img = {};
	window.img.name = [];
	window.img.src = [];
	window.dev = eval($.cookie('dev'));
	$.cookie.json = true;
	console.log('dev: ' + window.dev);
	readUserData('fight');
	if ($.cookie('login') != true) {
		alert(window.dialog1['error.unlogin']);
		window.location.href = 'index.html';
	}
	if ($.cookie('entity') != null) {
		window.entity = JSON.parse($.cookie('entity'));
	} else if ($.cookie('item') != null) {
		window.item = JSON.parse($.cookie('item'));
	} else if ($.cookie('block') != null) {
		window.item = JSON.parse($.cookie('block'));
	}
}
/*
function loaddetect() {
	if (window.mode == 'fight') {
		if (window.data == undefined) {

		} else {
			if (window.data.hasOwnProperty('fight')) {
				window.weapon['chose'] = window.weapon['wea1'];
				window.weapon['wea1'] = window.item1['gun'];
				window.weapon['wea2'] = window.item1['shotgun'];
			} else {
				if (window.data.fight.data.hasOwnProperty('weapon')) {
					window.weapon['chose'] = window.weapon['wea1'];
					window.weapon['wea1'] = window.item1['gun'];
					window.weapon['wea2'] = window.item1['shotgun'];
				} else {
					if (window.data.fight.data.hasOwnProperty('data')) {
						window.weapon['chose'] = window.weapon['wea1'];
						window.weapon['wea1'] = window.item1['gun'];
						window.weapon['wea2'] = window.item1['shotgun'];
					} else {
						if (window.data.fight.data.weapon.hasOwnProperty('chose')) {
							window.weapon['chose'] = window.data.fight.data.weapon.chose;
						} else {
							window.weapon['chose'] = window.weapon['wea1'];
						}
						if (window.data.fight.data.weapon.hasOwnProperty('wea1')) {
							window.weapon['chose1'] = window.data.fight.data.weapon.wea1;
						} else {
							window.weapon['chose1'] = window.item1['gun'];
						}
						if (window.data.fight.data.weapon.hasOwnProperty('wea2')) {
							window.weapon['chose2'] = window.data.fight.data.weapon.wea2;
						} else {
							window.weapon['chose2'] = window.item1['shotgun'];
						}
					}
				}
			}
		}
	}
	window.weapon['wea1'] = window.item1['gun'];
	window.weapon['wea2'] = window.item1['shotgun'];
}*/
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
		$('.' + gclass).door('all', 18, window.block1['block'].skin.normal.src);
	}
}
function interval() {
	onetime = true;
	onetime2 = true;
	setInterval(function () {
		//console.log(window.keys);
		detecthurt();
		detectroom();
		try {
			$('.fightarea .entity > img').attr('src', window.choseentity.skin.normal.action.normal.src);
			$('.weapon img').attr('src', window.weapon['chose'].skin.normal.src);
			$($('.bottombar .box img')[0]).attr('src', window.weapon['wea1'].skin.normal.src);
			$($('.bottombar .box .after')[0]).text(window.weapon['wea1'].mp);
			$($('.bottombar .box img')[1]).attr('src', window.weapon['wea2'].skin.normal.src);
			$($('.bottombar .box .after')[1]).text(window.weapon['wea2'].mp);
		} catch { }
		/*if (window.block[0].name != 'block' && onetime) {
			onetime = false;
			alert(window.dialog1['error.mustreload']);
			window.location.reload();
		}
		if (window.item[0].name != 'normal gun' && onetime) {
			onetime2 = false;
			window.location.reload();
		}*/
		entityselectclick();
		//loaddetect();
	});
	setInterval(function () {
		if (window.mode == 'story') {
			writeUserData({
				'name': window.name
			}, 'story');
		} else if (window.mode == 'fight') {
			/*writeUserData({
				'chose': window.weapon['chose'],
				'wea1': window.weapon['wea1'],
				'wea2': window.weapon['wea2'],
			}, 'fight/weapon');*/
		}
	}, 5000);
}
function cornertips(text, time, callback) {
	$('body').append('<div class=\'cornertips cornertips' + window.cornertipsi + '\'>' + text + '</div>');
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
		window.entity[i].name = window.dialog1["entity." + window.entity[i].id + ".name"];
		window.entity[i].introduction = window.dialog1["entity." + window.entity[i].id + ".intro"];
	}
	$('title').html(window.dialog1["ui.pagetitle"]);
	$('.homepage .title').html(window.dialog1["ui.title"]);
	$('.update').html(window.dialog1["ui.twinkingtext"]);
	$('.startremind').html(window.dialog1["ui.startremind"]);
	$('.entityinfotitle').html(window.dialog1["error.select.title"]);
	$('.powerbarhp').html(window.dialog1["ui.hpbar"]);
	$('.powerbarmp').html(window.dialog1["ui.mpbar"]);
	$('.namedisplay').attr('placeholder', window.dialog1["ui.namedisplay"]);
	$('.fightmodebtn').attr('value', window.dialog1["ui.fightmodebtn"]);
	$('.tutorialmodebtn').attr('value', window.dialog1["ui.tutorialmodebtn"]);
	$('.storymodebtn').attr('value', window.dialog1["ui.storymodebtn"]);
	$('.startbtn').attr('value', window.dialog1["ui.startbtn"]);
	$('.shopbtn').attr('value', window.dialog1["ui.shopbtn"]);
	$('.signoutbtn').attr('value', window.dialog1["ui.signoutbtn"]);
	$('.cmdgenbtn').attr('value', window.dialog1["ui.cmdgenbtn"]);
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
	try {
		$('.' + window.entity[0].id).click(function () {
			displayselect(0);
		});
		$('.' + window.entity[1].id).click(function () {
			displayselect(1);
		});
		$('.' + window.entity[2].id).click(function () {
			displayselect(2);
		});
		$('.' + window.entity[3].id).click(function () {
			displayselect(3);
		});
		$('.choosebtn.' + window.entity[0].id).click(function () {
			displayselectchose(0);
		});
		$('.choosebtn.' + window.entity[1].id).click(function () {
			displayselectchose(1);
		});
		$('.choosebtn.' + window.entity[2].id).click(function () {
			displayselectchose(2);
		});
		$('.choosebtn.' + window.entity[3].id).click(function () {
			displayselectchose(3);
		});
	} catch { }
}
function displayselect(value) {
	$('.entityselect > *').css('display', 'none');
	$('.entityinfo').show();
	$('.entityinfo h1').text(window.entity[value].name);
	$('.entityinfo .info').text(window.entity[value].introduction);
	$('.entityinfo input').addClass(window.entity[value].id);
	$('.entityinfo .powerinfohp').text(window.entity[value].hp);
	$('.entityinfo .powerinfomp').text(window.entity[value].mp);
}
function displayselectchose(value) {
	window.choseentity = window.entity1[window.entity[value].id];
	$('.entityinfo input').attr('class', 'choosebtn');
	$('.entityinfo').css('display', 'none');
	$('.entityselect > *:not(.entityinfo)').css('display', 'block');
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
		content: 'Howdy, To day I will teach you how to \"play\" this game!'
	});
	setTimeout(function () {
		$('.fightarea .entity').tooltip({
			items: ".fightarea .entity",
			content: 'Howdy, To day I will teach you how to \"play\" this game!'
		});
	}, 5000);
}
function changeweaponto(value) {
	if (window.weapon['chose'] == window.weapon['wea1']) {
		window.weapon['chose'] = window.weapon['wea2'];
		$($('.bottombar .weapon .box')[0]).css('border', '2.5px solid white');
		$($('.bottombar .weapon .box')[1]).css('border', '5px solid white');
	} else if (window.weapon['chose'] == window.weapon['wea2']) {
		window.weapon['chose'] = window.weapon['wea1'];
		$($('.bottombar .weapon .box')[0]).css('border', '5px solid white');
		$($('.bottombar .weapon .box')[1]).css('border', '2.5px solid white');
	}
}
$(document).ready(function () {
	readfile();
	setTimeout(function () {
		setvariable();
		setTimeout(function () {
			cornertips(window.dialog1['warning.computerperformance'], 5000, function () {
				cornertips(window.dialog1['tips.fullscreen'], 5000);
			});
			setTimeout(function () {
				webapp();
				setskin();
				interval();
				inner();
			}, 500);
		}, 500);
	}, 500)
	ap43();
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
	$('.shopbtn').click(function () {
		$('.entityselect').css('display', 'none');
		$('.shop').show();
	});
	$('.cmdgenbtn').click(function () {
		window.location.href = './cmdgen';
	});
	$('.signoutbtn').click(function () {
		$.removeCookie('login');
		$.removeCookie('uid');
		window.location.href = './index.html';
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
	/*
	$('.homepage .mode .container .fightmodebtn').click(function () {
		$('.homepage').css('display', 'none');
		$('.gamearea').show();
		$('.entityselect').show();
		window.mode = 'fight';
	});
	$('.homepage .mode .container .tutorialmodebtn').click(function () {
		$('.homepage').css('display', 'none');
		$('.gamearea').show();
		$('.fightarea').show();
		tutorial();
	});
	*/
	$('.homepage .mode .container .storymodebtn').click(function () {
		$('.homepage').css('display', 'none');
		$('.gamearea').show();
		$('.storymode').show();
		window.mode = 'story';
		story();
		if (window.dev) {
		}/* else {
			window.location.href = 'https://github.com/adenpun/adenpun.github.io/releases/download/prev0.8b/SolerFight-win32-x64.zip';
		}*/
	});
	$('.gamearea .startbtn').click(function () {
		if (window.choseentity != undefined) {
			$('.entityselect').css('display', 'none');
			$('.generateoption').show();
			window.entityhp = window.choseentity.hp;
			window.entitymp = window.choseentity.mp;
		} else {
			cornertips(window.dialog1['warning.forgherochose'], 3000);
		}
	});
	$('.generate').click(function () {
		$('.generateoption').css('display', 'none');
		$('.fightarea').show();
		$('.entityinfoinfight').show();
		$('.bottombar').show();
		generatescene(Number($('.generaterange').val()));
		window.istart = true;
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
				cornertips('This is a secret.', 5000, function () {
					cornertips('But what you can do?', 5000);
				});
			} else if (ans == 'fighttest') { } else {
				try {
					eval(ans);
				} catch (err) {
					alert(err.message);
				}
			}
		} else if (event.which == 18) {
			event.preventDefault();
		} else if (event.which == 71) {
			if (window.mode == undefined) {
				window.open('https://github.com/adenpun/adenpun.github.io/issues/new', '', 'width=750, height=750');
			}
		}
		window.keys[event.which] = true;
	});
	$(document).keyup(function () {
		setTimeout(function () {
			$('.homepagesecret').css('display', 'none');
		}, 1000);
		delete window.keys[event.which];
	});
	$(window).blur(function () {
		//alert('Don\'t focus to another thing!');
		$('.homepage .mode .container').css('bottom', '-100px');
	});
});
