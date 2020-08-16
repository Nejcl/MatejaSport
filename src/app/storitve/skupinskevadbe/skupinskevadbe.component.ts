import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-skupinskevadbe',
  templateUrl: './skupinskevadbe.component.html',
  styleUrls: ['./skupinskevadbe.component.css']
})
export class SkupinskevadbeComponent implements OnInit, AfterViewInit {

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
