import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//

admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export let createProfile = functions.auth.user().onCreate(user => {
  admin.database().ref('users/' + user.data.uid).set({
    uid: user.data.uid,
    email: user.data.email
  }).then(data => console.log(data), err => console.error(err))
    .catch(err => console.error(err));
});

export let sendGlance = functions.database.ref('/glances/{glanceId}').onCreate(snap => {
  console.log(snap.data.val())
  // console.log(snap.data.val().seeingUser)
})
