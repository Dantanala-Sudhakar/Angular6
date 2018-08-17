import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import {Employee} from './models/employee.model';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
const httpOptions={
	headers:new HttpHeaders({'Content-Type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
	private employeesUrl = 'api/employees';
  constructor(private http:HttpClient) {
  }
  	getEmployees():Observable<Employee[]>{
  		return this.http.get<Employee[]>(this.employeesUrl).pipe(
  			tap(employees => console.log('fetched heroes'))
  		)
  	}
  	getEmployee(employeeId:number):Observable<Employee>{
  		var url = `api/employees/${employeeId}`;
  		return this.http.get<Employee>(url).pipe(
	  		tap(_ => console.log(`fetched hero id=${employeeId}`)),
  			catchError(this.handleError<Employee>(`getEmployee id=${employeeId}`))
  		);
  	}
  	addEmployee(employee:Employee){
  		return this.http.post(this.employeesUrl, employee, httpOptions).pipe(
  			tap(_ => console.log('Employee details added'))
  		)
  	}
  	editEmployee(employee:Employee){
  		var url = `api/employees/${employee.id}`;
  	return this.http.put(url, employee, httpOptions).pipe(
  			tap(_ => console.log(`updated employee id=${employee.id}`)),
  			catchError(this.handleError<any>('editEmployee'))
  		)
  	}
  	deleteEmployee(employee:Employee){
  		var url = `api/employees/${employee.id}`;
  		return this.http.delete<Employee>(url, httpOptions).pipe(
  				tap(_ => console.log('employee deleted'))
  			)
  	}
  	private handleError<T>(operation='operation', result ?: T)
	{
		return(error:any):Observable<T> => {
			//console.error(error);
			console.log(`${operation} failed ${error.message}`);
			return of(result as T);
		}
	}
}
