import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {EntryPage} from "../pages/entry/entry";
import {AuthProvider} from "../providers/auth/auth";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = EntryPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authPvdr: AuthProvider) {
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
    });
  }
}
