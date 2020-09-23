import { Component, OnInit,AfterViewInit,ViewChild, ChangeDetectorRef } from '@angular/core';
import { DatabaseService } from '../database.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { MAT_MOMENT_DATE_FORMATS,MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog} from "@angular/material";
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SpremembaGeslaDialogComponent } from './sprememba-gesla-dialog/sprememba-gesla-dialog.component'

import moment from 'moment';
import 'moment/locale/sl';
import { MinutesFormatterPipe } from 'ngx-material-timepicker/src/app/material-timepicker/pipes/minutes-formatter.pipe';
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
export class ProfilComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;

  minDate = null;
  filter = '';
  filterAktivni = '';
  myText = 'Ni razpisanih terminov';
  myTextTrenutni ='Ni aktivnih prijav';
  noData = false;
  noActiveData = false;
  odDate = new Date();
  prijavaNaTermin = false;
  aktivnePrijave = true;
  aktivnePrijaveRezerve = false;
  user: string;
  ime:string;
  prijave = [];
  razpolozljiviTermini = [];
  aktivniTermini = [];
  selected: {startDate: moment.Moment, endDate: moment.Moment};
  ranges: any = {
    'Danes': [moment(), moment()],
    'Jutri': [moment().add(1, 'days'), moment().add(1, 'days')],
    'Naslednjih 7 dni': [moment(), moment().add(6, 'days')],
    'Ta Mesec': [moment().startOf('month'), moment().endOf('month')],
    'Naslednji Mesec': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')]
  }
  columnsToDisplay = ['dan','naziv','actions'];
  columnsToDisplayTrenutni = ['dan','naziv','actions'];
  result: string = '';
  dnevi:any = [
    {name: 'Pon', completed: true, color: 'accent', value: 1},
    {name: 'Tor', completed: true, color: 'accent', value: 2},
    {name: 'Sre', completed: true, color: 'accent', value: 3},
    {name: 'Čet', completed: true, color: 'accent', value: 4},
    {name: 'Pet', completed: true, color: 'accent', value: 5},
    {name: 'Sob', completed: true, color: 'accent', value: 6},
    {name: 'Ned', completed: true, color: 'accent', value: 0}
  ]
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
    this.dataSourceTrenutni.paginator = this.paginator;
    this.dataSourceTrenutni.sort = this.sort;
  }

  ngAfterViewInit(){
    
    this.dataSourceTrenutni.sort = this.sort;
    setTimeout(() => this.dataSourceTrenutni.paginator = this.paginator);
  }


  updateAllComplete() {
    this.prikaziIzbraneDneve();
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
      this.aktivniTermini = data;
      this.aktivniTermini.forEach(element => {
        this.prijave.push(element.id_termin)
      });
      this.sortirajAktivneTermine();
      this.dataSourceTrenutni = new MatTableDataSource(this.aktivniTermini);
      this.dataSourceTrenutni.filter = this.filterAktivni.trim().toLowerCase();
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
      if(this.dataSourceRezerve.data.length > 0){
        this.aktivnePrijaveRezerve = true;
      } else {
        this.aktivnePrijaveRezerve = false;
      }
      this.dataSourceRezerve.paginator = this.paginator;
      this.dataSourceRezerve.sort = this.sort;
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

  osveziRazpolozljiveTermine(){
    this.razpolozljiviTermini =  this.razpolozljiviTermini.filter(i => !this.prijave.includes(i.id))
    this.sortirajTermine();
    this.prikaziIzbraneDneve();
  }

  sortirajAktivneTermine(){
    this.aktivniTermini.sort(function(a, b) {
      // Sort by count
      var dCount = new Date(a.datum).getDate() - new Date(b.datum).getDate();
      if(dCount) return dCount;
  
      // If there is a tie, sort by time
      let minuteA;
      var time =  a.od.split ( ":" );
      minuteA = Number(time[0])*60;
      minuteA +=Number(time[1]);
      let minuteB;
      var time =  b.od.split ( ":" );
      minuteB = Number(time[0])*60;
      minuteB +=Number(time[1]);
      var dminute = minuteA - minuteB;
      return dminute;
    });
  }



  sortirajTermine(){
    this.razpolozljiviTermini.sort(function(a, b) {
      // Sort by count
      var dCount = new Date(a.datum).getDate() - new Date(b.datum).getDate();
      if(dCount) return dCount;
  
      // If there is a tie, sort by time
      let minuteA;
      var time =  a.od.split ( ":" );
      minuteA = Number(time[0])*60;
      minuteA +=Number(time[1]);
      let minuteB;
      var time =  b.od.split ( ":" );
      minuteB = Number(time[0])*60;
      minuteB +=Number(time[1]);
      var dminute = minuteA - minuteB;
      return dminute;
    });
  }

  prikaziIzbraneDneve(){
    let izbraniDnevi = [];
    this.dnevi.forEach(dan => {
      if(dan.completed) {
        izbraniDnevi.push(dan.value);
      }
    });
    let posamezniDnevi = this.razpolozljiviTermini.filter(i => izbraniDnevi.includes(new Date(i.datum).getDay()));
    this.dataSource = new MatTableDataSource(posamezniDnevi);
    this.dataSource.filter = this.filter.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
    this.paginator.firstPage();
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length < 1){
      this.myText='Ni razpoložljivih terminov za izbrane dneve';
       this.noData = true;
     } else {
       this.noData = false;
     }
  }

  prikaziTermine() {
    this.dbService.geTermini(this.selected).subscribe(
      (data) => {
        this.razpolozljiviTermini = data;
        this.razpolozljiviTermini =  this.razpolozljiviTermini.filter(i => !this.prijave.includes(i.id));
        this.sortirajTermine();
        this.dataSource = new MatTableDataSource(this.razpolozljiviTermini);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.dataSource.data.length < 1){
         this.myText='Ni razpisanih terminov';
          this.noData = true;
        }
        let top = document.getElementById('top');
        if (top !== null) {
          top.scrollIntoView();
          top = null;
        } 
       }
    );
  }

  prikaziPrijavoNaTermin() {
    this.prijavaNaTermin = true;
    this.aktivnePrijave = false;
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  prikaziAktivnePrijave(){
    this.prikaziTrenutneTermine(); 
    this.prikaziTrenutneRezerve();
    this.prijavaNaTermin = false;
    this.aktivnePrijave = true;
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    } 
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
          let message = "Odjava uspešna";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Odjava uspešna", message,'Ok');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          });
             
          dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;

           });
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
          let message = "Prijava na termin uspešna";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Prijava  uspešna", message,'Ok');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          });
             
          dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;

           });
           this.prijave.push(id);
           this.osveziRazpolozljiveTermine();        
          } else{
          alert("Prišlo je do napake pri prijavi na termin");
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
          let message = "Prijava kot rezerva uspešna";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Prijava rezerve uspešna", message,'Ok');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          });
             
          dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;

           });
           this.prijave.push(id);
           this.prikaziTermine();

        } else{
          alert("Prišlo je do napake pri prijavi kot rezerva");
        }
      },
      (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
    );
  }

  odjaviRezervo(id): void {
    let data = {id: id};
    this.dbService.odjaviRezervo(data).subscribe(
      (data) => {
        if(data['resp'] =="odjavljen"){
          let message = "Odjava rezerve uspešna";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Odjava rezerve uspešna", message,'Ok');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          });
          this.prikaziTrenutneRezerve();  
          dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;
           });
        }
      }
    );
  }

  openEditDialog(): void {
    this.dialog.closeAll();
    const editDialogRef = this.dialog.open(SpremembaGeslaDialogComponent,{width:'300px' ,panelClass: 'mobile-width'})
    editDialogRef.afterClosed().subscribe(() => {
      // Do stuff after the dialog has closed
  });

  }

}
