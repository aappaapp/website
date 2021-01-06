// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
var database = firebase.database();
firebase.database().ref('larp').on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data);
});
function dice() {
    return Math.floor(Math.random() * 6) + 1;
}
$(function () {
    $('.startbtn').click(function () {
        $('.startbtn').remove();
        $('.title').append('<input type=\'text\' placeholder=\'Server Id...\' class=\'serverinput\'><input type=\'button\' value=\'Create Server\' class=\'serverjoinbtn\'>');
        $('.serverinput').change(function () {
            firebase.database().ref('/larp/server/' + $('.serverinput').val()).once('value').then((snapshot) => {
                var data = (snapshot.val()) || 'Anonymous';
                window.server = {
                    exist: false,
                    id: $('.serverinput').val()
                }
                if (data == 'Anonymous') {
                    window.server.exist = false;
                    $('.serverjoinbtn').val('Create Server');
                } else {
                    window.server.exist = true;
                    $('.serverjoinbtn').val('Join Server');
                }
            });
        });
        $('.serverjoinbtn').click(function () {
            console.log('exist:', window.server.exist, 'id:', window.server.id);
            if (window.server.exist == false) {
                firebase.database().ref('larp/server/' + window.server.id).set({
                    a: 'a'
                });
            }
        });
    });
});
