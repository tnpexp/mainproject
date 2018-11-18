import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule} from '@angular/forms';
import { GlobalService } from './services/global.service';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { HeadComponent } from './navbar/head/head.component';
import { FootComponent } from './navbar/foot/foot.component';
import { AppRoutingModule } from './app-routing.module';
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

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ListingsComponent } from './listings/listings/listings.component';
import { AddListingComponent } from './listings/add-listing/add-listing.component';
import { EditListingComponent } from './listings/edit-listing/edit-listing.component';
import { EditProfileComponent } from './pages/setting/edit-profile/edit-profile.component';
import { SettingComponent } from './Pages/setting/setting.component';
import { firestore } from 'firebase';

import { FireauthService } from './services/firebase service/fireauth.service';
import { FirestoreService } from './services/firebase service/firestore.service';
import { FirestorageService } from './services/firebase service/firestorage.service';
import { UploadService } from './uploads/shared/upload.service';
import { NavsetComponent } from './Pages/setting/navset/navset.component';
import { ListsuserComponent } from './Pages/setting/listsuser/listsuser.component';
import { SettinggradeComponent } from './Pages/setting/settinggrade/settinggrade.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';
import { SetSumgradeComponent } from './Pages/setting/set-sumgrade/set-sumgrade.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FootComponent,
    DataCattleComponent,
    LoginComponent,
    RegisterComponent,
    AboutCattleComponent,
    DashBoardComponent,
    GradingComponent,
    GradedComponent,
    SumgradeComponent,
    HistoryComponent,
    ReportComponent,
    SumgradedComponent,
    ListingsComponent,
    AddListingComponent,
    EditListingComponent,
    SettingComponent,
    EditProfileComponent,
    NavsetComponent,
    ListsuserComponent,
    SettinggradeComponent,
    SetSumgradeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    SweetAlert2Module.forRoot(),
    AngularFireAuthModule,
    HttpModule,
  ],
  providers: [UploadService,
   GlobalService,
    AuthService,
    FireauthService,
    FirestoreService,
    FirestorageService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
