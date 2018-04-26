import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {EntryPage} from "../pages/entry/entry";
import {AuthProvider} from "../providers/auth/auth";
import {TabsPage} from "../pages/tabs/tabs";
import {FCM} from '@ionic-native/fcm';
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = EntryPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authPvdr: AuthProvider,
              fcm: FCM, afdb: AngularFireDatabase) {
    setTimeout(() => {
      if (authPvdr.isLoggedIn()) {
        console.log(authPvdr.getUserId(), 'is logged in');
        this.rootPage = TabsPage;
      } else {
        console.log('No one logged in');
      }
    }, 1000);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      fcm.getToken().then(token => {
        console.log('token', token);
        setTimeout(() => {
          afdb.object('/users/' + authPvdr.getUserId()).update({token: token});
          alert(token);
        }, 1000);
        // Your best bet is to here store the token on the user's profile on the
        // Firebase database, so that when you want to send notifications to this
        // specific user you can do it from Cloud Functions.
      }).catch(err => console.error('Error getting token', err));
      fcm.onNotification().subscribe(data => {
        console.log('push message recieved', data);
        if (data.wasTapped) {
          console.log('Notification was received on device tray and tapped by the user');
          //Notification was received on device tray and tapped by the user.
        } else {
          console.log('Notification was received in foreground. Maybe the user needs to be notified');
          //Notification was received in foreground. Maybe the user needs to be notified.
        }
      }, err => console.error('Error getting push', err));
    });
  }
}
