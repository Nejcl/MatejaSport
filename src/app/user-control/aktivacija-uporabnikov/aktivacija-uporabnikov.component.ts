import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material";
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { UserControlComponent } from "../user-control.component";

@Component({
  selector: 'app-aktivacija-uporabnikov',
  templateUrl: './aktivacija-uporabnikov.component.html',
  styleUrls: ['./aktivacija-uporabnikov.component.css']
})
export class AktivacijaUporabnikovComponent implements OnInit {
  myText = 'Vsi uporabniki so aktivirani';
  noData = false;
  showUporabniki = false;
  showAktivacija= true;
  aktivirajActive = true;
  userActive = false;
  displayedColumns: string[] = ['uporabnik','ime', 'priimek', 'email', 'telefon','actions'];
  dataSource = new MatTableDataSource();
  result: string = '';
  constructor(private dbService: DatabaseService, public dialog: MatDialog,private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.prikaziNoveUporabnike()
  }

  getParentComponent(): UserControlComponent{
    return this.viewContainerRef[ '_data' ].componentView.component.viewContainerRef[ '_view' ].component
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
      if(this.dataSource.data.length < 1){
        this.myText='Vsi uporabniki so aktivirani';
         this.noData = true;
       }
    }
  }

  aktivirajUporabnika(id: number){
    let data = {id: id};
    this.dbService.aktivirajUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="aktiviran"){
          let message = "Uporabnik aktiviran";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Aktivacija uporabnika", message,'Ok');
          this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          });  
          this.getParentComponent().noviUporabniki -= 1;
          this.prikaziNoveUporabnike(); 
        }
      }
    );
  }

  izbrisiUporabnika(id: number){
    let data = {id: id};
    this.dbService.izbrisiUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="izbrisan"){
          this.prikaziNoveUporabnike();
        }
      }
    );
  }

  showUporabnike() {
    this.showUporabniki= true;
    this.userActive = true;
    this.showAktivacija = false;
    this.aktivirajActive = false;
  }

  showAktiviraj() {
    this.showUporabniki= false;
    this.userActive = false;
    this.showAktivacija = true;
    this.aktivirajActive = true;
  }

}
