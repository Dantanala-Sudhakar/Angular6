import {EventEmitter, Component, Input, SimpleChanges, Output,
	OnInit, OnChanges, DoCheck, AfterContentChecked, AfterViewChecked, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import {Employee} from '../models/employee.model'
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements 
	OnInit, DoCheck, OnChanges, AfterContentChecked, AfterViewChecked,
	AfterViewInit,
	AfterContentInit, OnDestroy {
	@Input() employee:Employee;
	@Input () searchTerm:string;
	@Output() notify:EventEmitter<Employee> = new EventEmitter<Employee>();
	@Output() deleteEmployeeNotify:EventEmitter<Employee> = new EventEmitter<Employee>();
	/*private _employee:Employee;
	@Input() 
	set employee(val:Employee){
		this._employee = val;
	}
	get employee():Employee{
		return this._employee;
	}*/
	selectedEmployeeId:string;
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private employeeService:EmployeeService) {}

  	ngOnChanges(changes: SimpleChanges){
  		/*const previousEmployee = <Employee>changes.employee.previousValue;
  		const currentEmployee = <Employee>changes.employee.currentValue;

  		console.log('Previous '+ (previousEmployee ? previousEmployee.name: ''))
  		console.log('Current '+ (currentEmployee.name))*/
  		console.log('ngOnChanges')
  	}
	ngOnInit() {
		//alert('called')
		/*console.log('params:::'+JSON.stringify(this.activatedRoute.params));
		console.log('paramMap::'+JSON.stringify(this.activatedRoute.paramMap));
		console.log('queryParams::'+JSON.stringify(this.activatedRoute.queryParams));
		console.log('queryParamMap::'+JSON.stringify(this.activatedRoute.queryParamMap));*/
		this.selectedEmployeeId = this.activatedRoute.snapshot.paramMap.get('id');
		//console.log('ngOnInit');
	}
  	ngDoCheck(){
  		//console.log('ngDoCheck')
  	}
  	ngAfterContentInit() {
  		//console.log('ngAfterContentInit')
  	}
  	ngAfterContentChecked(){
		//console.log('ngAfterContentChecked')
  	}
  	ngAfterViewInit(){
  		//console.log('ngAfterViewInit')
  	}
  	ngAfterViewChecked(){
  		//console.log('ngAfterViewChecked')
  	}
  	ngOnDestroy(){
  		//console.log('ngOnDestroy')
  	}
  	handleClick(){
  		this.notify.emit(this.employee);
  	}
  	getEmployeeNameAndGender(){
  		return this.employee.name + ' and ' + this.employee.gender;
  	}
  	viewEmployee(employeeId:number){
  		this.router.navigate(['/employees',employeeId], {
  			queryParams: {
  				'searchTerm':this.searchTerm,
  				'testParam':'testValue'
  			}
  		});
  	}
  	editEmployee(employeeId:number){
  		this.router.navigate(['/edit',employeeId]);
  	}
  	deleteEmployee(employee:Employee){
  		this.deleteEmployeeNotify.emit(this.employee);
  	}
}
