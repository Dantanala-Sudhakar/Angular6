import {Injectable} from '@angular/core';
import {CanDeactivate, CanActivateChild, CanActivate} from '@angular/router';  
import {CreateEmployeeComponent} from './create-employee.component'; 
@Injectable({
	providedIn:'root'
})
export class AuthGuard implements CanDeactivate<CreateEmployeeComponent>, CanActivateChild{ 
	canDeactivate(component: CreateEmployeeComponent): boolean{
		if(component.createEmployeeFrom.dirty && !component.createEmployeeFrom.submitted){
			return confirm("Are you sure, you want to discard your changes.!")
		} else {
			return true;
		}
	}
	canActivateChild():boolean{
		console.log('can activate child');
		return true;
	}
}