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
firebase.database().ref('fakewncry/start').on('value', (snapshot) => {
    var data = snapshot.val();
    if (data) {
        $('body').show();
        exeonce = true;
        firebase.database().ref('fakewncry/time').once('value').then((snapshot) => {
            var data1 = snapshot.val();
            var date = new Date(data1 + 60000);
            $('.paybeforetime').text(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
            var loop = setInterval(function () {
                var date2 = new Date;
                if (date2 >= date && exeonce) {
                    alert('This is a prank');
                    exeonce = false;
                    clearInterval(loop);
                }
            }, 500);
            /*setInterval(function () {
            var date = new Date;
            var date2 = new Date((data1 + 10000) - date.getTime());
            $('.paybeforetime').text(date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds());
        }, 500);*/
        });
    } else if (!data) {
        $('body').hide();
    }
});
$(function () {
    $(document).keydown(function () {
        var diskey = ['F11', 'F12', 'I'];
        for (i = 0; i < diskey.length; i++) {
            if (event.key == diskey[i]) {
                event.preventDefault();
            }
        }
        if (event.key == 'F8') {
            firebase.database().ref('fakewncry/start').once('value').then((snapshot) => {
                var data = snapshot.val();
                console.log(data);
                if (data) {
                    firebase.database().ref('fakewncry/start').set(false);
                } else if (!data) {
                    var date = new Date;
                    firebase.database().ref('fakewncry/start').set(true);
                    firebase.database().ref('fakewncry/time').set(date.getTime());
                }
            });
        }
    });
});
