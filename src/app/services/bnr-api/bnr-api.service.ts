import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environment';
import {IExchangeRates} from '../../interfaces';
import {ITransaction} from '../../interfaces/transaction.interface';

@Injectable()
export class BnrApiService {
  constructor(private http: HttpClient) {}

  getExchangeRatesBnr(): Observable<IExchangeRates[]> {
    return this.http.get<IExchangeRates[]>(`${environment.API_URL}/exchange-rates-bnr`);
  }

  getExchangeRates(): Observable<IExchangeRates[]> {
    return this.http.get<IExchangeRates[]>(`${environment.API_URL}/exchange-rates`);
  }

  updateExchangeRate(currency: string, value: number): Observable<any> {
    const body = { currency, value };
    return this.http.post<any>(`${environment.API_URL}/update-exchange-rates`, body);
  }

  addTransaction(transactionData: ITransaction): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/add-transaction`, transactionData);
  }

  getTransactionsList(): Observable<ITransaction[]> {
    return this.http.get<any>(`${environment.API_URL}/transactions-list`);
  }
}
