var devmode = true;
(function (osetInterval, oclearInterval) {
	var intervals = [];
	window.setInterval = function (func, timeout) {
		var newInterval = osetInterval(func, timeout);
		intervals.push(newInterval);
		return newInterval;
	}
	window.clearInterval = function (interval) {
		oclearInterval(interval);
		intervals.splice(intervals.indexOf(interval), intervals.indexOf(interval));
	}
	window.clearAllInterval = function () {
		//intervals.forEach(clearInterval);
		var i;
		for (i = 0; i < intervals.length; i++) {
			clearInterval(intervals[i]);
		}
	}
})(window.setInterval, window.clearInterval)

//jquery function
$.fn.extend({
	setsize: function (w, h) {
		this.find('img').css({
			'max-width': w,
			'max-height': h
		});
	},
	eachtext: function (text, speed) {
		$this = $(this);
		var i = 1;
		var text2;
		window.eachtextcount++;
		var itv = setInterval(function () {
			text2 = text.slice(0, i);
			$this.text(text2);
			if (i == text.length) {
				clearInterval(itv);
			}
			i++;
		}, speed);
	},
	setimg: function (src) {
		this.find('img').attr('src', src);
	}
})

//text
function eachtext(text, speed) {
	var i = 1;
	var text2;
	var itv = setInterval(function () {
		text2 = text.slice(0, i);
		if (i == text.length) {
			clearInterval(itv);
		}
		i++;
	}, speed);
}

//drag
window.ondragstart = function () {
	return false;
}
//overlaps
var overlaps = (function () {
	function getPositions(elem) {
		var pos, width, height;
		pos = $(elem).position();
		width = $(elem).width();
		height = $(elem).height();
		return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
	}

	function comparePositions(p1, p2) {
		var r1, r2;
		r1 = p1[0] < p2[0] ? p1 : p2;
		r2 = p1[0] < p2[0] ? p2 : p1;
		return r1[1] > r2[0] || r1[0] === r2[0];
	}

	return function (a, b) {
		var pos1 = getPositions(a),
			pos2 = getPositions(b);
		return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
	};
})();
//cookie
function cookie(name, value) {
	$.cookie(name, value, {
		expires: window.day
	});
}
//save game
function save(path, value) {
	window.savevar = $.cookie('save');
	eval('savevar' + path + ' = value;');
	cookie('save', savevar);
}
function removeSave(path, value) {
	window.savevar = $.cookie('save');
	eval('delete window.savevar' + path);
	cookie('save', savevar);
}
function reloadSaveVar() {
	window.savevar = $.cookie('save');
}
function deleteAllSave() {
	$.removeCookie('save');
	$.removeCookie('name');
	$.removeCookie('story_animation');
	$.removeCookie('lang');
}
//cursor
function cursor(boolean) {
	if (boolean) {
		$('body').css('cursor', 'default');
	} else if (!boolean) {
		$('body').css('cursor', 'none');
	}
}
//Audio
function playaudio(path, config) {
	var config = config || {};
	var loop = config.loop || false;
	var id = config.id || 'Audio';
	$('body').append('<audio id=\'' + id + '\' src=\'' + path + '\' onended=\'this.remove();\' autoplay ' + (loop ? 'loop' : '') + ' ></audio>');
}
function stopaudio(config) {
	var id = config || false;
	if (id === false) {
		$('audio').remove();
	} else {
		$('audio#' + id).remove();
	}
}
//langtext
function setlangtext() {
	$.get('texts/' + $.cookie('lang') + '.lang', function (data) {
		var i;
		data = data.split('\n');
		window.langtext = {};
		for (i in data) {
			var dataisplit = data[i].split('=');
			if (dataisplit.length > 2) {
				var datasplice = dataisplit.splice(1, dataisplit.length - 1);
				dataisplit[1] = arrstick(datasplice, '=');
			}
			window.langtext[dataisplit[0]] = dataisplit[1] || '';
			if (window.langtext[dataisplit[0]].length == 1) {
				window.langtext[dataisplit[0]] = dataisplit[0];
			}
		}
		langtextinner();
	});
}
function langtextinner() {
	//$(document).attr('title', langtext['system.game.name']);
	$('title, *#title').text(langtext['system.game.name']);
	$('*#startbtn').text(langtext['ui.startbtn']);
	$('*#settingbtn').text(langtext['ui.settingbtn']);
	$('*#backbtn').text(langtext['ui.backbtn']);
	$('*#devmodetext').text(langtext['ui.devmodetext']);
	$('*#choose_name_display').attr('placeholder', langtext['ui.choose_name_placeholder']);
	$('*#choose_name_finishbtn').text(langtext['ui.choose_name_finishbtn']);
	$('*#menu_startbtn').text(langtext['ui.startbtn']);
	$('*#fight_choice_fight').text(langtext['fight.btn.fight']);
	$('*#fight_choice_act').text(langtext['fight.btn.act']);
	$('*#gameovertext').text(langtext['ui.gameover.text']);
}

//page
function changepage(page) {
	if (page == 'back') {
		page = $('.lastpage').attr('id');
	}
	$('.lastpage').removeClass('lastpage');
	$('page.show').addClass('lastpage');
	$('page.show').removeClass('show');
	$('page#' + page).addClass('show');
}

//start
function story_animation() {
	changepage('animation');
	$('#paracelsus, #earth').hide();
	var explode = function () {
		$('#explode_circle_svg').attr('width', $('body').width());
		$('#explode_circle_svg').attr('height', $('body').height());
		var itv1 = setInterval(function () {
			$('#explode_circle').attr('r', Number($('#explode_circle').attr('r')) + 25);
			if ($('#explode_circle').attr('r') >= 1000) {
				clearInterval(itv1);
				$('#explode_circle_svg').fadeOut(2000);
				$('#water, #fire').hide();
				$('#earth').show();
				earth_rotation();
			}
		});
	}
	var water_fire_combine = function () {
		$('#water').css({
			'top': '50%',
			'left': '45%',
			'transform': 'translate(-50%, -50%)'
		});
		$('#fire').css({
			'top': '50%',
			'left': '55%',
			'transform': 'translate(-50%, -50%)'
		});
		$('#water, #fire').show();
		$('#water, #fire').setsize(50, 50);
		var time = 0;
		var time2 = 0;
		var itv = setInterval(function () {
			if (time < 400) {
				$('#fire').css('top', Number($('#fire').css('top').substr(0, $('#fire').css('top').length - 2)) - 0.05);
				$('#water').css('top', Number($('#water').css('top').substr(0, $('#water').css('top').length - 2)) - 0.05);
			}
			if (time >= 400) {
				$('#fire').css('top', Number($('#fire').css('top').substr(0, $('#fire').css('top').length - 2)) + 0.05);
				$('#water').css('top', Number($('#water').css('top').substr(0, $('#water').css('top').length - 2)) + 0.05);
			}
			if (time >= 800) {
				time = 0;
				time2++;
			}
			time++;
			if (time2 == 3) {
				explode();
				clearInterval(itv);
			}
		});
	}
	var earth_rotation = function () {
		var degrees = 0;
		var time = 0;
		var itv1 = setInterval(function () {
			$('#earth').css('transform', 'translate(-50%, -50%) rotate(' + degrees + 'deg)');
			degrees += 0.1;
			time++;
			if (time >= 2000) {
				$('#earth').fadeOut(1000);
			}
			if ($('#earth').css('display') == 'none') {
				clearInterval(itv1);
				cookie('story_animation', true);
				gamestart();
			}
		});
	}
	water_fire_combine();
}
function gamestart() {
	if (typeof $.cookie('save') == 'undefined') {
		newgame();
	} else {
		changepage('menu');
		$('#menu_name_display').text($.cookie('name'));
	}
}
function newgame() {
	changepage('choose_name');
	var finish = function () {
		if ($('#choose_name_display').val().length != 0) {
			cookie('name', $('#choose_name_display').val());
			cookie('save', {});
			save('.player', {
				hp: 20,
				def: 0,
				atk: 1,
				lv: 1
			});
			$(document).off('keydown.choose_name')
			playaudio('audio/aud_cymbal.mp3');
			$('#fadewhite').fadeIn(5000);
			setTimeout(function () {
				playaudio('audio/aud_bumm.mp3');
				$('#fadewhite').hide();
				save('.new', true);
				loadgame();
			}, 5000);
		}
	}
	$('#choose_name_finishbtn').click(finish);
	$(document).on('keydown.choose_name', function () {
		document.getElementById('choose_name_display').addEventListener('select', function () {
			this.selectionStart = this.selectionEnd;
		}, false);
		if (event.which >= 65 && event.which <= 90) {
			if ($('#choose_name_display').val().length < 10) {
				$('#choose_name_display').val($('#choose_name_display').val() + event.key);
			} else if ($('#choose_name_display').val().length == 10) {
				$('#choose_name_display').val($('#choose_name_display').val().substr(0, $('#choose_name_display').val().length - 1) + event.key);
			}
		} else if (event.which == 8) {
			$('#choose_name_display').val($('#choose_name_display').val().substr(0, $('#choose_name_display').val().length - 1));
		} else if (event.which == 13) {
			finish();
		}
	});
}

//load
function loadgame() {
	reloadSaveVar();
	stopaudio();
	if (savevar.new) {
		removeSave('.new');
		save('.sceneid', 'start');
	}
	if (savevar.sceneid == 'start') {
		story.beginning();
	}
	changepage('map');
	checkcollision();
	move();
	cursor(false);
	fighttriger();
	$('sprite#mainchr').setsize(25, 25);
	//$('sprite#pftest').setsize(10, 10);
	$('sprite#slime').setsize(25, 25);
	//pathfinding('mainchr', 'pftest');
	//backgroundscroll();
	changeroom(window.savevar['room'], window.savevar['room_dir']);
	setTimeout(function () {

	}, 2000);
}

//Map
function changeroom(room, direction) {
	stopaudio('roomMusic');
	var direction = direction || 'top';
	$('room.show').removeClass('show');
	$('room#' + room).addClass('show');
	if ($('room#' + room).length == 0) {
		$('sprite, div').hide();
		changeroom('room_error');
	}
	(typeof roomMusic[room] != 'undefined') ? playaudio(roomMusic[room], {
		loop: true,
		id: 'roomMusic'
	}) : null;
	var top = roomPos[room][direction].top;
	var left = roomPos[room][direction].left;
	$('page#map sprite#mainchr').css({
		'top': (top == 50) ? $('body').height() / 2 - $('page#map sprite#mainchr').height() / 2 : top + '%',
		'left': (left == 50) ? $('body').width() / 2 - $('page#map sprite#mainchr').width() / 2 : left + '%'
	});
	// (top == 50) ? $('page#map sprite#mainchr').css('top', $('body').height() / 2 - $('page#map sprite#mainchr').height() / 2) : null;
	// (left == 50) ? $('page#map sprite#mainchr').css('left', $('body').width() / 2 - $('page#map sprite#mainchr').width() / 2) : null;
	save('.room', room);
	save('.room_dir', direction);
	reloadSaveVar();
}
function backgroundscroll() {
	var camerax = 0;
	var screenx = 0;
	var scrollspeed = 0;
	var x = 0;
	/*-----*/
	scrollspeed = 0.25;
	x = 0;
	$('room.show').append($('room.show > img').clone());
	x = $('body').width();
	var imgleft = $('room.show > img').css('left');
	setInterval(function () {
		screenx = Number(imgleft.slice(0, imgleft.length - 2)) + (x - (Number(camerax) * scrollspeed));
		camerax++;
		$('room.show > img').each(function () {
			$(this).css('left', screenx % $('body').width());
		});
	});
}

//Control
function move() {
	clearInterval(window.moveitv);
	var movespeed = 1;
	window.moveitv = setInterval(function () {
		// var playerleft = $('sprite#mainchr').position().left / $('body').width() * 100;
		// var playertop = $('sprite#mainchr').position().top / $('body').height() * 100;
		var playerleft = $('page#map sprite#mainchr').position().left;
		var playertop = $('page#map sprite#mainchr').position().top;
		window.moving = false;
		if (window.keys[16]) {
			// movespeed = 0.2;
			movespeed = 2;
		}
		if (!window.keys[16]) {
			// movespeed = 0.1;
			movespeed = 1;
		}
		if (window.keys[68]) {
			if (!($('page#map sprite#mainchr').position().left >= $('body').width() - $('page#map sprite#mainchr').width())) {
				$('page#map sprite#mainchr').css('left', playerleft + movespeed + '');
				window.moving = true;
			}
		}
		if (window.keys[65]) {
			if (!($('page#map sprite#mainchr').position().left <= 0)) {
				$('page#map sprite#mainchr').css('left', playerleft - movespeed + '');
				window.moving = true;
			}
		}
		if (window.keys[87]) {
			if (!overlaps($('page#map sprite#mainchr')[0], $('.2-1top')[0])) {
				$('page#map sprite#mainchr').css('top', playertop - movespeed + '');
				window.moving = true;
			}
		}
		if (window.keys[83]) {
			if (!overlaps($('page#map sprite#mainchr')[0], $('.2-1bottom')[0])) {
				$('page#map sprite#mainchr').css('top', playertop + movespeed + '');
				window.moving = true;
			}
		}
	});
}
function checkcollision() {
	setInterval(function () {
		/*Check Is Collision Object*/ typeof $('room_object').attr('coll') == 'string';
	});
}

//npc
function pathfinding(id1, id2) {
	//id1 = target
	//id2 = follower
	var sprite = $('#map sprite#' + id1);
	var sprite2 = $('#map sprite#' + id2);
	var left = $('<div id=\'pf_left\' class=\'pathfinding\'>&larr;</div>');
	var right = $('<div id=\'pf_right\' class=\'pathfinding\'>&rarr;</div>');
	var up = $('<div id=\'pf_up\' class=\'pathfinding\'>&uarr;</div>');
	var down = $('<div id=\'pf_down\' class=\'pathfinding\'>&darr;</div>');
	function addpath(addto) {
		right.css({
			'top': addto.position().top,
			'left': addto.position().left - addto.height(),
			'width': addto.height(),
			'height': addto.height(),
			'font-size': addto.height()
		});
		addto.before(right.clone());
		left.css({
			'top': addto.position().top,
			'left': addto.position().left + addto.height(),
			'width': addto.height(),
			'height': addto.height(),
			'font-size': addto.height()
		});
		addto.before(left.clone());
		up.css({
			'top': addto.position().top + addto.width(),
			'left': addto.position().left,
			'width': addto.width(),
			'height': addto.width(),
			'font-size': addto.width()
		});
		addto.before(up.clone());
		down.css({
			'top': addto.position().top - addto.width(),
			'left': addto.position().left,
			'width': addto.width(),
			'height': addto.width(),
			'font-size': addto.width()
		});
		addto.before(down.clone());
		setTimeout(function () {
			var i;
			var pfoverlaps = false;
			for (i = 0; i < 4; i++) {
				var j;
				for (j = 0; j < $('.pathfinding').length; j++) {
					if (overlaps($('.pathfinding')[j], sprite2[0])) {
						pfoverlaps = true;
					}
				}
				if ($('.pathfinding:not(:data(addto))').length > 0 && !pfoverlaps && $('.pathfinding').length <= 0) {
					addpath($('.pathfinding:not(:data(addto))').eq(i));
					$('.pathfinding:not(:data(addto))').eq(i).data('addto', true);
					//$('.pathfinding:not(:data(addto))').eq(1).data('addto', true);
				}
				var k;
				for (k = 0; k < $('.pathfinding').length; k++) {
					if ((overlaps($('.pathfinding')[k], $('.2-1top')[0])) || (overlaps($('.pathfinding')[k], $('.2-1bottom')[0])) || ($('.pathfinding').eq(k).position().left <= 0)) {
						$('.pathfinding').eq(k).remove();
					}
					var l;
					for (l = 0; l < $('.pathfinding').length; l++) {
						if (overlaps($('.pathfinding')[k], $('.pathfinding')[l])) {
							if (k != l) {
								$('.pathfinding').eq(k).remove();
							}
						}
					}
				}
			}
		});
	}
	setInterval(function () {
		//$('.pathfinding.remove').remove();
		if (window.moving) {
			$('.pathfinding').remove();
			addpath(sprite);
		}
	}, 100);
}

//Fight
function updatestatus() {
	$('#hpdisplay').text(langtext['ui.status.hp'].replace('%h', savevar.player.hp));
	$('#lvdisplay').text(langtext['ui.status.lv'].replace('%l', savevar.player.lv));
	$('#atkdisplay').text(langtext['ui.status.atk'].replace('%a', savevar.player.atk));
}
function tofight(config, callback) {
	clearInterval(moveitv);
	callback = callback || function () { };
	$('room.show').addClass('fighthide').fadeOut(1000);
	setTimeout(function () {
		$('room.fighthide').removeClass('show');
	}, 1000);
	reloadSaveVar();
	updatestatus();
	$('#fight_overlay').width($('body').width()).height($('body').height() - 1);
	$('sprite#mainchr').hide();
	$('sprite#fight_enemy').css('opacity', '0');
	$('sprite#fight_enemy').setimg(config[0].imgc);
	$('sprite#fight_enemy').setsize(150, 150);
	$('#fight_overlay').fadeIn(500);
	$('#fight_status').hide();
	$('#fight_box').text('').css({
		height: 0,
		width: 0,
		borderWidth: 0,
		top: '50%'
	});
	var chrData = [
		{
			hp: config[0].hp,
			def: config[0].def
		}
	];
	//Animation
	setTimeout(function () {
		$('#fight_box').animate({
			width: '45%',
			height: '45%',
			borderWidth: 5
		}, 1000).animate({
			top: '70%'
		}, 1000, function () {
			$('sprite#fight_enemy').show().css('opacity', '0');
			$('sprite#fight_enemy').animate({
				opacity: 1
			}, 500);
			$('#fight_choice_container').animate({
				left: '5%'
			}, 1000, function () {
				$('#fight_status').fadeIn(500);
				var text = window.langtext['fight.start.text1'];
				text = text.replace('%c', config[0].name);
				$('#fight_box').html('<div class=\'fightboxtext\'>' + text + '</div>');
				cursor(true);
				var choice_fight_time = 0;
				var presskeytext = 0;
				var nowpresskeytext = 1;
				$('#fight_choice_fight').on('click.fight_choice_fight', function () {
					$('#fight_choice_container').hide();
					choice_fight_time++;
					var vfight_presskey = 0;
					var togglepresskey = true;
					var togglepresskey2 = true;
					$('#fight_box').html('<div class=\'fightboxtext\'>' + window.langtext['fight.presskey'] + '</div>');
					var fight_presskey2 = function () {
						$(document).on('keydown.fight_presskey', function () {
							if (event.key == 'z') {
								vfight_presskey += 1;
								//vfight_presskey += 10;
								presskeytext++;
								$('#fight_presskey_text').append('<div id=\'presskeytext_' + presskeytext + '\' class=\'presskeytext\'>Z</div>');
								setTimeout(function () {
									//$('#presskeytext_' + nowpresskeytext).fadeOut(1000);
									$('#presskeytext_' + nowpresskeytext).animate({
										opacity: 0
									}, 1000, function () {
										$('#fight_presskey_text').animate({
											top: '-=' + $('.presskeytext').height()
										}, 100);
									});
									nowpresskeytext++;
								}, 0);
							}
							$(document).off('keydown.fight_presskey');
							$(document).on('keyup.fight_presskey2', function () {
								if (togglepresskey) {
									fight_presskey2();
								}
								$(document).off('keyup.fight_presskey2');
							});
						});
					};
					var fight_presskey = function () {
						if (togglepresskey2) {
							$('#fight_presskey_text').css('top', '0%');
						}
						fight_presskey2();
						togglepresskey2 = false;
					};
					fight_presskey();
					setTimeout(function () {
						$('.presskeytext').remove();
						togglepresskey = false;
						togglepresskey2 = true;
						var level = savevar.player.lv;
						var attack = savevar.player.atk;
						// var mhp = Math.floor(Math.floor(Math.random() * ((choice_fight_time * level) * attack / (attack / 2)) + vfight_presskey) + ((choice_fight_time * level) * attack / (attack / 2)));
						var mhp = Math.abs(Math.round((attack * level * choice_fight_time * vfight_presskey) / (chrData[0].def / 2.2)));
						chrData[0].hp -= mhp;
						$('#fight_mhp_text').text(mhp);
						$('#fight_enemy').animate({
							left: '55%'
						}, 100).animate({
							left: '45%'
						}, 100).animate({
							left: '50%'
						}, 100);
						$('#fight_mhp_text').animate({
							opacity: 1,
							top: '5%'
						}, 500).animate({
							opacity: 0,
							top: 0
						}, 1000, function () {
							$('#fight_mhp_text').css('top', '10%');
							if (chrData[0].hp <= 0) {
								$('#fight_box').text('Enemy Dead!');
								$('#fight_enemy').animate({
									opacity: 0.5
								}, 750, function () {
									setTimeout(function () {
										$('#fight_overlay').fadeOut(1000);
										$('sprite#mainchr').show();
										$('#fight_choice_fight').off();
										setTimeout(function () {
											$('room.fighthide').addClass('show').removeClass('fighthide').fadeIn(1000);
											callback();
											fighttriger();
										}, 2000);
									}, 500);
								});
							} else {
								cursor(false);
								$('#fight_box').text('');
								$('#fight_choice_container').hide();
								var width = $('#fight_overlay').width() * 0.45;
								var height = $('#fight_overlay').height() * 0.45;
								width < height ? height = width : null;
								height < width ? width = height : null;
								$('#fight_box').animate({
									width: width,
									height: height
								}, 1000, function () {
									$('#fight_box').append($('#fight_mainchr > sprite').clone()).find('sprite').show();
									var fightmoveitv = setInterval(function () {
										// var playerleft = $('sprite#mainchr').position().left / $('body').width() * 100;
										// var playertop = $('sprite#mainchr').position().top / $('body').height() * 100;
										var playerleft = $('#fight_box sprite#mainchr').position().left;
										var playertop = $('#fight_box sprite#mainchr').position().top;
										if (window.keys[16]) {
											// movespeed = 0.2;
											movespeed = 2;
										}
										if (!window.keys[16]) {
											// movespeed = 0.1;
											movespeed = 1;
										}
										if (window.keys[68]) {
											if (!($('#fight_box sprite#mainchr').position().left >= $('#fight_box').width())) {
												$('#fight_box sprite#mainchr').css('left', playerleft + movespeed + '');
											}
										}
										if (window.keys[65]) {
											if (!($('#fight_box sprite#mainchr').position().left <= 0)) {
												$('#fight_box sprite#mainchr').css('left', playerleft - movespeed + '');
											}
										}
										if (window.keys[87]) {
											if (!($('#fight_box sprite#mainchr').position().top <= 0)) {
												$('#fight_box sprite#mainchr').css('top', playertop - movespeed + '');
											}
										}
										if (window.keys[83]) {
											if (!($('#fight_box sprite#mainchr').position().top >= $('#fight_box').height() - $('#fight_box sprite#mainchr').height())) {
												$('#fight_box sprite#mainchr').css('top', playertop + movespeed + '');
											}
										}
									});
									$('sprite#mainchr').setsize(25, 25);
									config[0].attack(function () {
										clearInterval(fightmoveitv);
										$('#fight_box').animate({
											width: '45%',
											height: '45%',
										}, 1000, function () {
											$('#fight_box').html('<div class=\'fightboxtext\'>' + text + '</div>');
											$('#fight_choice_container').show();
											cursor(true);
										});
									});
								});
							}
						});
						$('#fight_choice_container').show();
						$('#fight_box').html('<div class=\'fightboxtext\'>' + text + '</div>');
					}, 5000);
				});
			});
		});
	}, 500);
}
function fighttriger() {
	var random = 0;
	var randommax = 1000;
	var ftitv = setInterval(function () {
		random = Math.floor(Math.random() * randommax) + 1;
		if (random <= 1 && window.moving) {
			randommax += randommax / 2;
			clearInterval(ftitv);
			//tofight([characterData.wrong_lock]);
		}
	});
}
function gameover() {
	hpreload();
	clearAllInterval();
	changepage('gameover');
	$('#fight_overlay').fadeOut(500);
}
function getdamage(damage) {
	if (!window.invincible) {
		reloadSaveVar();
		var mhp = Math.round(damage - (savevar.player.def / 5));
		if (mhp <= 0) {
			mhp = Math.round(damage / (savevar.player.def / 5));
		}
		console.log(mhp);
		save('.player.hp', savevar.player.hp - mhp);
		window.invincible = true;
		var player = $('#fight_box sprite#mainchr');
		var flashanimation = setInterval(function () {
			if (player.css('opacity') == '0') {
				player.css('opacity', '1');
			} else {
				player.css('opacity', '0');
			}
		}, 100);
		setTimeout(function () {
			window.invincible = false;
			clearInterval(flashanimation);
			player.css('opacity', '1');
		}, 1000);
		reloadSaveVar();
		updatestatus();
		playaudio('audio/aud_hurt.mp3');
	}
	if (savevar.player.hp <= 0) {
		gameover();
	}
}
function hpreload() {
	save('.player.hp', 20 * savevar.player.lv);
}

//Story
window.story = function () {
	return 'Nothing Here';
};
window.story.beginning = function () {
	window.story.firstanteing = false;
	changeroom('room_hotcenter', 'middle');
	var itv2 = setInterval(function () {
		if ($('room.show').attr('id') == 'room_antestart') {
			story.firstante();
			clearInterval(itv2);
		}
	});
	setTimeout(function () {
		clearInterval(itv2);
		if ($('room.show').attr('id') == 'room_hotcenter') {
			dialog({
				text: langtext['dialog.beginning.text1'].replace('%n', $.cookie('name').toUpperCase()),
				cantmove: true,
				callback: function () {
					var itv1 = setInterval(function () {
						if ($('room.show').attr('id') == 'room_antestart') {
							story.firstante();
							clearInterval(itv1);
						}
					});
				}
			});
		} else if (!window.story.firstanteing) {
			story.firstante();
		}
	}, 1000);
}
window.story.firstante = function () {
	changeroom('room_antestart', 'bottom');
	window.story.firstanteing = true;
	clearInterval(window.moveitv);
	$('#slime').css({
		top: $('body').height() / 2 - $('#slime').height() / 2,
		left: $('body').width() / 2 - $('#slime').width() / 2
	});
	$('#slime').show();
	var jumptime = 0;
	var maxjumptime = 3;
	function jump() {
		jumptime++;
		$('#slime').animate({
			top: '-=10'
		}, 1000)
		$('#slime').animate({
			top: '+=10'
		}, 500, function () {
			if (jumptime == maxjumptime) {
				$('#slime').animate({
					top: $('#map sprite#mainchr').position().top,
					left: $('#map sprite#mainchr').position().left
				}, 1000, function () {
					tofight([characterData.slime], function () {
						$('#slime').hide();
						setTimeout(function () {
							dialog({
								text: langtext['dialog.firstante.johny.text1'],
								cantmove: true,
								callback: function () {
									var choicecallback = function () {
										dialog({
											text: langtext['dialog.firstante.johny.text3'],
											cantmove: true,
											callback: function () {
												var afterif = function () {
													dialog({
														text: langtext['dialog.firstante.johny.text4'],
														cantmove: true,
														callback: function () {
															dialog({
																text: langtext['dialog.firstante.johny.text5'],
																cantmove: true,
																callback: function () {
																	dialog({
																		text: langtext['dialog.firstante.johny.text6'],
																		cantmove: true,
																		callback: function () {
																			story.secondDayante();
																		}
																	});
																}
															});
														}
													});
												};
												if ($.cookie('lang') == 'en') {
													dialog({
														text: langtext['dialog.firstante.johny.text3b'],
														cantmove: true,
														callback: function () {
															afterif();
														}
													});
												} else {
													afterif();
												}
											}
										});
									};
									dialog({
										text: langtext['dialog.firstante.johny.text2'],
										cantmove: true,
										cantpress: true,
										choice: [
											{
												text: langtext['dialog.firstante.johny.text2.c1'],
												callback: function () {
													choicecallback();
												}
											},
											{
												text: langtext['dialog.firstante.johny.text2.c2'],
												callback: function () {
													dialog({
														text: langtext['dialog.firstante.johny.text2c2'],
														cantmove: true,
														cantpress: true,
														choice: [
															{
																text: langtext['dialog.firstante.johny.text2c2.c1'],
																callback: function () {
																	choicecallback();
																}
															}
														]
													});
												}
											}
										]
									});
								}
							});
						}, 1000);
					});
				});
			}
		});
	}
	jump();
	var itv1 = setInterval(function () {
		if (jumptime == maxjumptime + 1) {
			clearInterval(itv1);
		}
		jump();
	}, 1500);
}
window.story.secondDayante = function () {
	console.log('sd');
}

//Dialog
function dialog(config) {
	var config = config || {};
	var text = config.text || '';
	var timeout = config.timeout || false;
	var callback = config.callback || function () { };
	var cantpress = config.cantpress || false;
	var cantmove = config.cantmove || false;
	var choice = config.choice || false;
	var final = function (callbacka) {
		var callbacka = callbacka || function () { };
		$('.dialog, .dialog_choice').fadeOut(250, function () {
			$(this).remove();
			callbacka();
		});
		callback();
	}
	$('body').append('<div class=\'dialog\'>' + text + '</div>');
	$('.dialog').fadeIn(250);
	(cantmove == true) ? clearInterval(window.moveitv) : null;
	if (cantpress == false) {
		$(document).on('keypress.dialog', function () {
			if (keys[69]) {
				(cantmove == true) ? move() : null;
				$(document).off('keypress.dialog');
				final();
			}
		});
		var dialogitv = setInterval(function () {
			clearInterval(dialogitv);
		});
	};
	if (!!choice) {
		$('body').append('<div id=\'dialog_choice_container\'></div>');
		for (i = 0; i < choice.length; i++) {
			$('#dialog_choice_container').append('<button id=\'dialog_choice' + i + '\' class=\'dialog_choice\' data-dialog_choice=\'' + i + '\'>' + choice[i].text + '</button>');
		}
		$('.dialog_choice').click(function () {
			var id = $(this).data('dialog_choice');
			$('.dialog_choice').off();
			final(choice[id].callback);
		});
	}
	(timeout == false) ? null : setTimeout(function () {
		(cantmove == true) ? move() : null;
		final();
	}, timeout);
}

//Player
function getplayerpos(dontlog) {
	var top = Math.floor($('page sprite#mainchr').position().top / $('body').height() * 100);
	var left = Math.floor($('page sprite#mainchr').position().left / $('body').width() * 100);
	if (!dontlog) {
		console.log('top(%): ' + top + '%');
		console.log('left(%): ' + left + '%');
	}
	return {
		top: top / 100,
		left: left / 100
	};
}



function getmoveangle(speed, angle) {
	var x = speed * Math.cos(angle * Math.PI / 180);
	var y = speed * Math.sin(angle * Math.PI / 180);
	return {
		x: x,
		y: y
	};
}
function getRotateAngle() {
	var matrix = $('page #mainchr').css('transform');
	var values = matrix.split('(')[1].split(')')[0].split(',');
	var a = values[0];
	var b = values[1];
	var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
	return angle;
}
$(function () {
	//Basic
	//  monitorsize
	//$(document).width() < 720 ? window.close() : undefined;
	//  variable
	window.keys = {};
	//  2:1
	setTimeout(function () {
		if ($('body').width()) { }
		$('body').width($('body').width()).height($('body').width() / 2).css({
			top: '50%',
			transform: 'translate(0%, -50%)',
			position: 'absolute'
		});
		$('body').append('<div class=\'2-1top\'></div><div class=\'2-1bottom\'></div>');
		$('.2-1top').width($(document).width()).height($('body').position().top - 1).css({
			position: 'absolute',
			top: -$('body').position().top,
			background: 'black',
			'z-index': 102,
			cursor: 'none'
		});
		$('.2-1bottom').width($(document).width()).height($('body').position().top - 1).css({
			position: 'absolute',
			bottom: -$('body').position().top,
			background: 'black',
			'z-index': 102,
			cursor: 'none'
		});
	});
	//  cookie
	$.cookie.json = true;
	window.day = 3652;
	if (typeof $.cookie('lang') == 'undefined') {
		cookie('lang', 'en');
	}
	$('#lang').val($.cookie('lang'));
	setlangtext();
	$('page#home').addClass('show');
	//  room
	//      roomspawnpositon
	window.roomPos = {
		'room_hotcenter': {
			'top': {
				'top': 20,
				'left': 50
			},
			'middle': {
				'top': 50,
				'left': 50
			}
		},
		'room_antestart': {
			'bottom': {
				'top': 85,
				'left': 50
			}
		}
	};
	//      roomchangetrigger
	setInterval(function () {
		var posPer = {
			x: $('#mainchr').position().left / $('body').width() * 100,
			y: $('#mainchr').position().top / $('body').height() * 100
		};
		window.roomChangeTri = {
			'room_hotcenter': [{
				'top': 25,
				'left': 50
			}]
		};
		window.roomChangeTri2 = [
			{
				b: function (i) {
					var ia = [
						(roomChangeTri.room_hotcenter[i].top + 13 >= posPer.y && roomChangeTri.room_hotcenter[i].top - 13 <= posPer.y) && (roomChangeTri.room_hotcenter[i].left + 13 >= posPer.x && roomChangeTri.room_hotcenter[i].left - 13 <= posPer.x)
					];
					return ia[i];
				},
				r: ['room_antestart'],
				d: ['bottom'],
				a: 'room_hotcenter'
			}
		]
		var i;
		for (i in roomChangeTri2) {
			var j;
			for (j in roomChangeTri[roomChangeTri2[i].a]) {
				if (roomChangeTri2[i].b(j)) {
					if ($('room.show').attr('id') == roomChangeTri2[i].a) {
						changeroom(roomChangeTri2[i].r[j], roomChangeTri2[i].d[j]);
					}
				}
			}
		}
	});
	//		roombgm
	window.roomMusic = {
		'room_hotcenter': 'audio/mus_hotcenter.mp3'
	};
	//      roomcollision
	//      roomsize
	setTimeout(function () {
		$('room').setsize($('body').width(), $('body').height());
		$('room > img').addClass('center');
	});
	//      Character Data
	setTimeout(function () {
		window.characterData = {
			'wrong_lock': {
				name: langtext['chr.wrong_lock.name'],
				hp: 75,
				imgbw: 'sprites/wrong_lock - White & Black.png',
				imgc: 'sprites/wrong_lock - Color.png',
				attack: function (callback) {
					var wronglockkeyatk = 0;
					var summonatk = setInterval(function () {
						//KeyAttack
						$('#fight_box').append('<div id=\'wronglockkeyatk_' + wronglockkeyatk + '\' class=\'fight_attack wronglockkeyatk\'><img src=\'sprites/mainchr.png\'></div>');
						$('.wronglockkeyatk').setsize(25, 25);
						var random = (Math.floor(Math.random() * 100) + 0);
						$('#wronglockkeyatk_' + wronglockkeyatk).css('top', random + '%');
						wronglockkeyatk++;
					}, 250);
					var atkmove = setInterval(function () {
						$('.wronglockkeyatk').each(function () {
							$(this).css('left', $(this).position().left + 1 + 'px');
							if ($(this).position().left >= $('#fight_box').width()) {
								$(this).remove();
							};
						});
					});
					var attackoverlaps = setInterval(function () {
						var i;
						for (i = 0; i < $('.wronglockkeyatk').length; i++) {
							if (overlaps($('#fight_box sprite#mainchr')[0], $('.wronglockkeyatk')[i])) {
								getdamage(3);
								// getdamage(10);
								$('.wronglockkeyatk').eq(i).remove();
							}
						}
					});
					setTimeout(function () {
						clearInterval(summonatk);
						clearInterval(atkmove);
						clearInterval(attackoverlaps);
						$('#fight_box').text('');
						callback();
					}, 5000);
				}
			},
			'slime': {
				name: langtext['chr.slime.name'],
				hp: 10,
				def: 20,
				imgbw: 'sprites/mainchr.png',
				imgc: 'sprites/mainchr.png',
				attack: function (callback) {
					callback();
				}
			},
			'dummy': {
				name: langtext['chr.dummy.name'],
				hp: 5,
				def: 37.5,
				imgbw: 'sprites/mainchr.png',
				imgc: 'sprites/mainchr.png',
				attack: function (callback) {
					$('#fight_box').text('...');
					setTimeout(function () {
						callback();
					}, 2500);
				}
			}
		};
	}, 500);
	//      eachtext
	window.eachtextcount = 0;
	//      HomePageMusic
	playaudio('audio/mus_homepage2.mp3', {
		loop: true,
		id: 'homepage'
	});

	//Fight
	setTimeout(function () {
		//tofight([characterData.wrong_lock]);
	}, 1000);

	//Button
	$('*#startbtn').click(function () {
		if (!$.cookie('story_animation')) {
			story_animation();
		} else {
			gamestart();
		}
	});
	$('*#settingbtn').click(function () {
		changepage('setting');
	});
	$('*#backbtn').click(function () {
		changepage('back');
	});
	$('#menu_startbtn').click(function () {
		loadgame();
	});
	//Select
	$('#lang').change(function () {
		cookie('lang', $('#lang').val());
		window.location.reload();
		//setlangtext();
	});
	//EventListener
	$(document).keydown(function () {
		if (event.key == 'Alt' && !devmode) {
			event.preventDefault();
		}
		if (event.key == 'F11' && !devmode) {
			event.preventDefault();
		}
		if (event.which == 82 && !devmode) {
			event.preventDefault();
		}
		if (event.which == 87) {
			event.preventDefault();
		}
		window.keys[event.which] = true;
	});
	$(document).keyup(function () {
		delete window.keys[event.which];
	});
	$(document).blur(function () {
		window.keys = {};
	});
	if (!devmode) {
		$('#devmodetextcontainer').hide();
	}
});
