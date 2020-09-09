import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatSort, MatTableDataSource,MatTable} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

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
})

export class TerminiComponent implements OnInit {
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;

  myText = 'Ni razpisanih terminov';
  noData = false;
  terminiActive = true;
  novTerminActive = false;
  columnsToDisplay = ['barva','naziv','instruktor', 'datum', 'od','zasedenost','actions','barva1'];
  innerDisplayedColumns = ['ime', 'email','telefon','actions'];
  dataSource = new MatTableDataSource();
  terminData: Termin[] = [];
  expandedElement: Termin | null;

  constructor(private dbService: DatabaseService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
      this.prikaziTermine();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  prikaziTermine() {
    this.dbService.geTermini().subscribe(
      (data) => {
        data.forEach(termin => {
          if (termin.prijavljeni && Array.isArray(termin.prijavljeni) && termin.prijavljeni.length) {
            this.terminData = [...this.terminData, {...termin, prijave: new MatTableDataSource(termin.prijavljeni)}];
          } else {
            this.terminData = [...this.terminData, termin];
          }
        });
        this.dataSource = new MatTableDataSource(this.terminData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.dataSource.data.length < 1){
         this.myText='Ni razpisanih terminov';
          this.noData = true;
        }
       }
    );
  }

  activateTermini() {
    this.terminiActive = true;
    this.novTerminActive = false;
  }

  activateNovTermin() {
    this.terminiActive = false;
    this.novTerminActive = true;
  }



  toggleRow(element: Termin) {
    element.prijave && (element.prijave as MatTableDataSource<Prijavljeni>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    //this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Prijavljeni>).sort = this.innerSort.toArray()[index]);
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
  prijave?: Prijavljeni[] | MatTableDataSource<Prijavljeni>;
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
  prijave?: Prijavljeni[] | MatTableDataSource<Prijavljeni>;
}

export interface Prijavljeni {
  id_uporabnik: number;
  ime: string;
  priimek: string;
  email:string;
  telefon:string;
}
