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
window.currentq = 1;
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
firebase.database().ref('quiz/question/' + window.currentq + '/select').on('value', (snapshot) => {
    const data = snapshot.val();
    window.select = data;
    setTimeout(function () {
        $('.option button:not(.' + String.fromCharCode(96 + data) + ')').prop('disabled', true);
        $('.' + String.fromCharCode(96 + data)).addClass('select');
    }, 1000);
});
firebase.database().ref('quiz/question/' + window.currentq + '/showans').on('value', (snapshot) => {
    const data = snapshot.val();
    setTimeout(function () {
        if (data) {
            const data1 = snapshot.val();
            for (i = 0; i < data1.length; i++) {
                console.log(i, data1[i]);
                firebase.database().ref('quiz/question/' + window.currentq + '/select').once('value').then((snapshot) => {
                    console.log(i, data1[i]);
                    const data2 = snapshot.val();
                    $('.' + String.fromCharCode(96 + data1[i])).addClass('trueans').prop('disabled', false);
                    console.log(i, data1[i], data2);
                    if (data1[i] == window.select) {
                        $('.select').addClass('nochange').prop('disabled', false);
                    } else if (!$('.select').hasClass('nochange')) {
                        $('.select').addClass('wrongans').prop('disabled', false);
                    }
                });
                console.log('sd');
            }
        } else {
            $('.option button').removeClass('trueans').removeClass('wrongans');
            $('.option button:not(.select)').prop('disabled', true);
        }
    }, 1000);
});
function changeq() {
    firebase.database().ref('quiz').once('value').then((snapshot) => {
        var title = (snapshot.val() && snapshot.val().question[window.currentq].title) || 'Anonymous';
        $('.question').text('Q' + window.currentq + ': ' + title);
        var option = (snapshot.val() && snapshot.val().question[window.currentq].option) || 'Anonymous';
        $('.option').text('');
        for (i = 1; i < Object.keys(option).length + 1; i++) {
            letter = String.fromCharCode(96 + i);
            $('.option').append('<button class=\'' + letter + '\'>' + letter.toUpperCase() + '.' + option[i] + '</button>');
        }
        $('.option button').click(function () {
            select = $(this).attr('class').charCodeAt(0) - 97 + 1;
            trueans = ((snapshot.val() && snapshot.val().question[window.currentq].true) || 'Anonymous');
            $('.option button:not(.' + $(this).attr('class') + ')').prop('disabled', true);
            $(this).addClass('select');
            firebase.database().ref('quiz/question/' + window.currentq + '/select').set(select);
            for (i = 0; i < trueans.length; i++) {
                console.log(trueans);
                if (select == trueans[i]) {
                } else if (i == trueans.length - 1) {
                    console.log('wrong');
                }
            }
            console.log(select);
        });
        // ...
    });
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
    $('.openconbtn').click(function () {
        window.open('https://console.firebase.google.com/project/webdb200101/database/webdb200101/data/~2Fquiz');
    });
    $('.stopbtn').click(function () {
        firebase.database().ref('quiz/start').set(false);
    });
    $('.ansbtn').click(function () {
        firebase.database().ref('quiz/question/' + window.currentq + '/true').once('value').then((snapshot) => {
            const data = (snapshot.val()) || 'Anonymous';
            alert(data);
        });
    });
    $('.showansbtn').click(function () {
        firebase.database().ref('quiz/question/' + window.currentq + '/showans').set(true);
    });
    $('.hideansbtn').click(function () {
        firebase.database().ref('quiz/question/' + window.currentq + '/showans').set(false);
    });
});
