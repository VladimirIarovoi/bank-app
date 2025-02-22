import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BnrApiService} from '../../services/bnr-api/bnr-api.service';
import {ITransaction} from '../../interfaces/transaction.interface';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {DecimalPipe} from '@angular/common';
import {take} from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  standalone: true,
  styleUrls: ['./transaction-list.component.less'],
  imports: [MatTableModule, MatButtonModule, DecimalPipe]
})
export class TransactionListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'productCode', 'quantity', 'amount', 'currency', 'fee'];
  public dataSource: MatTableDataSource<ITransaction> = new MatTableDataSource<ITransaction>();

  constructor(private BNRApiService: BnrApiService, private router: Router) {
  }

  public ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.BNRApiService.getTransactionsList().pipe(take(1)).subscribe(response => {
      this.dataSource = new MatTableDataSource<ITransaction>(response)
    });
  }

  navigateToAddTransaction(): void {
    this.router.navigate(['/add-transaction']);
  }
}
