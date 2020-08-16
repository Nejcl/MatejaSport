import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-rojstnodnevne',
  templateUrl: './rojstnodnevne.component.html',
  styleUrls: ['./rojstnodnevne.component.css']
})
export class RojstnodnevneComponent implements OnInit, AfterViewInit {

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
