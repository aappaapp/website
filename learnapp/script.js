function getusername(uid, callback) {
    firebase.database().ref('funvoc/user').once('value').then((snapshot) => {
        const data = snapshot.val() || undefined;
        var i;
        var result;
        for (i = 0; i < Object.keys(data).length; i++) {
            if (data[Object.keys(data)[i]].uid == uid) {
                result = Object.keys(data)[i];
                window.getusernamev = result;
                callback(result);
            }
        }
    });
}
function afterloginorsignup() {
    getusername($.cookie('uid'), function (data) {
        firebase.database().ref('funvoc/user/' + data).on('value', (snapshot) => {
            const data1 = snapshot.val() || undefined;
            var i;
            console.log(data1.folder);
            $('.main.page .display').html('');
        });
    });
    $('.firsttimein.page').hide();
    $('.main.page').show();
    $('.option.folder').click(function () {
        $('.main.page').hide();
        $('.makefolder.page').show();
        $('.makefolder .create').click(function () {
            getusername($.cookie('uid'), function (data) {
                firebase.database().ref('funvoc/user/' + data + '/folder/' + $('.makefolder .name').val()).set({
                    'sd': 'sd'
                });
            });
            $('.main.page').show();
            $('.makefolder.page').hide();
            /*getusername($.cookie('uid'), function (data) {
                firebase.database().ref('funvoc/user/' + data + '/folder').once('value').then((snapshot) => {
                    var data1 = snapshot.val() || undefined;
                    if (typeof data1 == 'undefined') {
                        data1 = {};
                    }
                    firebase.database().ref('funvoc/user/' + data + '/folder/' + Object.keys(data1).length).set('sdsd');
                });
            });*/
        });
    });
}
$(function () {
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
    FingerprintJS.load().then(fp => {
        // The FingerprintJS agent is ready.
        // Get a visitor identifier when you'd like to.
        fp.get().then(result => {
            // This is the visitor identifier:
            const visitorId = result.visitorId.substr(0, 4);
            window.visitorId = visitorId;
            console.log('visitorId:', visitorId);
            if ($.cookie('login') === 'true' && typeof $.cookie('uid') !== 'undefined') {
                afterloginorsignup();
            }
            $('.firsttimein .name').val('FunVoc_' + visitorId);
            $('.firsttimein .signup').click(function () {
                var nameval = $('.firsttimein .name').val();
                firebase.database().ref('funvoc/user/' + nameval).once('value').then((snapshot) => {
                    const data = snapshot.val() || undefined;
                    if (data == undefined) {
                        firebase.database().ref('funvoc/user/' + nameval).set({
                            uid: visitorId + nameval
                        });
                        $.cookie('login', true, {
                            expires: 365
                        });
                        $.cookie('uid', visitorId + nameval, {
                            expires: 365
                        });
                        afterloginorsignup();
                    } else {
                        $('.firsttimein').append('<br><span style=\'color: red;\'>該帳戶已經存在</span>');
                    }
                });
            });
            $('.firsttimein .login').click(function () {
                var nameval = $('.firsttimein .name').val();
                firebase.database().ref('funvoc/user/' + nameval).once('value').then((snapshot) => {
                    const data = snapshot.val() || undefined;
                    if (data == undefined) {
                        $('.firsttimein').append('<br><span style=\'color: red;\'>該帳戶不存在</span>');
                    } else {
                        $.cookie('login', 'true', {
                            expires: 365
                        });
                        $.cookie('uid', data.uid, {
                            expires: 365
                        });
                        afterloginorsignup();
                    }
                });
            });
        });
    });
});
