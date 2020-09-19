import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { DatabaseService } from '../database.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatSort, MatTableDataSource,MatTable} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { MAT_MOMENT_DATE_FORMATS,MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog} from "@angular/material";


import moment from 'moment';
import 'moment/locale/sl';
moment.locale('sl');

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'sl'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ProfilComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;

  minDate = null;
  myText = 'Ni razpisanih terminov';
  myTextTrenutni ='Ni aktivnih prijav';
  noData = false;
  noActiveData = false;
  odDate = new Date();
  prijavaNaTermin = false;
  aktivnePrijave = true;
  user: string;
  ime:string;
  prijave = [];
  selected: {startDate: moment.Moment, endDate: moment.Moment};
  ranges: any = {
    'Danes': [moment(), moment()],
    'Jutri': [moment().add(1, 'days'), moment().add(1, 'days')],
    'Zadnjih 7 dni': [moment().subtract(6, 'days'), moment()],
    'Naslednjih 7 dni': [moment(), moment().add(6, 'days')],
    'Zadnjih 30 dni': [moment().subtract(29, 'days'), moment()],
    'Ta Mesec': [moment().startOf('month'), moment().endOf('month')],
    'Naslednji Mesec': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')]
  }
  columnsToDisplay = ['dan','naziv','actions'];
  columnsToDisplayTrenutni = ['dan','naziv','actions'];

  dataSource = new MatTableDataSource();
  dataSourceTrenutni = new MatTableDataSource();
  dataSourceRezerve = new MatTableDataSource();



  constructor(private dbService: DatabaseService, private cd: ChangeDetectorRef, public dialog: MatDialog) {
    this.user = localStorage.getItem('USER');
    this.ime = localStorage.getItem('ime');
  }

  ngOnInit() {
    this.selected = {startDate:moment().startOf('day'),endDate:moment().add(1,'month').endOf('day')}
    this.prikaziTrenutneTermine();
    this.prikaziTrenutneRezerve();  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceTrenutni.paginator = this.paginator;
    this.dataSourceTrenutni.sort = this.sort;
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.filteredData.length < 1 && this.dataSource.filter.length > 0 ){
      this.noData = true;
      this.myText='Noben termin ne zustreza filtru';
    } else if(this.dataSource.filter.length < 0) {
      this.noData =false;
    }else {
      this.noData = false;
      if(this.dataSource.data.length < 1){
        this.myText='Ni terminov';
         this.noData = true;
       }
    }
  }

  applyFilteAktivni(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTrenutni.filter = filterValue.trim().toLowerCase();
    if(this.dataSourceTrenutni.filteredData.length < 1 && this.dataSourceTrenutni.filter.length > 0 ){
      this.noActiveData = true;
      this.myTextTrenutni='Noben termin ne zustreza filtru';
    } else if(this.dataSourceTrenutni.filter.length < 0) {
      this.noActiveData =false;
    }else {
      this.noActiveData = false;
      if(this.dataSourceTrenutni.data.length < 1){
        this.myTextTrenutni='Ni aktivnih terminov';
         this.noActiveData = true;
       }
    }
  }


prikaziTrenutneTermine() {
  let item = {user: this.user}
  this.dbService.geAktivniTermini(item).subscribe(
    (data) => {
      data.forEach(element => {
        this.prijave.push(element.id_termin)
      });
      this.dataSourceTrenutni = new MatTableDataSource(data);
      this.dataSourceTrenutni.paginator = this.paginator;
      this.dataSourceTrenutni.sort = this.sort;
      if(this.dataSourceTrenutni.data.length < 1){
       this.myText='Ni aktivnih prijav na termine';
        this.noActiveData = true;
      }
     }
  );
}

prikaziTrenutneRezerve() {
  let item = {user: this.user}
  this.dbService.geAktivneRezerve(item).subscribe(
    (data) => {
      data.forEach(element => {
        this.prijave.push(element.id_termin)
      });
      this.dataSourceRezerve = new MatTableDataSource(data);
      this.dataSourceRezerve.paginator = this.paginator;
      this.dataSourceRezerve.sort = this.sort;
      if(this.dataSourceRezerve.data.length < 1){
       this.myText='Ni aktivnih prijav na termine';
        this.noActiveData = true;
      }
     }
  );

}

getDate(datum:string): string{
  var weekday = [];
  weekday[0] =  "Nedelja";
  weekday[1] = "Ponedeljek";
  weekday[2] = "Torek";
  weekday[3] = "Sreda";
  weekday[4] = "Četrtek";
  weekday[5] = "Petek";
  weekday[6] = "Sobota";
  return weekday[new Date(datum).getDay()]; 
}


  prikaziTermine() {
    this.dbService.geTermini(this.selected).subscribe(
      (data) => {
        const arr =  data.filter(i => !this.prijave.includes(i.id))
        this.dataSource = new MatTableDataSource(arr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.dataSource.data.length < 1){
         this.myText='Ni razpisanih terminov';
          this.noData = true;
        }
       }
    );
  }

  prikaziPrijavoNaTermin() {
    this.prijavaNaTermin = true;
    this.aktivnePrijave = false;
    window.scrollTo(0, 0);
  }

  prikaziAktivnePrijave(){
    this.prikaziTrenutneTermine(); 
    this.prikaziTrenutneRezerve();
    this.prijavaNaTermin = false;
    this.aktivnePrijave = true;
    window.scrollTo(0, 0);
  }

  odjavaAvailable(row): boolean{
    let date = new Date(row.datum); 
    var now = new Date();
    var t = new Date();
    var minute15= 15*60; // odjava možna do 15:00 na dan termina
    var currentTime = t.getHours()*60 + t.getMinutes();
    var today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ));
    if(date.getTime() == today.getTime()) {
      if(currentTime > minute15)
       return false;
    }
    return true;
}





  odjaviUporabnika(id): void {
    let data = {id: id};
    this.dbService.odjaviUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="odjavljen"){
          alert("odjava uporabnika uspešna");
          this.prikaziTrenutneTermine(); 
        }
      }
    );
  }

  prijaviUporabnika(id) {
    const data = {id_termin:id,id_uporabnik:this.user};
    this.dbService.prijaviUporabnika(data)
    .subscribe(
      (data) => {
        if(data['resp'] =="prijavljen"){
          alert("Prijava uporabnika uspešna");
          this.prijave.push(id);
          this.prikaziTrenutneTermine();
          this.prikaziAktivnePrijave();
          this.prikaziTermine();
        } else{
          alert("Prišlo je do napake pri prijavi uporabnika");
        }
      },
      (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
    );
  }


  prijaviRezervo(id) {
    const data = {id_termin:id,id_uporabnik:this.user};
    this.dbService.prijavaRezerve(data)
    .subscribe(
      (data) => {
        if(data['resp'] =="prijavljen"){
          alert("Prijava kot rezervea uspešna");
          this.prikaziTrenutneTermine();
          this.prikaziAktivnePrijave();
          this.prikaziTermine();
        } else{
          alert("Prišlo je do napake pri prijavi kot rezerva");
        }
      },
      (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
    );
  }



}
