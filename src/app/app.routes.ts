import {Routes} from '@angular/router';
import {MainExchangeComponent} from './pages/main-exchange/main-exchange.component';
import {TransaztionListComponent} from './pages/transaztion-list/transaztion-list.component';
import {AddTransactionComponent} from './pages/add-transaction/add-transaction.component';
import {InventoryListComponent} from './pages/inventory-list/inventory-list.component';

export const routes: Routes = [
  {path: '', component: MainExchangeComponent},
  {path: 'transaction-list', component: TransaztionListComponent},
  {path: 'add-transaction', component: AddTransactionComponent},
  {path: 'inventory-list', component: InventoryListComponent}
];
