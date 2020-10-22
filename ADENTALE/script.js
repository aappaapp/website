//game.js function
$('#HomePage').toUI('homepage');
$('#start-btn').toUI('startbtn');
$('#gamearea').toUI('gamearea');
$('#pause-btn').toUI('pausebtn');
$('#pause-page').toUI('pausepage');
$('#continue-btn').toUI('continuebtn');
$('#santa-fight').toUI('fightpage', 'santa');
$('#save-btn').toUI('savebtn');
$( '#sprite' ).toSprite('sprite');
$( '#sprite' ).toSprite('control', '10,10');
$( '#sprite' ).teleport('', 100, 200);
$('#santa').toSprite('enemy', 'santa');
$('#santa').teleport('', 200, 200);

//my custom script with jquery
var uid = $().getCookie('uid');
$.fn.set = function(ref, data1){
    firebase.database().ref('/users/' + uid).set({
        data: data1
    });
}
$.fn.read = function(){
    return firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
        var data = (snapshot.val() && snapshot.val().data) || 'Anonymous';
        window.readData = data;
        $().setCookie('data', JSON.stringify(data), 0.5)
        // ...
    });
}
$('#mercy-btn').click(function(){
    $('#mercy-alert').css('display', 'block');
});
$('#mercy-alert #cancel-btn').click(function(){
    $('#mercy-alert').css('display', 'none');
});

//my custom script with function
if($().overlap($('#sprite'), $('#santa-fight #btn input#fight-btn'))){
}
var firebaseConfig = {
    apiKey: "AIzaSyD5fJ5gyslVtyuMJuF4RPWQdFFClstUY-s",
    authDomain: "webdb-20101.firebaseapp.com",
    databaseURL: "https://webdb-20101.firebaseio.com",
    projectId: "webdb-20101",
    storageBucket: "webdb-20101.appspot.com",
    messagingSenderId: "558365281749",
    appId: "1:558365281749:web:8146da88b5a34121a4c15c",
    measurementId: "G-Y20RYC3NYS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Get a reference to the database service
var database = firebase.database();
var userId = window.uid;
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
    profile_picture : imageUrl
});
}
function set(ref, data1){
    firebase.database().ref('/users/' + userId).set({
        data: data1
    });
}
function read(){
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var data = (snapshot.val() && snapshot.val().data) || 'Anonymous';
        // ...
    });
}
window.onload = function(){
    read()
}