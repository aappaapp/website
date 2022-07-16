// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
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
window.input = true;
var starCountRef = firebase.database().ref('vote/color');
starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
    $('.body').css('background', data);
    $('.input').val(data);
});
$('.redvote').click(function () {
    firebase.database().ref('vote').set({
        color: 'red'
    });
});
$('.bluevote').click(function () {
    firebase.database().ref('vote').set({
        color: 'blue'
    });
});
$('.clearvote').click(function () {
    firebase.database().ref('vote').set({
        //color: 'transparent'
        color: 'black'
    });
});
$('.input').change(function () {
    firebase.database().ref('vote').set({
        //color: 'transparent'
        color: $('.input').val()
    });
});
$(document).keypress(function () {
    if (window.input && event.key == 'w') {
        window.location.replace('./display.html');
    } else if (window.input && event.key == 's') {
        window.location.replace('./index.html');
    }
});
$('.input').focus(function () {
    window.input = false;
});
$('.input').blur(function () {
    window.input = true;
});
