import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material";
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

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
  result: string = '';
  constructor(private dbService: DatabaseService, public dialog: MatDialog) { }

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

  izbrisiUporabnika(row){
    let data = {id: row.id};
    let message = "Ali ste prepričani da želite izbrisati uporabnika: \n" + row.ime + " "+ row.priimek + "?";
    let icon = "cancel";
    const dialogData = new ConfirmDialogModel(true,icon,"Izbriši uporabnika", message,'Da');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData
    });  
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if( this.result) {
        this.dbService.izbrisiUporabnika(data).subscribe(
          (data) => {
            if(data['resp'] =="izbrisan"){
              let message = "Uporabnik uspešno izbrisan";
              let icon = "info";
              const dialogData = new ConfirmDialogModel(false,icon,"Uporabnik izbrisan", message,'Ok');
              this.dialog.open(ConfirmDialogComponent, {
                  maxWidth: "400px",
                  data: dialogData
              });  
              this.prikaziUporabnike();
              }
            }
          );
        }
     });  
      
  }

  ponastaviGeslo(id: number){
    let data = {id: id};
    this.dbService.ponastaviGesloUporabnika(data).subscribe(
      (data) => {
        if(data['resp'] =="ponastavljeno"){
          let message = "Novo geslo: matejašprt";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Ponastavitev gesla uspešna", message,'Ok');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          });  
          dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;
           });
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
