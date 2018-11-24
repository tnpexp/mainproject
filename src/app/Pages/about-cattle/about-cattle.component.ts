import { Component, OnInit } from '@angular/core';
import { AboutcattleService } from '../../services/API-aboutcattle/aboutcattle.service';
import { LyTheme2 } from '@alyle/ui';

const styles = () => ({
  root: {
    button: {
      marginEnd: '1em',
      marginTop: '.5em',
      marginBottom: '.5em'
    }
  },
  row: {
    display: 'flex',
    marginBottom: '.5em'
  }
});

@Component({
  selector: 'app-about-cattle',
  templateUrl: './about-cattle.component.html',
  styleUrls: ['./about-cattle.component.css']
})
export class AboutCattleComponent implements OnInit {
  classes = this.theme.addStyleSheet(styles);

  chk;
  name: any;
  idcheck = [];
  selectQuestions: string[] = [];
  a = 0;
  c = {
    check: false
  };

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

  constructor(private api: AboutcattleService,
    private theme: LyTheme2) {

  }

  ngOnInit() {
    this.api.showData().subscribe(data => {
      this.data = Object.values(data);
      for (let i = 0; i < Object.values(data).length; i++) {
        this.data[i].key = Object.keys(data)[i];
      }
    });
  }

  checkAll_list() {
/* checkbox ทั้งหมด */
    console.log(this.a);
    if (this.a === 0) {
       this.c.check = true;
       this.idcheck = [];
       this.data.forEach( a => {
          this.idcheck.push(a.key);
          this.selectQuestions.push(a.key);
       });
       this.a = 1;
    } else {
      this.c.check = false;
      this.a = 0;
      this.idcheck = [];
      this.selectQuestions = [];
    }
    console.log(this.idcheck);
  }

selectMenu(k) {
/* checkbox ทีละตัว */
    console.log(k);
    this.chk = this.selectQuestions.indexOf(k);
    if (this.chk >= 0) {
      this.idcheck.splice(this.chk, 1);
      this.selectQuestions.splice(this.chk, 1);
    } else {
      this.idcheck.push(k);
      this.selectQuestions.push(k);
    }
    console.log(this.idcheck);
  }
}
