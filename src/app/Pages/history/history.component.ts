import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  datasumedlist: AngularFireList<any>;
  datasumed: any[];
  constructor(public db: AngularFireDatabase) {
    this.datasumed = [];
    this.datasumedlist = db.list('/summed');
    this.datasumedlist.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const y  = action.payload.toJSON();
        y['key'] = action.key;
        this.datasumed.push(y as Listitemcattle);
      });
    });
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

  date_sum: string;
  datecuted: string;
  grade_ex: string;
  grade_sys: string;
  grade_con: string;

  fn_ex1: string;
  fn_ex2: string;
  fn_ex3: string;
  fn_ex4: string;
  fn_ex5: string;
  ln_ex1: string;
  ln_ex2: string;
  ln_ex3: string;
  ln_ex4: string;
  ln_ex5: string;

  sys_grage_sum_fn: string;
  sys_grage_sum_ln: string;
}