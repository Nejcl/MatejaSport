import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import { DatabaseService } from '../../../database.service';
import { MatDateFormats, MAT_NATIVE_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material';

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions,
  }
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};



@Component({
  selector: 'app-razps-termina',
  templateUrl: './razps-termina.component.html',
  styleUrls: ['./razps-termina.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})


export class RazpsTerminaComponent {
  myControl = new FormControl();
  myControlVodi = new FormControl();
  colorValue: string = '';
  options: string[] = ['Jutranji I.F.T.', 'FIT PILATES', 'TNZ','VADBA ZA ZAČETNIKE','ZDRAVA HRBTENICA & PILATES','I.F.T.-PUMP','PILATES ZA FANTE IN PUNCE','IFT','BODY SHAPE','JUTRANJA VADBA - FIT SENIORJI'];
  vodiOptions: string[] = ['Tjaša','Tina/Meta','Mateja','Meta','Anita','Jaka','Tina','Ana'];
  dict = {}; 
  filteredOptions: Observable<string[]>;
  filtereVodidOptions: Observable<string[]>;

  constructor(private dbService: DatabaseService) {
    this.dict['Jutranji I.F.T.'] = '#49e449';
    this.dict['FIT PILATES'] = '#f1e648';
    this.dict['TNZ'] = '#03c8ff';
    this.dict['VADBA ZA ZAČETNIKE'] = '#f1e648';
    this.dict['ZDRAVA HRBTENICA & PILATES'] = '#49e449';
    this.dict['I.F.T.-PUMP'] = '#e85858';
    this.dict['PILATES ZA FANTE IN PUNCE'] = '#f1e648';
    this.dict['IFT'] = '#49e449';
    this.dict['BODY SHAPE'] = '#e85858';
    this.dict['JUTRANJA VADBA - FIT SENIORJI'] = '#f1a469';
  }



  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filtereVodidOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._vodiFilter(value))
      );
  
  }

  addPair(myKey, myValue) {
    this.dict[myKey] = myValue;
  };

  giveValue(myKey) {
    return this.dict[myKey];
  };

  setColor(color){
    this.colorValue = this.giveValue(color);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _vodiFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.vodiOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}

interface Vadba {
  barva: string;
  naziv: string;
}

