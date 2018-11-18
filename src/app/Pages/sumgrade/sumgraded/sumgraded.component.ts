import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/uploads/shared/upload.service';
import swal from 'sweetalert2';
import { database } from 'firebase';
import { NgForm } from '@angular/forms';
import { GradedService } from 'src/app/services/API-graded/graded.service';

@Component({
  selector: 'app-sumgraded',
  templateUrl: './sumgraded.component.html',
  styleUrls: ['./sumgraded.component.css']
})
export class SumgradedComponent implements OnInit {

  file;
  key;
  name_ex = {
    fn_ex1: '',
    ln_ex1: '',
    fn_ex2: '',
    ln_ex2: '',
    fn_ex3: '',
    ln_ex3: '',
    fn_ex4: '',
    ln_ex4: '',
    fn_ex5: '',
    ln_ex5: ''
  };
  items = {
    $key: '',
    picture: '',
    grade_sys: ''
  };

  public isLogin;
  public userfirst;
  public userlast;
  public grade_ex;
  public grade_selected;
  public grade_sys;
  public grade_opt;

  detail;
  detail_grade_sys;
  datas = [];
  datagrade: any[];
  datesumed = new Date();
  choice;
  Pic;

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private global: GlobalService,
    private upload: UploadService,
    private _route: ActivatedRoute,
    private router: Router,
    private api: GradedService
  ) {
    this._route.params.subscribe(params => {
      this.key = params['key'];
    });
    console.log(this.key);
  }

  select_grade(grade_ex) {
    this.grade_ex = grade_ex;
    console.log(this.grade_ex);
  }
  grade_choice(test) {
    console.log('asas: ' + this.grade_sys);
    console.log(test);
    this.choice = test;
    console.log(this.choice);

  }

  ngOnInit() {
    this.api.getDataByKey(this.key).subscribe(data => {
      console.log(data);
    this.grade_sys = Object.keys(data).map(key => data[key])[0].grade_sys;
    this.Pic = Object.keys(data).map(key => data[key])[0].picture;
      //  this.datagrade = Object.values(data);
      // for (let i = 0; i < Object.values(data).length; i++) {
      //   this.datagrade[i].key = Object.keys(data)[i];
      // }
    });

    this.afAuth.authState.subscribe(data => {
      this.detail = this.db
        .list('/user', ref => ref.orderByChild('email').equalTo(data.email))
        .valueChanges();
      console.log(data.email);
      this.detail.subscribe(snap => {
        snap.forEach(element => {
          this.userfirst = element.fname;
          this.userlast = element.lname;
          this.global.setUser(element.users);
        });
      });
    });
    this.datesumed = new Date();
  }

  addUsers(data: NgForm) {
    this.db.list('/graded').update(this.key, {status: 'สรุปเกรดแล้ว'});
    this.db.list('/graded').update(this.key, {date_sum: String(this.datesumed)});
    this.datas[0].fn_ex1 = data.value.fn_ex1;
    this.datas[0].ln_ex1 = data.value.ln_ex1;
    this.datas[0].fn_ex2 = data.value.fn_ex2;
    this.datas[0].ln_ex2 = data.value.ln_ex2;
    this.datas[0].fn_ex3 = data.value.fn_ex3;
    this.datas[0].ln_ex3 = data.value.ln_ex3;
    this.datas[0].fn_ex4 = data.value.fn_ex4;
    this.datas[0].ln_ex4 = data.value.ln_ex4;
    this.datas[0].fn_ex5 = data.value.fn_ex5;
    this.datas[0].ln_ex5 = data.value.ln_ex5;
    this.datas[0].date_sum = String(this.datesumed);
    this.datas[0].grade_selected = this.grade_selected;
    this.datas[0].grade_ex = this.grade_ex;
    this.datas[0].status = '';
    this.datas[0].sys_grage_sum_fn = this.userfirst;
    this.datas[0].sys_grage_sum_ln = this.userlast;
    if (this.choice === 1) {
      this.datas[0].grade_con = this.grade_sys;
      console.log(this.datas[0].grade_con);
      this.db.list('/graded').update(this.key, {grade_ex: this.grade_sys});
    } else if (this.choice === 2) {
      this.datas[0].grade_con = this.grade_ex;
      console.log(this.datas[0].grade_con);
      this.db.list('/graded').update(this.key, {grade_ex: this.grade_ex});
    } else {
      this.datas[0].grade_con = this.grade_opt;
      console.log(this.datas[0].grade_con);
      this.db.list('/graded').update(this.key, {grade_ex: this.grade_opt});
    }
    console.log(this.datas[0]);
    this.db.list('/summed').push(this.datas[0]);
    swal({
      title: 'บันทึกสรุปเกรดสำเร็จ!',
      text: '',
      type: 'success'
    });
    this.router.navigate(['/sumgrade']);
    setTimeout(() => location.reload(), 700);
  }
}

