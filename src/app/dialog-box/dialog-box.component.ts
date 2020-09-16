import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoginService } from '../login.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  data: string;
  show: boolean;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public bdata: string,
              public router: Router,
              private log: LoginService,
              private dbService: DatabaseService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onOkClick() {
      let item = {pw: this.data}
      this.dbService.checkPW(item)
      .subscribe(
        (data) => {
          if(data.pw === "OK"){
            this.log.setToken('TOKEN-ADM-USR');
            this.dialogRef.close();
            this.router.navigateByUrl('/user-control');
          }
          else
          {
            this.data="";
            this.show = true;
            this.log.resetToken();
          }
        }
   );

    }

  ngOnInit() {
  }

}
