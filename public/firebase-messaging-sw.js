importScripts('/__/firebase/4.13.0/firebase-app.js');
importScripts('/__/firebase/4.13.0/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyCLsg2gkWT_9b6TcUM5zP7cHPkF2yjYzyc",
  authDomain: "crewatworkfrontend.firebaseapp.com",
  databaseURL: "https://crewatworkfrontend.firebaseio.com",
  projectId: "crewatworkfrontend",
  storageBucket: "",
  messagingSenderId: "419564990758"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
  console.log(payload);
  self.notification = payload.notification;
  self.getElementById("message").innerHTML = '<h2>' + self.notification.title + '</h2>' + '<p>' + self.notification.body + '</p>';
});