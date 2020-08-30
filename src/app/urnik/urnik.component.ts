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

backupUrnik = [{"id":"57","dan":"\u010detrtek","od":"08:30","do":"09:30","naziv":"FIT PILATES","vodi":"Mateja","color":"#f1e648"},{"id":"8","dan":"nedelja","od":"19:30","do":"20:30","naziv":"TNZ","vodi":"Mateja","color":"#03c8ff"},{"id":"110","dan":"\u010detrtek","od":"05:45","do":"06:45","naziv":"Jutranji I.F.T.","vodi":"Tja\u0161a","color":"#49e449"},{"id":"69","dan":"\u010detrtek","od":"20:30","do":"21:30","naziv":"Pilates za fante in punce","vodi":"Mateja","color":"#f1e648"},{"id":"111","dan":"petek","od":"16:30","do":"17:30","naziv":"I.F.T.-PUMP","vodi":"Ana","color":"#e85858"},{"id":"109","dan":"petek","od":"19:30","do":"20:30","naziv":"IFT","vodi":"Mateja","color":"#49e449"},{"id":"113","dan":"petek","od":"5:45","do":"6:45","naziv":"I.F.T.-PUMP","vodi":"Tja\u0161a","color":"#e85858"},{"id":"139","dan":"torek","od":"17:30","do":"18:30","naziv":"FIT PILATES","vodi":"Mateja","color":"#f1e648"},{"id":"99","dan":"sreda","od":"19:30","do":"20:30","naziv":"PILATES ZA FANTE IN PUNCE","vodi":"Mateja","color":"#f1e648"},{"id":"106","dan":"\u010detrtek","od":"19:30","do":"20:30","naziv":"IFT","vodi":"Jaka","color":"#49e449"},{"id":"107","dan":"\u010detrtek","od":"18:30","do":"19:30","naziv":"TNZ","vodi":"Mateja","color":"#03c8ff"},{"id":"158","dan":"torek","od":"19:30","do":"20:30","naziv":"IFT","vodi":"Jaka","color":"#49e449"},{"id":"142","dan":"ponedeljek","od":"09:30","do":"10:30","naziv":"TNZ","vodi":"Tja\u0161a","color":"#03c8ff"},{"id":"143","dan":"sreda","od":"09:30","do":"10:30","naziv":"TNZ","vodi":"Tja\u0161a","color":"#03c8ff"},{"id":"144","dan":"ponedeljek","od":"15:30","do":"16:30","naziv":"FIT PILATES","vodi":"Meta","color":"#f1e648"},{"id":"118","dan":"petek","od":"20:30","do":"21:30","naziv":"ZDRAVA HRBTENICA & PILATES","vodi":"","color":"#f1e648"},{"id":"119","dan":"torek","od":"5:45","do":"6:45","naziv":"I.F.T.-PUMP","vodi":"Tja\u0161a","color":"#e85858"},{"id":"121","dan":"sreda","od":"20:30","do":"21:30","naziv":"TNZ","vodi":"Mateja","color":"#03c8ff"},{"id":"122","dan":"\u010detrtek","od":"15:30","do":"16:30","naziv":"TNZ","vodi":"Tja\u0161a","color":"#03c8ff"},{"id":"127","dan":"petek","od":"09:30","do":"10:30","naziv":"TNZ","vodi":"Tja\u0161a","color":"#03c8ff"},{"id":"128","dan":"sobota","od":"18:30","do":"19:30","naziv":"I.F.T.-PUMP","vodi":"","color":"#e85858"},{"id":"129","dan":"nedelja","od":"18:30","do":"19:30","naziv":"PILATES ZA FANTE IN PUNCE","vodi":"Mateja","color":"#f1e648"},{"id":"130","dan":"torek","od":"18:30","do":"19:30","naziv":"TNZ","vodi":"Mateja","color":"#03c8ff"},{"id":"131","dan":"sreda","od":"18:30","do":"19:30","naziv":"IFT","vodi":"Mateja","color":"#49e449"},{"id":"132","dan":"torek","od":"20:30","do":"21:30","naziv":"ZDRAVA HRBTENICA & PILATES","vodi":"Anita","color":"#f1e648"},{"id":"140","dan":"ponedeljek","od":"20:30","do":"21:30","naziv":"TNZ","vodi":"Mateja","color":"#03c8ff"},{"id":"134","dan":"ponedeljek","od":"19:30","do":"20:30","naziv":"PILATES ZA FANTE IN PUNCE","vodi":"Mateja","color":"#f1e648"},{"id":"135","dan":"petek","od":"18:30","do":"19:30","naziv":"TNZ","vodi":"Mateja","color":"#03c8ff"},{"id":"166","dan":"torek","od":"09:30","do":"10:30","naziv":"IFT","vodi":"Tja\u0161a","color":"#49e449"},{"id":"137","dan":"ponedeljek","od":"08:30","do":"09:30","naziv":"FIT PILATES","vodi":"Mateja","color":"#f1e648"},{"id":"138","dan":"ponedeljek","od":"05:45","do":"06:45","naziv":"Jutranji I.F.T.","vodi":"Tja\u0161a","color":"#49e449"},{"id":"145","dan":"sreda","od":"16:30","do":"17:30","naziv":"FIT PILATES","vodi":"Meta","color":"#f1e648"},{"id":"146","dan":"petek","od":"17:30","do":"18:30","naziv":"FIT PILATES","vodi":"Meta","color":"#f1e648"},{"id":"147","dan":"nedelja","od":"17:30","do":"18:30","naziv":"IFT","vodi":"Ana","color":"#49e449"},{"id":"148","dan":"ponedeljek","od":"17:30","do":"18:30","naziv":"ZDRAVA HRBTENICA & PILATES","vodi":"Anita","color":"#f1e648"},{"id":"149","dan":"\u010detrtek","od":"16:30","do":"17:30","naziv":"ZDRAVA HRBTENICA & PILATES","vodi":"Anita","color":"#f1e648"},{"id":"150","dan":"torek","od":"16:30","do":"17:30","naziv":"TNZ","vodi":"Tja\u0161a","color":"#03c8ff"},{"id":"153","dan":"ponedeljek","od":"16:30","do":"17:30","naziv":"VADBA ZA ZA\u010cETNIKE","vodi":"Tja\u0161a","color":"#ae54f1"},{"id":"152","dan":"\u010detrtek","od":"17:30","do":"18:30","naziv":"VADBA ZA ZA\u010cETNIKE","vodi":"Mateja","color":"#ae54f1"},{"id":"154","dan":"\u010detrtek","od":"09:30","do":"10:30","naziv":"I.F.T.-PUMP","vodi":"Mateja","color":"#e85858"},{"id":"155","dan":"sreda","od":"17:30","do":"18:30","naziv":"BODY SHAPE","vodi":"Tja\u0161a","color":"#e85858"},{"id":"156","dan":"ponedeljek","od":"07:00","do":"08:00","naziv":"FIT PILATES","vodi":"Tina \/ Meta","color":"#f1e648"},{"id":"157","dan":"ponedeljek","od":"07:00","do":"08:00","naziv":"FIT PILATES","vodi":"Tina \/ Meta","color":"#f1e648"},{"id":"165","dan":"torek","od":"09:30","do":"10:30","naziv":"IFT","vodi":"Tja\u0161a","color":"#49e449"},{"id":"159","dan":"torek","od":"07:00","do":"08:00","naziv":"IFT","vodi":"Tja\u0161a","color":"#49e449"},{"id":"160","dan":"torek","od":"08:30","do":"09:30","naziv":"JUTRANJA VADBA - FIT SENIORJI","vodi":"Tja\u0161a","color":"#f1a469"},{"id":"161","dan":"petek","od":"08:30","do":"09:30","naziv":"JUTRANJA VADBA - FIT SENIORJI","vodi":"Tja\u0161a","color":"#f1a469"},{"id":"162","dan":"sreda","od":"06:00","do":"07:00","naziv":"FIT PILATES","vodi":"Tina \/ Meta","color":"#f1e648"},{"id":"163","dan":"torek","od":"07:00","do":"08:00","naziv":"IFT","vodi":"Tja\u0161a","color":"#49e449"},{"id":"164","dan":"torek","od":"07:00","do":"08:00","naziv":"IFT","vodi":"Tja\u0161a","color":"#49e449"},{"id":"167","dan":"sreda","od":"07:00","do":"08:00","naziv":"FIT PILATES","vodi":"Tina \/ Meta","color":"#f1e648"},{"id":"168","dan":"\u010detrtek","od":"07:00","do":"08:00","naziv":"IFT","vodi":"Tja\u0161a","color":"#49e449"},{"id":"169","dan":"torek","od":"09:30","do":"10:30","naziv":"IFT","vodi":"Tja\u0161a","color":"#49e449"},{"id":"170","dan":"ponedeljek","od":"18:30","do":"19:30","naziv":"I.F.T.-PUMP","vodi":"Mateja","color":"#e85858"}]



  constructor(private dbService: DatabaseService) {
    //this.Vadba = UrnikJson;
   }

  ngOnInit() {
    this.dbService.readUrnik().subscribe(
      (data) => {
        this.Vadba = data;
        this.showUrnik();
       },
       (error) =>{
        this.Vadba = this.backupUrnik;
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
        this.Vadba = this.backupUrnik;
        this.showUrnik();
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
