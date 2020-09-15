import { Component, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'
import { Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { DatabaseService } from '../../../database.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-prijava-na-termin-dialog',
  templateUrl: './prijava-na-termin-dialog.component.html',
  styleUrls: ['./prijava-na-termin-dialog.component.css']
})
export class PrijavaNaTerminDialogComponent implements OnInit {
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  displayedColumns: string[] = ['ime', 'priimek','actions'];
  dataSource = new MatTableDataSource();
  myText = 'Ni uporabnikov';
  noData = false;
  uporabniki = [];
  termin: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dbService: DatabaseService) { }

  ngOnInit() {
    this.data.dataKey.prijavljeni.forEach(element => {
      this.uporabniki.push(element.ID_uporabnik)
    });
    this.prikaziUporabnike();
    this.termin=this.data.dataKey.naziv;

  }

  prikaziUporabnike() {
    this.dbService.getUsers().subscribe(
      (data) => {
        const arr =  data.filter(i => !this.uporabniki.includes(i.id))
        this.dataSource = new MatTableDataSource(arr);
        this.dataSource.paginator = this.paginator;
        if(this.dataSource.data.length < 1){
          this.myText='Ni uporabnikov';
           this.noData = true;
         }
       }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.filteredData.length < 1 && this.dataSource.filter.length > 0 ){
      this.noData = true;
      this.myText='Noben uporabnik ne zustreza filtru';
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

  prijaviUporabnika(id) {
    const data = {id_termin:this.data.dataKey.id,id_uporabnik:id};
    this.dbService.prijaviUporabnika(data)
    .subscribe(
      (data) => {
        if(data['resp'] =="prijavljen"){
          this.uporabniki.push(id);
          alert("Prijava uporabnika uspešna");
          this.prikaziUporabnike();
        } else{
          alert("Prišlo je do napake pri prijavi uporabnika");
        }
      },
      (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
    );
  }

}
