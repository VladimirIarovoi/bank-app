import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ITransactionForm} from '../../interfaces/transaction-form.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {firstValueFrom, take} from 'rxjs';
import {BnrApiService} from '../../services/bnr-api/bnr-api.service';
import {IExchangeRates} from '../../interfaces';
import {MatOptionModule} from '@angular/material/core';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {ITransaction} from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButton
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.less'
})
export class AddTransactionComponent implements OnInit {
  constructor(private BNRApiService: BnrApiService) {
  }

  public transactionForm!: FormGroup<ITransactionForm>;
  public currencies: IExchangeRates[] = [];

  public ngOnInit() {
    this.loadCurrencies();

    this.transactionForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      date: new FormControl('', [Validators.required, this.validateDateNotFuture]),
      productCode: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4}$')]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      currency: new FormControl('', Validators.required),
      fee: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
    })
  }

  private validateDateNotFuture(control: any) {
    if (!control.value) return null;
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate > today ? {futureDate: true} : null;
  }

  public onSubmit(): void {
    if (this.transactionForm.invalid) {
      return;
    }

    const transaction: ITransaction = {
      id: this.transactionForm.controls.id.value ?? "",
      date: this.transactionForm.controls.date.value ?? "",
      productCode: this.transactionForm.controls.productCode.value ?? "",
      quantity: this.transactionForm.controls.quantity.value ?? "",
      amount: this.transactionForm.controls.amount.value ?? "",
      currency: this.transactionForm.controls.currency.value ?? "",
      fee: this.transactionForm.controls.fee.value ?? "",
    }


    firstValueFrom(this.BNRApiService.addTransaction(transaction))
  }

  private loadCurrencies() {
    this.BNRApiService.getExchangeRates().pipe(take(1)).subscribe(response => {
      this.currencies = response
    });
  }
}
