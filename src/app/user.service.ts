import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private _registerUrl = "http://localhost:3000/api/register";
	private _loginUrl = "http://localhost:3000/api/login";
	public getLoggedInName = new Subject();
  constructor(private _http: Http) { }
  addUser(user: User){
  		let headers = new Headers({
  			'Content-Type':'application/json'
  		});
  		let options = new RequestOptions({
  			headers: headers
  		});
  		return this._http.post(this._registerUrl, JSON.stringify(user), options)
  		.map((response: Response) => response.json())
  		.catch(this._errorHandler);
  	}
  	_errorHandler(error:Response){
  		console.log(error);
  		return Observable.throw(error || 'Server Error');
  		
  	}
  	loginUser(user: User){
  		let headers = new Headers({
  			'Content-Type':'application/json'
  		});
  		let options = new RequestOptions({
  			headers: headers
  		});
  		return this._http.post(this._loginUrl, JSON.stringify(user), 
  			options)
  		.map((response: Response) => {
  			this.getLoggedInName.next('sudhakar dantanala');
  			return response.json();
  		})
  		.catch(this._errorHandler);
  	}
}
