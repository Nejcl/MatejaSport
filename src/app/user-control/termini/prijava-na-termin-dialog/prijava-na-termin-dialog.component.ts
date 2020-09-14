import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'
import { Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { DatabaseService } from '../../../database.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-prijava-na-termin-dialog',
  templateUrl: './prijava-na-termin-dialog.component.html',
  styleUrls: ['./prijava-na-termin-dialog.component.css']
})
export class PrijavaNaTerminDialogComponent implements OnInit {
  displayedColumns: string[] = ['ime', 'priimek','actions'];
  dataSource = new MatTableDataSource();
  myText = 'Ni uporabnikov';
  noData = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dbService: DatabaseService) { }

  ngOnInit() {
    console.log(this.data);
    this.prikaziUporabnike();

  }

  prikaziUporabnike() {
    var uporabniki = [];
    this.data.dataKey.forEach(element => {
      uporabniki.push(element.ID_uporabnik)
    });
    this.dbService.getUsers().subscribe(
      (data) => {
        const arr =  data.filter(i => !uporabniki.includes(i.id))
        this.dataSource = new MatTableDataSource(arr);
       }
    );
    console.log(uporabniki);
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

}
