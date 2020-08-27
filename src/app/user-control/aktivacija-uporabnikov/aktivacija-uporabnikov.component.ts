import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-aktivacija-uporabnikov',
  templateUrl: './aktivacija-uporabnikov.component.html',
  styleUrls: ['./aktivacija-uporabnikov.component.css']
})
export class AktivacijaUporabnikovComponent implements OnInit {
  myText = 'Vsi uporabniki so aktivirani';
  noData = false;
  displayedColumns: string[] = ['uporabnik','ime', 'priimek', 'email', 'telefon','actions'];
  dataSource = new MatTableDataSource();
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.prikaziNoveUporabnike()
  }

  prikaziNoveUporabnike() {
    this.dbService.getNewUsers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        if(this.dataSource.data.length < 1){
         this.myText='Vsi uporabniki so aktivirani';
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
      this.myText='Noben uporabnik ne zustreza iskanemu filtru';
    } else if(this.dataSource.filter.length < 0) {
      this.noData =false;
    }else {
      this.noData = false;
    }
  }

  aktivirajUporabnika(id: number){
    let data = {id: id};
    this.dbService.aktivirajUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="aktiviran"){
          this.prikaziNoveUporabnike() 
        }
      }
    );
  }

  izbrisiUporabnika(id: number){
    let data = {id: id};
    this.dbService.izbrisiUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="izbrisan"){
          this.prikaziNoveUporabnike() 
        }
      }
    );
  }

}
