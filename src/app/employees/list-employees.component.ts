import { Component, OnInit } from '@angular/core';
import {Employee} from '../models/employee.model';
import {EmployeeService} from '../employee.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
	employees: Employee[];
	employeeToDisplay:Employee;
	private arrayIndex = 1;
	dataFromChild:Employee;
	filteredEmployees:Employee[];

	private _searchTerm:string;

	get searchTerm():string{
		return this._searchTerm;
	}
	set searchTerm(value:string){
		this._searchTerm = value;
		this.filteredEmployees = this.filterEmployees(value);
	}
	filterEmployees(searchString:string){
		return this.employees.filter(emploee => emploee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
	}

  constructor(private aRoute:ActivatedRoute, private router:Router,private employeeService:EmployeeService) { 
  	this.employees = this.aRoute.snapshot.data['employeeList'];
  	this.aRoute.queryParamMap.subscribe(params =>{
  			if(params.has('searchTerm')){
  				this.searchTerm = params.get('searchTerm');
  			} else {
  				this.filteredEmployees = this.employees;
  			}
  		})
  }

  ngOnInit() {
  		//this.getEmployees();
  }
  /*getEmployees():void{
  	this.employeeService.getEmployees().subscribe(employees => {
  		//this.employees = employees;
  		if(this.aRoute.snapshot.queryParamMap.has('searchTerm')){
  			this.searchTerm = this.aRoute.snapshot.queryParamMap.get('searchTerm');
  		} else {
  			this.filteredEmployees = employees;
  		}
  		this.aRoute.queryParamMap.subscribe(params =>{
  			if(params.has('searchTerm')){
  				this.searchTerm = params.get('searchTerm');
  			} else {
  				this.filteredEmployees = employees;
  			}
  		})
  	});
  }*/
  	nextEmployee():void{
  		if(this.arrayIndex<=2){
  			this.employeeToDisplay = this.employees[this.arrayIndex]
  			this.arrayIndex++;
  		} else {
  			this.employeeToDisplay = this.employees[0];
  			this.arrayIndex = 1;
  		}
  	}
  	handleNotify(eventData:Employee){
  		this.dataFromChild = eventData;
  	}
  	deleteEmployee(eventData:Employee){
  		this.dataFromChild = eventData;
  		this.employees = this.employees.filter(employee => employee !== eventData);
  		this.employeeService.deleteEmployee(this.dataFromChild).subscribe();
  		this.filteredEmployees = this.employees;
  	}
  	/*empDetailsClick(employeeId:number){
  		this.router.navigate(['/employees',employeeId], {
  			queryParams: {
  				'searchTerm':this.searchTerm,
  				'testParam':'testValue'
  			}
  		});
  	}*/
}
