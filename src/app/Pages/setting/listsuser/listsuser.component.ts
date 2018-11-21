import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/API-user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-listsuser',
  templateUrl: './listsuser.component.html',
  styleUrls: ['./listsuser.component.css']
})
export class ListsuserComponent implements OnInit {

  data: any;
  items = {
    $key: '',
    fname: '',
    lname: '',
    email: '',
    privilege_id: '',
    users: ''
  };

  constructor(private api: UserService) {

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
