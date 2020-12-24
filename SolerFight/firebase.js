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
