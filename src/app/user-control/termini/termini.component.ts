import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-termini',
  templateUrl: './termini.component.html',
  styleUrls: ['./termini.component.css']
})
export class TerminiComponent implements OnInit {
  myText = 'Ni razpisanih terminov';
  noData = false;
  terminiActive = true;
  novTerminActive = false;
  displayedColumns: string[] = ['naziv','instruktor', 'datum', 'od','zasedenost','actions'];
  dataSource = new MatTableDataSource();

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.prikaziTermine();
  }

  prikaziTermine() {
    this.dbService.geTermini().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        if(this.dataSource.data.length < 1){
         this.myText='Ni razpisanih terminov';
          this.noData = true;
        }
       }
    );
  }


}
