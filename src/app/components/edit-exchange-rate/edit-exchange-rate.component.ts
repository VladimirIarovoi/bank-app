import {Component, Inject, OnInit, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IExchangeRates} from "../../interfaces";

@Component({
  selector: 'app-edit-exchange-rate',
  standalone: true,
  imports: [
    MatDialogContent, MatDialogModule, MatButtonModule, MatInputModule, MatFormField, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './edit-exchange-rate.component.html',
  styleUrl: './edit-exchange-rate.component.less'
})

export class EditExchangeRateComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditExchangeRateComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    value: IExchangeRates
  }) {
  }

  public editForm!: FormGroup<{ exchangeValue: FormControl<number | null> }>;

  public ngOnInit(): void {
    this.editForm = new FormGroup({
      exchangeValue: new FormControl(this.data.value.value, [Validators.required, Validators.min(0)]),
    })
  }

  public closeModal(): void {
    this.dialogRef.close(this.editForm.controls.exchangeValue.value);
  }
}
