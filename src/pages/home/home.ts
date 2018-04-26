import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {EntryPage} from "../entry/entry";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user;
  public users;

  constructor(public navCtrl: NavController, public authPvdr: AuthProvider, public app: App, public afdb: AngularFireDatabase) {
    this.users = this.afdb.list('/users').valueChanges();
    this.afdb.object('/users/' + this.authPvdr.getUserId()).valueChanges().subscribe(snap => {
      this.user = snap;
    });
  }

  public logOut() {
    this.authPvdr.logOut();
    this.app.getRootNav().setRoot(EntryPage);
  }

  public seeUser(seenUser) {
    this.sendLook(this.user, seenUser);
  }

  public sendLook(seeingUser, seenUser) {
    this.afdb.list('/glances').push({
      seeingUser: seeingUser,
      seenUser: seenUser,
      timeStamp: new Date().toISOString()
    });
  }
}
