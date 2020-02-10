import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AddInterviewComponent } from './interview/add-interview/add-interview.component';
import { ListInterviewComponent } from './interview/list-interview/list-interview.component';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './shared/layout/header/header.component';
import {NgbPaginationModule, NgbAlertModule, NgbActiveModal,NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { EditInterviewComponent } from './interview/edit-interview/edit-interview.component';
import { ListCandidateComponent } from './candidate/list-candidate/list-candidate.component';
import { ViewCandidateComponent } from './candidate/view-candidate/view-candidate.component';
import { DataCandidateComponent } from './candidate/data-candidate/data-candidate.component';
import { ListRecordComponent } from './record/list-record/list-record.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { AddChallengeComponent } from './challenge/add-challenge/add-challenge.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ConstructionSiteComponent } from './construction-site/construction-site.component';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { SafeHtmlPipe } from './shared/safe-html-pipe/safe-html';
import { DataUserComponent } from './user/data-user/data-user.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddInterviewComponent,
    ListInterviewComponent,
    HeaderComponent,
    EditInterviewComponent,
    ListCandidateComponent,
    ListRecordComponent,
    ViewUserComponent,
    ViewCandidateComponent,
    DataCandidateComponent,
    AddChallengeComponent,
    LoginComponent,
    ConstructionSiteComponent,
    DataTableComponent,
    SafeHtmlPipe,
    DataUserComponent
  ],
  providers: [
    NgbActiveModal,
    DatePipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DatePickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbPaginationModule, NgbAlertModule,NgbModule,
    DialogModule,
    ToastrModule.forRoot({closeButton: true}),
    BrowserAnimationsModule,
    MultiSelectModule,
    RouterModule.forRoot(routes),
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
