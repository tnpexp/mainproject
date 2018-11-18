import { Component, OnInit } from '@angular/core';
import { GradedService } from '../../services/API-graded/graded.service';

@Component({
  selector: 'app-sumgrade',
  templateUrl: './sumgrade.component.html',
  styleUrls: ['./sumgrade.component.css']
})
export class SumgradeComponent implements OnInit {

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
    status: '',
    picture: '',
    datecuted: '',
    grade_sys: ''
  };

  constructor(public api: GradedService) {

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
