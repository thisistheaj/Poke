import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {EntryPage} from "../entry/entry";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authPvdr: AuthProvider, public app: App) {

  }

  public logOut() {
    this.authPvdr.logOut();
    this.app.getRootNav().setRoot(EntryPage);
  }

}
