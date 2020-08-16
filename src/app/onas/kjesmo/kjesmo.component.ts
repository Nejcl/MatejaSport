import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-kjesmo',
  templateUrl: './kjesmo.component.html',
  styleUrls: ['./kjesmo.component.css']
})
export class KjesmoComponent implements OnInit, AfterViewInit {

  lat: number = 46.14497;
  lng: number = 14.21547;


  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit()
  {
      let top = document.getElementById('top');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
  }

}
