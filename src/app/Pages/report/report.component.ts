import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  data: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.showData().subscribe(data => {
      console.log(data);
      this.data = Object.values(data);
      // for (let i = 0;i < Object)
    });
  }

}
