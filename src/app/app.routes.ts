import {Routes} from '@angular/router';
import {MainExchangeComponent} from './pages/main-exchange/main-exchange.component';
import {InventoryListComponent} from './pages/inventory-list/inventory-list.component';
import {TransactionListComponent} from './pages/transaction-list/transaction-list.component';
import {AddTransactionComponent} from './pages/add-transaction/add-transaction.component';

export const routes: Routes = [
  {path: '', component: MainExchangeComponent},
  {path: 'transaction-list', component: TransactionListComponent},
  {path: 'inventory-list', component: InventoryListComponent},
  {path: 'add-transaction', component: AddTransactionComponent}
];
