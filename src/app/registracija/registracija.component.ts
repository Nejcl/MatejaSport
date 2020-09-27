import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { DatabaseService } from '../database.service';
import { LoginService } from '../login.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  result: string = '';
  obstojeciUporabniki = [];
  constructor( private formBuilder: FormBuilder, public router: Router, private dbService: DatabaseService, private log: LoginService, public dialog: MatDialog) {
    this.getExistingUsers();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required,(control: AbstractControl) => {
        return this.obstojeciUporabniki.indexOf(control.value) === -1 ? null : {'forbiddenValue': true};
     }]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
          this.dbService.userRegistration(this.registerForm.value)
          .subscribe(
            (data) => {
              if(data.registration === "OK"){
                
                  let message = "Registracija uspešna, vaš račun bo aktiviran v roku 24 ur";
                  let icon = "info";
                  const dialogData = new ConfirmDialogModel(false,icon,"Registracija uspešna", message,'Ok');
                  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                      maxWidth: "400px",
                      data: dialogData
                  });
                     
                  dialogRef.afterClosed().subscribe(dialogResult => {
                  this.result = dialogResult;
                  if(this.result)
                    this.router.navigateByUrl('/home');
                   });

              } else{
                alert("registracija uporabnika ni uspešna");
                this.router.navigateByUrl('/home');

              }
            },
            (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
         );
      } 

      getExistingUsers(){
        this.dbService.getUsers().subscribe(
          (data) => {
             data.forEach(element => {
              this.obstojeciUporabniki.push(element.uporabnik)
            });
           }
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
