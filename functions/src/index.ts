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
    console.log(snap.data.val());

    let token = "eHF7ngWx7Ko:APA91bGMYjf-YLPjq5m07sujHWVXPTJKpEmhTgZ5OrT4Ck3Aedez0x5XbDzOzi7RGjykJhg8f6srM5IqkcdUrz5kI240ktA1K-rbHsdYTHCcBwJMc4qygdtN1FtsrS7EF6GIfmp-SyhY";

    const message: admin.messaging.Message = {
      token: token,
      android: {
        notification: {
          title: 'Hello',
          body: 'Hello from fcm'
        }
      },
      apns: {
        headers: {
          'apns-priority': '10'
        },
        payload: {
          aps: {
            alert: {
              title: 'Hello',
              body: 'Hello from fcm'
            },
            badge: 0
          }
        }
      }
    };


    return admin.messaging().send(message).then(data => {
      console.log('sent', data);
      // console.log('error', data);
    }, err => console.error(err))
      .catch(err => console.error(err));

    // return admin.messaging()
    //   .sendToDevice(token, {
    //     data: {
    //       text: 'Hello, FCM!'
    //     }
    //   }).then(data => {
    //     console.log('sent', data);
    //     console.log('error', data.results[0].error);
    //   }, err => console.error(err))
    //   .catch(err => console.error(err));
  });
