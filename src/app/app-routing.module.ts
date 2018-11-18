import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataCattleComponent } from './AddData/data-cattle/data-cattle.component';
import { LoginComponent } from './Authen/login/login.component';
import { RegisterComponent } from './Authen/register/register.component';
import { AboutCattleComponent } from './Pages/about-cattle/about-cattle.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { GradingComponent } from './Pages/grading/grading.component';
import { GradedComponent } from './Pages/Grading/graded/graded.component';
import { SumgradeComponent } from './Pages/sumgrade/sumgrade.component';
import { HistoryComponent } from './Pages/history/history.component';
import { ReportComponent } from './Pages/report/report.component';
import { SumgradedComponent } from './Pages/Sumgrade/sumgraded/sumgraded.component';
import { EditProfileComponent } from './pages/setting/edit-profile/edit-profile.component';
import { SettingComponent } from './Pages/setting/setting.component';
import { ListsuserComponent } from './Pages/setting/listsuser/listsuser.component';
import { SettinggradeComponent } from './Pages/setting/settinggrade/settinggrade.component';
import { SetSumgradeComponent } from './Pages/setting/set-sumgrade/set-sumgrade.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'grading', component: GradingComponent },
  { path: 'graded', component: GradedComponent },
  { path: 'aboutcattle', component: AboutCattleComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'report', component: ReportComponent },
  { path: 'sumgrade', component: SumgradeComponent },
  { path: 'addcattle', component: DataCattleComponent },
  { path: 'sumgraded', component: SumgradedComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'listsuser', component: ListsuserComponent },
  { path: 'settinggrade', component: SettinggradeComponent },
  { path: 'setsumgrade', component: SetSumgradeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
