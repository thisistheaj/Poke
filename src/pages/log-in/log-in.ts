import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  public form: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public authPvdr: AuthProvider) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  public signUp() {
    this.authPvdr.logInWithEmail(this.form.get('email').value, this.form.get('password').value).then(successData => {
      if (!successData.code) {
        this.navCtrl.push(TabsPage);
      } else {
        alert(successData.message);
      }
    }).catch(errorData => {
      alert('Could not log in because ' + errorData.message);
    });
  }

}
