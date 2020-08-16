import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-rehabilitacija',
  templateUrl: './rehabilitacija.component.html',
  styleUrls: ['./rehabilitacija.component.css']
})
export class RehabilitacijaComponent implements OnInit, AfterViewInit {

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
