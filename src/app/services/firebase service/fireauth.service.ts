import { Injectable, NgModule } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  [x: string]: any;

  constructor() { }
  afLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.flashMessage.show('You are logged in', { cssClass: 'alert-success', timeout: 3000 });
      });
  }
  afLogout() {
    firebase.auth().signOut()
      .then(() => {
        this.flashMessage.show('You are logged out', { cssClass: 'alert-danger', timeout: 3000 });
      });
  }
}
