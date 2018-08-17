import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from './../user'
import {UserService} from './../user.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[UserService]
})
export class SignupComponent implements OnInit {
	@ViewChild('signupForm') public signupForm : NgForm;
  user:User={
    _id:null,
    email:null,
    password:null,
    confirmPassword:null,
    userName:null
  };
	public statusMsg:string;
  constructor(private _userService: UserService) { }

  ngOnInit() {
  }
  onSignup(user: any){
  	this.statusMsg = "";
  	this._userService.addUser(user)
  	.subscribe(successMsg => {
  		this.statusMsg = "Successfully registered";
  		this.signupForm.reset();
  	}, failureMsg => {
		this.statusMsg = "User name is already exist";
  	})
  }
}
