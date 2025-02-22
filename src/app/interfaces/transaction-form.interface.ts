import {FormControl} from '@angular/forms';

export interface ITransactionForm {
  id: FormControl<string | null>;
  date: FormControl<string | null>;
  productCode: FormControl<string | null>;
  quantity: FormControl<string | null>;
  amount: FormControl<string | null>;
  currency: FormControl<string | null>;
  fee: FormControl<string | null>
}
