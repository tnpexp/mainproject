import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Upload } from 'src/app/uploads/shared/upload';
import { UploadService } from 'src/app/uploads/shared/upload.service';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  key;
  datalist: AngularFireList<any>;
  datauser: any[];
  data: Observable<any[]>;
  picName = 'เลือกไฟล์รูปภาพ';
  detail;
  public users;
  public userfirst;
  public userlast;
  public efname;
  public elname;
  public email;
  public day_of_birth;
  public gender;
  public id_code;
  public address;
  public city;
  public State;
  public zip;
  public phone_num;
  public fax;

  constructor(
    private db: AngularFireDatabase,
    private upload: UploadService,
    private _route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private global: GlobalService
  ) {
    this.afAuth.authState.subscribe(data => {
      this.detail = this.db
        .list('/user', ref => ref.orderByChild('email').equalTo(data.email))
        .valueChanges();
      console.log(data.email);
      this.detail.subscribe(snap => {
        snap.forEach(element => {
          this.userfirst = element.fname;
          this.userlast = element.lname;
          this.State = element.State;
          this.address = element.address;
          this.city = element.city;
          this.day_of_birth = element.day_of_birth;
          this.efname = element.efname;
          this.elname = element.elname;
          this.email = element.email;
          this.fax = element.fax;
          this.id_code = element.id_code;
          this.phone_num = element.phone_num;
          this.zip = element.zip;
          this.users = element.users;
          this.gender = element.gender;

          this.global.setUser(element.users);
        });
      });
    });

    this.datauser = [];
    this.datalist = db.list('/cattle');
    this.datalist.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const y  = action.payload.toJSON();
        y['key'] = action.key;
        this.datauser.push(y as Listitemuser);
      });
    });
  }

  ngOnInit() {
  }

}

export class Listitemuser {
  State: string;
  address: string;
  answer: string;
  city: string;
  day_of_birth: string;
  efname: string;
  elname: string;
  email: string;
  fax: string;
  fname: string;
  gender: string;
  id_code: string;
  lname: string;
  phone_num: string;
  privilege_id: string;
  question: string;
  users: string;
  zip: string;
}
