import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../database.service';
import UrnikJson from '../../urnik.json';

@Component({
  selector: 'app-urnik',
  templateUrl: './urnik.component.html',
  styleUrls: ['./urnik.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UrnikComponent implements OnInit,AfterViewInit {

  Hours = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  Vadba: Array<{dan:string, od:string, do:string, naziv: string, vodi:string, color:string}>;

  constructor(private dbService: DatabaseService) {
    //this.Vadba = UrnikJson;
   }

  ngOnInit() {

    this.dbService.readUrnik().subscribe(
      (data) => {
        this.Vadba = data;
        this.showUrnik();
       }
    );


   }

  ngAfterViewInit(){
   // this.showUrnik();

        let top = document.getElementById('top');
        if (top !== null) {
          top.scrollIntoView();
          top = null;
        }

  }

  showUrnik(){
    var uraHTML = 'color: black;font-weight: 600; margin-left:10px;margin-top:5px; font-size:12px;opacity: 0.7;';
    var vadbaHTML = 'color: black;font-weight: 600; margin-left:10px;margin-top:5px; font-size:14px ';
    var vodiHTML = 'color: black;font-weight: 600; font-size:12px;position:absolute;bottom:5px;right:5px';

    let usedHours: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];


    this.Vadba.forEach(element => {

      let ura = element.od.split(':');
      if(ura[0][0] == '0')
      {
        ura[0] = ura[0][1];
      }
      element.od = ura[0] + ":" + ura[1];

      if(+ura[1] >= 30){usedHours[+ura[0]] = true;}
      else{usedHours[+ura[0]-1] = true;}

      let ura2 = element.do.split(':');
      if(ura2[0][0] == '0')
      {
        ura2[0] = ura2[0][1];
      }
      element.do = ura2[0] + ":" + ura2[1];

     if(+ura2[1] > 30){usedHours[+ura2[0]] = true;}
     else{usedHours[+ura2[0]-1] = true;}

      let offset = (+ura[1] / 60 * 100 - 50)*0.63;
      let duration =(((+ura2[0] - +ura[0]) * 100) - (offset) + ((+ura2[1] / 60 * 100)-50)*0.63)*0.63;
      document.getElementById(element.dan + '-' + ura[0] ).innerHTML =
      `<div style="width:100%;position:absolute; top:${offset}px;left:0px; height:${duration}px;background-color: ${element.color};
      text-align:left; font-family: 'Roboto'; ">
        <div style="${uraHTML}">
        ${element.od}-${element.do}</div>
        <div style="${vadbaHTML}"> ${element.naziv.toUpperCase()}</div>
        <div style="${vodiHTML}">${element.vodi}</div>
     </div>`;

    });

    for (let index = 0; index < usedHours.length; index++) {
      if(!usedHours[index] && index >= 5 && index <= 21)
      {
        document.getElementById('ura-' + index.toString()).setAttribute('style', 'height:15px');
        document.getElementById('ponedeljek-' + index.toString()).setAttribute('style', 'height:15px');
        document.getElementById('torek-' + index.toString()).setAttribute('style', 'height:15px');
        document.getElementById('sreda-' + index.toString()).setAttribute('style', 'height:15px');
        document.getElementById('četrtek-' + index.toString()).setAttribute('style', 'height:15px');
        document.getElementById('petek-' + index.toString()).setAttribute('style', 'height:15px');
        document.getElementById('sobota-' + index.toString()).setAttribute('style', 'height:15px');
        document.getElementById('nedelja-' + index.toString()).setAttribute('style', 'height:15px');
      }

    }




   // document.getElementById('10').setAttribute('style', 'border-bottom:4px solid black');
  }


}
/*

     let ura = element.od.split(':');
      let ura2 = element.do.split(':');
      let offset = (+ura[1] / 60 * 100 - 50);
      let duration =(((+ura2[0] - +ura[0]) * 100) - (offset) + (+ura2[1] / 60 * 100)-50)/;
      document.getElementById(element.dan + '-' + ura[0] ).innerHTML =
      `<div style="width:100%;position:absolute; top:${offset}%;left:0px; height:${duration}%;background-color: ${element.color};
      text-align:left; font-family: 'Roboto'; ">
        <div style="${uraHTML}">
        ${element.od}-${element.do}</div>
        <div style="${vadbaHTML}"> ${element.naziv.toUpperCase()}</div>
        <div style="${vodiHTML}">${element.vodi}</div>
     </div>`;

     */
