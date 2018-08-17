import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {VideoCenterComponent} from './video-center/video-center.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ListEmployeesComponent} from './employees/list-employees.component';
import {CreateEmployeeComponent} from './employees/create-employee.component';
import {AuthGuard} from './employees/auth-guard.service';
import {Tab1Component} from './tabs/tab1.component';
import {Tab2Component} from './tabs/tab2.component';
import {EmployeeDetailsComponent} from './employees/employee-details.component';
import {EmployeeListResolverService} from './employee-list-resolver.service';
import {PageNotFoundComponent} from './page-not-found.component';
import {EmployeeDetailsGuardService} from './employees/employee-details-gurad.service';
const routes: Routes = [
	{path:'', canDeactivate:[], redirectTo:'/home',pathMatch:'full'},
	{path:'home',component:HomeComponent},
	{path:'videos',component:VideoCenterComponent},
	{
		path:'login',component:LoginComponent
	},
	{
		path:'signup',component:SignupComponent
	},
	{
		path:'employees',component:ListEmployeesComponent,
		resolve:{employeeList: EmployeeListResolverService}
	},
	{
		path:'employees/:id',
		component:EmployeeDetailsComponent,
		canActivate:[EmployeeDetailsGuardService]
	},
	{
		path: 'notFound',
		component: PageNotFoundComponent
	},
	{
		path:'edit/:id',component:CreateEmployeeComponent,
		canDeactivate:[AuthGuard],
		canActivateChild:[AuthGuard],
		children:[
			{
				path:'tab1',
				component:Tab1Component
			},
			{
				path:'tab2',
				component:Tab2Component
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
  	//enableTracing:true
  })],
  exports: [RouterModule],
  providers:[AuthGuard, EmployeeListResolverService, EmployeeDetailsGuardService]
})
export class AppRoutingModule { }