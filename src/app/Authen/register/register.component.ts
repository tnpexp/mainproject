import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  dataUsers = {
    users: '',
    pass: '',
    question: '',
    answer: '',
    fname: '',
    lname: '',
    efname: '',
    elname: '',
    gender: '',
    day_of_birth: '',
    id_card: '',
    email: '',
    address: '',
    iphone_num: '',
    fax: '',
    privilege_id: ''
  };

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private auth: AuthService
    ) {

    }

  ngOnInit() {
  }

  addUsers(dataUsers: NgForm) {
    if (dataUsers.value.users === '' || dataUsers.value.pass === '' || dataUsers.value.question === ''
    || dataUsers.value.answer === '' || dataUsers.value.fname === '' || dataUsers.value.lname === ''
    || dataUsers.value.efname === '' || dataUsers.value.eflast === '' || dataUsers.value.day_of_birth === ''
    || dataUsers.value.id_card === '' || dataUsers.value.email === '' || dataUsers.value.address === ''
    || dataUsers.value.phone_num === '') {
      swal({
        title: 'สมัครสมาชิกไม่สำเร็จ!',
        text: 'สมัครสมาชิกไม่สำเร็จ กรุณาตรวจสอบและกรอกข้อมูลให้ครบถ้วน',
        type: 'error',
        confirmButtonText: 'ปิด'
      });
    } else {
      this.auth.register(dataUsers.value.email, dataUsers.value.pass);
      this.db.list('/user').push(dataUsers.value);
      console.log(dataUsers.value);
      swal({
        title: 'สมัครสมาชิกสำเร็จ!',
        text: 'สมัครสมาชิกสำเร็จ ปิดหน้าต่างนี้เพื่อเข้าสู่ระบบ',
        type: 'success',
        confirmButtonText: 'ปิด'
      });
      this.auth.logout();
      this.router.navigate(['/login']);
      setTimeout(() => location.reload(), 800);
    }
  }
}
