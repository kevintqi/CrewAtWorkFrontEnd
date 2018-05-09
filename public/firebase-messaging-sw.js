importScripts('./bower_components/firebase/firebase-app.js');
importScripts('./bower_components/firebase/firebase-messaging.js');


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
// messaging.setBackgroundMessageHandler((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   var notificationTitle = 'Background Message Title';
//   var notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   return self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });