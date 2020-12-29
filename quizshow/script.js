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
window.input = true;
firebase.database().ref('quiz/start').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data == true) {
        $('.title').hide();
        $('.gamearea').show();
        changeq();
    } else {
        $('.title').show();
        $('.gamearea').hide();
    }
});
firebase.database().ref('quiz/currentq').on('value', (snapshot) => {
    const data = snapshot.val();
    window.currentq = data;
    changeq();
});
firebase.database().ref('quiz/question').on('value', (snapshot) => {
    const data = snapshot.val();
    refreshchange();
});
function changeq() {
    firebase.database().ref('quiz').once('value').then((snapshot) => {
        var data = (snapshot.val() && snapshot.val().question[window.currentq].title) || 'Anonymous';
        $('.question').text('Q' + window.currentq + ': ' + data);
        // ...
    });
}
function refreshchange() {
    firebase.database().ref('quiz').once('value').then((snapshot) => {
        window.question = (snapshot.val() && snapshot.val().question) || 'Anonymous';
        // ...
    });
    $('.change').html('');
    for (i = 0; i < Object.keys(window.question).length + 1; i++) {
        console.log(i < Object.keys(window.question).length, i, window.question[i] == undefined);
        if (!(window.question[i] == undefined)) {
            //i--;
            console.log(Object.keys(window.question)[i - 1]);
            $('.change').append('<div class=\'' + Object.keys(window.question)[i - 1] + '\'>' + Object.keys(window.question)[i - 1] + ': {title: <input type=\'text\' value=\'' + window.question[i].title + '\' class=\'title ' + Object.keys(window.question)[i - 1] + '\'>}<input type=\'button\' value=\'delete\' class=\'deletebtn ' + Object.keys(window.question)[i - 1] + '\'><input type=\'button\' value=\'Add\' class=\'addbtn\'>');
        }
    }
}
$(function () {
    $(document).keypress(function () {
        if (event.key == 'q' && window.input) {
            console.log('sd');
            window.location.replace('./presided.html');
        }
        if (event.key == 'w' && window.input) {
            window.location.replace('./index.html');
        }
    });
    $('.startbtn').click(function () {
        firebase.database().ref('quiz/start').set(true);
        firebase.database().ref('quiz/currentq').set(1);
    });
    $('.stopbtn').click(function () {
        firebase.database().ref('quiz/start').set(false);
    });
    $('.changebtn').click(function () {
        setTimeout(function () {
            refreshchange();
            $('.deletebtn').click(function () {
                console.log('quiz/question/' + $(this).attr('class').replace('deletebtn', '').trim());
                firebase.database().ref('quiz/question/' + $(this).attr('class').replace('deletebtn', '').trim()).remove();
            });
            $('.addbtn').click(function () {
                window.question[Object.keys(window.question).length + 1] = { '': '' };
                refreshchange();
            });
        }, 500);
    });
    $('.savebtn').click(function () {
        for (i = 1; i < Object.keys(window.question).length + 1; i++) {
            console.log(Object.keys(window.question)[i - 1]);
            firebase.database().ref('quiz/question/' + Object.keys(window.question)[i] + '/title').set($('.title.' + Object.keys(window.question)[i - 1]).val());
            if (i == Object.keys(window.question).length) {
                window.location.reload();
            }
        }
    });
    $('input').focus(function () {
        window.input = false;
    });
    $('input').blur(function () {
        window.input = true;
    });
});
