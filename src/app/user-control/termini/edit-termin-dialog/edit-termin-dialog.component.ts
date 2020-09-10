import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'
import { Inject } from '@angular/core';

@Component({
  selector: 'app-edit-termin-dialog',
  templateUrl: './edit-termin-dialog.component.html',
  styleUrls: ['./edit-termin-dialog.component.css']
})
export class EditTerminDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
      // will log the entire data object
    console.log(this.data)
  }

}
