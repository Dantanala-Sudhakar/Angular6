import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Department} from '../models/department.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Employee} from '../models/employee.model';
import {EmployeeService} from '../employee.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
	gender='male';
	datePickerConfig:Partial<BsDatepickerConfig>;
	previewPhoto:boolean=false;
	panelTitle:string;
	@ViewChild('employeeForm') public createEmployeeFrom: NgForm
	constructor(private employeeService:EmployeeService, private router:Router, private activatedRoute:ActivatedRoute) {
  	this.datePickerConfig = Object.assign({}, 
  		{
  			containerClass:'theme-dark-blue',
  			showWeekNumbers:false,
  			minDate: new Date(2018, 7, 11),
  			maxDate: new Date(2018, 7, 20)

  		});
  }
	employee:Employee;
	departments:Department[] = [
		{
			id:1,
			name:'Help Desk'
		},
		{
			id:2,
			name:'HR'
		},
		{
			id:3,
			name:'IT'
		},
		{
			id:4,
			name:'Payroll'
		}
	]
  

  ngOnInit() {
  		this.activatedRoute.paramMap.subscribe(params =>{
  			const employeeId = +params.get('id');
  			this.getEmployee(employeeId);
  		})
  }
  public getEmployee(employeeId){
  	if(employeeId == 0){
  		this.employee = {
			id: null,
			name:null,
			gender:null,
			email:'',
			phoneNumber:null,
			contactPreference:null,
			dateOfBirth:new Date,
			department:'select',
			isActive:null,
			photoPath:null
		}
		this.panelTitle = "Create Employee";
		this.createEmployeeFrom.reset();
  	} else {
  		this.panelTitle = "Edit Employee";
  		this.employeeService.getEmployee(employeeId).subscribe(employee => this.employee = employee);  	
  	}
  }
  onSave(){
  	if(this.employee.id){
  		this.employeeService.editEmployee(this.employee).subscribe(employee =>{
  			this.router.navigate(['/employees']);
  		});
  	} else {
	  	this.employeeService.addEmployee(this.employee).subscribe(successMsg => {
  			this.createEmployeeFrom.reset();
  			this.router.navigate(['/employees']);
  		})
  	}
  }
  togglePhotoPreview(){
  	this.previewPhoto = !this.previewPhoto;
  }
}
