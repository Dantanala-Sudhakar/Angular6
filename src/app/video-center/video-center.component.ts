import { Component, OnInit } from '@angular/core';
import {Video} from './../video';
import {VideoService} from './../video.service';

@Component({
	selector:'video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers:[VideoService]
})
export class VideoCenterComponent implements OnInit {

	  videos: Array<Video>;
	  public hiddenNewVideo:boolean = true;
	  constructor(private _videoService: VideoService) { }

	  ngOnInit() {
	  	this._videoService.getVideos()
	  	.subscribe(resVideoData => this.videos = resVideoData);
	  }
	  selectedVideo:Video;
	  onSelectVideo(video:any){
	  	this.selectedVideo = video;
	  	console.log(this.selectedVideo);
	  	this.hiddenNewVideo = true;
	  }
	  onSubmitAddVideo(video: Video){
	  	this._videoService.addVideo(video).subscribe(resNewVideo => {
	  		this.videos.push(resNewVideo);
	  		this.selectedVideo = resNewVideo;
	  	})
	  }
	  newVideo(){
	  	this.hiddenNewVideo = false;
	  }
	  onUpdateVideoEvent(video: any){
	  	this._videoService.updateVideo(video).subscribe(resUpdatedVideo => video = resUpdatedVideo);
	  	this.selectedVideo = null;
	  }
	  onDeleteVideoEvent(video:any){
	  	console.log('called')
	  	let videoArray = this.videos;
	  	this._videoService.deleteVideo(video).subscribe(resDeletedVideo =>{
	  		for(let i=0; i< videoArray.length;i++){
	  			if(videoArray[i]._id === video._id){
	  				videoArray.splice(i,1);
	  			}
	  		}
	  	});
	  	this.selectedVideo = null;
	  }
}
