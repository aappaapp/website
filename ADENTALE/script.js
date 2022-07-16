//game.js function
$().vari({
	santa: {
		hp: 100,
		damage: 1
	},
	trap: {
		damage: 10
	},
	maincharator: {
		hp: 100
	}
});
$('#HomePage').toUI('homepage');
$('#start-btn').toUI('startbtn');
$('#gamearea').toUI('gamearea');
$('#pause-btn').toUI('pausebtn');
$('#pause-page').toUI('pausepage');
$('#continue-btn').toUI('continuebtn');
$('#exit-btn').toUI('exitbtn');
$('.fight-page').toUI('fightpage');
$('#save-btn').toUI('savebtn');
$('#sprite').toSprite('sprite');
$('#sprite').toSprite('control', {
	xspeed: 10,
	yspeed: 10
});
$('#sprite').teleport('%', 50, 50);
$('#santa').toSprite('enemy', 'santa');
$('#santa').teleport('%', 50, 30);
$('#fight-line').toSprite('sprite');

//my custom script with jquery
var uid = $().getCookie('uid');
var plot = JSON.parse($().getCookie('plot'));
$.fn.set = function (ref, data1) {
	firebase.database().ref('/users/' + uid).set({
		data: data1
	});
}
$.fn.read = function () {
	return firebase.database().ref('/users/' + uid).once('value').then(function (snapshot) {
		var data = (snapshot.val() && snapshot.val().data) || 'Anonymous';
		window.readData = data;
		$().setCookie('data', JSON.stringify(data), 0.5)
		// ...
	});
}
$.fn.intoFight = function (config) {
	$('.fighpage').css('display', 'block')
	$('.enemy').css('display', 'none');
	$('.control').css('z-index', '1');
	$('.control').css({ 'top': '50%', 'left': '50%' });
	$('.pausbtn').css('display', 'none');
	console.log('asd');
	if (config.name == 'santa') {
		if (config.other.seeTime == 'first') {
			$('#fightarea').css('width', '500px');
			$('#sprite').css('display', 'none')
			$('#btn').css('display', 'none')
			$('#fightarea').append('<div class=dialog>' + plot.dialog.santa.hello.text + '</div>');
		}
	}

}
if ($().getDeviceType() == 'mobile') {
	console.log($().getDeviceType())
	$('#HomePage h1').text('You can\'t play Adentale in mobile now')
	$('#HomePage input').css('display', 'none')
}
$('#mercy-btn').click(function () {
	$('#mercy-alert').css('display', 'block');
});
$('#mercy-alert #cancel-btn').click(function () {
	$('#mercy-alert').css('display', 'none');
});
$('#fight-btn').click(function () {
	window.startfight = true;
	$('#fight-line').css('left', '0');
	$('#fightarea').css('width', '500px');
	$('#sprite').css('display', 'none');
	$('#fightbar').css('display', 'flex');
	$('#btn').css('display', 'none');
	$('#fight-btn').blur();
	setTimeout(function () {
		$('#fight-line').css('display', 'block');
		window.repeatofightline = setInterval(function () { $('#fight-line').teleport('move', 2.5, 0); }, 0.1);
	}, 1000)
});
$(window).keydown(function () {
	if (event.which == 32) {
		clearInterval(window.repeatofightline)
		if (window.startfight == true) {
			if ($().overlap($('#fight-line'), $('#green-bar'))) {

			} else {

			}
		}
		$('#fightarea').css('width', '200px');
		$('#fightbar').css('display', 'none');
		$('#btn').css('display', 'block');
		$('#fight-line').css('display', 'none');
		window.startfight = false;
	}
	if (window.start && window.fighting != true) {
		if ($().overlap($('.control'), $('.enemy'))) {
			var overlap = window.overlap;
			window.fighting = true;
			if (overlap.includes('santa')) {
				$().intoFight({
					name: 'santa',
					other: {
						seeTime: 'first'
					}
				});
			}
		}
	}
});

//my custom script with function
window.startfight = false;
var firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
	measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
// Get a reference to the database service
var database = firebase.database();
var userId = window.uid;
function writeUserData(userId, name, email, imageUrl) {
	firebase.database().ref('users/' + userId).set({
		username: name,
		email: email,
		profile_picture: imageUrl
	});
}
