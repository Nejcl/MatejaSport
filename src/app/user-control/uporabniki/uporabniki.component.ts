import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-uporabniki',
  templateUrl: './uporabniki.component.html',
  styleUrls: ['./uporabniki.component.css']
})
export class UporabnikiComponent implements OnInit {
  displayedColumns: string[] = ['uporabnik','ime', 'priimek', 'email', 'telefon','actions'];
  dataSource = new MatTableDataSource();
  myText = 'Ni uporabnikov';
  noData = false;
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.prikaziUporabnike();
  }


  prikaziUporabnike() {
    this.dbService.getUsers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
       }
    );
  }

  izbrisiUporabnika(id: number){
    let data = {id: id};
    this.dbService.izbrisiUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="izbrisan"){
          this.prikaziUporabnike();
        }
      }
    );
  }

  ponastaviGeslo(id: number){
    let data = {id: id};
    this.dbService.ponastaviGesloUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="ponastavljeno"){
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

}
