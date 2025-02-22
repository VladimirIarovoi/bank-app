import {Component, effect, input, output} from '@angular/core';
import {
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {IExchangeRates} from '../../interfaces';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {EditExchangeRateComponent} from '../edit-exchange-rate/edit-exchange-rate.component';

@Component({
  selector: 'app-exchange-rate-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './exchange-rate-table.component.html',
  styleUrl: './exchange-rate-table.component.less'
})

export class ExchangeRateTableComponent {
  constructor(private dialog: MatDialog) {
    effect(() => {
      this.dataSource.data = this.tableItems()
    });
  }

  public tableItems = input.required <IExchangeRates[]>()
  public displayedColumns: string[] = ['currency', 'exchange-rate', 'edit'];
  public dataSource: MatTableDataSource<IExchangeRates> = new MatTableDataSource<IExchangeRates>([]);
  public updateCurrency = output<IExchangeRates>()

  public editCurrency(value: IExchangeRates) {
    this.dialog.open(EditExchangeRateComponent, {
      width: '450px',
      data: {value: value}
    }).afterClosed().subscribe(result => {
      this.updateCurrency.emit({currency: value.currency, value: result});
    })
  }
}
