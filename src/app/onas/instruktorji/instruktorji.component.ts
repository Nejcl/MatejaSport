import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  state,
  animate,
  transition,
  group,
} from '@angular/animations';
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';

@Component({
  selector: 'app-instruktorji',
  templateUrl: './instruktorji.component.html',
  styleUrls: ['./instruktorji.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ 'max-height': '500px', 'opacity': '1', 'visibility': 'visible'})),
      state('out', style({  'max-height': '0px', 'opacity': '0', 'visibility': 'hidden' })),
      transition('in => out', [group([
        animate('200ms ease-in-out', style({
            'opacity': '0'
        })),
        animate('300ms ease-in-out', style({
            'max-height': '0px'
        })),
        animate('400ms ease-in-out', style({
            'visibility': 'hidden'
        }))
    ]
    )]),
    transition('out => in', [group([
        animate('1ms ease-in-out', style({
            'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
            'max-height': '500px'
        })),
        animate('800ms ease-in-out', style({
            'opacity': '1'
        }))
    ]
    )])
  ]),
  ]
})
export class InstruktorjiComponent implements OnInit {

  iPeople: Array<{name:string, job:string, description:string, woman:boolean, show:boolean}> = [
    {name:'Mateja Habjan',job:'TNZ, FIT PILATES, I.F.T.',description:'inštruktorica, maserka, osebna in kondicijska trenerka',woman: true, show: false},
    {name:'Tjaša Bergant',job:'TNZ, FIT PILATES, I.F.T.',description:'inštruktorica, receptorka',woman:true, show: false},
    {name:'Anita Derlink',job:'TNZ, FIT PILATES, I.F.T.',description:'inštruktorica',woman:true, show: false},
    {name:'Tina Peternelj',job:'TNZ, FIT PILATES, I.F.T.',description:'inštruktorica',woman:true, show: false},
    {name:'Špela Kokalj',job:'TNZ, FIT PILATES, I.F.T.',description:'inštruktorica, osebna trenerka',woman:true, show: false},
    {name:'Ana Žontar',job:'TNZ, FIT PILATES, I.F.T.',description:'inštruktorica',woman:true, show: false},
    {name:'Meta Vidic',job:'TNZ, FIT PILATES, I.F.T.',description:'inštruktorica',woman:true, show: false},
    {name:'Matej Drinovec',job:'TNZ, FIT PILATES, I.F.T.',description:'fizioterapevt, maser',woman:false, show: false},
  ];



  constructor() { }

  ngOnInit() {
  }

  showInfo(index:number){

    if(this.iPeople[index].show)
    {
      this.iPeople[index].show = false;
    }
    else
    {

      this.iPeople.forEach(element => {
        element.show = false;
      });
      this.iPeople[index].show = true;
    }

  }

}
