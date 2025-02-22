import {Component, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {BnrApiService} from '../../services/bnr-api/bnr-api.service';
import {IExchangeRates} from '../../interfaces';
import {MatTableModule} from '@angular/material/table';
import {ExchangeRateTableComponent} from '../../components/exchange-rate-table/exchange-rate-table.component';
import {mergeMap, take} from 'rxjs';

@Component({
  selector: 'app-main-exchange',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    ExchangeRateTableComponent
  ],
  templateUrl: './main-exchange.component.html',
  styleUrl: './main-exchange.component.less'
})
export class MainExchangeComponent implements OnInit {
  constructor(private BNRApiService: BnrApiService) {
  }

  public ngOnInit() {
    this.loadData()
  }

  public tableItems = signal<IExchangeRates[]>([])

  private initialValues = new Map<string, number>()

  public loadBNRData(): void {

    this.BNRApiService.getExchangeRatesBnr().pipe(take(1)).subscribe(response => {
      this.tableItems.set(response);
      this.initialValues = new Map(response.map(item => [item.currency, item.value]))
    })
  }

  public loadData(): void {
    this.BNRApiService.getExchangeRates().pipe(take(1)).subscribe(response => {
      const values = response;
      values.forEach(value => {
        if (this.initialValues.get(value.currency) !== value.value) {
          value.wasChanged = true;
        }
      })

      this.tableItems.set(values)
    });
  }

  public updateCurrency(currency: IExchangeRates): void {
    this.BNRApiService.updateExchangeRate(currency.currency, currency.value).pipe(take(1)).subscribe(() => {
      this.loadData()
    })
  }

}
