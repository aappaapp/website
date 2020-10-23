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