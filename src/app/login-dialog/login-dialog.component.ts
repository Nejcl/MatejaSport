import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { DatabaseService } from '../database.service';
import { IUser } from '../entities/user';
import { DataService } from '../data.service'  

 
@Component({
  selector: 'app-dialog-box',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  user: string;
  password: string;
  show: boolean;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private _dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public bdata: string,
              public router: Router,
              private log: LoginService,
              private dbService: DatabaseService) { }

    onOkClick() {
      if(this.user.length > 0 && this.password.length > 0){
        let item = {user: this.user, pw: this.password}
        this.dbService.checkUserandPassword(item)
        .subscribe(
          (data) => {
            if(data.pw === "OK"){
              this.log.setToken('TOKEN'+data.id);
              const currentUser:IUser = {
                id:data.id,
                username:data.username,
                ime:data.ime,
                priimek:data.priimek,
                veljavnost:data.veljavnost,
                obiski:data.obiski,
                prijave:data.prijave,
                aktiviran: data.aktiviran,
                email:data.email,
                telefon:data.telefon
              };
              this._dataService.setOption('size', data.id);
              localStorage.setItem('USER', data.id);
              localStorage.setItem('ime', data.ime + " " + data.priimek);
              this.dialogRef.close();

              this.router.navigateByUrl('/profil');
            }
            else if (data.pw ==="aktiviran") {
              alert("Vaš uporabniški račun še ni aktiviran, informacije o aktivaciji dobite na recepciji")
              this.dialogRef.close();
            }
            else
            {
              this.password="";
              this.show = true;
              this.log.resetToken();
            }
          },
          (error) =>  alert("Prišlo je do napake prosimo preverite podatke \n" + error.message)
       );
      }
    }

  ngOnInit() {
  }

}
