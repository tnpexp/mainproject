import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  public isLogin;
  public user;

  detail;
  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private global: GlobalService
  ) {
    this.afAuth.authState.subscribe(data => {
      this.detail = this.db
        .list('/beefproject/users', ref => ref.orderByChild('email').equalTo(data.email))
        .valueChanges();
      console.log(data.email);
      this.detail.subscribe(snap => {
        snap.forEach(element => {
          this.user = element.fname + ' ' + element.lname;
          this.global.setUser(element.users);
        });
      });
    });
    this.auth.cookieAuth().subscribe(data => {
      this.isLogin = data;
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
  }

}
