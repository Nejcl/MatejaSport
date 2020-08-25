import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { DatabaseService } from '../database.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder, public router: Router, private dbService: DatabaseService, private log: LoginService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
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
                alert("Registracija uspešna prosim počakajte na aktivacijo računa");
                this.router.navigateByUrl('/home');
              } else{
                alert("registracija uporabnika ni uspešna");
                this.router.navigateByUrl('/home');

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
