import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import form from "../../forms/interaction-forms.json";
import { LanguageComponent } from '../language/language.component';

export interface DialogData{
  lang: string;
  title: string;
}

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {
  
  public labelForm = form;

  public isConfirm: boolean = false;
  private languageComponent: LanguageComponent

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<DialogConfirmationComponent>) { }

  ngOnInit(): void {
  }
}
