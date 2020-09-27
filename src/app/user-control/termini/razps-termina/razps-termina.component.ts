import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { DatabaseService } from '../../../database.service';
import { MAT_MOMENT_DATE_FORMATS,MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

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
  terminForm: FormGroup;
  submitted = false;
  minDate: Date;
  now: Date = new Date();
  myControl = new FormControl();
  myControlVodi = new FormControl();
  colorValue: string = '';
  options: string[] = ['Jutranji I.F.T.', 'FIT PILATES', 'TNZ','VADBA ZA ZAČETNIKE','ZDRAVA HRBTENICA & PILATES','I.F.T.-PUMP','PILATES ZA FANTE IN PUNCE','IFT','BODY SHAPE','JUTRANJA VADBA - FIT SENIORJI'];
  vodiOptions: string[] = ['Tjaša','Tina/Meta','Mateja','Meta','Anita','Jaka','Tina','Ana'];
  monthNames = ["Januar", "Februar", "Marec", "April", "Maj", "Junij","Julij", "Avgust", "September", "Oktober", "November", "December"];
  Vadbe: Array<{dan:string, od:string, do:string, naziv: string, vodi:string, color:string}>;
  stMest = 21;
  mesec: string;
  leto: number;
  dict = {}; 
  filteredOptions: Observable<string[]>;
  filtereVodiOptions: Observable<string[]>;
  exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  result: string = '';
  constructor(private dbService: DatabaseService, private formBuilder: FormBuilder,public dialog: MatDialog) {
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
    this.mesec = this.monthNames[this.now.getMonth()+1];
    this.leto = this.now.getFullYear();
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
      this.terminForm = this.formBuilder.group({
        naziv: ['', Validators.required],
        vodi: ['', Validators.required],
        barva: [''],
        datum: ['', Validators.required],
        od: ['', Validators.required],
        do: ['', Validators.required],
        st_mest: ['',[Validators.required, Validators.maxLength(2)]]
      });
      this.terminForm.controls['st_mest'].setValue(21);
      this.terminForm.controls['od'].valueChanges.subscribe(value => {
        if(this.terminForm.controls['od'].value != undefined) {
          var time =  value.split ( ":" );
          var minute = Number(time[0]*60);
          minute += 60 + Number(time[1]);
          var hours = Math.floor(minute / 60);
          var minutes = Math.floor((minute - (hours * 60)));

          if(hours == 0 ) {
            time[0]='00'
          } else if( hours < 10) {
             time[0] = '0' + hours
          } else time[0]=String(hours);

          if(minutes == 0 ) {
            time[1]='00'
          } else if( minutes < 10) {
             time[1] = '0' + minutes
          } else time[1]=String(minutes);
          this.terminForm.controls['do'].setValue(time[0]+':'+time[1]);
        }
      });
  }

  get f() { return this.terminForm.controls; }

  adjustDateForTimeOffset(dateToAdjust): Date {
    var offsetMs = dateToAdjust.getTimezoneOffset() * 60000;
    return new Date(dateToAdjust.getTime() - offsetMs);
  }
  

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.terminForm.invalid) {
        return;
    }
    var datum = this.adjustDateForTimeOffset(new Date(this.terminForm.controls['datum'].value))
    this.terminForm.controls['datum'].setValue(datum);
    this.terminForm.controls['barva'].setValue(this.colorValue);
    this.dbService.dodajTermin(this.terminForm.value)
    .subscribe(
      (data) => {
        if(data.termin === "OK"){
          let message = "Termin uspešno dodan";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Termin dodan", message,'Ok');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          });  
          this.terminForm.reset();
        } else{
          alert("Prišlo je do napake pri dodajanju termina");
        }
      },
      (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
    );
  }

  giveValue(myKey) {
    return this.dict[myKey];
  };

  setColor(color){
    this.colorValue = this.giveValue(color);
    this.terminForm.controls['barva'].setValue(this.colorValue);

  }

  addMesto(){
    this.stMest +=1;
  }
  
  removeMesto(){
    if(this.stMest >0){
      this.stMest -=1;
    }
  }

  previusMonth() {
    if(this.monthNames.indexOf(this.mesec)+(this.leto-this.now.getFullYear())*12>this.now.getMonth()){
      this.mesec = this.monthNames[this.monthNames.indexOf(this.mesec)-1];
    }
    if(this.mesec === undefined){
      this.mesec = this.monthNames[11];
    }
  }
   nextMonth(){
    if(this.monthNames[this.monthNames.indexOf(this.mesec) + 1] == undefined &&(this.leto-this.now.getFullYear())*12 + 1 > this.now.getMonth()){
      this.mesec = this.monthNames[0];
    } else if(this.monthNames[this.monthNames.indexOf(this.mesec) + 1] != undefined && this.monthNames.indexOf(this.mesec)+1+(this.leto-this.now.getFullYear())*12 >this.now.getMonth()){
      this.mesec = this.monthNames[this.monthNames.indexOf(this.mesec)+1];
    }
   }

   previusYear() {
    if(this.leto -1 >= this.now.getFullYear() ){
      this.leto = this.leto -1;
      if(this.leto === this.now.getFullYear()){
        this.mesec = this.monthNames[this.now.getMonth()+1];
      }
    }
  }
   nextYear(){
    this.leto = this.leto + 1;
   }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _vodiFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.vodiOptions.filter(option => option.toLowerCase().includes(filterValue));
  }


  confirmDialog(): void {
    var startDate = new Date(this.leto,this.monthNames.indexOf(this.mesec),1);
    var endDate = new Date(this.leto,this.monthNames.indexOf(this.mesec)+1,0);
    let data = {startDate: startDate,endDate:endDate};
    let message = '';
    let icon = "warning";
    this.dbService.getStTerminov(data)
    .subscribe(
      (data) => {
        if(data['termin'] !="NOK"){
          message = "Ali ste prepričani da želite dodati termine? \n Za "+this.mesec +" že obstaja "+ data['termin']+ " terminov";
          const dialogData = new ConfirmDialogModel(true,icon,"Ustvari termine za " +this.mesec, message,'Da');
 
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: "400px",
            data: dialogData
          });
       
          dialogRef.afterClosed().subscribe(dialogResult => {
            this.result = dialogResult;
            if(this.result)
              this.razpisiMesecneTermine();
          });
        } else{
          message = "Prišlo je do napake pri dodajanju terminov"
        }
      },
      (error) =>  { message = "Prišlo je do napake prosimo preverite podatke "+ error
    }); 
  }

  razpisiMesecneTermine() {
    
  this.dbService.readUrnik().subscribe(
    (data) => {
      this.Vadbe = data;
      var vadbePoDnevih = new Array(7);
      vadbePoDnevih[0] = this.Vadbe.filter(item => item.dan.indexOf('nedelja') !== -1);
      vadbePoDnevih[1] = this.Vadbe.filter(item => item.dan.indexOf('ponedeljek') !== -1);
      vadbePoDnevih[2] = this.Vadbe.filter(item => item.dan.indexOf('torek') !== -1);
      vadbePoDnevih[3] = this.Vadbe.filter(item => item.dan.indexOf('sreda') !== -1);
      vadbePoDnevih[4] = this.Vadbe.filter(item => item.dan.indexOf('četrtek') !== -1);
      vadbePoDnevih[5] = this.Vadbe.filter(item => item.dan.indexOf('petek') !== -1);
      vadbePoDnevih[6] = this.Vadbe.filter(item => item.dan.indexOf('sobota') !== -1);
      console.log(vadbePoDnevih);
      var termini = [];
      var startDate = new Date(this.leto,this.monthNames.indexOf(this.mesec),1);
      var endDate = new Date(this.leto,this.monthNames.indexOf(this.mesec)+1,0);
      var loop = new Date(startDate);
      while(loop <= endDate){
        vadbePoDnevih[loop.getDay()].forEach(vadba => {
          termini.push({naziv:vadba.naziv,vodi:vadba.vodi,barva:vadba.color,datum:loop,od:vadba.od,do:vadba.do,st_mest:this.stMest});     
        });          
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }
     console.log(termini);
     this.dbService.dodajTermine(termini)
     .subscribe(
       (data) => {
         if(data.termin === "OK"){
          let message = "Termini za "+ this.mesec +" uspešno dodani";
          let icon = "info";
          const dialogData = new ConfirmDialogModel(false,icon,"Termini dodani", message,'Ok');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              maxWidth: "400px",
              data: dialogData
          });  
         } else{
           alert("Prišlo je do napake pri dodajanju terminov");
         }
       },
       (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
     );
     },
     (error) =>{
      alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
     }
  );

  }
}

interface Vadba {
  barva: string;
  naziv: string;
}


interface termin {
  naziv:string;
  vodi:string;
  barva: string;
  datum:string;
  od: string;
  do: string;
  st_mest: string;
}
