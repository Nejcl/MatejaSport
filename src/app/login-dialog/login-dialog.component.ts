import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoginService } from '../login.service';
import { DatabaseService } from '../database.service';
import { IUser } from '../entities/user';
import { fromEventPattern } from 'rxjs';
import { ShareDataService} from '../share-data.service';
 
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
              @Inject(MAT_DIALOG_DATA) public bdata: string,
              public router: Router,
              private log: LoginService,
              private dbService: DatabaseService,
              private shareService:ShareDataService) { }

    onOkClick() {
      if(this.user.length > 0 && this.password.length > 0){
        let item = {user: this.user, pw: this.password}
        this.dbService.checkUserandPassword(item)
        .subscribe(
          (data) => {
            if(data.pw === "OK"){
              this.log.setToken('TOKEN');
              const currentUser:IUser = {
                id:data.id,
                username:data.username,
                ime:data.ime,
                priimek:data.priimek,
                veljavnost:data.veljavnost,
                obiski:data.obiski,
                prijave:data.prijave
              };
              this.shareService.addItem(currentUser);
              this.dialogRef.close();

              this.router.navigateByUrl('/profil');
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
