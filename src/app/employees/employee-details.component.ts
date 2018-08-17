import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../models/employee.model';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
	employee:Employee;
	_id:number;
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private employeeService:EmployeeService) { }

  ngOnInit() {
  	this.getEmployee();
  }
  getEmployee(){
  	/*const id = +this.activatedRoute.snapshot.paramMap.get('id');
  	this.employeeService.getEmployee(id).subscribe(employee =>{
  		this.employee = employee;
  	})*/
	this.activatedRoute.paramMap.subscribe(params =>{
		this._id = +params.get('id');
	  	this.employeeService.getEmployee(this._id).subscribe(employee =>{
	  		console.log('called')
	  		this.employee = employee;
	  	})  	
	});
  }
  nextEmployee(){
  	if(this._id <=2){
	  	this._id = this._id +1;
	  	this.router.navigate(['/employees',this._id])
  	} else {
  		this._id = 1;
  		this.router.navigate(['/employees',this._id])
  	}
  }
}
