import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public user: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
   }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
    (data) => {

     const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    toast({
      type: 'success',
      title: 'เข้าสู่ระบบสำเร็จ!'
    });
    this.router.navigate(['/']);
    setTimeout(() => location.reload(), 500);
    }, err => {
        swal({
        title: 'เข้าสู่ระบบไม่สำเร็จ!',
        text: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบใหม่อีกครั้ง',
        type: 'error',
        confirmButtonText: 'ปิด'
        });
        this.router.navigate(['/login']);
      }
    );
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
    location.reload();
  }

  cookieAuth(): Observable<boolean> {
    return this.user.pipe(map(user => user && user.uid !== undefined));
  }

  register(email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(data => {
      console.log('Register Sucess');
    }, err => {
      console.log('Regisrter Failed');
    });
  }
}
