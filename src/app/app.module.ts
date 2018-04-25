import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SignUpPage} from "../pages/sign-up/sign-up";
import {LogInPage} from "../pages/log-in/log-in";
import {EntryPage} from "../pages/entry/entry";
import { AuthProvider } from '../providers/auth/auth';
import {AngularFireModule} from "angularfire2";
import {AngularFireAuth} from "angularfire2/auth";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignUpPage,
    LogInPage, EntryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCTpeoii5DHFeaaw6OK6j68Q6d_WW4fuy8",
      authDomain: "newagent-f3b16.firebaseapp.com",
      databaseURL: "https://newagent-f3b16.firebaseio.com",
      projectId: "newagent-f3b16",
      storageBucket: "newagent-f3b16.appspot.com",
      messagingSenderId: "469349041880"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignUpPage,
    LogInPage,
    EntryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth
  ]
})
export class AppModule {}
