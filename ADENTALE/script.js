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
$('#fight-line').toSprite('sprite');

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
if($().getDeviceType() == 'mobile'){
    console.log($().getDeviceType())
    $('#HomePage h1').text('You can\'t play Adentale in mobile now')
}
$('#mercy-btn').click(function(){
    $('#mercy-alert').css('display', 'block');
});
$('#mercy-alert #cancel-btn').click(function(){
    $('#mercy-alert').css('display', 'none');
});
$('#fight-btn').click(function(){
    window.startfight = true;
    $('#fight-line').css('left', '0');
    $('#fightarea').css('width', '500px');
    $('#sprite').css('display', 'none');
    $('#fightbar').css('display', 'flex');
    $('#btn').css('display', 'none');
    $('#fight-btn').blur();
    setTimeout(function(){
        $('#fight-line').css('display', 'block');
        window.repeatofightline = setInterval(function(){$('#fight-line').teleport('move', 2.5, 0);}, 0.1);
    }, 1000)
});
$(window).keydown(function(){
    if(event.which == 32){
        clearInterval(window.repeatofightline)
        if(window.startfight == true){
            if($().overlap($('#fight-line'), $('#green-bar'))){
                alert('you torch green!');
            } else {
                alert('you dont torch green');
            }
        }
        $('#fightarea').css('width', '200px');
        $('#fightbar').css('display', 'none');
        $('#btn').css('display', 'block');
        $('#fight-line').css('display', 'none');
        window.startfight = false;
    }
});

//my custom script with function
window.startfight = false;
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