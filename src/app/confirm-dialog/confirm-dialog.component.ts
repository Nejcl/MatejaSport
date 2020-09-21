import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
 
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  icon:string;
  barva: string;
  noBtn:Boolean;
  da:string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.da= data.da;
    this.title = data.title;
    this.message = data.message;
    this.icon = data.icon;
    this.noBtn = data.noBtn;
    if(this.icon =='cancel') this.barva = "red";
    else if (this.icon == 'warning')this.barva = "gold";
    else this.barva = "dodgerblue";
  }
  
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }
 
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
 
/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {
 
  constructor(public noBtn:Boolean, public icon:string ,public title: string, public message: string,public da:string) {
  }
}
