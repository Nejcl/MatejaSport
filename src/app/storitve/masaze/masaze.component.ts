import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-masaze',
  templateUrl: './masaze.component.html',
  styleUrls: ['./masaze.component.css']
})
export class MasazeComponent implements OnInit, AfterViewInit {

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
