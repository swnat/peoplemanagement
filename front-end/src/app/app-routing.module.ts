import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInterviewComponent } from './interview/add-interview/add-interview.component';
import { HomeComponent } from './home/home.component';
import { ListInterviewComponent } from './interview/list-interview/list-interview.component';
import { EditInterviewComponent } from './interview/edit-interview/edit-interview.component';
import { ListCandidateComponent } from './candidate/list-candidate/list-candidate.component';
import { DataCandidateComponent } from './candidate/data-candidate/data-candidate.component';
import { ViewCandidateComponent } from './candidate/view-candidate/view-candidate.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { ListRecordComponent } from './record/list-record/list-record.component';
import { LoginComponent } from './login/login.component';
import { AuthorizatedGuard } from './shared/auth/authorizated.guard';
import { NoLoginGuard } from './shared/auth/no-login.guard';
import { ConstructionSiteComponent } from './construction-site/construction-site.component';
import { DataUserComponent } from './user/data-user/data-user.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'construction', component: ConstructionSiteComponent }, 
  { path: '', component: HomeComponent, canActivate: [ AuthorizatedGuard ], children:
      [
        {
          path: '',
          canActivateChild: [AuthorizatedGuard],
          children: [
            { path: '', component: ListRecordComponent , canActivateChild: [AuthorizatedGuard]}
          ]
        },
        {
          path: 'interview',
          canActivateChild: [AuthorizatedGuard],
          children: [
            { path: 'add', component: AddInterviewComponent , canActivateChild: [AuthorizatedGuard]},
            { path: 'edit/:id', component: EditInterviewComponent , canActivateChild: [AuthorizatedGuard]}
          ]
        },
        {
          path: 'candidate',
          canActivateChild: [AuthorizatedGuard],
          children: [
                       
            { path: 'data', component: ViewCandidateComponent , canActivateChild: [AuthorizatedGuard]},
            { path: 'data/:id', component: ViewCandidateComponent , canActivateChild: [AuthorizatedGuard]},
            { path: '', component: ListCandidateComponent, canActivateChild: [AuthorizatedGuard] },
            { path: ':id', component: ListInterviewComponent, canActivateChild: [AuthorizatedGuard]}
          ]
        },
        {
          path: 'user',
          children: [
            { path: 'data/:id', component: ViewUserComponent },
            { path: 'add', component: DataUserComponent},
            { path: 'edit/:id', component: DataUserComponent }
          ]
        }

      ]
  },
  {path: 'login', component: LoginComponent, canActivate: [ NoLoginGuard ]},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }