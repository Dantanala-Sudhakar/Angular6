import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
@Directive({
  selector: '[highlightMe]'
})
export class TitleDirective implements OnInit{
	@Input() defaultColor:string;
  constructor(private el:ElementRef) {
  	this.el.nativeElement.style.backgroundColor = "yellow"
  }
  @HostListener ('mouseenter') onmouseenter (){
  	this.highlight('red');
  }
  @HostListener ('mouseleave') onmouseleave (){
  	this.highlight('green');
  }
  private highlight(color: string){
  	this.el.nativeElement.style.backgroundColor = color;
  }
  ngOnInit(){
  	this.highlight(this.defaultColor);
  }
}
