import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-dialogreason',
  templateUrl: './dialogreason.component.html',
  styleUrls: ['./dialogreason.component.scss']
})
export class DialogreasonComponent implements OnInit {

  constructor(  private dialogRef: MatDialogRef<DialogreasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,) { }

  ngOnInit(): void {
  }
  onNoClick(){
    this.dialogRef.close();
  }
}
