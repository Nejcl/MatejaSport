import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { MAT_MOMENT_DATE_FORMATS,MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { EditTerminDialogComponent } from './edit-termin-dialog/edit-termin-dialog.component';
import { PrijavaNaTerminDialogComponent } from './prijava-na-termin-dialog/prijava-na-termin-dialog.component';
import {MatDialog} from "@angular/material";

import moment from 'moment';
import 'moment/locale/sl';
moment.locale('sl');

@Component({
  selector: 'app-termini',
  templateUrl: './termini.component.html',
  styleUrls: ['./termini.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},

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

export class TerminiComponent implements OnInit {
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;

  myText = 'Ni razpisanih terminov';
  noData = false;
  praznaPrijava = [{}];
  terminiActive = true;
  novTerminActive = false;
  columnsToDisplay = ['barva','naziv','instruktor', 'datum', 'od','zasedenost','actions','barva1'];
  innerDisplayedColumns = ['ime', 'email','telefon','actions'];
  dataSource = new MatTableDataSource();
  terminData: Termin[] = [];
  expandedElement: Termin | null;
  minDate = null;
  odDate = new Date();
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
  constructor(private dbService: DatabaseService, private cd: ChangeDetectorRef, public dialog: MatDialog) {
 
   }

  ngOnInit() {
    this.selected = {startDate:moment().startOf('day'),endDate:moment().add(1,'month').endOf('day')}
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  prikaziTermine() {
    this.terminData = [];
    this.dbService.geTermini(this.selected).subscribe(
      (data) => {
        data.forEach(termin => {
          if (termin.prijavljeni && Array.isArray(termin.prijavljeni) && termin.prijavljeni.length) {
            this.terminData = [...this.terminData, {...termin, prijave: new MatTableDataSource(termin.prijavljeni)}];
          } else {
            termin.prijavljeni = this.praznaPrijava;
            this.terminData = [...this.terminData, {...termin, prijave: new MatTableDataSource([termin.prijavljeni])}];
          }
        });
        this.dataSource = new MatTableDataSource(this.terminData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.dataSource.data.length < 1){
         this.myText='Ni razpisanih terminov';
          this.noData = true;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.filteredData.length < 1 && this.dataSource.filter.length > 0 ){
      this.noData = true;
      this.myText='Noben zapis ne zustreza filtru';
    } else if(this.dataSource.filter.length < 0) {
      this.noData =false;
    }else {
      this.noData = false;
      if(this.dataSource.data.length < 1){
        this.myText='Ni uporabnikov';
         this.noData = true;
       }
    }
  }

  activateTermini() {
    this.terminiActive = true;
    this.novTerminActive = false;
  }

  activateNovTermin() {
    this.terminiActive = false;
    this.novTerminActive = true;
  }

  odpovejTermin(id:string) {
    let data = {id: id};
    this.dbService.odpovejTermin(data).subscribe(
      (data) => {
        if(data['resp'] =="odpovedan"){
          this.prikaziTermine(); 
        }
      }
    );
  }

  toggleRow(element: Termin) {
    element.prijave && (element.prijave as MatTableDataSource<Prijavljeni>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    //this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Prijavljeni>).sort = this.innerSort.toArray()[index]);
  }


  openEditDialog(row): void {
    this.dialog.closeAll();
    const editDialogRef = this.dialog.open(EditTerminDialogComponent,{width:'500px' ,panelClass: 'mobile-width',  data: {
      dataKey: row
    }})
    editDialogRef.afterClosed().subscribe(() => {
      // Do stuff after the dialog has closed
      this.prikaziTermine(); 

  });

  }

  openAddUserDialog(row,tip): void {
    this.dialog.closeAll();
    const prijaviDialogRef = this.dialog.open(PrijavaNaTerminDialogComponent,{width:'400px' ,panelClass: 'mobile-width',  data: {
      dataKey: row,
      dataType: tip
    }})
    prijaviDialogRef.afterClosed().subscribe(() => {
      // Do stuff after the dialog has closed
      this.prikaziTermine(); 
  });
  }

  odjaviUporabnika(id): void {
    let data = {id: id};
    this.dbService.odjaviUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="odjavljen"){
          alert("odjava uporabnika uspešna");
          this.prikaziTermine(); 
        }
      }
    );
  }

  prijaviRezervo(row): void {
    let data = {id: row.Id,id_uporabnik:row.ID_uporabnik,id_termin:row.ID_termin};
    this.dbService.prijaviRezervo(data).subscribe(
      (data) => {
        if(data['resp'] =="prijavljen"){
          alert("prijava rezerve na termin uspešna");
          this.prikaziTermine(); 
        }
      }
    );
  }

  izbrisiTermin(id){
    const data = {id:id};
    this.dbService.izbrisiTermin(data)
    .subscribe(
      (data) => {
        if(data['resp'] === "OK"){
          alert("Termin uspešno izbrisan");
        } else{
          alert("Prišlo je do napake pri izbrisu termina");
        }
      },
      (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
    );
  }


}


export interface Termin {
  Id: string;
  naziv: string;
  instruktor: string;
  datum: Date;
  od: string;
  do: string;
  zasedenost: string;
  barva:string;
  status:string;
  prijave?: Prijavljeni[] | MatTableDataSource<Prijavljeni>;
  rezerve?: Rezerve[] | MatTableDataSource<Rezerve>;
}

export interface TerminDataSource {
  Id: string;
  naziv: string;
  instruktor: string;
  datum: Date;
  od: string;
  do: string;
  zasedenost: string;
  barva:string;
  status:string;
  prijave?: Prijavljeni[] | MatTableDataSource<Prijavljeni>;
  rezerve?: Rezerve[] | MatTableDataSource<Rezerve>;
}

export interface Prijavljeni {
  id:number
  ime: string;
  priimek: string;
  email:string;
  telefon:string;
}

export interface Rezerve {
  id:number
  ime: string;
  priimek: string;
  email:string;
  telefon:string;
}
