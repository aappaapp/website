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
var starCountRef = firebase.database().ref('vote/color');
starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
    $('.body').css('background-color', data);
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
$(document).keypress(function () {
    if (event.key == 'w') {
        window.location.replace('./display.html');
    } else if (event.key == 's') {
        window.location.replace('./index.html');
    }
});
