import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'
import { Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { DatabaseService } from '../../../database.service';

@Component({
  selector: 'app-prijava-na-termin-dialog',
  templateUrl: './prijava-na-termin-dialog.component.html',
  styleUrls: ['./prijava-na-termin-dialog.component.css']
})
export class PrijavaNaTerminDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dbService: DatabaseService) { }

  ngOnInit() {
    console.log(this.data);
  }

}
