import { Component, OnInit } from '@angular/core';
import { SumgradeService } from '../../services/API-sumgrade/sumgrade.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  data: any;
  items = {
    $key: '',
    id: '',
    left: '',
    right: '',
    datekil: '',
    datedry: '',
    dateready: '',
    wleft: '',
    wright: '',
    roomdry: '',
    owncattle: '',
    status: '',
    picture: '',

    date_sum: '',
    datecuted: '',
    grade_ex: '',
    grade_sys: '',
    grade_con: '',

    fn_ex1: '',
    fn_ex2: '',
    fn_ex3: '',
    fn_ex4: '',
    fn_ex5: '',
    ln_ex1: '',
    ln_ex2: '',
    ln_ex3: '',
    ln_ex4: '',
    ln_ex5: '',
    sys_grage_cut_fn: '',
    sys_grage_cut_ln: '',
    sys_grage_sum_fn: '',
    sys_grage_sum_ln: ''
  };

  constructor(private api: SumgradeService) {

  }

  ngOnInit() {
    this.api.showData().subscribe(data => {
      this.data = Object.values(data);
      for (let i = 0; i < Object.values(data).length; i++) {
        this.data[i].key = Object.keys(data)[i];
      }
    });
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
  picture: string;

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
