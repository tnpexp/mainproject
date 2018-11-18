import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  datalist: AngularFireList<any>;
  data: any[];
  status;
  addsetstatus = {
    dateready: '',
    datecuted: '',
    status: ''
  };
  test;
  dateready;
  constructor(public db: AngularFireDatabase) {
    this.data = [];
    this.datalist = db.list('/cattle');
    this.datalist.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const y  = action.payload.toJSON();
        y['key'] = action.key;
        this.data.push(y as Listitemcattle);
      });
    });
  }
  addstatus(key) {
    this.db.list('/cattle').update(key, this.addsetstatus);
  console.log(key);
      swal({
        title: 'สำเร็จ!',
        text: '',
        type: 'success',
        confirmButtonText: 'ปิด'
      });

  }
  tests(a) {
      this.addsetstatus.status = a;
  }

  testa(b) {
    this.addsetstatus.dateready = b;
    this.addsetstatus.datecuted = '';
  }
  ngOnInit() {

  }
}

export class Listitemcattle {
  id: string;
  left: string;
  right: string;
  datekil: string;
  datedry: string;
  dateready: string;
  wleft: string;
  wright: string;
  roomdry: string;
  owncattle: string;
  status: string;
}

