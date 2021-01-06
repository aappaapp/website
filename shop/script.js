try {
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
} catch { }
function lang() {
    var query = $.query.get('lang');
    if (query == '') {
        location.replace($.query.set('lang', navigator.language))
    }
    firebase.database().ref('shop/lang').once('value', function (snapshot) {
        if (query.includes('zh')) {
            data = snapshot.val().zh;
        } else {
            data = snapshot.val().en;
        }
        $('.header-title').text(data.name);
        $('.header-link.hot-item').text(data['hot item']);
    });
}
console.log('sd');
$(function () {
    $.get('header.html', function (data) {
        $('.content').before(data);
        $('.header-title').click(function () {
            window.location.replace('./index.html');
        });
    });
    $.get('footer.html', function (data) {
        $('.content').after(data);
        console.log($('body'));
        lang();
    });
});
