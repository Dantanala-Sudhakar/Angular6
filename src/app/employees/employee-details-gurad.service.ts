import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {Employee} from '../models/employee.model';
import {Observable} from 'rxjs';
@Injectable({
	providedIn:'root'
})
export class EmployeeDetailsGuardService implements CanActivate{
	constructor(private employeeService:EmployeeService,
		private router:Router){}
	employeeExist:boolean;
	employee:Employee;
	canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>{
		return this.employeeService.getEmployee(+route.paramMap.get('id')).map(employee => {
			if(employee){
					return true;
				} else {
					this.router.navigate(['/notFound']);
					return false;
				}
		});
	} 
}