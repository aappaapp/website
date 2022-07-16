// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.analytics();
delaytime = 60000;
firebase.database().ref('fakewncry/delaytime').on('value', (snapshot) => {
    delaytime = snapshot.val();
});
firebase.database().ref('fakewncry/start').on('value', (snapshot) => {
    var data = snapshot.val();
    if (data) {
        $('body').show();
        exeonce = true;
        firebase.database().ref('fakewncry/time').once('value').then((snapshot) => {
            var data1 = snapshot.val();
            var loop = setInterval(function () {
                var date = new Date(data1 + delaytime);
                $('.paybeforetime').text(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
                var date2 = new Date;
                var date3 = new Date(date - date2);
                $('.payremaintime').text(/*date3.getHours() + ':' + */date3.getMinutes() + ':' + date3.getSeconds());
                console.log(date3);
                if (date2 >= date && exeonce) {
                    alert('This is a prank!');
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
    $(document).contextmenu(function () {
        event.preventDefault();
    });
    $(document).keydown(function () {
        var diskey = ['F11', 'F12', 'I', 'F8'];
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
