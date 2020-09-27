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
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';

import moment from 'moment';
import 'moment/locale/sl';
import { TmplAstElement } from '@angular/compiler';
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
  innerDisplayedColumns = ['select','ime', 'email','telefon','actions'];
  innerDisplayedColumnsRezerve = ['ime', 'email','telefon','actions'];
  setPrisotnost = false;
  dataSource = new MatTableDataSource<Termin>();
  terminData: Termin[] = [];
  expandedElement: Termin | null;
  minDate = null;
  odDate = new Date();
  result: string = '';
  showOverlay = true;
  notification: number;
  terminiNotifikacije: Termin[]  = [];
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
   selection = new SelectionModel<Prijavljeni>(true, []);

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.expandedElement.prijave.data.length;
     return numSelected === numRows;
   }
 
   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => {
          if(row == this.expandedElement) {
            row.prijave.data.forEach(element => {this.selection.select(element);   
            });
          }
        });
  }

     /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Prijavljeni): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
 

  ngOnInit() {
    this.selected = {startDate:moment().startOf('day'),endDate:moment().add(1,'month').endOf('day')}
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTerminiNotifikacije();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  prikaziTermineNotifikacije(){
    this.dataSource = new MatTableDataSource<Termin>(this.terminiNotifikacije);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length < 1){
      this.myText='Ni terminov';
       this.noData = true;
     }
  }

  getTerminiNotifikacije() {
    this.terminiNotifikacije = [];
    this.dbService.getNotificationTermini().subscribe(
      (data) => {
        data.forEach(termin => {
          if (termin.prijavljeni && Array.isArray(termin.prijavljeni) && termin.prijavljeni.length) {
            this.terminiNotifikacije = [...this.terminiNotifikacije, {...termin, prijave: new MatTableDataSource<Prijavljeni>(termin.prijavljeni)}];
          } else {
            termin.prijavljeni = this.praznaPrijava;
            this.terminiNotifikacije = [...this.terminiNotifikacije, {...termin, prijave: new MatTableDataSource<Prijavljeni>([termin.prijavljeni])}];
          }
        });
        this.notification = data.length;
        this.sortirajNotificationTermine();

      });
  }

  sortirajNotificationTermine(){
    this.terminiNotifikacije.sort(function(a, b) {
      // Sort by count
      var dCount = new Date(a.datum).getTime() - new Date(b.datum).getTime();
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
    this.terminData.sort(function(a, b) {
      // Sort by count
      var dCount = new Date(a.datum).getTime() - new Date(b.datum).getTime();
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

  prikaziTermine() {
    this.showOverlay = true;
    this.terminData = [];
    this.dbService.getTermini(this.selected).subscribe(
      (data) => {
        data.forEach(termin => {
          if (termin.prijavljeni && Array.isArray(termin.prijavljeni) && termin.prijavljeni.length) {
            this.terminData = [...this.terminData, {...termin, prijave: new MatTableDataSource<Prijavljeni>(termin.prijavljeni)}];
          } else {
            termin.prijavljeni = this.praznaPrijava;
            this.terminData = [...this.terminData, {...termin, prijave: new MatTableDataSource<Prijavljeni>([termin.prijavljeni])}];
          }
        });
        this.sortirajTermine();
        this.dataSource = new MatTableDataSource<Termin>(this.terminData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showOverlay = false;
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

  odpovejTermin(row) {
    let data = {id: row.id};
    let message = "Ali ste prepričani da želite odpovedati termin: \n "+ row.naziv + "?";
    let icon = "warning";
    const dialogData = new ConfirmDialogModel(true,icon,"Odpoved termina", message,'Da');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData
    });  
    dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;
    if(this.result) {
      this.showOverlay = true;
        this.dbService.odpovejTermin(data).subscribe(
          (data) => {
            if(data['resp'] =="odpovedan"){
              let message = "Termin uspešno odpovedan";
              let icon = "info";
              const dialogData = new ConfirmDialogModel(false,icon,"Termin odpovedan", message,'Ok');
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                  maxWidth: "400px",
                  data: dialogData
              });  
              this.showOverlay = false;
              dialogRef.afterClosed().subscribe(dialogResult => {
              this.result = dialogResult;
    
              });
              this.prikaziTermine(); 
            }
          }
        );
      }
    });
    
  }

  toggleRow(element: Termin) {
    this.setPrisotnost = false;
    element.prijave && (element.prijave as MatTableDataSource<Prijavljeni>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    if(this.expandedElement){
      this.expandedElement.prijave.data.forEach(element => { 
        element.prisotnost ? this.setPrisotnost = true:this.setPrisotnost = false ;
        if(element.prisotnost == 1){
          this.selection.select(element);
        }
      });
    }

  }


  openEditDialog(row): void {
    this.dialog.closeAll();
    const editDialogRef = this.dialog.open(EditTerminDialogComponent,{width:'500px' ,panelClass: 'mobile-width',  data: {
      dataKey: row
    }})
    editDialogRef.afterClosed().subscribe(() => {
      // Do stuff after the dialog has closed
      this.showOverlay = true;
      this.getTerminiNotifikacije();
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
      this.showOverlay = true;
      this.getTerminiNotifikacije();
      this.prikaziTermine(); 
  });
  }

  odjaviUporabnika(row): void {
    let data = {id: row.Id,id_termin:row.Id_termin};
    this.showOverlay = true;
    this.dbService.odjaviUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="odjavljen"){
          let message = "Odjava uporabnika uspešna";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Odjava  uspešna", message,'Ok');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          }); 
          this.showOverlay = false; 
          dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;

           });
           this.getTerminiNotifikacije();
          this.prikaziTermine(); 
        }
      }
    );
  }

  prijaviRezervo(row : Prijavljeni): void {
    this.showOverlay = true;
    let data = {id: row.Id,id_uporabnik:row.ID_uporabnik,id_termin:row.Id_termin};
    this.dbService.prijaviRezervo(data).subscribe(
      (data) => {
        if(data['resp'] =="prijavljen"){
          let message = "Prijava rezerve uspešna";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Prijava rezerve uspešna", message,'Ok');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          });  
          this.getTerminiNotifikacije();
          this.prikaziTermine(); 
        }
      }
    );
  }


  shraniPrisotnost(element){
    this.showOverlay = true;
    let prisotni =  [];   
    this.selection.selected.forEach(element => {
      prisotni.push({id_prijava:element.Id})
    });
    let items = {id_termin:element.id,prisotnost:prisotni}
    console.log(items);
    this.dbService.setPrisotnost(items)
    .subscribe(
      (data) => {
        if(data.prisotnost === "OK"){
         let message = "Prisotnost uspešno shranjena";
         let icon = "info";
         const dialogData = new ConfirmDialogModel(false,icon,"Prisotnost na terminu", message,'Ok');
         const dialogRef = this.dialog.open(ConfirmDialogComponent, {
             maxWidth: "400px",
             data: dialogData
         }); 
         this.showOverlay = false; 
        } else{
          alert("Prišlo je do napake pri dodajanju terminov");
          this.showOverlay = false; 
        }
      },
      (error) => { alert("Prišlo je do napake prosimo preverite podatke \n" + error.message);this.showOverlay = false; }
    );

  }


  izbrisiTermin(row){
    this.showOverlay = true;
    const data = {id:row.id};
    let message = "Ali ste prepričani da želite izbrisati termin: \n " + row.naziv + "?";
    let icon = "cancel";
    const dialogData = new ConfirmDialogModel(true,icon,"Izbris termina", message,'Da');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData
    });  
    dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;
    if(this.result){
      this.dbService.izbrisiTermin(data)
      .subscribe(
        (data) => {
          if(data['resp'] === "OK"){
            let message = "termin uspešno izbrisan";
            let icon = "info";
            const dialogData = new ConfirmDialogModel(false,icon,"Termin izbrisan", message,'Ok');
            this.dialog.open(ConfirmDialogComponent, {
                maxWidth: "400px",
                data: dialogData
            });  
            this.prikaziTermine(); 
          } else{
            alert("Prišlo je do napake pri izbrisu termina");
          }
        },
        (error) => { alert("Prišlo je do napake prosimo preverite podatke \n" + error.message);this.showOverlay = false; }
        );
    }
     });  
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
  prijave?: MatTableDataSource<Prijavljeni>;
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
  Id:number;
  Id_termin:number;
  ID_uporabnik:number;
  ime: string;
  priimek: string;
  email:string;
  telefon:string;
  prisotnost:number;
}

export interface Rezerve {
  id:number
  ime: string;
  priimek: string;
  email:string;
  telefon:string;
}
