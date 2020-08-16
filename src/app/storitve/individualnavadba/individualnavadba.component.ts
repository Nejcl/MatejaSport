import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-individualnavadba',
  templateUrl: './individualnavadba.component.html',
  styleUrls: ['./individualnavadba.component.css']
})
export class IndividualnavadbaComponent implements OnInit, AfterViewInit {

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
