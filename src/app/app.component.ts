import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	public userName;
	closeResult;
	showLoadingIndicator = true;
	constructor(private userService:UserService, private router:Router,
		private locaSt:LocalStorageService,
		private _router:Router){
		this._router.events.subscribe((routerEvent:Event) =>{
			if(routerEvent instanceof NavigationStart){
				this.showLoadingIndicator = true;
			}
			if(routerEvent instanceof NavigationEnd ||
				routerEvent instanceof NavigationError ||
				routerEvent instanceof NavigationCancel){
				this.showLoadingIndicator = false;
			}
		})
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
