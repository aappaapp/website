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

window.alerti = 0;
window.keys = {};
$('.signinbtn').click(login);
$('.signupbtn').click(signup);
$(document).contextmenu(function () {
    event.preventDefault();
});
$(document).keydown(function () {
    if (event.which == 13) {
        login();
    }
});
if ($.cookie('login')) {
    window.location.replace('./game.html');
}
function signup() {
    email = $('input.email').val();
    password = $('input.password').val();
    $('.signupbtn').addClass('disable');
    console.log('sd');
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
            // ...
            $('.signupbtn').removeClass('disable');
            login();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            $('.signupbtn').removeClass('disable');
            console.log(errorMessage);
            speak(errorMessage, '', 100, function () { });
            // ..
        });
}
function login() {
    email = $('input.email').val();
    password = $('input.password').val();
    $('.signinbtn').addClass('disable');
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
            // ...
            $('.signinbtn').removeClass('disable');
            $.cookie('login', true);
            $.cookie('uid', firebase.auth().currentUser.uid);
            window.location.replace('./game.html');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            $('.signinbtn').removeClass('disable');
            console.log(errorMessage);
            console.log(errorCode);
            speak(errorMessage, '', 100, function () { });
            if (errorCode == 'auth/user-not-found') {
                ask = confirm('Can\'t find your account, do you want to sign up?');
                if (ask == true) {
                    signup();
                }
            }
            // ..
        });
}
function speak(text, icon, speed, callback, element) {
    if (element == '' || element == undefined) {
        $('body').append('<div class=\'speakcontainer speakcontainer' + window.speaki + '\'><img src=' + icon + '><div class=\'speak speak' + window.speaki + '\'></div></div>');
    } else if (element == '.fightbox') {
        $(element).html('<div class=\'fightspeak speak' + window.speaki + '\'></div>');
    }
    $('.speak' + window.speaki).each(function () {
        if (icon == '') {
            //$('.speakcontainer img').replaceWith('<div>*</div>');
        }
        if (!window.speakwait) {
            speakeach(this, '*' + text, speed, window.speaki, callback);
        }
    });
    window.speaki++;
}
function speakeach(element, text, speed, speaki, callback) {
    window.speakwait = true;
    var ths = element;
    var i = 0;
    window.speakspeed = speed;
    //text = text.split('\\w');
    $(ths).parent().css('display', 'block');
    //if (Array.isArray(text)) { } else {
    var itv = setInterval(function () {
        $('.body3').keydown(function () {
            if (notconfirmkeypress()) {
                i = text.length - 1;
                $(ths).html(text.substr(0, text.length - 1));
            }
        });
        $(ths).html($(ths).html() + text[i]);
        console.log($(ths).html())
        i++;
        if (text[i] == undefined) {
            clearInterval(itv);
            $('.body3').off('keydown');
            $('.body1').keydown(function () {
                if (event.which == 90 || event.which == 13) {
                    if ($(ths).hasClass('fightspeak')) {
                        $(ths).remove();
                    } else {
                        $(ths).parent().remove();
                    }
                    window.speakwait = false;
                    callback();
                    $('.body1').off('keydown');
                }
            });
        }
    }, window.speakspeed);
    //}
}
