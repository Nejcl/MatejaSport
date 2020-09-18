import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'
import { Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { DatabaseService } from '../../../database.service';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-edit-termin-dialog',
  templateUrl: './edit-termin-dialog.component.html',
  styleUrls: ['./edit-termin-dialog.component.css'],  
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
})
export class EditTerminDialogComponent implements OnInit {
  editTerminForm: FormGroup;
  submitted = false;
  options: string[] = ['Jutranji I.F.T.', 'FIT PILATES', 'TNZ','VADBA ZA ZAČETNIKE','ZDRAVA HRBTENICA & PILATES','I.F.T.-PUMP','PILATES ZA FANTE IN PUNCE','IFT','BODY SHAPE','JUTRANJA VADBA - FIT SENIORJI'];
  vodiOptions: string[] = ['Tjaša','Tina/Meta','Mateja','Meta','Anita','Jaka','Tina','Ana'];
  dict = {}; 
  myControl = new FormControl();
  myControlVodi = new FormControl();
  filteredOptions: Observable<string[]>;
  filtereVodiOptions: Observable<string[]>;
  colorValue: string = '';
  odTime: string = '';
  doTime: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dbService: DatabaseService, private formBuilder: FormBuilder) { 
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
  this.filtereVodiOptions = this.myControlVodi.valueChanges
    .pipe(
      startWith(''),
      map(value => this._vodiFilter(value))
    );
      // will log the entire data object
      this.editTerminForm = this.formBuilder.group({
        id:[this.data.dataKey.id],
        naziv: ['', Validators.required],
        instruktor: ['', Validators.required],
        barva: ['', Validators.required],
        datum: ['', Validators.required],
        od: ['', Validators.required],
        do: ['', Validators.required],
        st_mest: ['',[Validators.required, Validators.maxLength(2)]]
      });

      this.editTerminForm.controls['naziv'].setValue(this.data.dataKey.naziv);
      this.editTerminForm.controls['instruktor'].setValue(this.data.dataKey.instruktor);
      this.editTerminForm.controls['barva'].setValue(this.data.dataKey.barva);
      this.colorValue = this.data.dataKey.barva;
      this.editTerminForm.controls['datum'].setValue(this.data.dataKey.datum);
      this.editTerminForm.controls['od'].setValue(this.data.dataKey.od);
      this.editTerminForm.controls['do'].setValue(this.data.dataKey.do);
      this.odTime  = this.data.dataKey.od;
      this.doTime  = this.data.dataKey.do;
      this.editTerminForm.controls['st_mest'].setValue(this.data.dataKey.st_mest);
  }

  get f() { return this.editTerminForm.controls; }

  giveValue(myKey) {
    return this.dict[myKey];
  };
  
  setColor(color){
    this.colorValue = this.giveValue(color);
    this.editTerminForm.controls['barva'].setValue(this.colorValue);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _vodiFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.vodiOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  adjustDateForTimeOffset(dateToAdjust): Date {
    var offsetMs = dateToAdjust.getTimezoneOffset() * 60000;
    return new Date(dateToAdjust.getTime() - offsetMs);
  }
  

  onSubmit() {
    this.submitted = true;
    this.editTerminForm.controls['barva'].setValue(this.colorValue);
    var datum = this.adjustDateForTimeOffset(new Date(this.editTerminForm.controls['datum'].value))
    this.editTerminForm.controls['datum'].setValue(datum);
    // stop here if form is invalid
    if (this.editTerminForm.invalid) {
        return;
    }
    this.dbService.urediTermin(this.editTerminForm.value)
    .subscribe(
      (data) => {
        if(data.termin === "OK"){
          alert("Termin uspešno urejen");
        } else{
          alert("Prišlo je do napake pri urejanju  termina");
        }
      },
      (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
    );
  }

}
