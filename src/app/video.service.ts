import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Video} from './video';
@Injectable({
	providedIn:'root'
})

export class VideoService {

	private _getUrl = "http://localhost:3000/api/videos";
	private _postUrl = "http://localhost:3000/api/video";
	private _updateUrl = "http://localhost:3000/api/video/";
	private _deleteUrl = "http://localhost:3000/api/video/";
  	constructor(private _http: Http) {}
  	getVideos(){
  		return this._http.get(this._getUrl)
  		.map((response:Response) => response.json())
  	}
  	addVideo(video: Video){
  		let headers = new Headers({
  			'Content-Type':'application/json'
  		});
  		let options = new RequestOptions({
  			headers: headers
  		});
  		return this._http.post(this._postUrl, JSON.stringify(video), options).map((response: Response) => response.json());
  	}
  	updateVideo(video: Video){
  		let headers = new Headers({
  			'Content-Type':'application/json'
  		});
  		let options = new RequestOptions({
  			headers: headers
  		});
  		return this._http.put(
  			this._updateUrl+video._id, 
  			JSON.stringify(video), options).map((response: Response) => response.json());
  	}
  	deleteVideo(video:Video){
  		return this._http.delete(this._deleteUrl + video._id).map((response:Response) => response.json());
  	}
}   