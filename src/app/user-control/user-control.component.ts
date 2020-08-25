import { Component, OnInit, AfterViewInit, ViewEncapsulation, Inject } from '@angular/core';
import { DatabaseService } from '../database.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  diagResult: false
  diagData: {id: string, dan: string, od: string, do: string, naziv: string, vodi: string, color: string}
}

export interface DialogData2 {
  diagResult2: false
  diagData2: {id: string, position: Number, naslovna: string, naslov: string, vsebina: string, configCE4: any ,configCE42: any}
}

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css'],

})
export class UserControlComponent implements OnInit, AfterViewInit {
  public configCE4 = {
    removePlugins: 'elementspath,save,font,easyimage',
    placeholder: 'Type the content here!',
    toolbar: [ ['Bold', 'Italic'], ['Undo', 'Redo'], ['TextColor', 'BGColor'] ],
    cloudServices_tokenUrl: 'http://www.matejasport.si',
    }

    public configCE42 = {
      removePlugins: 'elementspath,save,font,easyimage',
      extraPlugins: 'image2',
      placeholder: 'Type the content here!',
      toolbar: [ ['Bold', 'Italic'],
      ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
      ['Undo', 'Redo'],
      ['TextColor', 'BGColor'],
      ['Link', 'Unlink'],
      ['NumberedList', 'BulletedList', 'Outdent', 'Indent'],
      ['Image'],
    ],
    forcePasteAsPlainText: true,
    cloudServices_tokenUrl: 'http://www.matejasport.si',
    filebrowserUploadUrl: 'http://www.matejasport.si/php/ftp.php'
      }

  showNovice: boolean = true;
  showUrnik: boolean = false;
  showAktivacija: boolean = false;


  danValue: string = '';
  odTime: string = '';
  doTime: string = '';
  nazivValue: string = '';
  vodiValue: string = '';
  colorValue: string = '';

  Vadba: Array<{id: string, dan: string, od: string, do: string, naziv: string, vodi: string, color: string}> = [];
  Novica: Array<{id: string, position: Number, naslovna: string, naslov: string, vsebina: string}> = [];

  public naslovna = {
    editorData: ''
};
  public naslov = {
    editorData: ''
};
  public vsebina = {
    editorData: ''
};

  urnikTekst: string = '';
  noviceTekst: string = '';
  data: any[];

  constructor(private dbService: DatabaseService, public dialog: MatDialog) {

   }

  ngOnInit() {

    this.dbService.reloadUrnik().subscribe(
      (data) => {
        this.Vadba = data;
        this.sortArray();
       }
    );

    this.dbService.reloadNovica().subscribe(
      (data) => {
        if (data != null)
        {
          this.Novica = data; 
          this.sortNovice();
        }

       }
    );
  }
  openDialog(index: number)
  {
    let VadbaCopy = Object.assign({}, this.Vadba[index]);
    const dialogRef = this.dialog.open(DialogContent, {
      data: {
        diagData: VadbaCopy
      }
      });

    dialogRef.afterClosed().subscribe(result => {
     
     if(result)
     {
     this.dbService.EditUrnikEntry(result.diagData)
      .subscribe(
        (data) => {
         
          this.Vadba[index] = result.diagData;
          this.sortArray();
        })

     }
    });
  }

  removeNovica(index: number){
    this.dbService.deleteNovica(this.Novica[index].id).subscribe(
      (data) => {
          this.Novica.splice(index, 1);
      });
  }

  copyNovica(index: number){
      this.dbService.addNovica(this.Novica[index])
        .subscribe(
          (data) => {
            this.Novica.push(this.Novica[index]);
            this.sortNovice();
          }
     );
  }

  editNovica(index: number){
    let NovicaCopy = Object.assign({}, this.Novica[index]);
    const dialogRef = this.dialog.open(DialogContent2, {
      data: {
        diagData2: {id: NovicaCopy.id, position: NovicaCopy.position, naslovna: NovicaCopy.naslovna, naslov: NovicaCopy.naslov, vsebina: NovicaCopy.vsebina, configCE4: this.configCE4 ,configCE42: this.configCE42}
      }
      });

    dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     if(result)
     {
      let eNovica = {id: result.diagData2.id, position: result.diagData2.position, naslovna: result.diagData2.naslovna, naslov: result.diagData2.naslov, vsebina: result.diagData2.vsebina}
     this.dbService.editNovica(eNovica)
      .subscribe(
        (data) => {
           this.Novica[index] = eNovica;
        })

     }
    });
  }

  upNovica(index: number){
    if(this.Novica[index].position > 1)
    {
      this.Novica[index].position = Number(this.Novica[index].position)-1;
      this.dbService.editNovica(this.Novica[index])
      .subscribe(
        (data) => {
            this.sortNovice();
        });
    }

  }

  downNovica(index: number){
    this.Novica[index].position = Number(this.Novica[index].position)+1;
    this.dbService.editNovica(this.Novica[index])
    .subscribe(
      (data) => {
          this.sortNovice();
      });
  }

  addNovica(){
    let maxPos = Math.max.apply(Math, this.Novica.map(function(o) { return o.position; }))
      let item = ({id: '',position: maxPos+1,  naslovna: this.naslovna.editorData, naslov: this.naslov.editorData, vsebina: this.vsebina.editorData});
      this.dbService.addNovica(item)
        .subscribe(
          (data) => {
            this.Novica.push({id: data.id, position: data.position, naslovna: this.naslovna.editorData, naslov: this.naslov.editorData, vsebina: this.vsebina.editorData});
            this.vsebina.editorData = "";
            this.naslovna.editorData = "";
            this.naslov.editorData = "";

          }
     );
  }

  reloadNovica(){
    this.dbService.reloadNovica().subscribe(
      (data) => {
        console.log(data);
        this.Novica = data;
        this.noviceTekst = 'Ponovno naloženo!';
        setTimeout(() => {
          this.noviceTekst = '';
          }, 2000);
       }
    );
  }

  saveNovica(){
    this.dbService.pushNovica().subscribe(
      (data) => {
        this.noviceTekst = 'Shranjeno!';
        setTimeout(() => {
          this.noviceTekst = ''
          }, 2000);
       }
    );
  }

  sortNovice()
  {
    this.Novica = this.Novica.sort((a, b) =>  {
      if (a.position > b.position) {
          return 1;
      }
  
      if (a.position < b.position) {
          return -1;
      }
  
      return 0;
  });
  }

  sortArray(){
    this.Vadba = this.Vadba.sort((a, b) => a.dan === 'nedelja' ? -1 : 0 );
    this.Vadba = this.Vadba.sort((a, b) => a.dan === 'sobota' ? -1 : 0 );
    this.Vadba = this.Vadba.sort((a, b) => a.dan === 'petek' ? -1 : 0 );
    this.Vadba = this.Vadba.sort((a, b) => a.dan === 'četrtek' ? -1 : 0 );
    this.Vadba = this.Vadba.sort((a, b) => a.dan === 'sreda' ? -1 : 0 );
    this.Vadba = this.Vadba.sort((a, b) => a.dan === 'torek' ? -1 : 0 );
    this.Vadba = this.Vadba.sort((a, b) => a.dan === 'ponedeljek' ? -1 : 0 );
    this.Vadba = this.Vadba.sort((a, b) => (a.dan === 'ponedeljek' && b.dan === 'ponedeljek' && +a.od.replace(':', '') < +b.od.replace(':', '')) ? -1 : 0);
    this.Vadba = this.Vadba.sort((a, b) => (a.dan === 'torek' && b.dan === 'torek' && +a.od.replace(':', '') < +b.od.replace(':', '')) ? -1 : 0);
    this.Vadba = this.Vadba.sort((a, b) => (a.dan === 'sreda' && b.dan === 'sreda' && +a.od.replace(':', '') < +b.od.replace(':', '')) ? -1 : 0);
    this.Vadba = this.Vadba.sort((a, b) => (a.dan === 'četrtek' && b.dan === 'četrtek' && +a.od.replace(':', '') < +b.od.replace(':', '')) ? -1 : 0);
    this.Vadba = this.Vadba.sort((a, b) => (a.dan === 'petek' && b.dan === 'petek' && +a.od.replace(':', '') < +b.od.replace(':', '')) ? -1 : 0);
    this.Vadba = this.Vadba.sort((a, b) => (a.dan === 'sobota' && b.dan === 'sobota' && +a.od.replace(':', '') < +b.od.replace(':', '')) ? -1 : 0);
    this.Vadba = this.Vadba.sort((a, b) => (a.dan === 'nedelja' && b.dan === 'nedelja' && +a.od.replace(':', '') < +b.od.replace(':', '')) ? -1 : 0);
  }

  RemoveItem(index: number)
  {
    this.dbService.deleteUrnik(this.Vadba[index].id).subscribe(
      (data) => {
          this.Vadba.splice(index, 1);
      });
  }

  CopyItem(index: number)
  {
      this.dbService.CopyUrnikEntry(this.Vadba[index])
      .subscribe(
        (data) => {
          this.Vadba.push(this.Vadba[index]);
          this.sortArray();
        }
   );
  }

  AddItem(){
    let item = {id: '', dan: this.danValue, od: this.odTime, do: this.doTime, naziv: this.nazivValue, vodi: this.vodiValue, color: this.colorValue};
    this.dbService.addUrnik(item)
      .subscribe(
        (data) => {
          this.Vadba.push({id: data.id, dan: this.danValue, od: this.odTime, do: this.doTime, naziv: this.nazivValue, vodi: this.vodiValue, color: this.colorValue});
          this.sortArray();
        }
   );
  }

  reload(){
    this.dbService.reloadUrnik().subscribe(
      (data) => {
        this.Vadba = data;
        this.sortArray();
        this.urnikTekst = 'Ponovno naloženo!';
        setTimeout(() => {
          this.urnikTekst = ''
          }, 2000);
       }
    );
  }

  save(){
    this.dbService.pushUrnik().subscribe(
      (data) => {
        this.urnikTekst = 'Shranjeno!';
        setTimeout(() => {
          this.urnikTekst = ''
          }, 2000);
       }
    );
  }

  urnikClick(show: boolean){
    this.showNovice = false;
    this.showUrnik = true;
    this.showAktivacija = false;
  }

  noviceClick(show: boolean){
    this.showNovice = true;
    this.showUrnik = false;
    this.showAktivacija = false;
  }

  aktivacijaClick(show: boolean){
    this.showNovice = false;
    this.showUrnik = false;
    this.showAktivacija = true;
  }

  ngAfterViewInit()
  {
      let top = document.getElementById('top');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

@Component({
  selector: 'dialog-content2',
  templateUrl: 'dialog-content2.html',
})
export class DialogContent2 {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData2) {}
}