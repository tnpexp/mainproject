import { Component, OnInit } from '@angular/core';
import { AboutcattleService } from '../../services/API-aboutcattle/aboutcattle.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-about-cattle',
  templateUrl: './about-cattle.component.html',
  styleUrls: ['./about-cattle.component.css']
})
export class AboutCattleComponent implements OnInit {

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

  constructor(private api: AboutcattleService) {

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
