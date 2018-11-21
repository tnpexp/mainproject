import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
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
import { LyResizingCroppingImages, ImgCropperConfig, ImgCropperEvent} from '@alyle/ui/resizing-cropping-images';
import { LyTheme2, ThemeVariables} from '@alyle/ui';

const styles = (theme: ThemeVariables) => ({
  actions: {
    display: 'flex'
  },
  cropping: {
    maxWidth: 'auto',
    height: '400px'
  },
  flex: {
    flex: 1
  },
  range: {
    textAlign: 'center',
    maxWidth: '400px'
  },
  rangeInput: {
    maxWidth: '350px',
    margin: '1em 0',

    // http://brennaobrien.com/blog/2014/05/style-input-type-range-in-every-browser.html
    // removes default webkit styles
    '-webkit-appearance': 'none',

    // fix for FF unable to apply focus style bug
    border: `solid 6px ${theme.background.tertiary}`,

    // required for proper track sizing in FF
    width: '100%',
    '&::-webkit-slider-runnable-track': {
        width: '300px',
        height: '3px',
        background: '#ddd',
        border: 'none',
        borderRadius: '3px'
    },
    '&::-webkit-slider-thumb': {
        '-webkit-appearance': 'none',
        border: 'none',
        height: '16px',
        width: '16px',
        borderRadius: '50%',
        background: theme.primary.default,
        marginTop: '-6px'
    },
    '&:focus': {
        outline: 'none'
    },
    '&:focus::-webkit-slider-runnable-track': {
        background: '#ccc'
    },

    '&::-moz-range-track': {
        width: '300px',
        height: '3px',
        background: '#ddd',
        border: 'none',
        borderRadius: '3px'
    },
    '&::-moz-range-thumb': {
        border: 'none',
        height: '16px',
        width: '16px',
        borderRadius: '50%',
        background: theme.primary.default
    },

    // hide the outline behind the border
    '&:-moz-focusring': {
        outline: '1px solid white',
        outlineOffset: '-1px',
    },

    '&::-ms-track': {
        width: '300px',
        height: '3px',

        // remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead
        background: 'transparent',

        // leave room for the larger thumb to overflow with a transparent border
        borderColor: 'transparent',
        borderWidth: '6px 0',

        // remove default tick marks
        color: 'transparent'
    },
    '&::-ms-fill-lower': {
        background: '#777',
        borderRadius: '10px'
    },
    '&::-ms-fill-': {
        background: '#ddd',
        borderRadius: '10px',
    },
    '&::-ms-thumb': {
        border: 'none',
        height: '16px',
        width: '16px',
        borderRadius: '50%',
        background: theme.primary.default,
    },
    '&:focus::-ms-fill-lower': {
        background: '#888'
    },
    '&:focus::-ms-fill-upper': {
        background: '#ccc'
    }
  }
});

@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class GradingComponent implements OnInit {
  checkProcess = true;
  picName = 'เลือกไฟล์รูปภาพ';
  file;
  grade = '3';
  key;
  datecuted;
  selectedFiles: FileList;
  currentUpload: Upload;
  data: any;
  datas: any;
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

  classes = this.theme.addStyleSheet(styles);
  croppedImage: string;
  result: string;
  scale: number;
  myConfig: ImgCropperConfig = {
    width: 250, // Default `250`
    height: 250, // Default `200`,
    output: {
      width: 300,
      height: 300
    }
  };
  name_pic;
  constructor(
    private db: AngularFireDatabase,
    private upload: UploadService,
    private _route: ActivatedRoute,
    private api: AboutcattleService,
    private afAuth: AngularFireAuth,
    private global: GlobalService,
    private apigrade: GradedService,
    private router: Router,
    private theme: LyTheme2
  ) {
    this._route.params.subscribe(params => {
      this.key = params['key'];
    });
    console.log(this.key);
  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    this.picName = e.dataURL;
    console.log('cropped img: ', e);
    console.log('picName: ', this.picName);
  }
  onloaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
    this.name_pic = e.name;
  }
  onerror(e: ImgCropperEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
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
    this.upload.pushImageByBase64(this.name_pic, this.picName);
    console.log(this.name_pic, this.picName);
    // this.currentUpload = new Upload(this.file);
    const storageRef = firebase.storage().ref();
    // this.upload.pushUpload(this.currentUpload);
    swal({
      title: 'กำลังบันทึกผลเกรด!',
      // html: 'จะปิดเมื่อบันทึกเสร็จใน <strong></strong> วินาที.',
      timer: 5000,
      onOpen: () => {
        swal.showLoading();
        setTimeout(() => {
          storageRef
            .child('uploads/' + this.name_pic)
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
            storageRef
            .child('uploads/' + this.name_pic)
            .getDownloadURL()
            .then(datas => {
              this.api.getDataByKey(this.key).subscribe(data1 => {
                const value = Object.keys(data1).map(key => data1[key]);
                value[0].picture = datas;
                value[0].status = 'ไม่ได้สรุปเกรด';
                value[0].date_sum = '';
                value[0].grade_sys = this.grade;
                value[0].datecuted = String(this.datecuted);
                value[0].sys_grage_cut_fn = this.userfirst;
                value[0].sys_grage_cut_ln = this.userlast;
                console.log(value[0]);
                this.apigrade.addData(value[0]).subscribe();
              });
            });
        }, 5000);
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
