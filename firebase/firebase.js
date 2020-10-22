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
// Get a reference to the database service
var userId = firebase.auth().currentUser.uid;
var database = firebase.database();
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
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
  });
}
set(userId, 'sdsd');