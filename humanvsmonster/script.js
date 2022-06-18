// TODO: Replace the following with your app's Firebase project configuration


// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
	apiKey: "AIzaSyCFhgKQiV_9q5dViKHLAslf4e1FJuN6qvk",
	authDomain: "adenpun-2000.firebaseapp.com",
	databaseURL: "https://adenpun-2000-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "adenpun-2000",
	storageBucket: "adenpun-2000.appspot.com",
	messagingSenderId: "336986061967",
	appId: "1:336986061967:web:a5e17b0ebc6c3cda4404fa",
	measurementId: "G-G8FC08N334"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var uid = $.cookie('uid');
function writeUserData(data, ref) {
	firebase.database().ref('game2/users/' + uid + '/' + ref).set({
		data: data
	});
}
function readUserData(value) {
	firebase.database().ref('game2/users/' + uid).once('value').then(function (snapshot) {
		eval('window.data[\'' + value + '\'] = (snapshot.val() && snapshot.val().' + value + ') || undefined;');
		// ...
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
//set all variable on init
function setvariable() {
	window.keys = {};
	window.speakwaititem = {};
	window.speakwait = false;
	window.speaki = 0;
	window.data = {};
	window.weapon = {};
	window.deviceType = getDeviceType();
	window.bulleti = 0;
	window.img = {};
	window.img.name = [];
	window.img.src = [];
	$.cookie.json = true;
	console.log('dev: ' + window.dev);
	readUserData('fight');
	/*if ($.cookie('login') != true) {
		alert(window.dialog1['error.unlogin']);
		window.location.href = 'index.html';
	}*/
	if ($.cookie('entity') != null) {
		window.entity = JSON.parse($.cookie('entity'));
	} else if ($.cookie('item') != null) {
		window.item = JSON.parse($.cookie('item'));
	} else if ($.cookie('block') != null) {
		window.item = JSON.parse($.cookie('block'));
	}
}

//string contains
function contains(target, pattern) {
	var value = 0;
	pattern.forEach(function (word) {
		value = value + target.includes(word);
	});
	return (value === 1)
}

//interval
function interval() {
	onetime = true;
	onetime2 = true;
	setInterval(function () {
		detectroom();
	});
	setInterval(function () {
		if (window.mode == 'story') {
			writeUserData({
				'name': window.name
			}, 'story');
		} else if (window.mode == 'fight') {

		}
	}, 5000);
}

//window
window.ondragstart = function () {
	return false;
}

//document
$(document).ready(function () {
	readfile();
	setTimeout(function () {
		setvariable();
		setTimeout(function () {
			cornertips(window.dialog1['warning.computerperformance'], 5000, function () {
				cornertips(window.dialog1['tips.fullscreen'], 5000);
			});
			setTimeout(function () {
				setskin();
				interval();
				inner();
			}, 500);
		}, 500);
	}, 500)
	ap43();
	//$(document).tooltip();
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
			$('.homepage .mode .container').show();
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
			var int1 = setInterval(function () {
				if ($('.homepage .mode .container').css('bottom') == '-100px') {
					$('.homepage .mode .container').css('display', 'none');
					clearInterval(int1)
				}
			});
		}
	});
	$('.homepage .mode .container .fightmodebtn').click(function () {
		$('.homepage').hide();
		$('.gamearea').show();
		fight();
		window.mode = 'fight';
	});
	$('.homepage .mode .container .storymodebtn').click(function () {
		$('.homepage').css('display', 'none');
		$('.gamearea').show();
		$('.storymode').show();
		window.mode = 'story';
		story();
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
	$(document).keydown(function () {
		if (event.which == 18) {
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
