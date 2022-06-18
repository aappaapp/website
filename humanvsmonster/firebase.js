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
console.log('nea');
if (navigator.onLine) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
} else {
    console.log('ne');
    networkerror();
}
$('.signinbtn').click(login);
$('.signupbtn').click(signup);
$(function () {
    replace();
});
$(document).contextmenu(function () {
    event.preventDefault();
});
$(document).keydown(function () {
    if (event.which == 13) {
        login();
    }
});
function replace() {
    if ($.cookie('login') === 'true') {
        window.location.replace('./game.html');
    }
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
            if (errorCode == 'auth/network-request-failed') {
                networkerror();
                return;
            }
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
            if (errorCode == 'auth/network-request-failed') {
                networkerror();
                return;
            }
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
function networkerror() {
    if (confirm('Your network is error. Do you want to use the guest account to login?(tips: guest account won\'t save your data.)')) {
        $.cookie('login', true);
        replace();
    }
}
