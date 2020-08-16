import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  imageUrlArray: string[];

  constructor() { }

  ngOnInit() {
    this.imageUrlArray =  [
      '/assets/Naslovne/title1.jpg',
      '/assets/Naslovne/title2.jpg',
      '/assets/Naslovne/title3.jpg',
    ];
  }

}
