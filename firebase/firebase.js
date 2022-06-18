// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCFhgKQiV_9q5dViKHLAslf4e1FJuN6qvk",
  authDomain: "adenpun-2000.firebaseapp.com",
  databaseURL: "https://adenpun-2000-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "adenpun-2000",
  storageBucket: "adenpun-2000.appspot.com",
  messagingSenderId: "336986061967",
  appId: "1:336986061967:web:a5e17b0ebc6c3cda4404fa",
  measurementId: "G-G8FC08N334"
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
    profile_picture: imageUrl
  });
}
function set(ref, data1) {
  firebase.database().ref('/users/' + userId).set({
    data: data1
  });
}
function read() {
  return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
  });
}
set(userId, 'sdsd');
