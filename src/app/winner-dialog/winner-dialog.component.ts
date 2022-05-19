import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.scss']
})
export class WinnerDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<WinnerDialogComponent>) { }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close();
}

close() {
    this.dialogRef.close();
}

}
