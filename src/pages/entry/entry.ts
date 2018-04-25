import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LogInPage} from "../log-in/log-in";
import {SignUpPage} from "../sign-up/sign-up";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the EntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authPvdr: AuthProvider) {

  }

  public goToLogIn() {
    this.navCtrl.push(LogInPage);
  }

  public goToSignUp() {
    this.navCtrl.push(SignUpPage);
  }
}
