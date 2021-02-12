function afterloginorsignup() {
    $('.firsttimein.page').hide();
    $('.main.page').show();
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
            console.log('visitorId:', visitorId);
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
