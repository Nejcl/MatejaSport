import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { DatabaseService } from '../database.service';
import { IUser } from '../entities/user';
import { DataService } from '../data.service'  
import {MatDialog} from "@angular/material";
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
 
@Component({
  selector: 'app-dialog-box',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  user: string;
  password: string;
  show: boolean;
  result: string = '';

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private _dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public bdata: string,
              public router: Router,
              private log: LoginService,
              private dbService: DatabaseService,
              public dialog: MatDialog) { }

    onOkClick() {
      if(this.user && this.user.length > 0 &&this.password && this.password.length > 0){
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
              sessionStorage.setItem('USER', data.id);
              sessionStorage.setItem('ime', data.ime + " " + data.priimek);
              this.dialogRef.close();

              this.router.navigateByUrl('/profil');
            }
            else if (data.pw ==="aktiviran") {
              let message = "Vaš uporabniški račun še ni aktiviran, račun bo aktiviran v roku 24ur. V nasprotnem primeru se obrnite na recepcijo";
              let icon = "warning";
              const dialogData = new ConfirmDialogModel(false,icon,"Aktivacija računa", message,'Ok');
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                  maxWidth: "400px",
                  data: dialogData
              });
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
