import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Video} from './../video';
@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
	@Input() videos;
	@Output() selectedVideo = new EventEmitter();
	@Output() deleteVideoEvent = new EventEmitter();
	closeResult: string;
  constructor() { }

  ngOnInit() {
  }
  onSelectVideo(vid: Video){
  	this.selectedVideo.emit(vid)
  }
  onDeleteVideo(vid:Video){
  	console.log('hi'+JSON.stringify(vid))
	this.deleteVideoEvent.emit(vid);
  }
}
