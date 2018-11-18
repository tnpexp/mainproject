import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public test;
  checkUsers = [];
  check = 0;
  data;
  constructor(private db: AngularFireDatabase, private router: Router, private global: GlobalService,
    private auth: AuthService) {
  }
  ngOnInit() {
  }
  authenUsers(data: NgForm) {
    this.auth.login(data.value.users, data.value.pass);
    // setTimeout(() => location.reload, 5000);
  }
  sw_login() {
    swal({
      position: 'top-end',
      type: 'success',
      title: 'เข้าสู่ระบบสำเร็จ',
      showConfirmButton: false,
      timer: 2500
    });
    // this.router.navigate(['/aboutcattle']);
  }
}
