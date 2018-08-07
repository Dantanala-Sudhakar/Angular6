import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	public userName;
	closeResult;
	constructor(private userService:UserService, private router:Router,
		private locaSt:LocalStorageService){

	}
	ngOnInit(){
		this.userService.getLoggedInName.subscribe(name => {
			this.userName = name;
			this.locaSt.store('userName',this.userName);
		});
		if(this.locaSt.retrieve('userName')){
			this.userName = this.locaSt.retrieve('userName');
		}
	}
	onLogout(){
		this.userName = '';
		this.locaSt.store('userName',this.userName);
		this.router.navigate(['/login']);
	}
  title = 'ngApp';
}
