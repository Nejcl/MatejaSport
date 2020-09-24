import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogRef } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MustMatch } from '../../_helpers/must-match.validator';
import { DatabaseService } from '../../database.service';


@Component({
  selector: 'app-sprememba-gesla-dialog',
  templateUrl: './sprememba-gesla-dialog.component.html',
  styleUrls: ['./sprememba-gesla-dialog.component.css']
})
export class SpremembaGeslaDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dbService: DatabaseService,private dialogRef:MatDialogRef<SpremembaGeslaDialogComponent>, public dialog: MatDialog) { }

  changePwForm: FormGroup;
  submitted = false;
  result: string = '';
  user: string;

  ngOnInit() {
    this.user = sessionStorage.getItem('USER');
    this.changePwForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get f() { return this.changePwForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePwForm.invalid) {
        return;
    }

    let item = {id: this.user,geslo:this.changePwForm.controls['password'].value}
      this.dbService.spremeniGeslo(item)
      .subscribe(
        (data) => {
          if(data['resp'] === "ponastavljeno"){
              let message = "Geslo je bilo spremenjeno";
              let icon = "info";
              const dialogData = new ConfirmDialogModel(false,icon,"Sprememba gesla", message,'Ok');
              this.dialog.open(ConfirmDialogComponent, {
                  maxWidth: "400px",
                  data: dialogData
              });
              this.dialogRef.close();
          } else{
            alert("sprememba gesla ni uspešna");
          }
        },
        (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
     );
  } 

}
