// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
});
var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        function setCookie(cname, cvalue, exdays){
          var d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          var expires = 'expires='+ d.toUTCString();
          document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
        }
        setCookie('login', 'true', 0.5);
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'game.html',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
};
ui.start('#firebaseui-auth-container', uiConfig);