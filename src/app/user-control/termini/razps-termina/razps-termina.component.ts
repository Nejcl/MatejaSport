import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import { DatabaseService } from '../../../database.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';



@Component({
  selector: 'app-razps-termina',
  templateUrl: './razps-termina.component.html',
  styleUrls: ['./razps-termina.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})


export class RazpsTerminaComponent {
  minDate: Date;
  now: Date = new Date();
  myControl = new FormControl();
  myControlVodi = new FormControl();
  colorValue: string = '';
  options: string[] = ['Jutranji I.F.T.', 'FIT PILATES', 'TNZ','VADBA ZA ZAČETNIKE','ZDRAVA HRBTENICA & PILATES','I.F.T.-PUMP','PILATES ZA FANTE IN PUNCE','IFT','BODY SHAPE','JUTRANJA VADBA - FIT SENIORJI'];
  vodiOptions: string[] = ['Tjaša','Tina/Meta','Mateja','Meta','Anita','Jaka','Tina','Ana'];
  dict = {}; 
  filteredOptions: Observable<string[]>;
  filtereVodiOptions: Observable<string[]>;
  exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

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
    this.minDate = new Date();

  }



  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filtereVodiOptions = this.myControlVodi.valueChanges
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

