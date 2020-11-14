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
	$('#warning').css('display', 'none');
	$('div:not(#warning)').css('display', 'inline-block');
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
	for (i = 1; i < blockvalue + 1; i++) {
		window.blockgroup = window.blockgroup + ' auto';
	}
	generaterandomscene(blockvalue);
	generaterandomscene(blockvalue);
	generatestartscene(blockvalue);
	$('.blockgroup').wrapAll('<div class=scene></div>');
	trap();
	$('#sprite').append('<div id=weapon><img src=gun.png></div>');
	weaponsetup();
	setInterval(restoremp, window.chosehero.mprestorespeed);
}
function weaponsetup() {
	window.choseweapon = 'gun';
	pointer = document.getElementById('weapon');
	pointerBox = pointer.getBoundingClientRect();
	centerPoint = window.getComputedStyle(pointer).transformOrigin;
	centers = centerPoint.split(' ');
	$(document).mousemove(weaponfacing);
	setTimeout(weaponsettime, 1000);
}
function weaponsettime() {
	$(document).click(weaponuse);
}
function weaponuse(event) {
	if (window.choseweapon == 'gun') {
		window.spritemp = window.spritemp - window.item.gun.mp;
		cornertips({
			'text': 'You use the gun and your mp is ' + window.spritemp + '!'
		});
		//alert('You use the gun.');
		//alert('But not thing happen.');
		//$('.scene').append('<div class=\'gunbullet bullet bullet' + window.gunbulleti + '\'><img src=chest.png></div>');
		window.gunbulleti++;
	}
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
		$('#fightarea').append('<div class=\'block startblock block' + i + '\'><img></div>');
	}
	for (i = 1; i < blockvalue * blockvalue + 1; i++) {
		if (i <= blockvalue) {
			$('.block' + i).children().attr('src', 'block.png');
		}
		if (i % blockvalue == 1) {
			$('.block' + i).children().attr('src', 'block.png');
		}
		if (i % blockvalue == 0) {
			$('.block' + i).children().attr('src', 'block.png');
		}
		if (i >= blockvalue * blockvalue - blockvalue) {
			$('.block' + i).children().attr('src', 'block.png');
		}
	}
	$('.startblock').wrapAll('<div class=\'blockgroup startblockgroup\'></div>');
	$('.startblockgroup').css('grid-template-columns', window.blockgroup);
}
function generaterandomscene(blockvalue) {
	for (i = 1; i < blockvalue * blockvalue + 1; i++) {
		$('#fightarea').append('<div class=\'block blockvalue' + window.randomscene + ' block' + i + '\'><img></div>');
		var value = Math.floor(Math.random() * 100) + 1;
		if (value > 0 && value < 11) {
			$('.block' + i + '.block').children().attr('src', 'chest.png');
		} else if (value > 10 && value < 12) {
			$('.block' + i + '.block').children().attr('src', 'trap.png');
			$('.block' + i + '.block').children().addClass('trap');
		}
	}
	$('.blockvalue' + window.randomscene).wrapAll('<div class=\'blockgroup randomblockgroup' + window.randomscene + '\'></div>');
	var removeClass = 'trap enemy';
	for (i = 1; i < blockvalue * blockvalue + 1; i++) {
		if (i <= blockvalue) {
			$('.block' + i).children().attr('src', 'block.png');
			$('.block' + i).children().removeClass(removeClass);
		} else if (i % blockvalue == 1) {
			$('.block' + i).children().attr('src', 'block.png');
			$('.block' + i).children().removeClass(removeClass);
		} else if (i % blockvalue == 0) {
			$('.block' + i).children().attr('src', 'block.png');
			$('.block' + i).children().removeClass(removeClass);
		} else if (i >= blockvalue * blockvalue - blockvalue) {
			$('.block' + i).children().attr('src', 'block.png');
			$('.block' + i).children().removeClass(removeClass);
		} else if (i == blockvalue / 2) {
			$('.block' + i).children().removeAttr('src');
			$('.block' + i).children().removeClass(removeClass);
		}
	}
	for (i = 1; i < blockvalue * blockvalue + 1; i++) {
		if (i == blockvalue / 2) {
			console.log('sds');
			$('.block' + i).children().attr('src', '');
			$('.block' + i).children().removeClass(removeClass);
		}
		console.log(i + ' ' + blockvalue / 2);
	}
	$('.randomblockgroup' + window.randomscene).css('grid-template-columns', window.blockgroup);
	window.randomscene = window.randomscene + 1;
	trap();
}
function readjson() {
	$.get('character.json', function (data) {
		window.character = data;
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
				window.spritehp = window.spritehp - window.block.trap.damage;
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
	$('.hpprogress .bar').html(window.spritehp + '/' + window.chosehero.hp);
	$('.hpprogress .bar').css('width', ((window.spritehp - 0) / (window.chosehero.hp - 0)) * 100 + '%');
	$('.mpprogress .bar').html(window.spritemp + '/' + window.chosehero.mp);
	$('.mpprogress .bar').css('width', ((window.spritemp - 0) / (window.chosehero.mp - 0)) * 100 + '%');
	if (window.spritehp <= 0) {
		alert('You Die!');
		window.spritehp = 100;
		window.location.reload();
	}
	if (window.chosehero.mp == Infinity) {
		$('.mpprogress .bar').css('width', '100%');
	}
}
function setskin() {
	$('#warriorsit').attr('src', window.character.warrior.skin.normal.action.sit.src);
}
function setvariable() {
	window.deviceType = getDeviceType();
	window.chosehero = window.character.warrior;
	window.spritehp = window.chosehero.hp;
	window.spritemp = window.chosehero.mp;
	window.gunbulleti = 0;
	window.cornertipsi = 0;
	$('#fightarea #sprite img').attr('src', window.chosehero.skin.normal.action.normal.src);
}
function interval() {
	setInterval(function () {
		detecthurt();
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
function restoremp() {
	if (window.spritemp < window.chosehero.mp) {
		window.spritemp = window.spritemp + window.chosehero.mprestorevalue;
	}
	if (window.spritemp > window.chosehero.mp) {
		window.spritemp = window.chosehero.mp;
	}
}
$(document).ready(function () {
	readjson();
	setTimeout(function () {
		setvariable();
		webapp();
		setskin();
		interval();
	}, 1000)
	if (window.deviceType == 'mobile') {
		$('div:not(#warning)').css('display', 'none');
		$('#warning').css('display', 'inline-block');
		$('#warning h1').html('You can\'t play in mobile!');
	}
	$('#homepage > *:not(label)').click(function () {
		$('#homepage').css('display', 'none');
		$('#gamearea').css('display', 'inline-block');
	});
	$('#warrior.sprite').click(function () {
		$('#spriteselect > div').css('display', 'none');
		$('.spriteinfo').css('display', 'inline-block');
		$('.spriteinfo h1').text(window.character.warrior.name);
		$('.spriteinfo div').text(window.character.warrior.introduction);
		$('.spriteinfo input').addClass(window.character.warrior.id);
	});
	$('#magician.sprite').click(function () {
		$('#spriteselect > div').css('display', 'none');
		$('.spriteinfo').css('display', 'inline-block');
		$('.spriteinfo h1').text(window.character.magician.name);
		$('.spriteinfo div').text(window.character.magician.introduction);
		$('.spriteinfo input').addClass(window.character.magician.id);
	});
	$('.spriteinfo').on('click', '.warrior', function () {
		window.chosehero = window.character.warrior;
		$('.spriteinfo').css('display', 'none');
		$('#spriteselect > *:not(.spriteinfo, #shop)').css('display', 'inline-block');
	});
	$('.spriteinfo').on('click', '.magician', function () {
		window.chosehero = window.character.magician;
		$('.spriteinfo').css('display', 'none');
		$('#spriteselect > *:not(.spriteinfo, #shop)').css('display', 'inline-block');
	});
	$('#gamearea #startbtn').click(function () {
		$('#spriteselect').css('display', 'none');
		$('#generateoption').css('display', 'inline-block');
		if (window.chosehero == undefined) {
			window.chosehero = window.character.warrior;
		}
		window.spritehp = window.chosehero.hp;
		window.spritemp = window.chosehero.mp;
	});
	$('#generate').click(function () {
		$('#generateoption').css('display', 'none');
		$('#fightarea').css('display', 'inline-block');
		$('#spriteinfight').css('display', 'inline-block');
		generatescene(Number($('#generaterange').val()));
		cornertips({
			'text': 'Tips: You can press f11 to fullscreen'
		});
	});
	$('#generaterange').on('input', function () {
		$('#rangevalue').text($('#generaterange').val());
	})
	$('.upload').change(function () {
		var filereader = new FileReader;
		var uploadfile = $(this).get(0);
		if (uploadfile.files.length) {
			var files = uploadfile.files[0];
			var filename = files.name.split('.')[0];
			var filetype = files.name.split('.')[1];
			console.log(filename);
			console.log(filetype);
			filereader.readAsText(files);
			$(filereader).on('load', processFile);
		}
		function processFile(event) {
			var file = event.target.result;
			var results;
			if (file && file.length) {
				results = file;
				console.log(results);
				if (filename == 'item') {
					alert('item plugin is load sucessfully');
				} else if (filename == 'character') {
					alert('character plugin is load sucessfully');
				}
				if (filetype == 'zip') {
					readzip(file)
				}
			}
		}
	});
	function readzip(files) {
		var jszip = new JSZip();
		handleFile(files[0]);
		function handleFile(f) {
			jszip.loadAsync(f)                                   // 1) read the Blob
				.then(function (zip) {
					zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
						console.log(zipEntry.name);
					});
				}, function (e) {
					//console.log(f.name + ": " + e.message);
				});
		}
	}
	$(document).keydown(function () {
		var move = '#fightarea > *:not(#sprite, #spriteinfight)';
		if (event.which == 39) {
			$(move).move(-10, 0);
		} else if (event.which == 37) {
			$(move).move(10, 0);
		} else if (event.which == 38) {
			$(move).move(0, 10);
		} else if (event.which == 40) {
			$(move).move(0, -10);
		}
	});
});
