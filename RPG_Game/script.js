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
	$('body').append('<audio src=\'' + path + '\' onended=\'this.remove();\' autoplay ' + (loop ? 'loop' : '') + ' ></audio>');
}
function stopaudio() {
	$('audio').remove();
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
			window.langtext[dataisplit[0]] = dataisplit[1] || window.langtext[dataisplit[0]] || '';
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
				atk: 0,
				lv: 1
			});
			$(document).off('keydown.choose_name')
			playaudio('audio/cymbal.mp3');
			$('#fadewhite').fadeIn(5000);
			setTimeout(function () {
				playaudio('audio/bumbum.mp3');
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
	changeroom(window.savevar['room'], window.savevar['room_dir']);
	fighttriger();
	$('sprite#mainchr').setsize(25, 25);
	//$('sprite#pftest').setsize(10, 10);
	$('sprite#slime').setsize(25, 25);
	//pathfinding('mainchr', 'pftest');
	//backgroundscroll();
	setTimeout(function () {

	}, 2000);
}

//Map
function changeroom(room, direction) {
	var direction = direction || 'top';
	$('room.show').removeClass('show');
	$('room#' + room).addClass('show');
	if ($('room#' + room).length == 0) {
		$('sprite, div').hide();
		changeroom('room_error');
	}
	var top = roomPos[room][direction].top;
	var left = roomPos[room][direction].left;
	$('page#map sprite#mainchr').css({
		'top': top + '%',
		'left': left + '%'
	});
	(top == 50) ? $('page#map sprite#mainchr').css('top', $('body').height() / 2 - $('page#map sprite#mainchr').height() / 2) : null;
	(left == 50) ? $('page#map sprite#mainchr').css('left', $('body').width() / 2 - $('page#map sprite#mainchr').width() / 2) : null;
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
}
function tofight(config, callback) {
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
			hp: config[0].hp
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
						var mhp = Math.floor(Math.floor(Math.random() * vfight_presskey) + (vfight_presskey + (Math.floor(Math.random() * (choice_fight_time + 1)) + (choice_fight_time + level * 2))));
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
										$('#fight_choice_container').show();
										$('#fight_box').animate({
											width: '45%',
											height: '45%',
										}, 1000, function () {
											$('#fight_box').html('<div class=\'fightboxtext\'>' + text + '</div>');
										});
										cursor(true);
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
	clearAllInterval();
	changepage('gameover');
	$('#fight_overlay').fadeOut(500);
}
function getdamage(damage) {
	if (!window.invincible) {
		reloadSaveVar();
		save('.player.hp', savevar.player.hp - (damage - savevar.player.def));
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
		save('.player.hp', 20);
	}
}

//Story
window.story = function () {
	return 'Nothing Here';
};
window.story.beginning = function () {
	changeroom('room_hotcenter');
	setTimeout(function () {
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
		} else {
			story.firstante();
		}
	}, 1000);
}
window.story.firstante = function () {
	setTimeout(function () {
		var timeout, dis;
		var itv1 = function () {
			$('#slime').animate({
				top: $('#map sprite#mainchr').position().top,
				left: $('#map sprite#mainchr').position().left
			});
			dis = ($('#map sprite#mainchr').position().left - $('#slime').position().left) * ($('#map sprite#mainchr').position().top - $('#slime').position().top) / 2 - (($('#map sprite#mainchr').position().top - $('#slime').position().top) + ($('#map sprite#mainchr').position().left - $('#slime').position().left));
			dis = Math.abs(dis);
			timeout = dis;
			timeout = (timeout >= 100) ? 100 : timeout;
			timeout = (dis > timeout) ? 100 : timeout;
			timeout = (dis <= timeout) ? 1000 : timeout;
			console.log(dis, timeout);
			setTimeout(function () {
				$('#slime').stop();
				if (!overlaps($('#slime')[0], $('#map sprite#mainchr')[0])) {
					itv1();
				} else {
					tofight([characterData.slime], function () {
						$('#slime').hide();
					});
				}
			}, timeout);
		};
		itv1();
	}, 1000);
}

//Dialog
function dialog(config) {
	var config = config || {};
	var text = config.text || '';
	var timeout = config.timeout || false;
	var callback = config.callback || function () { };
	var cantpress = config.cantpress || false;
	var cantmove = config.cantmove || false;
	var final = function () {
		$('.dialog').fadeOut(250, function () {
			$(this).remove();
		});
		callback();
	}
	$('body').append('<div class=\'dialog\'>' + text + '</div>');
	$('.dialog').fadeIn(250);
	(cantmove == true) ? clearInterval(window.moveitv) : null;
	if (cantpress == false) {
		var dialogitv = setInterval(function () {
			if (keys[69]) {
				move();
				final();
				clearInterval(dialogitv);
			}
		});
	} else {
		clearInterval(dialogitv);
	};
	(timeout == false) ? null : setTimeout(function () {
		move();
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
				'top': 0,
				'left': 0
			},
			'left': {
				'top': 77,
				'left': 1
			},
			'right': {
				'top': 77,
				'left': 93
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
				imgbw: 'sprites/mainchr.png',
				imgc: 'sprites/mainchr.png'
			}
		};
	}, 500);
	//      eachtext
	window.eachtextcount = 0;
	//      HomePageMusic
	// playaudio('audio/mus_homepage.mp3', {
	//     loop: true
	// });

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
		setlangtext();
	});
	//EventListener
	$(document).keydown(function () {
		if (event.key == 'Alt' && !devmode) {
			event.preventDefault();
		}
		if (event.key == 'F11' && !devmode) {
			event.preventDefault();
		}
		if (event.which == 73 && !devmode) {
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
