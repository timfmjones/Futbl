import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog} from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';



@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent implements OnInit {

  form: FormGroup;
  difficulty: number = 1;
  leagues: string[] = ["Premier League", "La Liga", "Ligue 1", "Bundesliga", "Serie A"];
// , private fb: FormBuilder
  constructor(private dialogRef: MatDialogRef<MenuDialogComponent>, private dialog: MatDialog, private fb: FormBuilder) { }
  ngOnInit(): void {

    this.form = this.fb.group({
      leagues: [this.leagues, []],
      difficulty: [this.difficulty, []]
  });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  openInfoDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(InfoDialogComponent, dialogConfig);
    this.close();
  }

}
