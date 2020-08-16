import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sestavatreninga',
  templateUrl: './sestavatreninga.component.html',
  styleUrls: ['./sestavatreninga.component.css']
})
export class SestavatreningaComponent implements OnInit, AfterViewInit {

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
