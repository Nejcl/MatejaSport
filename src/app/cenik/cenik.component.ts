import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  trigger,
  style,
  state,
  animate,
  transition,
  group,
} from '@angular/animations';



@Component({
  selector: 'app-cenik',
  templateUrl: './cenik.component.html',
  styleUrls: ['./cenik.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ 'height': '100%', 'opacity': '1', 'visibility': 'visible'})),
      state('out', style({  'height': '0px', 'opacity': '0', 'visibility': 'hidden' })),
      transition('in => out', [group([
        animate('200ms ease-in-out', style({
            'opacity': '0'
        })),
        animate('300ms ease-in-out', style({
            'height': '0px'
        })),
        animate('400ms ease-in-out', style({
            'visibility': 'hidden'
        }))
    ]
    )]),
    transition('out => in', [group([
        animate('100ms ease-in-out', style({
            'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
            'height': '100%'
        })),
        animate('800ms ease-in-out', style({
            'opacity': '1'
        }))
    ]
    )])
  ]),
  ]
})
export class CenikComponent implements OnInit, AfterViewInit {

  iShow: Array<boolean> =[false,false,false,false,false, false, false, false];


  ngOnInit() {
  }

  showInfo(index: number) {

    console.log(index);
    if(this.iShow[index])
    {
      this.iShow[index] = false;
    }
    else
    {

      this.iShow.forEach(element => {
        element = false;
      });
      this.iShow[index] = true;
    }

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
