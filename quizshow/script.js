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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
window.input = true;
window.currentq = 1;
firebase.database().ref('quiz/start').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        $('.title').hide();
        $('.gamearea').show();
        changeq();
        showans();
    } else {
        $('.title').show();
        $('.gamearea').hide();
    }
});
firebase.database().ref('quiz/currentq').on('value', (snapshot) => {
    const data = snapshot.val();
    window.currentq = data;
    changeq();
    showans();
});
firebase.database().ref('quiz/question/' + window.currentq + '/select').on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(snapshot);
    window.select = data;
    setTimeout(function () {
        if ($('.select').length) {
            $('.option button').prop('disabled', true);
        }
        $('.' + String.fromCharCode(96 + data)).addClass('select').css('color', 'black');
    }, 1000);
});
function showans() {
    console.log(window.currentq);
    firebase.database().ref('quiz/question/' + window.currentq + '/showans').on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setTimeout(function () {
            if (data) {
                console.log(window.trueans)
                i = 0;
                firebase.database().ref('quiz/question/' + window.currentq + '/select').once('value').then((snapshot) => {
                    itv = setInterval(function () {
                        if (i < window.trueans.length) {
                            $('.' + String.fromCharCode(96 + window.trueans[i])).addClass('trueans nochange').css('color', 'white');
                            console.log(!$('.select').hasClass('nochange'));
                            i++;
                        }
                        if (i == window.trueans.length) {
                            if (!$('.select').hasClass('nochange')) {
                                $('.select').addClass('wrongans').css('color', 'white');
                            }
                            clearInterval(itv);
                        }
                    }, 1000);
                });
            } else {
                $('.option .trueans, .option .wrongans').css('color', '');
                $('.option .select').css('color', 'black');
                $('.option button').removeClass('trueans wrongans');
                if ($('.select').length) {
                    $('.option button').prop('disabled', true);
                }
            }
        }, 1000);
    });
}
function changeq() {
    firebase.database().ref('quiz').once('value').then((snapshot) => {
        console.log('sd');
        var title = (snapshot.val() && snapshot.val().question[window.currentq].title) || 'Anonymous';
        $('.question').text('Q' + window.currentq + ': ' + title);
        var option = (snapshot.val() && snapshot.val().question[window.currentq].option) || 'Anonymous';
        $('.option').text('');
        for (i = 1; i < Object.keys(option).length + 1; i++) {
            letter = String.fromCharCode(96 + i);
            $('.option').append('<button class=\'' + letter + '\'>' + letter.toUpperCase() + '.' + option[i] + '</button>');
        }
        window.trueans = ((snapshot.val() && snapshot.val().question[window.currentq].true) || 'Anonymous');
        $('.option button').click(function () {
            select = $(this).attr('class').charCodeAt(0) - 97 + 1;
            trueans = ((snapshot.val() && snapshot.val().question[window.currentq].true) || 'Anonymous');
            window.trueans = trueans;
            $('.option button').prop('disabled', true);
            $(this).addClass('select').css('color', 'black');
            firebase.database().ref('quiz/question/' + window.currentq + '/select').set(select);
            /*for (i = 0; i < trueans.length; i++) {
                console.log(trueans, i);
                if (select == trueans[i]) {
                    console.log('true');
                } else if (i == trueans.length - 1) {
                    console.log('wrong');
                }
            }*/
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
        firebase.database().ref('quiz/question').once('value').then((snapshot) => {
            const data = snapshot.val();
            for (i = 1; i < data.length; i++) {
                firebase.database().ref('quiz/question/' + i + '/select').remove();
                firebase.database().ref('quiz/question/' + i + '/showans').remove();
            }
        });
    });
    $('.openconbtn').click(function () {
        window.open('https://console.firebase.google.com/project/adenpun-2000/database/adenpun-2000/data/~2Fquiz');
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
        firebase.database().ref('quiz/question/' + window.currentq + '/showans').remove();
    });
    $('.prevbtn').click(function () {
        firebase.database().ref('quiz/currentq').set(window.currentq - 1);
    });
    $('.nextbtn').click(function () {
        firebase.database().ref('quiz/currentq').set(window.currentq + 1);
    });
});
