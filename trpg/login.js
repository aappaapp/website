$(function () {
    setTimeout(function () {
        if ($.cookie('login') == 'true') {
            closewindow($('.signinbtn'));
        }
    }, 500);
});
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
            closewindow($('.signinbtn'));
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            $('.signinbtn').removeClass('disable');
            console.log(errorMessage);
            console.log(errorCode);
            alert(errorMessage);
            if (errorCode == 'auth/user-not-found') {
                ask = confirm('Can\'t find your account, do you want to sign up?');
                if (ask == true) {
                    signup();
                }
            }
            // ..
        });
}
