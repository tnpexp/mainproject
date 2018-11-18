import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Upload } from 'src/app/uploads/shared/upload';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UploadService } from 'src/app/uploads/shared/upload.service';
import { AuthService } from 'src/app/services/auth.service';
import { AboutcattleService } from '../../../services/API-aboutcattle/aboutcattle.service';
import { GlobalService } from 'src/app/services/global.service';
import { AngularFireAuth } from 'angularfire2/auth';
import swal from 'sweetalert2';
import { GradedService } from '../../../services/API-graded/graded.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-graded',
  templateUrl: './graded.component.html',
  styleUrls: ['./graded.component.css']
})
export class GradedComponent implements OnInit {
  picName: any;
  grade = 5;
  file;
  key;
  datecuted = new Date();
  selectedFiles: FileList;
  currentUpload: Upload;
  public isLogin;
  public userfirst;
  public userlast;
  detail;
  private basePath = '/uploads';
  test;
  datas = [];

  data: any;
  items = {
    $key: '',
    id: '',
    left: '',
    right: '',
    datekill: '',
    datedry: '',
    dateready: '',
    wleft: '',
    wright: '',
    roomdry: '',
    firstown: '',
    lastown: '',
    status: ''
  };

  constructor(
    private db: AngularFireDatabase,
    private upload: UploadService,
    private _route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private global: GlobalService,
    private router: Router,
    private api: AboutcattleService,
    private apiGrade: GradedService
  ) {
    // console.log('asdasdasdas');
    this.datecuted = new Date();
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

    this._route.params.subscribe(params => {
      this.key = params['key'];
      this.picName = params['file'];
    });

    this.currentUpload = new Upload(this.picName);
    console.log(this.currentUpload);
    this.upload.pushUpload(this.currentUpload);

    console.log(this.picName);
    this.api.getDataByKey(this.key).subscribe(data => {
      console.log(data);
      const value = Object.keys(data).map(key => data[key]);
      value[0].status = 'ไม่ได้สรุปเกรด';
      value[0].date_sum = '';
      value[0].grade_ex = '';
      this.datas.push(value[0]);
    });
  }

  ngOnInit() {
    this.api.getDataByKey(this.key).subscribe(data => {
      this.data = Object.values(data);
      for (let i = 0; i < Object.values(data).length; i++) {
        this.data[i].key = Object.keys(data)[i];
      }
    });
    swal({
      title: 'Auto close alert!',
      html: 'I will close in <strong></strong> seconds.',
      timer: 2000,
      onOpen: () => {
        swal.showLoading();
      },
      onClose: () => {

      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer');
      }
    });
  }

  greaded(data: NgForm) {

    // this.api.editData(this.key, {status: this.grade, datecuted: String(this.datecuted)}).subscribe();
    // this.datas[0].datecuted = String(this.datecuted);
    // this.datas[0].grade_sys = this.grade;
    // this.datas[0].sys_grage_cut_fn = this.userfirst;
    // this.datas[0].sys_grage_cut_ln = this.userlast;
    // this.apiGrade.addData(this.datas[0]).subscribe();
    // swal({
    //   title: 'บันทึกเกรดสำเร็จ!',
    //   text: '',
    //   type: 'success'
    // });
    // this.router.navigate(['/aboutcattle']);
    // setTimeout(() => location.reload(), 700);
  }
}
