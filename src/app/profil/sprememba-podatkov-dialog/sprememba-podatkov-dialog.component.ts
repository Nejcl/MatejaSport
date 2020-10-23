import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogRef } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MustMatch } from '../../_helpers/must-match.validator';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-sprememba-podatkov-dialog',
  templateUrl: './sprememba-podatkov-dialog.component.html',
  styleUrls: ['./sprememba-podatkov-dialog.component.css']
})
export class SpremembaPodatkovDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dbService: DatabaseService,private dialogRef:MatDialogRef<SpremembaPodatkovDialogComponent>, public dialog: MatDialog) { }

  changePwForm: FormGroup;
  submitted = false;
  result: string = '';
  user: string;

  ngOnInit() {
    this.user = sessionStorage.getItem('USER');
    this.changePwForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', Validators.required]
    });
    this.getUserData();
  }

  get f() { return this.changePwForm.controls; }



  getUserData(){
    let item = {id: this.user}
    this.dbService.getUser(item)
    .subscribe(
      (data) => {
        if(data){
          this.changePwForm.controls['firstName'].setValue(data['ime']);
          this.changePwForm.controls['lastName'].setValue(data['priimek'])
          this.changePwForm.controls['email'].setValue(data['email'])
          this.changePwForm.controls['phone'].setValue(data['telefon'])
        } else{
          alert("sprememba podatkov ni uspešna");
        }
      },
      (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
   );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePwForm.invalid) {
        return;
    }

    let item = {id: this.user,email:this.changePwForm.controls['email'].value,telefon:this.changePwForm.controls['phone'].value,ime:this.changePwForm.controls['firstName'].value,priimek:this.changePwForm.controls['lastName'].value}
      this.dbService.urediPodatkeUporabnika(item)
      .subscribe(
        (data) => {
          if(data['resp'] === "ponastavljeno"){
              let message = "Podatki so bili spremenjeni";
              let icon = "info";
              const dialogData = new ConfirmDialogModel(false,icon,"Sprememba podatkov", message,'Ok');
              this.dialog.open(ConfirmDialogComponent, {
                  maxWidth: "400px",
                  data: dialogData
              });
              this.dialogRef.close();
          } else{
            alert("sprememba podatkov ni uspešna");
          }
        },
        (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
     );
  } 

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}