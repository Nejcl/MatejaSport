import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-instruktor-box',
  templateUrl: './instruktor-box.component.html',
  styleUrls: ['./instruktor-box.component.css']
})
export class InstruktorBoxComponent implements OnInit, AfterViewInit {

  ime: string;
  spol: boolean;
  image: string;
  job: string;
  text: string;

  constructor(public dialogRef: MatDialogRef<InstruktorBoxComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

      this.ime = data.name;
      this.spol = data.woman;
      this.image = data.src2;
      this.job = data.job;
      this.text = data.opis;
     }

  ngOnInit() {

  }

  ngAfterViewInit() {
    document.getElementById('opis').innerHTML = this.text;

  }

  Close(){
    this.dialogRef.close();
  }


}
