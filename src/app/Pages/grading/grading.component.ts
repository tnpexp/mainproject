import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Upload } from 'src/app/uploads/shared/upload';
import { UploadService } from 'src/app/uploads/shared/upload.service';
import { AngularFireList } from 'angularfire2/database';
import { AboutcattleService } from '../../services/API-aboutcattle/aboutcattle.service';
import { ThrowStmt } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { GlobalService } from 'src/app/services/global.service';
import * as firebase from 'firebase';
import { GradedService } from 'src/app/services/API-graded/graded.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css']
})
export class GradingComponent implements OnInit {
  checkProcess = true;
  picName = 'เลือกไฟล์รูปภาพ';
  file;
  grade = 5;
  key;
  datecuted;
  selectedFiles: FileList;
  currentUpload: Upload;
  data: any;
  public userfirst;
  public userlast;
  detail;
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
    status: '',
    picture: '',
    datecuted: '',
    grade_sys: ''
  };
  event;
  private basePath = '/uploads';
  constructor(
    private db: AngularFireDatabase,
    private upload: UploadService,
    private _route: ActivatedRoute,
    private api: AboutcattleService,
    private afAuth: AngularFireAuth,
    private global: GlobalService,
    private apigrade: GradedService,
    private router: Router
  ) {
    this._route.params.subscribe(params => {
      this.key = params['key'];
    });
    console.log(this.key);
  }

  ngOnInit() {
    this.api.getDataByKey(this.key).subscribe(data => {
      this.data = Object.values(data);
      for (let i = 0; i < Object.values(data).length; i++) {
        this.data[i].key = Object.keys(data)[i];
      }
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
    this.datecuted = new Date();
  }

  onFileChanged(event) {
    this.event = event;
    this.file = event.target.files[0];
    //  console.log(this.file);
    this.picName = this.file.name;
    // this.upload.pushUpload(event.target.files[0]);
    // this.uploadSingle();
  }

  greaded(data: NgForm) {
    this.currentUpload = new Upload(this.file);
    const storageRef = firebase.storage().ref();
    this.upload.pushUpload(this.currentUpload);

    swal({
      title: 'กำลังบันทึกผลเกรด!',
      html: 'จะปิดเมื่อบันทึกเสร็จใน <strong></strong> วินาที.',
      timer: 5000,
      onOpen: () => {
        swal.showLoading();
        storageRef
        .child('uploads/' + this.picName)
        .getDownloadURL()
        .then(datas => {
          this.api
            .editData(this.key, {
              status: this.grade,
              grade_sys: this.grade,
              datecuted: String(this.datecuted),
              picture: datas
            })
            .subscribe();
        });
      },
      onClose: () => {
        this.router.navigate(['/aboutcattle']);
      }
    }).then(result => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer');
      }
    });

    storageRef
      .child('uploads/' + this.picName)
      .getDownloadURL()
      .then(datas => {
        this.api.getDataByKey(this.key).subscribe(data1 => {
          const value = Object.keys(data1).map(key => data1[key]);
          value[0].picture = datas;
          value[0].status = 'ไม่ได้สรุปเกรด';
          value[0].grade_sys = this.grade;
          value[0].datecuted = String(this.datecuted);
          console.log(value[0]);
          this.apigrade.addData(value[0]).subscribe();
        });
      });
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

  test(c) {
    this.checkProcess = c;
  }
}
