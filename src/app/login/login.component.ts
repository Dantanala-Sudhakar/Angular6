import { Component, OnInit } from '@angular/core';
import {User} from './../user';
import {UserService} from './../user.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _userService: UserService,
  	private router:Router) { }
  	public statusMessage:string;
  ngOnInit() {
  }
  onLogin(user: any){
  	this.statusMessage = '';
  	this._userService.loginUser(user)
  	.subscribe(successMsg => {
  		console.log('successMsg::'+JSON.stringify(successMsg))
  		if(successMsg){
  			this.router.navigate(['/home'])
  		} else {
  			this.statusMessage = "Username/Password doesn't exist"
  		}
  	}, failureMsg => {
		console.log('failureMsg::'+JSON.stringify(failureMsg));
  	})
  }
}
